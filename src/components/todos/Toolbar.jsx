"use client";

import Input from "../ui/Input";
import Select from "../ui/Select";
import { Search, SlidersHorizontal } from "lucide-react";

export default function Toolbar({
  search, setSearch,
  priority, setPriority,
  sortKey, setSortKey,
  sortDir, setSortDir
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search tasks..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center text-slate-500 dark:text-slate-400">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          <span className="text-sm">Filters</span>
        </div>
        <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="all">All priorities</option>
          <option value="high">High only</option>
          <option value="medium">Medium only</option>
          <option value="low">Low only</option>
        </Select>
        <Select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="order">Manual order</option>
          <option value="dueDate">Due date</option>
          <option value="priority">Priority</option>
          <option value="createdAt">Created</option>
        </Select>
        <Select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </Select>
      </div>
    </div>
  );
}