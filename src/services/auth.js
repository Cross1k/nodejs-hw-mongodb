import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { randomBytes } from 'crypto';

import { UserCollection } from '../db/models/User.js';
import { FIFTEEN_MINUTES, ONE_MONTH } from '../constants/index.js';
import { SessionCollection } from '../db/models/Session.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
  };
};

export const registerUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UserCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });
  const isEqual = await bcrypt.compare(payload.password, user.password);
  console.log('user:', user);
  console.log('isEqual:', isEqual);
  if (!user || !isEqual) throw createHttpError(401, 'Unauthorized');

  await SessionCollection.deleteOne({ userId: user._id });

  const newSession = createSession();

  return await SessionCollection.create({
    userId: user._id,
    ...newSession,
  });
};

export const refreshUser = async ({ refreshToken }) => {
  const session = await SessionCollection.findOne({
    refreshToken,
  });

  await SessionCollection.deleteOne({ refreshToken });

  const newSession = createSession();

  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};
