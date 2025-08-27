import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-black mb-6">
            DriveTwo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            รีวิวรถยนต์ไฟฟ้าและรถยนต์ทั่วไป
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reviews"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 text-lg"
            >
              ดูรีวิวรถยนต์
            </Link>
            <Link
              href="/studio"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors duration-200 text-lg"
            >
              จัดการข้อมูล
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">รีวิวละเอียด</h3>
            <p className="text-gray-600">รีวิวรถยนต์ทุกรุ่นอย่างละเอียด พร้อมข้อมูลสเปคครบถ้วน</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">ข้อมูลแม่นยำ</h3>
            <p className="text-gray-600">ข้อมูลรถยนต์ที่อัปเดตและแม่นยำจากแหล่งข้อมูลที่เชื่อถือได้</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">เปรียบเทียบ</h3>
            <p className="text-gray-600">เปรียบเทียบรถยนต์หลายรุ่นเพื่อการตัดสินใจที่เหมาะสม</p>
          </div>
        </div>
        
        <div className="text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
          >
            เริ่มต้นดูรีวิวรถยนต์ →
          </Link>
        </div>
      </div>
    </div>
  );
}
