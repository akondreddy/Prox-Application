# Prox Deals - Track C

Mobile grocery deals search experience for the Prox internship Step 2 assessment.

## Setup

```bash
# Clone the GitHub repo
git clone https://github.com/akondreddy/Prox-Application.git
cd Prox-Application

# Install dependencies
npm install 

# Run the dev server 
npm run dev

```

Open browser to `http://localhost:5173`

## Usage

```
- Search for grocery products/retailers using the search bar
- Filter results by retailers/categories by using the pill rows
- Tap the heart on any deal to save it
- Recent searches appear when tapping search bar, disappearing when clicking off of it
- Saved deals persist across sessions
```

## Tech Stack

```
React + TypeScript
Vite
Zustand
Custom CSS
```


## Project Structure

```
src/
  components/         UI Components
  hooks/              useDebounce, useAnalytics
  data/               Mock Products Data
  store/              Zustand Store
  styles.css          Global Styles
```

## Notes
See Writeup.md for full explanation of decisions, functions, and possible improvements.

## Demo
<video controls src="Demo.mov" title="Title"></video>