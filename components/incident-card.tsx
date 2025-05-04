"use client"

import type { Incident } from "@/types/incident"

interface IncidentCardProps {
  incident: Incident
  isExpanded: boolean
  onToggleExpand: () => void
}

export default function IncidentCard({ incident, isExpanded, onToggleExpand }: IncidentCardProps) {
  // Format the date
  const formattedDate = new Date(incident.reported_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  // Get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-yellow-100 text-yellow-800"
      case "Medium":
        return "bg-orange-100 text-orange-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{incident.title}</h3>
            <div className="flex items-center gap-3 mt-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}
              >
                {incident.severity}
              </span>
              <span className="text-sm text-gray-500">{formattedDate}</span>
            </div>
          </div>
          <button
            onClick={onToggleExpand}
            className="text-rose-600 hover:text-rose-800 text-sm font-medium transition-colors self-start sm:self-center"
          >
            {isExpanded ? "Hide Details" : "View Details"}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Description:</h4>
            <p className="text-gray-600">{incident.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
