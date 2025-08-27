'use client'

import { useState } from 'react'

export default function ShareButton({ 
  className = '', 
  label = 'แชร์ลิงก์', 
  url 
}: { 
  className?: string; 
  label?: string; 
  url?: string 
}) {
  const [copied, setCopied] = useState(false)

  async function shareLink() {
    const target = url ?? (typeof window !== 'undefined' ? window.location.href : '')
    
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(target)
      } else {
        // Fallback สำหรับ browser ที่ไม่รองรับ clipboard API
        const inp = document.createElement('input')
        inp.value = target
        document.body.appendChild(inp)
        inp.select()
        document.execCommand('copy')
        document.body.removeChild(inp)
      }
      
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) {
      alert('คัดลอกลิงก์ไม่สำเร็จ')
    }
  }

  return (
    <button 
      onClick={shareLink} 
      className={`rounded border border-[#df2531] px-3 py-1 text-sm text-[#df2531] hover:bg-[#df2531] hover:text-white transition-colors ${className}`}
    >
      {label}
      
      {copied && (
        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
          คัดลอกลิงก์แล้ว
        </span>
      )}
    </button>
  )
}
