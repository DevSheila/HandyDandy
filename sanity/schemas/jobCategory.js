import { uuid } from '@sanity/uuid';
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'jobCategory',
  title: 'Job Category',
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
    })
  ],
})