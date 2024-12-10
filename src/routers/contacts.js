import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactsByIdController,
  getContactsController,
  updateContactConroller,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';

export const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getContactsController));

contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactsByIdController),
);

contactsRouter.post('/contacts', ctrlWrapper(createContactController));

contactsRouter.patch(
  '/contacts/:contactId',
  ctrlWrapper(updateContactConroller),
);

contactsRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactController),
);
