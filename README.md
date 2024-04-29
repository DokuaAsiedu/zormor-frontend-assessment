This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview

This is a simple project for a UI that allows users to add and view information about any place/location.

## Getting Started

To run this project, type in your terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result to view the homepage.

This project has 3 main features:

- A homepage for viewing all locations already in the database.

- An add-place page that allows users to submit data relating to a new location they want added to the database. This page can be navigated to by clicking on the "Add Place" button or by typing: [http://localhost:3000/add-place](http://localhost:3000/add-place)

- A search component that can be overlayed on any page and filters locations by name which match the search query. This component is opened when you click the magnifying glass on the navigation bar

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Implementation

Since this is a purely fronted approach to this project, web storage is being relied upon for the database location. More specifically, indedexedDB is the web storage being used.

When the site first loads, dummy data from the `data/places.ts` file is fed into indexedDB and then loaded into the state object of the `<PlacesProvider>` component in `providers/db-provider.tsx`. The file is used as a context wrapper for the whole app so that the database can be accessible from anywhere in the app.
