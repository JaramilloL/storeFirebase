import { createTheme } from '@mui/material'

export const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2', // Color principal
      },
      secondary: {
        main: '#9c27b0', // Color secundario
      },
      background: {
        default: '#f5f5f5', // Fondo de la aplicación
        paper: '#ffffff', // Fondo de elementos como Paper o Card
      },
      text: {
        primary: '#333333', // Color del texto principal
        secondary: '#757575', // Color del texto secundario
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif', // Familia de fuente global
      h1: {
        fontSize: '2.5rem', // Tamaño para los encabezados H1
        fontWeight: 700,
      },
      body1: {
        fontSize: '1rem', // Tamaño para el texto principal
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px', // Bordes redondeados en botones
            textTransform: 'none', // Deshabilitar texto en mayúsculas
          },
        },
      },
    },
  });