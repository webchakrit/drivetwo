export default {
  name: 'carTrim',
  title: 'รุ่นย่อย (Trim)',
  type: 'document',
  fields: [
    { name: 'model', title: 'รุ่นหลัก', type: 'reference', to: [{type:'carModel'}], validation: (R:any)=>R.required() },
    { name: 'trimName', title: 'ชื่อรุ่นย่อย', type: 'string', validation: (R:any)=>R.required() },

    { name: 'priceTHB', title: 'ราคา (บาท)', type: 'number' },
    { name: 'onRoadPriceTHB', title: 'ราคาพร้อมใช้ (บาท)', type: 'number' },
    { name: 'promo', title: 'โปรโมชัน', type: 'string' },

    { name: 'type', title: 'ประเภทพลังงาน (EV/Hybrid/ICE)', type: 'string' },
    { name: 'drive', title: 'ระบบขับเคลื่อน (FWD/RWD/AWD)', type: 'string' },
    { name: 'power_hp', title: 'แรงม้า (hp)', type: 'number' },
    { name: 'torque_Nm', title: 'แรงบิด (Nm)', type: 'number' },
    { name: 'battery_kWh', title: 'แบตเตอรี่ (kWh)', type: 'number' },
    { name: 'chargingAC_kW', title: 'ชาร์จ AC (kW)', type: 'number' },
    { name: 'chargingDC_kW', title: 'ชาร์จ DC (kW)', type: 'number' },

    { name: 'zeroTo100_s', title: '0–100 (วินาที)', type: 'number' },
    { name: 'topSpeed_kmh', title: 'ความเร็วสูงสุด (km/h)', type: 'number' },
    { name: 'range_km', title: 'ระยะทาง (km)', type: 'number' },
    { name: 'range_standard', title: 'มาตรฐานระยะทาง (WLTP/CLTC/EPA)', type: 'string' },

    { name: 'suspension_front', title: 'ช่วงล่างหน้า', type: 'string' },
    { name: 'suspension_rear', title: 'ช่วงล่างหลัง', type: 'string' },
    { name: 'brakes', title: 'เบรก', type: 'string' },
    { name: 'wheel_in', title: 'ล้อ (นิ้ว)', type: 'number' },
    { name: 'tire', title: 'ยาง', type: 'string' },

    { name: 'airbags', title: 'ถุงลม (ใบ)', type: 'number' },
    { name: 'AEB', title: 'AEB', type: 'boolean' },
    { name: 'ACC', title: 'ACC', type: 'boolean' },
    { name: 'LKA', title: 'LKA', type: 'boolean' },
    { name: 'BSM', title: 'BSM', type: 'boolean' },
    { name: 'camera360', title: 'กล้อง 360°', type: 'boolean' },
    { name: 'isofix', title: 'ISOFIX', type: 'boolean' },

    { name: 'seats', title: 'ที่นั่ง (ที่)', type: 'number' },
    { name: 'upholstery', title: 'วัสดุเบาะ', type: 'string' },
    { name: 'ac_zone', title: 'โซนแอร์', type: 'string' },
    { name: 'infotainment_in', title: 'จออินโฟ (นิ้ว)', type: 'number' },
    { name: 'carplay', title: 'CarPlay', type: 'boolean' },
    { name: 'android_auto', title: 'Android Auto', type: 'boolean' },
    { name: 'wireless_charge', title: 'ชาร์จไร้สาย', type: 'boolean' },
    { name: 'hud', title: 'HUD', type: 'boolean' },
    { name: 'sunroof', title: 'Sunroof/Glass roof', type: 'string' },
    { name: 'ota', title: 'OTA', type: 'boolean' },

    { name: 'gallery', title: 'รูปภาพ', type: 'array', of: [{type:'image'}] },
    { name: 'youtubeUrl', title: 'YouTube (เฉพาะรุ่นย่อย)', type: 'url' },

    { name: 'year', title: 'ปี', type: 'number' },
    { name: 'MY', title: 'Model Year', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: (doc:any)=> `${doc?.trimName || 'trim'}` } },
  ],
}
