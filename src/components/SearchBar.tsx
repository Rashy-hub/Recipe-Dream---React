// src/components/SearchBar.js

import { useState } from 'react'

interface SearchBarProps {
    onSearch: (query: string) => void
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('')

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        onSearch(query)
    }

    return (
        <form onSubmit={handleSearch} className=" mb-4 flex justify-center">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for recipes..."
                className="p-2 border border-gray-300 rounded-l w-64 text-neutral-950   "
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600">
                Search
            </button>
        </form>
    )
}

export default SearchBar
