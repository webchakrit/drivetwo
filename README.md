# DriveTwo - รีวิวรถยนต์

เว็บไซต์รีวิวรถยนต์ไฟฟ้าและรถยนต์ทั่วไปที่สร้างด้วย Next.js และ Sanity CMS

## คุณสมบัติ

- **Sanity Studio แบบฝัง**: จัดการข้อมูลรถยนต์ผ่าน `/studio`
- **ระบบรีวิว**: ดูรีวิวรถยนต์ตามแบรนด์และรุ่น
- **ข้อมูลครบถ้วน**: สเปครถยนต์ รุ่นย่อย และคุณสมบัติต่างๆ
- **UI ภาษาไทย**: อินเตอร์เฟสภาษาไทยที่ใช้งานง่าย

## โครงสร้างข้อมูล

### สคีมาหลัก

- **brand**: แบรนด์รถยนต์ (ชื่อ, ประเทศ, โลโก้)
- **carModel**: รุ่นหลัก (แบรนด์, ชื่อรุ่น, เซกเมนต์, ข้อมูลพื้นฐาน)
- **carTrim**: รุ่นย่อย (ราคา, สเปค, คุณสมบัติ)
- **news**: ข่าวสารรถยนต์
- **contactLead**: ข้อมูลติดต่อ

## การติดตั้ง

1. Clone โปรเจกต์
2. ติดตั้ง dependencies:
   ```bash
   npm install
   ```

3. สร้างไฟล์ `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token_here
   ```

4. รันโปรเจกต์:
   ```bash
   npm run dev
   ```

## การใช้งาน

### Sanity Studio
- เข้าที่ `/studio` เพื่อจัดการข้อมูล
- สร้างแบรนด์ รุ่นรถ และข้อมูลต่างๆ

### ดูรีวิว
- หน้าแรก: `/` - แสดงภาพรวมและลิงก์ไปยังส่วนต่างๆ
- รายการแบรนด์: `/reviews` - เลือกแบรนด์ที่สนใจ
- รุ่นรถ: `/reviews/[brand]` - ดูรุ่นรถของแบรนด์
- รายละเอียด: `/reviews/[brand]/[model]` - ดูข้อมูลและรุ่นย่อย

## เทคโนโลยีที่ใช้

- **Frontend**: Next.js 15, React 19, TypeScript
- **CMS**: Sanity (Embedded Studio)
- **Styling**: Tailwind CSS
- **Font**: Kanit (ภาษาไทย)
- **Colors**: #ffffff, #df2531, #000000

## การพัฒนา

### โครงสร้างโฟลเดอร์
```
src/
├── app/
│   ├── reviews/          # หน้ารีวิวรถยนต์
│   ├── studio/           # Sanity Studio
│   └── ...
sanity/
├── schemas/              # สคีมาข้อมูล
├── lib/                  # utilities
└── sanity.config.ts      # config Sanity
```

### การเพิ่มสคีมาใหม่
1. สร้างไฟล์ใน `sanity/schemas/`
2. เพิ่มใน `sanity/schemas/index.ts`
3. อัปเดต `sanity.config.ts` หากจำเป็น

## การ Deploy

1. สร้าง Sanity project
2. ตั้งค่า environment variables
3. Deploy ไปยัง Vercel หรือ platform อื่นๆ

## License

MIT
