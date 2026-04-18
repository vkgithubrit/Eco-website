# Responsive E-commerce Product Explorer

## Project Overview
This is a clean, responsive, and user-focused e-commerce frontend application built as an evaluation task for the SDE-1 (Frontend) role at Anotech India Solutions. The application allows users to browse products, search by title, filter by category, view product details, and manage a persistent shopping cart. 

## Tech Stack
*   **Framework**: React 18 with Vite
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **State Management**: Zustand
*   **Routing**: React Router DOM
*   **API Requests**: Axios
*   **Animations**: Framer Motion
*   **Icons**: Lucide React

## Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd Anotech
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## Features Implemented (As per Requirements)

*   **Authentication**: 
    *   Basic mock login that stores the user session in `localStorage`. 
    *   Protects main routes (Home, Cart, Details) from unauthenticated access using a `<ProtectedRoute>` wrapper.
*   **Product Browsing**: 
    *   Fetches and displays products from `https://fakestoreapi.com/products`.
    *   Responsive layout for Mobile, Tablet, and Desktop.
*   **Search & Filtering**: 
    *   Search products by title with a **500ms debounce** to prevent excessive filtering operations.
    *   Filter products by category dynamically fetched from `https://fakestoreapi.com/products/categories`.
*   **Product Details**: 
    *   Dedicated page for viewing in-depth information about a single product.
    *   Clear "Add to Cart" interaction with visual feedback.
*   **Cart Management**: 
    *   Add items to the cart, update item quantities, or remove items.
    *   Dynamic calculation of subtotal, estimated tax, and total.
    *   Cart state **persists** across page reloads using Zustand's `persist` middleware (`localStorage`).
*   **Data Handling (Pagination)**:
    *   Client-side pagination is implemented on the Home page (8 items per page) to ensure smooth performance and prevent DOM overload.
*   **API Handling (Service Layer)**:
    *   All API logic is centralized in `src/services/api.ts` using Axios.
    *   Implemented proper loading, error, and empty states across the application. Added timeouts to prevent infinite hanging.
*   **Performance & UI Enhancements**:
    *   **Code Splitting**: Route-level components are lazily loaded (`React.lazy` and `Suspense`) to minimize the initial JS bundle.
    *   **Subtle Animations (Framer Motion)**: Clean page transitions, staggered entrance for product cards, and smooth list animations in the cart.

## Project Structure
A clean and maintainable folder structure:
```text
/src
  /components     # Reusable UI components (Navbar, ProductCard)
  /pages          # Route-level components (Home, Login, Cart, ProductDetails)
  /services       # API configuration and service functions (api.ts)
  /store          # Zustand state stores (authStore.ts, cartStore.ts)
  App.tsx         # Application routing and layout setup
  main.tsx        # React entry point
```

## Key Decisions & Assumptions

*   **State Management (Zustand)**: I chose Zustand over Redux Toolkit or the Context API because it offers a much simpler, hook-based API with zero boilerplate. It also provides a built-in `persist` middleware which made implementing `localStorage` syncing for both the Cart and Authentication incredibly seamless.
*   **Styling (Tailwind CSS)**: Used for fast, utility-first styling. It helps maintain a clean architecture by keeping styles close to the components and makes responsive design highly intuitive without writing complex media queries. Focus was placed on standard spacing, clear alignment, and avoiding "glowing/moving" chaotic animations per the instructions.
*   **API Service Layer**: Created a dedicated `src/services/api.ts` file using Axios. This centralizes all API logic, making it easier to manage endpoints, avoids cluttering UI components with `fetch` logic, and handles type enforcement.
*   **Pagination over Infinite Scroll**: Given that the FakeStore API returns a relatively small static array, client-side pagination was chosen as a clean, predictable, and fully functional way to handle data mapping without over-engineering an Intersection Observer.
*   **Mock Authentication**: As per the requirements, no backend validation is expected. The login simply creates a simulated user session in `localStorage` allowing the user to access the core application routes. Attempting to navigate directly to `/` unauthenticated will gracefully redirect the user to `/login`.# Eco-website
