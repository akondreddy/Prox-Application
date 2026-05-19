# Track C Write-up 

## UX Decisions

**Debouncing at 400ms for the search and 1000ms for recent searches**
Search results update quickly so the app feels responsive
Recent searches save at 1000ms so that complete descriptions are saved rather than incomplete thoughts

**Recent searches on focus only**
Recent searches appear only when the search bar is tapped and disappear when the
user taps away. This keeps the default view clean while still surfacing past
searches at the right moment.

**Skeleton Loading over spinner**
Skeltons match the dimensions of the product cards so layout doesn't shift when the content loads. 
Spinners leave the screen blank, feeling slower even if load time is identical

**Two filters - retailer and category**
Pills were chosen to decide the retailer or category as it lets the user see all of the options at once
without requiring any taps. Having a simple, low input count app on mobile seems optimal and user-friendly. 

**Empty state with context-aware messaging**
If the user searches something that doesn't display any results, then they get a message that shows what they searched.
If nothing is typed, they are prompted to do so. Simply "no results" would appear as though the users input
was not considered in the search.

**Sticky header**
Search bar stays visible at all times, allowing scrolling without removing the search feature.
Having the option to search, regardless of scrolling time, allows for seemless use.

**44px minimum tap targets**
By Apple's Human Interface Guideline, each button follows a 44px minimum tap size, allowing for taps to register
and users to not get frustrated with extremely demanding inputs.  

---

## State Management Decisions

**Zustand over useState**
Multiple components need access to the same state, whether it be the query, the active filters, loading state, or
recent searches. Passing all of this through props would have created deeply nested prop chains.
Zustand gives direct access to a shared state without boilerplate.

**localStorage for Persistance**
Recent searches and saved deals are both persisted through localStorage, allowing for saved data even on refresh.
Zustand store loads localStorage on startup, so user has their context restored immediately. 

**Saved deals saved as array of IDs**
Rather than storing the full product objects, we simply store the ID. This keeps localStorage to a minimum, making the 
saved check a simple array lookup.

---

## Performance Considerations

**useMemo for filtering**
The product filter runs inside useMemo and only recalculates when the query or
filters actually change. Without this, it would re-run on every render, including
renders triggered by unrelated state changes.

**Two debounce delays**
Search fires at 400ms to feel fast. Recent searches save at 1000ms to avoid storing
incomplete words. This separation means the filtering is responsive while the
persistence is accurate. Respecting the users device while maintaing seamlessness
is makes for good design and implementation.

**Simulated loading delay**
An 800ms delay simulates a real API call and makes the skeleton loading state
visible. In production this would be replaced with a real fetch call and the
skeleton would show until the response resolves.

---

## Analytics Events

| Event | Where it fires | What it tells you |
|---|---|---|
| search_submitted | SearchBar, 400ms debounce | What users are searching for |
| filter_applied | FilterBar, on pill tap | Which retailers and categories matter most |
| deal_viewed | ProductCard, on save tap | Which deals get the most engagement |
| recent_search_tapped | RecentSearches, on item tap | How often users repeat searches |
| error_retry | ErrorState, on retry tap | How often users hit errors and recover |

**What these reveal for Prox**
If search_submitted shows "chicken" and "milk" dominating, Prox should prioritize
surfacing deals for those products. If filter_applied shows 80% of taps going to
Walmart, that retailer relationship is most valuable to users.

---

## Possible Improvements Given Time

**Real API integration**
Replace mock data with real Prox API calls. Add proper error handling for network
failures, timeouts, and empty responses.

**Saved deals screen**
A dedicated screen showing all saved deals, accessible from a bottom navigation
bar. Right now saved state is tracked but there is no way to view saved items
together.

**Price history**
Show a small sparkline chart on each product card showing how the price has changed
over time. This is core to Prox's value proposition — showing users they are
getting a genuinely good deal.

**Push notifications**
Alert users when a saved deal drops in price. This drives re-engagement and is
directly tied to Prox's core mission of saving users money.
