/* TSX files are TypeScript + JSX. This lets us write HTML-like code inside the TypeScript file */
import { useSearchStore } from "../store/useSearchStore";
import { useAnalytics } from "../hooks/useAnalytics";
import { useDebounce } from "../hooks/useDebounce";
import { useEffect } from "react";

/* SearchBar() will handle the searching
It will read and write to Zustand store directly
The debouncing that we implemented prevents search on every keystroke */
export function SearchBar() {
    const {query, setQuery, addRecentSearch } = useSearchStore()
    const {track} = useAnalytics()
    const debouncedQuery = useDebounce(query, 400)

    /* React hook that says run code when something changes
    In this case, that something is the debouncedQuery
    Once the user types and stops for 400ms, then it updates and useEffect() checks that
    trim() removes whitespace
    */
    useEffect(() => {
        if(debouncedQuery.trim()) {
            track('search_submitted', {query: debouncedQuery})
            addRecentSearch(debouncedQuery)
        }
    }, [debouncedQuery])

    /* This is what is rendered on the screen
    Defines our className, type, placeholder
    value={query} links input to the store, what's in query shows in the box
    onChange fires when user types character, e is the event, .target is the input element, 
    and .value is the current full text */
    return (
        <input
            className="search-input"
            type='text'
            placeholder='Search grocery deals...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}