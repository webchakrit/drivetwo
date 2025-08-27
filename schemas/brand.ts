export default {
  name: 'brand',
  title: 'ยี่ห้อ (Brand)',
  type: 'document',
  fields: [
    { name: 'name', title: 'ชื่อยี่ห้อ', type: 'string', validation: (R:any)=>R.required() },
    { name: 'country', title: 'ประเทศ', type: 'string' },
    { name: 'logo', title: 'โลโก้', type: 'image' },
  ],
}
