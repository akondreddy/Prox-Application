/* Point of this file is to log to the console so we can see events firing 
Why are we using a hook instead of a function? 
A regular function has no connection to React, can be called anywhere 
A React hook can use React's internal systems, like state, lifecycle, and counter
Must start with use and also can only be called in React components or hooks, not regular functions */

/* These are the types of AnalyticsEvents that are possible 
TypeScript detects when you make typos */
type AnalyticsEvent =
| 'search_submitted'
| 'filter_applied'
| 'deal_viewed'
| 'retailer_clicked'
| 'recent_search_tapped'
| 'error_retry'

type EventProperties = {
    [key: string]: string | number | boolean
}

/* Function that returns another function called track
? after properties means optional
'[Analytics] ${event}' is a template literal, backticks allow embedding variables in string
If no properties are passed, log {}, an empty object */
export function useAnalytics() {
    const track = (event: AnalyticsEvent, properties?: EventProperties) => {
        console.log('[Analytics] ${event}', properties || {})
    }

    return {track}
}
