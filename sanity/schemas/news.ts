import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'news',
  title: 'ข่าวสาร',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'หัวข้อ',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'ภาพปก',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'summary',
      title: 'สรุป',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'เนื้อหา',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'หมวดหมู่',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'ข่าวรถยนต์', value: 'car-news' },
          { title: 'รีวิวรถยนต์', value: 'car-review' },
          { title: 'เทคโนโลยี', value: 'technology' },
          { title: 'อุตสาหกรรม', value: 'industry' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'แท็ก',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'วันที่เผยแพร่',
      type: 'datetime',
    }),
    defineField({
      name: 'author',
      title: 'ผู้เขียน',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'coverImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `โดย ${author}` }
    },
  },
})
