'use client'

import React, { useState, useMemo } from 'react'
import ChevronDown from '@/components/Svg/ChevronDown'
import External from '@/components/Svg/External'
import MenuSelector from '@/components/Selector'
import publicationsData from '@/../data/publications.json'
import PublicationTag from '@/components/Tag/PublicationTag'

export default function Page() {
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [yearFilter, setYearFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleItems, setVisibleItems] = useState(10)

  const categories = useMemo(() => ['All', 'Books', 'Conferences', 'Journals', 'Patents'], [])

  const years = useMemo(() => {
    const allYears = new Set()

    Object.values(publicationsData).forEach((category) => {
      category.forEach((publication) => {
        if (publication.year) {
          allYears.add(publication.year)
        }
      })
    })

    return [
      'All',
      ...Array.from(allYears)
        .sort((a: any, b: any) => b - a)
        .map((year: any) => year.toString()),
    ]
  }, [])

  const filteredPublications = useMemo(() => {
    let filtered: any[] = []

    Object.entries(publicationsData).forEach(([key, publications]) => {
      if (categoryFilter === 'All' || categoryFilter.toLowerCase() === key) {
        let pubCopy: any[] = [...publications]
        for (let i = 0; i < publications.length; i++) {
          if (key == 'books') pubCopy[i].category = 'Book'
          else if (key == 'conferences') pubCopy[i].category = 'Conference'
          else if (key == 'journals') pubCopy[i].category = 'Journal'
          else if (key == 'patents') pubCopy[i].category = 'Patent'
        }
        filtered = filtered.concat(pubCopy)
      }
    })

    if (yearFilter !== 'All') {
      filtered = filtered.filter((pub) => pub.year && pub.year.toString() === yearFilter)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (pub) =>
          pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pub.authors.some((author: any) => author.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    return Object.entries(
      filtered.reduce((acc, pub) => {
        if (!acc[pub.year]) acc[pub.year] = []
        acc[pub.year].push(pub)
        return acc
      }, {}),
    ).sort(([yearA]: any, [yearB]: any) => yearB - yearA)
  }, [categoryFilter, yearFilter, searchQuery])

  const visiblePublications = useMemo(() => {
    let tmp2: any[] = [...filteredPublications]
    let tmp: any[] = []

    let counter = 0

    for (let i = 0; i < filteredPublications.length; i++) {
      if (counter == visibleItems) {
        return tmp
      }
      tmp[i] = [filteredPublications[i][0], []]
      for (let j = 0; j < tmp2[i][1].length; j++) {
        if (counter == visibleItems) {
          return tmp
        }
        tmp[i][1][j] = tmp2[i][1][j]
        counter++
      }
    }

    return tmp
  }, [filteredPublications, visibleItems])

  const loadMore = () => {
    setVisibleItems((prev) => prev + 10)
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-800">Publications</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center mt-14">
        <div className="flex">
          <div className="flex flex-col w-full md:w-[200px]">
            <span className="text-sm text-gray-500">Published at</span>
            <div>
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

      {/* Publications */}
      <div className="mt-8">
        {visiblePublications.map(([year, publications]: any) => (
          <div key={year} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">{year}</h2>
            {publications.map((pub: any, index: any) => (
              <div key={index} className={`py-5 ${index === publications.length - 1 ? '' : 'border-b'}`}>
                <div className="flex justify-between items-center">
                  {pub.url ? (
                    <a
                      href={pub.url}
                      target="_blank"
                      className="flex items-start justify-between text-lg font-bold text-gray-700 mb-2 w-full"
                    >
                      {pub.title}
                      <External className="size-[20px] ml-2 min-w-[20px]" />
                    </a>
                  ) : (
                    <h3 className="text-lg font-bold text-gray-700 mb-2">{pub.title}</h3>
                  )}
                </div>
                <p className="text-gray-700 mb-1">{pub.authors && pub.authors.join(', ')}</p>
                <p className="text-gray-700 mb-2">{pub.venue}</p>
                <div className="flex mt-2">
                  <PublicationTag t={pub.category} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visiblePublications.length < filteredPublications.length && (
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
