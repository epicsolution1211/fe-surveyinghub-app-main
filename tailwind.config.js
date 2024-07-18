const sharedConfig = require('@surveying-hub-bv/fe-component-library/tailwind.config.js');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@surveying-hub-bv/fe-component-library/dist/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [sharedConfig],
  theme: {
    extend: {
      screens: {
        'clg1450': {'max': '1450px'},
        'cxl': {'max': '1280px'},
      },
    },
},
  plugins: [],
}
