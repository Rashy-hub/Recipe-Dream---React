### Recipe Dream

This project is a re-implementation in TypeScript of the **recipe dream** project originally created in React, incorporating modern libraries and tools.

## Features

### Core

-   **Explore Recipes**: Users can explore recipes from the public **spoonacular** API through the "Explorer" or "Home" pages.
-   **Add Recipes to My Recipes**: Logged-in users can add recipes from the Explorer to their "My Recipes" dashboard.
-   **Manually Add Recipes**: Users can manually add recipes to their dashboard. (WIP)

-   **Routing**: Utilizes **react-router** for navigation.
-   **Data Fetching Optimization**: Implements backend data fetching with **react-query** for efficiency.
-   **Enhanced Typing**: Utilizes **zod** schemas for improved type safety.
-   **Integration with** **react-hook-form**: For form handling and validation.

### Secondary

-   **Authentication Management**: Uses `useContext` for login, registration, and logout functionality.
-   **Dark Theme Management**: Managed using Zustand.
-   **UI Elements**: Includes loaders, spinners, react-icons, and modals.
