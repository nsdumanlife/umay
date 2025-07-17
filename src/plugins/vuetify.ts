import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#f7e8d3', // --light-cream
    surface: '#fdfaf6', // --cream-soft
    'surface-bright': '#ffffff', // --white
    'surface-light': '#f1e3d0', // --cream-muted
    'surface-variant': '#3a506b', // --mid-blue
    'on-surface-variant': '#f3f6f9', // --mist-white
    primary: '#137dc5', // --blue
    'primary-darken-1': '#112d4e', // --deep-navy
    secondary: '#3a506b', // --mid-blue
    'secondary-darken-1': '#2b3443', // --charcoal-blue
    error: '#B00020',
    info: '#b4d5f0', // --blue-light
    success: '#4CAF50',
    warning: '#facf39', // --butter-yellow
  },
  variables: {
    'border-color': '#112d4e',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#112d4e',
    'theme-on-kbd': '#ffffff',
    'theme-code': '#f1e3d0',
    'theme-on-code': '#112d4e',
  },
}

const myCustomDarkTheme = {
  dark: true,
  colors: {
    background: '#0f172a', // --dark-navy
    surface: '#1e293b', // --dark-navy-soft
    'surface-bright': '#334155', // --dark-navy-muted
    'surface-light': '#2b3443', // --charcoal-blue
    'surface-variant': '#3a506b', // --mid-blue
    'on-surface-variant': '#f3f6f9', // --mist-white
    primary: '#137dc5', // --blue
    'primary-darken-1': '#0f172a', // --dark-navy
    secondary: '#3a506b', // --mid-blue
    'secondary-darken-1': '#334155', // --dark-navy-muted
    error: '#CF6679',
    info: '#b4d5f0', // --blue-light
    success: '#4CAF50',
    warning: '#facf39', // --butter-yellow
  },
  variables: {
    'border-color': '#ffffff',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#ffffff',
    'theme-on-kbd': '#0f172a',
    'theme-code': '#1e293b',
    'theme-on-code': '#ffffff',
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomDarkTheme',
    themes: {
      myCustomLightTheme,
      myCustomDarkTheme,
    },
  },
})
