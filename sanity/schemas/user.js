import { uuid } from '@sanity/uuid';
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'user',
  title: 'User',
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
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'geopoint',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isEmployer',
      title: 'Is Employer',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isServiceProvider',
      title: 'Is Service Provider',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'jobCategory' } }],
    }),
      {
      name: "image",
      type: "image",
      title: "Profile Image",
    },
  ],
});
