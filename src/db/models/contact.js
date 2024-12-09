import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contact', contactSchema);
