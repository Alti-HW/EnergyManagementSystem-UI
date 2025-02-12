// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#192142',
        },
        secondary: {
            main: '#1976d2',
        },
        error: {
            main: '#f44336',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
    },
    components: {
        // Customizing specific MUI components if needed
        // MuiTableCell: {
        //     styleOverrides: {
        //         root: {
        //             padding: '8px 4px'
        //         },
        //     },
        // },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    transform: 'scale(0.8)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    // Apply fontWeight 600 only if variant is undefined or empty
                    fontWeight: ownerState.variant === "text" ? 600 : undefined,
                    textTransform: 'none',
                    boxShadow: "none",
                    borderRadius: "8px"
                }),
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: "16px",  // Set a larger border radius
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    fontSize: "14px", // Global font size for text fields
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    padding: "6px", // Adjusts padding for the input
                },
                input: {
                    fontSize: "14px", // Font size inside the input field
                    color: "#000", // Input text color
                    padding: "6px"
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: "12px", // Font size for the label
                    color: "#000", // Label text color
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    margin: "4px 0", // Helper text margin
                },
            },
        },
    },
});

export default theme;
