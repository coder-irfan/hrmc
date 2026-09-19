import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'doctor',
  title: 'Doctors & Specialists',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Doctor Name',
      type: 'string',
      description: 'Full name of the doctor (e.g. Dr. Ahmad Rohani)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'specialization',
      title: 'Specialization / Field',
      type: 'object',
      fields: [
        {name: 'en', title: 'English Specialization', type: 'string'},
        {name: 'prs', title: 'Dari Specialization (دری)', type: 'string'},
        {name: 'ps', title: 'Pashto Specialization (پښتو)', type: 'string'},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Doctor Photograph',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'specialization.en',
      media: 'image',
    },
  },
})
