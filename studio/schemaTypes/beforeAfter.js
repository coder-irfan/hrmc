import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'beforeAfter',
  title: 'Before & After Transformations',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Case Title',
      type: 'object',
      fields: [
        {name: 'en', title: 'English Title', type: 'string'},
        {name: 'prs', title: 'Dari Title (دری)', type: 'string'},
        {name: 'ps', title: 'Pashto Title (پښتو)', type: 'string'},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'afterImage',
      title: 'After Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'afterImage',
    },
  },
})
