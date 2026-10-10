# Sebflix

Sebflix is a movie-browsing web app built with React and Vite. Search for movie titles, sort matching results, and open a movie to see its details and ratings.

## Features

- Search movies by title.
- Sort results alphabetically or by IMDb rating.
- View movie details, including the plot, cast, credits, and available ratings.
- Show a randomly selected movie poster on the home page.
- Display a fallback when a movie poster is unavailable.

## Requirements

- Node.js and npm
- An [OMDb API key](https://www.omdbapi.com/apikey.aspx)
- A [RapidAPI key](https://rapidapi.com/) with access to the [Random Movie API](https://rapidapi.com/sathishluvsatz/api/random-movie-api2) for the home-page poster feature

## Getting started

1. Clone the repository and open its directory:

   ```sh
   git clone https://github.com/seb-giraldo/sebflix.git
   cd sebflix
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the project root and add your API keys:

   ```env
   VITE_API_KEY=your_omdb_api_key
   VITE_RANDOM_KEY=your_rapidapi_key
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

   Open the local URL printed by Vite in your browser.

The app uses OMDb for title searches and movie details. The home page also uses Random Movie API through RapidAPI to select a movie whose poster is fetched from OMDb.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the app for production in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |

## Routes

| Route | Description |
| --- | --- |
| `/` | Home page with a randomly selected movie poster. |
| `/results?search_query=<title>` | Search results for the supplied title. |
| `/movie/:imdbId` | Details for a movie identified by its IMDb ID. |

Use the search field in the navigation bar to start a search. Select a result to open its detail page.

## Project structure

```text
src/
├── Components/   # Navigation, footer, and rating helpers
├── Pages/        # Home, search results, and movie detail pages
├── assets/       # Local images and sample movie data
├── App.jsx       # Routes and shared page layout
└── main.jsx      # React application entry point
public/           # Images used throughout the app
```

## Notes

- `VITE_` environment variables are included in client-side code by Vite. Do not use privileged or secret credentials in this app; restrict API keys with the providers' available usage limits and restrictions.
- Searches and movie details depend on OMDb availability and its API limits. The randomly selected home-page poster also depends on the Random Movie API.
- Favorites and Contact are currently non-functional navigation items.
