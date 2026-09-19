import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'object',
      fields: [
        {name: 'en', title: 'English Title', type: 'string'},
        {name: 'fa', title: 'Dari Title (دری)', type: 'string'},
        {name: 'ps', title: 'Pashto Title (پښتو)', type: 'string'},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Service Description',
      type: 'object',
      fields: [
        {name: 'en', title: 'English Description', type: 'text', rows: 5},
        {name: 'fa', title: 'Dari Description (دری)', type: 'text', rows: 5},
        {name: 'ps', title: 'Pashto Description (پښتو)', type: 'text', rows: 5},
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'image',
    },
  },
})
