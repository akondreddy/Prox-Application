import {create} from 'zustand'

/* The purpose of this file is to manage data and pass information up and down through props
It is the state of the app at any moment
Everything needs to access a shared store and grab what they need directly */

/* Defining the shape of the store
query for what is typed in the search bar
selectedRetailer and selectedCategory for which filters are active, default is "All"
isLoading/isError controls which state to show
recentSearches loads from localStorage so searches are saved
addRecentSearch() keeps past 5 searches, no duplicates, saved to localStorage*/
type SearchStore = {
    query: string
    selectedRetailer: string
    selectedCategory: string
    isLoading: boolean
    isError: boolean
    recentSearches: string[]
    setQuery: (query: string) => void
    setRetailer: (retailer: string) => void
    setCategory: (category: string) => void
    setLoading: (loading: boolean) => void
    setError: (error: boolean) => void
    addRecentSearch: (query: string) => void
    clearRecentSearches: () => void
}

/* */
export const useSearchStore = create<SearchStore> ((set, get) => ({
    /* Default values for app when starting up, query is empty, retailer/category are all
    recentSearches will immedietaly check on startup if there was anything saved to localStorage
    The || statement says get recentSearches if it exists, otherwise start with an empty array*/
    query: '',
    selectedRetailer: 'All',
    selectedCategory: 'All',
    isLoading: false,
    isError: false,
    recentSearches: JSON.parse(localStorage.getItem('recentSearches')|| '[]'),

    /* Functions that update the store
    If the user types in the search bar, query updated, same for the rest */
    setQuery: (query) => set({query}),
    setRetailer: (retailer) => set({selectedRetailer: retailer}),
    setCategory: (category) => set({selectedCategory: category}),
    setLoading: (loading) => set({isLoading: loading}),
    setError: (error) => set({isError: error}),

    /* First if statement says if empty search, ignore
    ... is the spread operator, so we are putting the new search at the front then the old ones after*/
    addRecentSearch: (query) => {
        if(!query.trim()) return
        const current = get().recentSearches
        const updated = [query, ...current.filter(q => q !== query)].slice(0, 5)
        localStorage.setItem('recentSearches', JSON.stringify(updated))
        set({recentSearches: updated})
    },

    /* Wipes localStorage entry and the store at the same time */
    clearRecentSearches: () => {
        localStorage.removeItem('recentSearches')
        set({recentSearches: []})
    }
}))