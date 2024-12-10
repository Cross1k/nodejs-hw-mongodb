import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, requried: true },
    phoneNumber: { type: String, requried: true },
    email: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      requried: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contact', contactSchema);
