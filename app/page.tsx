"use client"

import { useState } from "react"
import IncidentList from "@/components/incident-list"
import NewIncidentForm from "@/components/new-incident-form"
import FilterControls from "@/components/filter-controls"
import type { Incident, Severity } from "@/types/incident"

export default function Dashboard() {
  // Initial mock data
  const initialIncidents: Incident[] = [
    {
      id: 1,
      title: "Biased Recommendation Algorithm",
      description:
        "Algorithm consistently favored certain demographics in job recommendations, leading to unequal opportunity distribution across different user groups. The bias was traced to training data that overrepresented specific population segments.",
      severity: "Medium",
      reported_at: "2025-03-15T10:00:00Z",
    },
    {
      id: 2,
      title: "LLM Hallucination in Critical Info",
      description:
        "LLM provided incorrect safety procedure information when queried about emergency protocols in a manufacturing setting. This could have led to dangerous situations if the information had been followed without verification.",
      severity: "High",
      reported_at: "2025-04-01T14:30:00Z",
    },
    {
      id: 3,
      title: "Minor Data Leak via Chatbot",
      description:
        "Chatbot inadvertently exposed non-sensitive user metadata in its responses. While no personally identifiable information was revealed, the incident highlighted a potential vulnerability in the system's data handling protocols.",
      severity: "Low",
      reported_at: "2025-03-20T09:15:00Z",
    },
    {
      id: 4,
      title: "Autonomous Vehicle Navigation Error",
      description:
        "AI navigation system in test vehicle misinterpreted road markings during heavy rain, causing the vehicle to briefly cross into the opposite lane. Safety driver intervened immediately and no collision occurred.",
      severity: "High",
      reported_at: "2025-03-25T16:45:00Z",
    },
    {
      id: 5,
      title: "Content Moderation False Positive",
      description:
        "AI content moderation system incorrectly flagged educational medical content as inappropriate, causing temporary removal of valuable health information from a public health platform.",
      severity: "Medium",
      reported_at: "2025-03-10T11:20:00Z",
    },
  ]

  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents)
  const [filterSeverity, setFilterSeverity] = useState<Severity | "All">("All")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const [showForm, setShowForm] = useState(false)

  // Filter incidents by severity
  const filteredIncidents = incidents.filter((incident) => {
    if (filterSeverity === "All") return true
    return incident.severity === filterSeverity
  })

  // Sort incidents by reported date
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime()
    const dateB = new Date(b.reported_at).getTime()
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  // Add new incident
  const handleAddIncident = (incident: Omit<Incident, "id">) => {
    const newIncident = {
      ...incident,
      id: Math.max(0, ...incidents.map((i) => i.id)) + 1,
    }
    setIncidents([...incidents, newIncident])
    setShowForm(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Safety Incident Dashboard</h1>
          <p className="text-gray-600">Monitor and report AI safety incidents to help build safer AI systems</p>
        </header>

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <FilterControls
            filterSeverity={filterSeverity}
            setFilterSeverity={setFilterSeverity}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center"
          >
            {showForm ? "Cancel" : "Report New Incident"}
          </button>
        </div>

        {showForm && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <NewIncidentForm onSubmit={handleAddIncident} />
          </div>
        )}

        <IncidentList incidents={sortedIncidents} />
      </div>
    </main>
  )
}
