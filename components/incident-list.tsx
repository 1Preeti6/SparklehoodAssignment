"use client"

import { useState } from "react"
import type { Incident } from "@/types/incident"
import IncidentCard from "./incident-card"

interface IncidentListProps {
  incidents: Incident[]
}

export default function IncidentList({ incidents }: IncidentListProps) {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set())

  const toggleExpanded = (id: number) => {
    const newExpandedIds = new Set(expandedIds)
    if (newExpandedIds.has(id)) {
      newExpandedIds.delete(id)
    } else {
      newExpandedIds.add(id)
    }
    setExpandedIds(newExpandedIds)
  }

  if (incidents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No incidents found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <IncidentCard
          key={incident.id}
          incident={incident}
          isExpanded={expandedIds.has(incident.id)}
          onToggleExpand={() => toggleExpanded(incident.id)}
        />
      ))}
    </div>
  )
}
