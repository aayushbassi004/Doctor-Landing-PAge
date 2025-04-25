"use client"

import React from "react"
import { useEffect, useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import SearchBar from "../components/search-bar"
import FilterPanel from "../components/filter-panel"
import DoctorList from "../components/doctor-list"
import type { Doctor } from "../types/doctor"

export default function DoctorListingPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [consultationType, setConsultationType] = useState<string | null>(null)
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()

  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json")

        if (!response.ok) {
          throw new Error("Failed to fetch doctors data")
        }

        const data = await response.json()
        setDoctors(data)
        setFilteredDoctors(data)
      } catch (err) {
        setError("Failed to load doctors. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  // Parse URL params on initial load
  useEffect(() => {
    const search = searchParams.get("search")
    const consult = searchParams.get("consult")
    const specialties = searchParams.get("specialties")
    const sort = searchParams.get("sort")

    if (search) setSearchTerm(search)
    if (consult) setConsultationType(consult)
    if (specialties) setSelectedSpecialties(specialties.split(","))
    if (sort) setSortBy(sort)
  }, [searchParams])

  // Apply filters
  useEffect(() => {
    if (loading) return

    let filtered = [...doctors]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((doctor) => doctor.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Apply consultation type filter
    if (consultationType) {
      filtered = filtered.filter((doctor) => doctor.consultationType === consultationType)
    }

    // Apply specialty filters
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter((doctor) => selectedSpecialties.includes(doctor.specialty))
    }

    // Apply sorting
    if (sortBy) {
      if (sortBy === "fees") {
        filtered.sort((a, b) => a.fees - b.fees)
      } else if (sortBy === "experience") {
        filtered.sort((a, b) => b.experience - a.experience)
      }
    }

    setFilteredDoctors(filtered)
  }, [searchTerm, consultationType, selectedSpecialties, sortBy, doctors, loading])

  // Update URL with query params - separate from filtering logic
  const updateUrlParams = useRef(false)
  useEffect(() => {
    // Skip the first render to avoid conflicts with the URL param parsing
    if (!updateUrlParams.current) {
      updateUrlParams.current = true
      return
    }

    // Don't update URL while still loading
    if (loading) return

    // Create URL parameters
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    if (consultationType) params.set("consult", consultationType)
    if (selectedSpecialties.length > 0) params.set("specialties", selectedSpecialties.join(","))
    if (sortBy) params.set("sort", sortBy)

    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`

    // Use replace instead of push to avoid adding to history stack
    router.replace(newUrl, { scroll: false })
  }, [searchTerm, consultationType, selectedSpecialties, sortBy, loading, router])

  // Get unique specialties for filter options
  const specialties: string[] = [...new Set(doctors.map((doctor) => doctor.specialty as string))]

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleConsultationTypeChange = (type: string) => {
    setConsultationType(type === consultationType ? null : type)
  }

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty) ? prev.filter((s) => s !== specialty) : [...prev, specialty],
    )
  }

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption === sortBy ? null : sortOption)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Find a Doctor</h1>

        <div className="mb-6">
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} doctors={doctors} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel
              specialties={specialties}
              selectedSpecialties={selectedSpecialties}
              consultationType={consultationType}
              sortBy={sortBy}
              onConsultationTypeChange={handleConsultationTypeChange}
              onSpecialtyChange={handleSpecialtyChange}
              onSortChange={handleSortChange}
            />
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div
                className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">
                  No doctors found matching your criteria. Please try different filters.
                </span>
              </div>
            ) : (
              <DoctorList doctors={filteredDoctors} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
