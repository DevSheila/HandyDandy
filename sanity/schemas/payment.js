import { uuid } from '@sanity/uuid';
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'payment',
  title: 'Payment',
  type: 'object',
  fields: [
    defineField({
      type: 'string',
      name: 'Id',
      title: 'Job ID',
      options: {
        isHighlighted: true,
        readOnly: true
      },
      initialValue: () => `${uuid()}`
    }),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'paymentType',
      title: 'Payment Type',
      type: 'string',
      options: {
        list: ['Credit Card', 'Debit Card', 'PayPal', 'Other'],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'job',
      title: 'Job',
      type: 'reference',
      to: { type: 'job' },
    }),
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: { type: 'user' },
    }),
    defineField({
      name: 'serviceProvider',
      title: 'Service Provider',
      type: 'reference',
      to: { type: 'user' },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
  ],
});
