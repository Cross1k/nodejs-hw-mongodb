import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  filter.userId = req.user._id;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { contactId: _id } = req.params;
  const contact = await getContactById({ _id, userId });

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${_id}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const contact = await createContact({ ...req.body, userId });
  console.log(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContactConroller = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { contactId: _id } = req.params;
  console.log('output:', userId, _id);
  const contact = await updateContact({ _id, userId }, req.body);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact.value,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { contactId: _id } = req.params;
  console.log('_id:', userId, 'contactId:', _id);
  const contact = await deleteContact({ _id, userId });

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
