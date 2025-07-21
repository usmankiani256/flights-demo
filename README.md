# Flight Search App

A React Native flight search application with airport search, flight results, and booking capabilities.

## Features

- **Airport Search**: Search for airports and cities with autocomplete
- **Flight Search**: Search for one-way or round-trip flights
- **Flight Results**: View detailed flight information including:
  - Airline logos and flight numbers
  - Departure and arrival times
  - Layover information
  - Fare policies (changeable, refundable, flexible)
  - Price and eco-friendly indicators
- **Authentication**: User sign-up and login with Supabase
- **Date Selection**: Choose departure and return dates
- **Passenger Selection**: Select number of passengers

## Setup

1. Install dependencies:

```bash
yarn install
```

2. Set up environment variables in `.env`:

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
X_RAPIDAPI_KEY=your_rapidapi_key
X_RAPIDAPI_HOST=sky-scrapper.p.rapidapi.com
```

3. Install iOS dependencies:

```bash
cd ios && pod install
```

4. Run the app:

```bash
# iOS
yarn ios

# Android
yarn android
```

## Tech Stack

- React Native
- TypeScript
- React Navigation
- Supabase (Authentication)
- React Native Vector Icons
- React Native Date Picker

## Project Structure

```
src/
├── api/           # API services and mock data
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── interfaces/    # TypeScript interfaces
├── navigation/    # Navigation configuration
├── screens/       # Screen components
├── theme/         # App theme and styling
└── utils/         # Utility functions
```
