import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'carModel',
  title: 'รุ่นหลัก',
  type: 'document',
  fields: [
    defineField({
      name: 'brand',
      title: 'แบรนด์',
      type: 'reference',
      to: [{ type: 'brand' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modelName',
      title: 'ชื่อรุ่น',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'segment',
      title: 'เซกเมนต์',
      type: 'string',
      options: {
        list: [
          { title: 'City Car', value: 'city' },
          { title: 'Subcompact', value: 'subcompact' },
          { title: 'Compact', value: 'compact' },
          { title: 'Mid-size', value: 'mid-size' },
          { title: 'Full-size', value: 'full-size' },
          { title: 'SUV', value: 'suv' },
          { title: 'MPV', value: 'mpv' },
          { title: 'Pickup', value: 'pickup' },
        ],
      },
    }),
    defineField({
      name: 'origin',
      title: 'ประเทศที่ผลิต',
      type: 'string',
    }),
    defineField({
      name: 'heroImages',
      title: 'ภาพหลัก',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'defaultYouTubeUrl',
      title: 'YouTube URL หลัก',
      type: 'url',
    }),
    defineField({
      name: 'specBase',
      title: 'ข้อมูลพื้นฐาน',
      type: 'object',
      fields: [
        defineField({
          name: 'wheelbase_mm',
          title: 'ระยะฐานล้อ (มม.)',
          type: 'number',
        }),
        defineField({
          name: 'length_mm',
          title: 'ความยาว (มม.)',
          type: 'number',
        }),
        defineField({
          name: 'width_mm',
          title: 'ความกว้าง (มม.)',
          type: 'number',
        }),
        defineField({
          name: 'height_mm',
          title: 'ความสูง (มม.)',
          type: 'number',
        }),
        defineField({
          name: 'boot_l',
          title: 'พื้นที่กระโปรง (ลิตร)',
          type: 'number',
        }),
        defineField({
          name: 'charge_port',
          title: 'ตำแหน่งชาร์จ',
          type: 'string',
          options: {
            list: [
              { title: 'ด้านหน้า', value: 'front' },
              { title: 'ด้านหลัง', value: 'rear' },
              { title: 'ด้านข้าง', value: 'side' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'แท็ก',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'related',
      title: 'รุ่นที่เกี่ยวข้อง',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'carModel' }] }],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'modelName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'modelName',
      subtitle: 'brand.name',
      media: 'heroImages.0',
    },
  },
})
