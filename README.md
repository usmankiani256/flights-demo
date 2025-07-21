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
# Supabase Configuration
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here

# RapidAPI Configuration (Optional - only needed if using real API)
X_RAPIDAPI_KEY=your_rapidapi_key_here
X_RAPIDAPI_HOST=sky-scrapper.p.rapidapi.com

# Development Mode - Set to 'true' to use mock data and avoid CAPTCHA issues
MOCK_DATA=true
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

## Development Mode

### Using Mock Data (Recommended)

The app is configured to use mock data by default to avoid API limitations and CAPTCHA challenges:

```bash
# In your .env file
MOCK_DATA=true
```

### Using Real API

To use the real flight search API:

1. Get API credentials from [RapidAPI](https://rapidapi.com/apiheya/api/sky-scrapper)
2. Set environment variables:

```bash
MOCK_DATA=false
X_RAPIDAPI_KEY=your_actual_key
X_RAPIDAPI_HOST=sky-scrapper.p.rapidapi.com
```

⚠️ **Note**: The real API uses bot protection that may trigger CAPTCHA challenges.

## Troubleshooting

### CAPTCHA/Bot Protection Issues

If you see errors like:

```json
{
  "status": false,
  "message": {
    "action": "captcha"
  }
}
```

**Solutions:**

1. **Use Mock Data** (Recommended): Set `MOCK_DATA=true` in your `.env` file
2. **Check Console**: Look for warnings about CAPTCHA detection in your logs

### Common Issues

- **"API error occurred"**: Usually means rate limiting or bot protection - app will fall back to mock data
- **Missing environment variables**: Make sure your `.env` file has all required variables
- **Build errors**: Run `yarn install` and `cd ios && pod install` to ensure dependencies are up to date
