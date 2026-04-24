# Hero Dex

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Description

**Hero Dex** is a superhero encyclopedia web application that lets you browse, filter, and explore hundreds of characters from the most iconic comic book publishers — Marvel Comics, DC Comics, Dark Horse Comics, and more.

### Authentication

Before accessing any hero content, users must authenticate. Hero Dex supports two sign-in methods: email and password, and Google Sign-In via Firebase Authentication. New users can create an account through the registration form. Once authenticated, the session is persisted so users are not required to log in again on every visit. If authentication fails for any reason, an error alert appears automatically and dismisses itself after a few seconds without any user interaction.

### Home — Browse by Publisher

The main page of the application presents the full hero roster fetched in real time from the [Superhero API](https://akabab.github.io/superhero-api/). Heroes are displayed as cards showing the hero's image, name, slug, publisher, and full name. The list loads incrementally — only a fixed number of cards are shown at first, and a "Show More" button lets users progressively reveal more without leaving the page.

A dropdown selector at the top of the page allows filtering the entire roster by publisher. Selecting "Marvel Comics" instantly narrows the list to Marvel characters only; selecting "DC Comics" shows DC characters; selecting "All" restores the complete roster. The selected publisher is reflected in the URL query string (`?q=Publisher+Name`), so filtered views are bookmarkable and shareable.

### Search — Find by Hero Name

The search page provides a dedicated free-text search experience. Users type any part of a hero's name into the input field and submit the form. The results update immediately to show all matching heroes as cards. If no hero matches the query, a clear "not found" message is displayed. If the search field is empty, a prompt guides the user to enter a name. The search term is also kept in the URL (`?q=name`), so results pages can be bookmarked or shared directly.

### Hero Detail Page

Each hero card contains a "Learn More" link that navigates to a dedicated detail page for that character. The detail page presents the full data set available for the hero, organized into the following sections:

- **PowerStats** — Intelligence, Strength, Speed, Durability, Power, and Combat ratings.
- **Appearance** — Gender, Race, Height, Weight, Eye color, and Hair color.
- **Biography** — Full name, Alter egos, Aliases, Place of birth, First appearance, Publisher, and Alignment (good/bad/neutral).
- **Work** — Occupation and base of operations.
- **Connections** — Group affiliations and known relatives.

Both a large background image and a smaller portrait of the hero are displayed on this page. A "Back" button allows returning to the previous page without losing the current filter or search context. If a hero ID in the URL does not match any character in the dataset, the application redirects automatically to the home page.

### Navigation

A persistent navigation bar is available across all authenticated pages. It provides direct links to the Home page, the Marvel Comics filter, the DC Comics filter, and the Search page. The bar also displays the logged-in user's display name and a logout button. On smaller screens the navigation collapses into a sidebar that can be toggled with a menu button.

## Technologies used

1. React JS
2. TypeScript
3. Vite
4. HTML5
5. CSS3
6. Firebase

## Libraries used

#### Dependencies

```
"animate.css": "^4.1.1"
"axios": "^1.7.9"
"firebase": "^12.3.0"
"query-string": "^7.1.1"
"react": "^19.2.4"
"react-dom": "^19.2.4"
"react-icons": "^4.4.0"
"react-router-dom": "7.13.2"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/hero-dex`](https://www.diegolibonati.com.ar/#/project/hero-dex)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Known Issues

None at the moment.
