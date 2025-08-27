import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'brand',
  title: 'แบรนด์',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'ชื่อแบรนด์',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'ประเทศต้นกำเนิด',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'โลโก้',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
})
