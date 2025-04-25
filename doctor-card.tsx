import React from "react"
import { Video, MapPin, Star } from "lucide-react"
import type { Doctor } from "@/types/doctor"

interface DoctorCardProps {
  doctor: Doctor
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 transition-transform duration-300">
      <div className="p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <div className="w-24 h-24 rounded-full bg-purple-100 mx-auto md:mx-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-600">{doctor.name.charAt(0)}</span>
            </div>
          </div>

          <div className="md:w-3/4">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
                <p className="text-gray-600">{doctor.specialty}</p>
                <div className="flex items-center mt-1">
                  <span className="flex items-center text-yellow-500 mr-2">
                    <Star size={16} className="fill-current" />
                    <span className="ml-1 text-sm">{doctor.rating}</span>
                  </span>
                  <span className="text-sm text-gray-500">{doctor.experience} years experience</span>
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                <p className="text-xl font-bold text-purple-600">₹{doctor.fees}</p>
                <p className="text-sm text-gray-500">Consultation Fee</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center text-gray-600 mb-2">
                {doctor.consultationType === "Video Consult" ? (
                  <Video size={16} className="mr-2 text-green-500" />
                ) : (
                  <MapPin size={16} className="mr-2 text-blue-500" />
                )}
                <span className="text-sm">{doctor.consultationType}</span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">
                {doctor.description ||
                  "Experienced healthcare professional dedicated to providing quality care and personalized treatment plans for patients."}
              </p>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 text-sm font-medium">
                Book Appointment
              </button>
              <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors duration-200 text-sm font-medium">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
