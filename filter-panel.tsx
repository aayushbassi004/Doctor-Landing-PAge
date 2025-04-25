"use client"

interface FilterPanelProps {
  specialties: string[]
  selectedSpecialties: string[]
  consultationType: string | null
  sortBy: string | null
  onConsultationTypeChange: (type: string) => void
  onSpecialtyChange: (specialty: string) => void
  onSortChange: (sortOption: string) => void
}

export default function FilterPanel({
  specialties,
  selectedSpecialties,
  consultationType,
  sortBy,
  onConsultationTypeChange,
  onSpecialtyChange,
  onSortChange,
}: FilterPanelProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6 sticky top-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>

      {/* Consultation Type Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-700">Consultation Type</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="video"
              name="consultationType"
              checked={consultationType === "Video Consult"}
              onChange={() => onConsultationTypeChange("Video Consult")}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="video" className="text-sm text-gray-700">
              Video Consult
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="clinic"
              name="consultationType"
              checked={consultationType === "In Clinic"}
              onChange={() => onConsultationTypeChange("In Clinic")}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="clinic" className="text-sm text-gray-700">
              In Clinic
            </label>
          </div>
        </div>
      </div>

      {/* Specialty Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-700">Specialty</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={specialty}
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => onSpecialtyChange(specialty)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
              />
              <label htmlFor={specialty} className="text-sm text-gray-700">
                {specialty}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-700">Sort By</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="fees"
              name="sortBy"
              checked={sortBy === "fees"}
              onChange={() => onSortChange("fees")}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="fees" className="text-sm text-gray-700">
              Fees (Low to High)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="experience"
              name="sortBy"
              checked={sortBy === "experience"}
              onChange={() => onSortChange("experience")}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="experience" className="text-sm text-gray-700">
              Experience (High to Low)
            </label>
          </div>
        </div>
      </div>

      {/* Clear All Filters Button */}
      <button
        onClick={() => {
          if (consultationType) onConsultationTypeChange("")
          if (selectedSpecialties.length > 0) {
            // Clear all specialties at once
            selectedSpecialties.slice().forEach((s) => onSpecialtyChange(s))
          }
          if (sortBy) onSortChange("")
        }}
        className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors duration-200 text-sm font-medium"
      >
        Clear All Filters
      </button>
    </div>
  )
}
