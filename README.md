# Weather App

Animated weather application built with React, TypeScript, and Vite.

The app provides:
- city search with autocomplete
- current weather + hourly forecast
- English/Ukrainian language switch
- dynamic background based on weather condition and time of day
- recently viewed locations saved in local storage

## Demo Flow

1. Open `/` and search for a city.
2. Select one autocomplete option.
3. Navigate to `/weatherIn/:city`.
4. See current metrics, hourly timeline, and weather-based background scene.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- React Router
- Redux Toolkit + RTK Query
- TanStack Query
- React Hook Form + Zod
- MUI + Tailwind CSS
- GSAP animations
- Day.js

## Data Sources

- Weather data: WeatherAPI
- Autocomplete geocoding: Geoapify

## Project Structure

```text
src/
  components/      # UI components (search, cards, loader, transitions)
  pages/           # Route-level pages
  store/           # Redux store, slices, RTK Query service
  queryOptions/    # TanStack Query options for WeatherAPI
  constants/       # Context + weather/background mapping
  schemas/         # API response typing/validation schema
  utils/           # Helper functions
```

## Routing

- `/` -> Main search page
- `/weatherIn/:city` -> Weather details page

## Key Features

- Smooth page transitions using GSAP slice animations
- Responsive search input behavior by viewport size
- Scrollable hourly forecast section with wheel-to-horizontal scroll
- "Recently Viewed" list with one-click navigation and clear-all action
- 404 error page for unknown routes

## Notes

- Path aliases use `#` prefix (example: `#components`, `#store`).
- Tailwind and MUI are used together in the UI layer.
- Weather condition strings are mapped to local image sets in `public/images/*`.
