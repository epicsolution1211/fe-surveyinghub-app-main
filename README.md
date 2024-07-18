# Frontend GNSS App
A frontend application utilizing the fe-component-library component library with shared Tailwind CSS configuration.

### Table of Contents
* [Introduction](#introduction)
* [Installation](#installation)
* [Usage](#usage)
* [Development](#development)
* [Using Shared Tailwind Config](#using-shared-tailwind-config)

### Introduction
The fe-gnss-app is a frontend application built with React and TypeScript, leveraging reusable components from the fe-component-library. The project also shares the Tailwind CSS configuration from the component library to maintain consistent styling.

### Installation
#### Prerequisites
Ensure you have the following installed:
* Node.js
* npm or yarn

#### Steps
1 Clone the repository:
``` bash
git clone https://github.com/your-org/fe-gnss-app.git
cd fe-gnss-app
```
2. Install dependencies:
``` bash
npm install
```
3. Link the fe-component-library (if developing locally):
* Navigate to your fe-component-library directory and run:
``` bash

cd path/to/fe-component-library
npm link
```
* Navigate back to fe-gnss-app and run:
``` bash
cd path/to/fe-gnss-app
npm link @surveying-hub-bv/fe-component-library
```
* Navigate back to fe-component-library and run:
``` bash
cd path/to/fe-component-library
npm link ../fe-gnss-app/node_modules/react
```
4. Install peer dependencies:
``` bash
npm install react react-dom
```

### Usage
To run the application locally:
```bash
npm start
```
Navigate to http://localhost:3000 to see the application in action.

### Development
#### Building the Application
To build the application for production:
``` bash
npm run build
```
#### Watching for Changes
To automatically rebuild the application on changes:
``` bash
npm run watch
```
### Using Shared Tailwind Config
#### Configuration Steps
1. Ensure the fe-component-library is linked or installed in your fe-gnss-app project.
2. Update tailwind.config.js in fe-gnss-app to extend or use the configuration from fe-component-library:
``` js
const feComponentLibraryConfig = require('fe-component-library/tailwind.config.js');

module.exports = {
    presets: [feComponentLibraryConfig],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/fe-component-library/dist/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
```
3. Ensure postcss.config.js is set up to use Tailwind CSS:
``` js
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
}
```
4. Import Tailwind CSS in your src/index.css:
``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
