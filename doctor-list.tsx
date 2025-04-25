import type { Doctor } from "@/types/doctor"
import DoctorCard from "./doctor-card"

interface DoctorListProps {
  doctors: Doctor[]
}

export default function DoctorList({ doctors }: DoctorListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 animate-fadeIn">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  )
}
