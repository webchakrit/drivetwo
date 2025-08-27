import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'carTrim',
  title: 'รุ่นย่อย',
  type: 'document',
  fields: [
    defineField({
      name: 'model',
      title: 'รุ่นหลัก',
      type: 'reference',
      to: [{ type: 'carModel' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceTHB',
      title: 'ราคา (บาท)',
      type: 'number',
    }),
    defineField({
      name: 'onRoadPriceTHB',
      title: 'ราคา On-Road (บาท)',
      type: 'number',
    }),
    defineField({
      name: 'promo',
      title: 'โปรโมชั่น',
      type: 'text',
    }),
    defineField({
      name: 'type',
      title: 'ประเภท',
      type: 'string',
      options: {
        list: [
          { title: 'EV', value: 'ev' },
          { title: 'PHEV', value: 'phev' },
          { title: 'HEV', value: 'hev' },
          { title: 'ICE', value: 'ice' },
        ],
      },
    }),
    defineField({
      name: 'drive',
      title: 'ระบบขับเคลื่อน',
      type: 'string',
      options: {
        list: [
          { title: 'FWD', value: 'fwd' },
          { title: 'RWD', value: 'rwd' },
          { title: 'AWD', value: 'awd' },
          { title: '4WD', value: '4wd' },
        ],
      },
    }),
    defineField({
      name: 'power_hp',
      title: 'กำลัง (แรงม้า)',
      type: 'number',
    }),
    defineField({
      name: 'torque_Nm',
      title: 'แรงบิด (นิวตัน-เมตร)',
      type: 'number',
    }),
    defineField({
      name: 'battery_kWh',
      title: 'ความจุแบตเตอรี่ (กิโลวัตต์-ชั่วโมง)',
      type: 'number',
    }),
    defineField({
      name: 'chargingAC_kW',
      title: 'การชาร์จ AC (กิโลวัตต์)',
      type: 'number',
    }),
    defineField({
      name: 'chargingDC_kW',
      title: 'การชาร์จ DC (กิโลวัตต์)',
      type: 'number',
    }),
    defineField({
      name: 'zeroTo100_s',
      title: '0-100 กม./ชม. (วินาที)',
      type: 'number',
    }),
    defineField({
      name: 'topSpeed_kmh',
      title: 'ความเร็วสูงสุด (กม./ชม.)',
      type: 'number',
    }),
    defineField({
      name: 'range_km',
      title: 'ระยะทาง (กิโลเมตร)',
      type: 'number',
    }),
    defineField({
      name: 'range_standard',
      title: 'มาตรฐานระยะทาง',
      type: 'string',
      options: {
        list: [
          { title: 'WLTP', value: 'wltp' },
          { title: 'EPA', value: 'epa' },
          { title: 'NEDC', value: 'nedc' },
        ],
      },
    }),
    defineField({
      name: 'suspension_front',
      title: 'ระบบกันสะเทือนหน้า',
      type: 'string',
    }),
    defineField({
      name: 'suspension_rear',
      title: 'ระบบกันสะเทือนหลัง',
      type: 'string',
    }),
    defineField({
      name: 'brakes',
      title: 'ระบบเบรก',
      type: 'string',
    }),
    defineField({
      name: 'wheel_in',
      title: 'ขนาดล้อ (นิ้ว)',
      type: 'number',
    }),
    defineField({
      name: 'tire',
      title: 'ยาง',
      type: 'string',
    }),
    defineField({
      name: 'airbags',
      title: 'จำนวนถุงลมนิรภัย',
      type: 'number',
    }),
    defineField({
      name: 'AEB',
      title: 'AEB (Automatic Emergency Braking)',
      type: 'boolean',
    }),
    defineField({
      name: 'ACC',
      title: 'ACC (Adaptive Cruise Control)',
      type: 'boolean',
    }),
    defineField({
      name: 'LKA',
      title: 'LKA (Lane Keeping Assist)',
      type: 'boolean',
    }),
    defineField({
      name: 'BSM',
      title: 'BSM (Blind Spot Monitor)',
      type: 'boolean',
    }),
    defineField({
      name: 'camera360',
      title: 'กล้อง 360 องศา',
      type: 'boolean',
    }),
    defineField({
      name: 'isofix',
      title: 'ISOFIX',
      type: 'boolean',
    }),
    defineField({
      name: 'seats',
      title: 'จำนวนที่นั่ง',
      type: 'number',
    }),
    defineField({
      name: 'upholstery',
      title: 'วัสดุหุ้มเบาะ',
      type: 'string',
    }),
    defineField({
      name: 'ac_zone',
      title: 'โซนแอร์',
      type: 'number',
    }),
    defineField({
      name: 'infotainment_in',
      title: 'ขนาดหน้าจอ Infotainment (นิ้ว)',
      type: 'number',
    }),
    defineField({
      name: 'carplay',
      title: 'Apple CarPlay',
      type: 'boolean',
    }),
    defineField({
      name: 'android_auto',
      title: 'Android Auto',
      type: 'boolean',
    }),
    defineField({
      name: 'wireless_charge',
      title: 'การชาร์จไร้สาย',
      type: 'boolean',
    }),
    defineField({
      name: 'hud',
      title: 'HUD (Head-Up Display)',
      type: 'boolean',
    }),
    defineField({
      name: 'sunroof',
      title: 'หลังคาเปิดได้',
      type: 'boolean',
    }),
    defineField({
      name: 'ota',
      title: 'OTA Update',
      type: 'boolean',
    }),
    defineField({
      name: 'gallery',
      title: 'แกลเลอรี่',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
    }),
    defineField({
      name: 'year',
      title: 'ปี',
      type: 'number',
    }),
    defineField({
      name: 'MY',
      title: 'Model Year',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'model.modelName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'model.modelName',
      subtitle: 'type',
      media: 'gallery.0',
    },
  },
})
