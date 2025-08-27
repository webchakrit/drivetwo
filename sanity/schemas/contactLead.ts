import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactLead',
  title: 'ข้อมูลติดต่อ',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'ชื่อ',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'อีเมล',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'title',
      title: 'หัวข้อ',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'ข้อความ',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'แหล่งที่มา',
      type: 'string',
      options: {
        list: [
          { title: 'เว็บไซต์', value: 'website' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Line', value: 'line' },
          { title: 'อื่นๆ', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'createdAt',
      title: 'วันที่สร้าง',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'email',
    },
  },
})
