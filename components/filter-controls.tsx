"use client"

import type { Severity } from "@/types/incident"

interface FilterControlsProps {
  filterSeverity: Severity | "All"
  setFilterSeverity: (severity: Severity | "All") => void
  sortOrder: "newest" | "oldest"
  setSortOrder: (order: "newest" | "oldest") => void
}

export default function FilterControls({
  filterSeverity,
  setFilterSeverity,
  sortOrder,
  setSortOrder,
}: FilterControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div>
        <label htmlFor="severity-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Severity
        </label>
        <select
          id="severity-filter"
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value as Severity | "All")}
          className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
        >
          <option value="All">All Severities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div>
        <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700 mb-1">
          Sort by Date
        </label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
          className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  )
}
