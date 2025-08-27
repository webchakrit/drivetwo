export default {
  name: 'carModel',
  title: 'รุ่นหลัก (Model)',
  type: 'document',
  fields: [
    { name: 'brand', title: 'ยี่ห้อ', type: 'reference', to: [{type:'brand'}], validation: (R:any)=>R.required() },
    { name: 'modelName', title: 'ชื่อรุ่น', type: 'string', validation: (R:any)=>R.required() },
    { name: 'segment', title: 'เซกเมนต์', type: 'string' },
    { name: 'origin', title: 'แหล่งผลิต/ประเทศ', type: 'string' },
    { name: 'heroImages', title: 'ภาพหลัก', type: 'array', of: [{type:'image'}] },
    { name: 'defaultYouTubeUrl', title: 'YouTube (รุ่นหลัก)', type: 'url' },
    {
      name: 'specBase',
      title: 'สเปกพื้นฐาน (ใช้ร่วมกัน)',
      type: 'object',
      fields: [
        { name: 'wheelbase_mm', title: 'ระยะฐานล้อ (มม.)', type: 'number' },
        { name: 'length_mm', title: 'ยาว (มม.)', type: 'number' },
        { name: 'width_mm', title: 'กว้าง (มม.)', type: 'number' },
        { name: 'height_mm', title: 'สูง (มม.)', type: 'number' },
        { name: 'boot_l', title: 'ความจุสัมภาระ (ลิตร)', type: 'number' },
        { name: 'charge_port', title: 'พอร์ตชาร์จ', type: 'string' },
      ],
    },
    { name: 'tags', title: 'แท็ก', type: 'array', of: [{type:'string'}] },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: (doc:any)=> `${doc?.modelName || 'model'}` } },
  ],
}
