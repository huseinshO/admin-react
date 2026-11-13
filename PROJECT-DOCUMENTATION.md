# Admin Dashboard – Project Documentation

## 1. Project Overview

This project is an Admin Dashboard built with React.js, React Router, and Bootstrap. It contains four routes: Dashboard, Users, Products, and Orders. The project uses sample data stored in the browser's `localStorage`; it does not connect to a backend or API.

## 2. Technologies

- **React.js:** builds the interface from reusable components.
- **React Router:** navigates between the four dashboard pages without reloading the whole website.
- **Bootstrap:** provides the responsive grid, tables, spacing, and common UI styling.
- **CSS:** customizes the appearance of the sidebar, navbar, cards, chart, and pages.
- **localStorage:** keeps the sample users, products, and orders in the same browser after refresh.
- **React Hooks:** `useState` stores changing data and `useEffect` performs side effects such as saving data.

## 3. Project Structure

```text
src/
├── components/
│   ├── Navbar.js
│   ├── Pagination.js
│   └── Sidebar.js
├── pages/
│   ├── Dashboard.js
│   ├── Users.js
│   ├── Products.js
│   └── Orders.js
├── styles/
│   ├── Dashboard.css
│   ├── Navbar.css
│   ├── Orders.css
│   ├── Pagination.css
│   ├── Products.css
│   ├── Sidebar.css
│   └── Users.css
├── App.js
├── App.css
├── index.js
└── index.css
PROJECT-DOCUMENTATION.md
```

## 4. Components and Pages

### App.js
- **Purpose:** Root component. Wraps the application in `BrowserRouter`, displays the Sidebar and Navbar, and chooses which page to display based on the URL.
- **Props:** None.
- **State:** No local state.
- **Usage:** The application entry point renders `<App />`. `Routes` contains `/`, `/users`, `/products`, and `/orders` routes.

### Sidebar.js
- **Purpose:** Displays the main navigation links.
- **Props:** None.
- **State:** No local state.
- **Usage:** Included once in `App.js`. `NavLink` from React Router marks the active route.

### Navbar.js
- **Purpose:** Displays the dashboard title, a search-field visual, administrator information, and a Logout button.
- **Props:** None.
- **State:** No local state.
- **Usage:** Included above the routed page content in `App.js`.
- **Logout note:** This is a front-end demonstration only. There is no authentication or server session, so the button displays a demo alert rather than signing out of a real account.

### Pagination.js
- **Purpose:** Reusable pagination controls with Previous, page numbers, and Next.
- **Props:** `currentPage` (currently selected page), `totalPages` (number of pages), and `onPageChange` (callback called with the selected page number).
- **State:** No internal state; the parent page owns the current page state.
- **Usage:** Users, Products, and Orders pass their page state and setter to this component.

### Dashboard.js
- **Purpose:** Shows summary statistic cards, an order-status bar chart, and the five most recent orders.
- **Props:** None.
- **State:** `users`, `products`, and `orders` are managed with `useState`. Initial values are read from `localStorage`.
- **Effects:** `useEffect` listens for the browser `storage` event so updates made in another browser tab can refresh the dashboard data.
- **Calculations:** Total Users, Total Products, and Total Orders use array `.length`. Revenue sums the `total` values for orders whose status is `Completed`.
- **Chart:** The bar chart counts Completed, Pending, and Cancelled orders and scales each bar relative to the largest count. It is built with React and CSS, so no chart library is required.
- **Usage:** Rendered at `/` by `App.js`.

### Users.js
- **Purpose:** Displays and manages the users list.
- **Props:** None.
- **State:** Holds the users array, search text, current pagination page, and form/modal values used by the add and edit flows.
- **Effects:** Saves the users array to `localStorage` whenever it changes and resets pagination when the search changes.
- **Features:** Client-side search, add, edit, delete, and pagination.
- **Usage:** Rendered at `/users`.

### Products.js
- **Purpose:** Displays and manages the products list.
- **Props:** None.
- **State:** Holds the products array, search text, current page, and form/modal values for adding and editing products.
- **Effects:** Saves product changes to `localStorage` and keeps pagination valid when filtering changes.
- **Features:** Client-side search, add, edit, delete, and pagination.
- **Usage:** Rendered at `/products`.

### Orders.js
- **Purpose:** Displays and manages customer orders.
- **Props:** None.
- **State:** Holds the orders array, search text, and current pagination page.
- **Effects:** Saves order changes to `localStorage`, resets the page after search changes, and keeps the selected page within the available page range.
- **Features:** Search by order ID, customer, or product; change order status; edit customer, product, and total using browser prompts; delete orders; and paginate results.
- **Usage:** Rendered at `/orders`.
- **Edit note:** The edit interaction uses browser prompts as a simple front-end-only demonstration. It validates the entered total and updates React state; no backend is involved.

## 5. Important React Concepts Used

### useState
`useState` stores values that can change while the user interacts with the application. For example, when a user is added, the users array changes and React renders the updated table.

### useEffect
`useEffect` runs side-effect code after rendering. In this project it is used to save arrays to `localStorage` and to register/clean up the Dashboard's `storage` event listener.

### Props
Props are values passed from a parent component to a child component. The Pagination component receives `currentPage`, `totalPages`, and `onPageChange` from each page.

### React Router
`BrowserRouter` enables client-side routing. `Routes` and `Route` map URLs to page components. `NavLink` creates navigation links in the Sidebar.

### localStorage
`localStorage.setItem(key, value)` stores a string in the browser. `JSON.stringify` converts arrays into strings before saving. `JSON.parse` converts the saved string back into JavaScript data when loading it.

### Search and Pagination
Search uses JavaScript array `.filter()` to find matching records. Pagination uses `.slice()` to display only the records for the selected page.

## 6. How to Run the Project

1. Open the complete React project folder (the folder containing `package.json`) in VS Code.
2. Open a terminal in that folder.
3. Run `npm install` if dependencies have not been installed yet.
4. Run `npm start`.
5. Open the local address shown by Create React App, usually `http://localhost:3000`.

The submitted source archive contains the `src` folder only, so keep it inside the original React project. The `package.json`, `public` folder, and other Create React App files are still required to run the complete application.

## 7. Testing Checklist

- [ ] Sidebar navigates to Dashboard, Users, Products, and Orders.
- [ ] Dashboard displays the correct counts from saved data.
- [ ] Dashboard chart reflects the order statuses.
- [ ] Users search, add, edit, delete, and pagination work.
- [ ] Products search, add, edit, delete, and pagination work.
- [ ] Orders search, edit, delete, status change, and pagination work.
- [ ] Refreshing the browser keeps saved sample data.
- [ ] Tables can scroll horizontally on small screens.
- [ ] Logout button displays its demo message.

## 8. Limitations

- This is a front-end coursework project; there is no backend, database, real authentication, or API.
- Data is stored in the current browser's `localStorage`, not shared between users or devices.
- The Navbar search field is visual; page-specific search is implemented inside the Users, Products, and Orders pages.
- Logout is a demo action because there is no login/session system.
