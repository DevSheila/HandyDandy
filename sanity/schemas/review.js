import { uuid } from '@sanity/uuid';
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'review',
  title: 'Review',
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
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
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
  ],
})
