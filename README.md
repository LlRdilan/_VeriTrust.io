# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# VeriTrust App

## Overview
VeriTrust is a web application designed to provide digital identity services, including digital certificates, electronic signatures, and identity verification. The application allows users to manage their digital identity securely and efficiently.

## Features
- **User Registration**: Users can create an account to access services.
- **Login System**: Secure login for users to access their accounts.
- **Service Purchase**: Users can purchase digital identity services directly through the application.
- **Tutorials**: Educational resources to help users understand digital identity and its importance.
- **Client Testimonials**: Feedback from clients showcasing the effectiveness of the services.
- **Admin Panel**: An interface for administrators to manage services offered on the platform.
- **Contact Form**: Users can reach out for support or inquiries.

## Project Structure
```
veritrust-app
├── src
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   ├── pages
│   │   ├── Inicio.jsx
│   │   ├── Servicios.jsx
│   │   ├── Tutorial.jsx
│   │   ├── Registro.jsx
│   │   ├── Login.jsx
│   │   ├── Compra.jsx
│   │   ├── Clientes.jsx
│   │   ├── Nosotros.jsx
│   │   ├── Admin.jsx
│   │   └── Contactanos.jsx
│   ├── components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── CajaServicio.jsx
│   │   └── ui
│   │       └── Loader.jsx
├── package.json
├── .gitignore
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd veritrust-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
To start the development server, run:
```
npm run dev
```
This will launch the application in your default web browser at `http://localhost:5173`.

To build the application for production:
```
npm run build
```

To preview the production build:
```
npm run preview
```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.