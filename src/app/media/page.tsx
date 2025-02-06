'use client'

import React, { useState, useMemo } from 'react'
import ChevronDown from '@/components/Svg/ChevronDown'
import MenuSelector from '@/components/Selector'
import mediaData from '@/../data/media.json'
import MediaTag from '@/components/Tag/MediaTag'

export default function Page() {
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [yearFilter, setYearFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleItems, setVisibleItems] = useState(10)

  const categories = useMemo(() => {
    const allCategories = new Set<string>()
    mediaData.media.forEach((mediaYear) => {
      mediaYear.items.forEach((item) => {
        allCategories.add(item.category)
      })
    })
    return ['All', ...Array.from(allCategories).sort()]
  }, [])

  const years = useMemo(() => {
    return ['All', ...mediaData.media.map((year) => year.year.toString())]
  }, [])

  const filteredmedia = useMemo(() => {
    let filtered = mediaData.media

    if (yearFilter !== 'All') {
      filtered = filtered.filter((media) => media.year.toString() === yearFilter)
    }

    if (categoryFilter !== 'All') {
      filtered = filtered.map((media) => ({
        ...media,
        items: media.items.filter((item) => item.category === categoryFilter),
      }))
    }

    if (searchQuery) {
      filtered = filtered.map((media) => ({
        ...media,
        items: media.items.filter(
          (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.content.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
    }

    return filtered.filter((media) => media.items.length > 0)
  }, [categoryFilter, yearFilter, searchQuery])

  const visiblemedia = useMemo(() => {
    return filteredmedia.flatMap((media) => media.items).slice(0, visibleItems)
  }, [filteredmedia, visibleItems])

  const loadMore = () => {
    setVisibleItems((prev) => prev + 10)
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-800">media</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center mt-14">
        <div className="flex">
          <div className="flex flex-col w-full md:w-[200px]">
            <span className="text-sm text-gray-500">Published at</span>
            <div className="">
              <MenuSelector options={years} onSelect={(year) => setYearFilter(year)} />
            </div>
          </div>

          <div className="flex flex-col w-full md:w-[200px] ml-4">
            <span className="text-sm text-gray-500">Category</span>
            <MenuSelector options={categories} onSelect={(category) => setCategoryFilter(category)} />
          </div>
        </div>

        <div className="flex flex-col w-full mt-2 md:mt-0 md:ml-4">
          <span className="text-sm text-gray-500">Looking for</span>
          <input
            type="text"
            className="border p-3 rounded-[4px] focus:ring-1 focus:ring-gray-600 focus:outline-none h-[50px]"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* media Items */}
      <div>
        {visiblemedia.map((item, index) => (
          <div key={index} className={`py-8 ${index === visiblemedia.length - 1 ? '' : 'border-b'}`}>
            <p className="text-sm text-gray-500 mb-2">{item.date}</p>
            {item.url ? (
              <a href={item.url} target="_blank" className="cursor-pointer text-lg font-bold text-blue-600 underline">
                {item.title}
              </a>
            ) : (
              <h2 className="text-lg font-bold text-gray-700">{item.title}</h2>
            )}
            <p className="text-gray-700 mb-4 mt-4">{item.content}</p>
            <div>
              <MediaTag t={item.category} />
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visiblemedia.length < filteredmedia.flatMap((year) => year.items).length && (
        <div className="flex justify-center items-center mt-8">
          <div className="cursor-pointer flex items-center gap-2 border-b border-transparent hover:border-gray-400">
            <a className="text-gray-700" onClick={loadMore}>
              Show more
            </a>
            <ChevronDown className="size-4" />
          </div>
        </div>
      )}
    </div>
  )
}
