import { uuid } from '@sanity/uuid';

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'job',
  title: 'Job',
  type: 'document',
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
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Profile Image",
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'geopoint',
    }),
    defineField({
      name: 'budget',
      title: 'Budget',
      type: 'number',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'jobCategory' }],
    }),
    defineField({
      name: 'employer',
      title: 'Employer',
      type: 'reference',
      to: [{ type: 'user', options: { filter: 'role == "employer"' } }],
    }),
    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'reference',
      to: [{ type: 'user', options: { filter: 'role == "provider"' } }],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['posted', 'in progress', 'completed', 'cancelled'],
      },
    }),
  ],
});
