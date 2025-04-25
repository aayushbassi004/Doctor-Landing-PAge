"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import type { Doctor } from "@/types/doctor"

interface SearchBarProps {
  searchTerm: string
  onSearch: (term: string) => void
  doctors: Doctor[]
}

export default function SearchBar({ searchTerm, onSearch, doctors }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(searchTerm)
  const [suggestions, setSuggestions] = useState<Doctor[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInputValue(searchTerm)
  }, [searchTerm])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (value.trim() === "") {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    // Filter doctors based on input and get top 3 matches
    const filtered = doctors.filter((doctor) => doctor.name.toLowerCase().includes(value.toLowerCase())).slice(0, 3)

    setSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(inputValue)
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (name: string) => {
    setInputValue(name)
    onSearch(name)
    setShowSuggestions(false)
  }

  return (
    <div className="relative" ref={suggestionsRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => inputValue && suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Search for doctors by name..."
            className="w-full p-4 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 ease-in-out">
          <ul>
            {suggestions.map((doctor) => (
              <li
                key={doctor.id}
                onClick={() => handleSuggestionClick(doctor.name)}
                className="p-3 hover:bg-purple-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
              >
                {doctor.name} - {doctor.specialty}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
