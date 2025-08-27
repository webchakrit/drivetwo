'use client'

import React, { useState, useMemo } from 'react'

type FilterPanelProps = {
  trims: any[]
  onFiltersChange: (filteredTrims: any[]) => void
}

type FilterState = {
  brands: string[]
  drives: string[]
  types: string[]
  priceMin: string
  priceMax: string
  rangeMin: string
  rangeMax: string
}

export default function FilterPanel({ trims, onFiltersChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    drives: [],
    types: [],
    priceMin: '',
    priceMax: '',
    rangeMin: '',
    rangeMax: ''
  })

  // สร้าง unique values สำหรับ dropdowns
  const uniqueBrands = useMemo(() => {
    const brands = trims
      .map(trim => trim?.model?.brand?.name)
      .filter((brand): brand is string => Boolean(brand))
    return [...new Set(brands)].sort()
  }, [trims])

  const uniqueDrives = useMemo(() => {
    const drives = trims
      .map(trim => trim?.drive)
      .filter((drive): drive is string => Boolean(drive))
    return [...new Set(drives)].sort()
  }, [trims])

  const uniqueTypes = useMemo(() => {
    const types = trims
      .map(trim => trim?.type)
      .filter((type): type is string => Boolean(type))
    return [...new Set(types)].sort()
  }, [trims])

  // ฟังก์ชันกรองข้อมูล
  const applyFilters = useMemo(() => {
    return trims.filter(trim => {
      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(trim?.model?.brand?.name)) {
        return false
      }

      // Drive filter
      if (filters.drives.length > 0 && !filters.drives.includes(trim?.drive)) {
        return false
      }

      // Type filter
      if (filters.types.length > 0 && !filters.types.includes(trim?.type)) {
        return false
      }

      // Price filter
      if (filters.priceMin && trim?.priceTHB && Number(trim.priceTHB) < Number(filters.priceMin)) {
        return false
      }
      if (filters.priceMax && trim?.priceTHB && Number(trim.priceTHB) > Number(filters.priceMax)) {
        return false
      }

      // Range filter
      if (filters.rangeMin && trim?.range_km && Number(trim.range_km) < Number(filters.rangeMin)) {
        return false
      }
      if (filters.rangeMax && trim?.range_km && Number(trim.range_km) > Number(filters.rangeMax)) {
        return false
      }

      return true
    })
  }, [trims, filters])

  // อัปเดต filtered results เมื่อ filters เปลี่ยน
  React.useEffect(() => {
    onFiltersChange(applyFilters)
  }, [applyFilters, onFiltersChange])

  // ฟังก์ชันจัดการ filter changes
  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  // ฟังก์ชันล้างตัวกรอง
  const resetFilters = () => {
    setFilters({
      brands: [],
      drives: [],
      types: [],
      priceMin: '',
      priceMax: '',
      rangeMin: '',
      rangeMax: ''
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-black">ตัวกรอง</h2>
        <button
          onClick={resetFilters}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          ล้างตัวกรอง
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ยี่ห้อ
          </label>
          <select
            multiple
            value={filters.brands}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, option => option.value)
              handleFilterChange('brands', selected)
            }}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            size={4}
          >
            {uniqueBrands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">กด Ctrl+คลิก เพื่อเลือกหลายตัว</p>
        </div>

        {/* Drive Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ระบบขับเคลื่อน
          </label>
          <select
            multiple
            value={filters.drives}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, option => option.value)
              handleFilterChange('drives', selected)
            }}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            size={4}
          >
            {uniqueDrives.map(drive => (
              <option key={drive} value={drive}>
                {drive}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ประเภทพลังงาน
          </label>
          <select
            multiple
            value={filters.types}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, option => option.value)
              handleFilterChange('types', selected)
            }}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            size={4}
          >
            {uniqueTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ช่วงราคา (บาท)
          </label>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="ราคาต่ำสุด"
              value={filters.priceMin}
              onChange={(e) => handleFilterChange('priceMin', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <input
              type="number"
              placeholder="ราคาสูงสุด"
              value={filters.priceMax}
              onChange={(e) => handleFilterChange('priceMax', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ช่วงระยะทาง (กม.)
          </label>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="ระยะทางต่ำสุด"
              value={filters.rangeMin}
              onChange={(e) => handleFilterChange('rangeMin', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <input
              type="number"
              placeholder="ระยะทางสูงสุด"
              value={filters.rangeMax}
              onChange={(e) => handleFilterChange('rangeMax', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      </div>

      {/* Filter Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {filters.brands.length > 0 && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              ยี่ห้อ: {filters.brands.join(', ')}
            </span>
          )}
          {filters.drives.length > 0 && (
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              ขับเคลื่อน: {filters.drives.join(', ')}
            </span>
          )}
          {filters.types.length > 0 && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
              พลังงาน: {filters.types.join(', ')}
            </span>
          )}
          {(filters.priceMin || filters.priceMax) && (
            <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
              ราคา: {filters.priceMin || '0'} - {filters.priceMax || '∞'} บาท
            </span>
          )}
          {(filters.rangeMin || filters.rangeMax) && (
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
              ระยะทาง: {filters.rangeMin || '0'} - {filters.rangeMax || '∞'} กม.
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
