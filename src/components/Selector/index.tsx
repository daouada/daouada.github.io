import React, { useState, useRef, useEffect } from 'react'
import ChevronDown from '@/components/Svg/ChevronDown'
import ChevronUp from '@/components/Svg/ChevronUp'

type MenuSelectorProps = {
  options: string[]
  onSelect: (value: string) => void
  defaultSelected?: string
}

const MenuSelector: React.FC<MenuSelectorProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string>(options[0] || '')
  const menuRef = useRef<HTMLDivElement>(null)

  const handleSelect = (value: string) => {
    setSelected(value)
    onSelect(value)
    setIsOpen(false)
  }

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full" ref={menuRef}>
      <button
        className="flex justify-between items-center px-4 py-3 border rounded-[4px] focus:ring-1 focus:ring-gray-600 focus:outline-none w-full"
        onClick={toggleMenu}
      >
        <span>{options.find((option) => option === selected) || 'Select an option'}</span>
        <span className="ml-2">{isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}</span>
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-t-0 border-gray-200 rounded-[4px] overflow-hidden">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${selected === option ? 'bg-gray-100' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MenuSelector

// Example usage:
// import MenuSelector from './MenuSelector';
// const options = [
//   { label: 'Option 1', value: 'option1' },
//   { label: 'Option 2', value: 'option2' },
//   { label: 'Option 3', value: 'option3' },
// ];
// <MenuSelector options={options} onSelect={(value) => console.log(value)} defaultSelected="option1" />
