"use client"

import type React from "react"

import { useState } from "react"
import type { Incident, Severity } from "@/types/incident"

interface NewIncidentFormProps {
  onSubmit: (incident: Omit<Incident, "id">) => void
}

export default function NewIncidentForm({ onSubmit }: NewIncidentFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [severity, setSeverity] = useState<Severity>("Medium")
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: { title?: string; description?: string } = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!description.trim()) {
      newErrors.description = "Description is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Clear errors
    setErrors({})

    // Create new incident
    const newIncident: Omit<Incident, "id"> = {
      title: title.trim(),
      description: description.trim(),
      severity,
      reported_at: new Date().toISOString(),
    }

    onSubmit(newIncident)

    // Reset form
    setTitle("")
    setDescription("")
    setSeverity("Medium")
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Report New Incident</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-3 py-2 border ${
            errors.title ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500`}
          placeholder="Brief title describing the incident"
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500`}
          placeholder="Detailed description of what happened"
        />
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
          Severity Level
        </label>
        <div className="flex flex-wrap gap-4">
          {["Low", "Medium", "High"].map((level) => (
            <label key={level} className="inline-flex items-center">
              <input
                type="radio"
                name="severity"
                value={level}
                checked={severity === level}
                onChange={() => setSeverity(level as Severity)}
                className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Submit Incident Report
        </button>
      </div>
    </form>
  )
}
