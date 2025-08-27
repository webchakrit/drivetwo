import { defineConfig } from 'sanity' 
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

// ✅ เพิ่มฟังก์ชัน Logo ตรงนี้
function Logo() {
  return (
    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#df2531' }}>
      DriveTwo Studio
    </div>
  )
}

export default defineConfig({
  name: 'default',
  title: 'DriveTwo - Sanity Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      // ⬇️ ใช้ฟังก์ชัน Logo แทน inline JSX
      logo: Logo,
    },
  },
})
