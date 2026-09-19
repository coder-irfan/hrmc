import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Blogs & Articles',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Blog Title',
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
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Blog Content / Body',
      type: 'object',
      fields: [
        {name: 'en', title: 'English Content', type: 'text', rows: 8},
        {name: 'fa', title: 'Dari Content (دری)', type: 'text', rows: 8},
        {name: 'ps', title: 'Pashto Content (پښتو)', type: 'text', rows: 8},
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'mainImage',
      subtitle: 'publishedAt',
    },
  },
})
