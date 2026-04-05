# HeroesApp

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

I made a web application with React JS with Firebase for user authentication since this application has a login and a register. Also once we log in with an account or with google we can see in the main section different types of heroes and each hero we can see a mini chart with his name, his publisher, a description and a button to access more information about that hero. In addition this APP has a search through the browser bar which will search for the publisher and bring all the heroes of that specific publisher. It also has a search section where we can search by the name of our favorite hero.

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

[`https://www.diegolibonati.com.ar/#/project/HeroesApp`](https://www.diegolibonati.com.ar/#/project/HeroesApp)

## Video

https://user-images.githubusercontent.com/99032604/199866773-473a153c-375e-4b05-b9d6-d01b0728149b.mp4

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
