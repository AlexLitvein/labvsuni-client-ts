import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

// export const appBarHeight = '64px';
export const appBarHeight = 64;
export const h2ml = '64px'; // ????
export const inputHeight = '48px';
export const buttonWidth = '140px';
export const hdrFontBorder = '#304e93';
const inputMainClr = '#3bc3e3';
export const chartBkgClr = '#02a1c8';
// export const gMarginCont = 27;

var theme = createTheme({
  palette: {
    primary: {
      // dark: '#7676801F',
      // main: 'rgba(118, 118, 128, 0.12)',
      main: inputMainClr,
      light: '#DDE5F0',
    },
    // secondary: {
    //   dark: '#0000ff',
    //   main: '#000',
    //   light: '#00ff00',
    // },
    text: {
      primary: hdrFontBorder,
      secondary: '#838383',
      // disabled: '#00ff00',
    },
    // common: {
    // black: 'rgba(118, 118, 128, 0.12)', // не понимает
    //   black: '#000000',
    //   white: '#00ff00',
    // },
    grey: {
      300: '#D9D9D9',
      // 500: '#0000ff',
      // A200: '#0000ff',
      // A400: '#00ff00',
      // A700: '#ff0000',
    },
    background: {
      default: '#1ad1ff',
      // paper: '#ffffff',
    },

    contrastThreshold: 6,
    tonalOffset: 0.05, // между 0 and 1
    // tonalOffset: 10,
  },
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       contained: {
  //         backgroundColor: 'green',
  //       },
  //     },
  //   },
  // },

  typography: {
    button: {
      fontSize: '1rem',
    },
    // fontSize: 16,
    // fontWeightMedium: 600,
  },
  shape: {
    borderRadius: 8,
  },
});

export const myTheme = createTheme(theme, {
  // props: {
  //   MuiButton: {
  //     // The properties to apply
  //     variant: 'contained',

  //     backgroundColor: 'white',
  //   },
  // },

  components: {
    // Typography: {
    //   '& > a': {
    //     color: 'red',
    //   },
    //   styleOverrides: {
    //     root: {
    //       // height: inputHeight,
    //     },
    //   },
    // },

    MuiLink: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: 'none',
          },
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: '18px',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          // flexShrink: 0,
          minWidth: 'max-content',
          height: inputHeight,
          textTransform: 'none',
          // color: theme.palette.common.white,
          // backgroundColor: theme.palette.primary.main,
          // '&:hover': {
          //   backgroundColor: theme.palette.primary.main,
          // },
          // '&.MuiButtonBase-root:hover': {
          //   boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
          // },
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
            },
            '&.MuiButtonBase-root:hover': {
              boxShadow:
                '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            // backgroundColor: 'white',
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
            // color: theme.palette.info.light,
            // backgroundColor: theme.palette.common.white,
          },
        },
      ],
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          height: inputHeight,
          borderRadius: theme.shape.borderRadius, // :))))
        },
        // input: {
        //   '&.Mui-disabled': {
        //     WebkitTextFillColor: theme.palette.common.black,
        //   },
        // },
      },
      // variants: [
      //   {
      //     props: { variant: 'filled' },
      //     style: {
      //       color: 'red',
      //       backgroundColor: red,
      //     },
      //   },
      // ],
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '2px',
          },
        },
      },
    },

    MuiFilledInput: {
      styleOverrides: {
        // input: {
        //   '&.Mui-disabled': {
        //     WebkitTextFillColor: theme.palette.common.black,
        //   },
        // },
        root: {
          // backgroundColor: theme.palette.common.white,

          '&::after,::before,&.Mui-disabled::before': {
            border: 'none',
          },

          // '&:hover:not(.Mui-disabled)': {
          //   backgroundColor: theme.palette.common.white,
          // },

          '&.Mui-focused::before': {
            content: '""',
            border: '2px solid',
            borderRadius: 'inherit',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'absolute',
          },

          // '&.Mui-focused': {
          //   backgroundColor: theme.palette.common.white,
          // },

          '&:hover:not(.Mui-disabled)::before': {
            borderBottom: '2px solid',
            borderRadius: 'inherit',
          },

          '&:hover:not(.Mui-focused)::before': {
            border: '1px solid',
            borderRadius: 'inherit',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
        },
      },
    },

    // MuiFilledInput: {
    //   styleOverrides: {
    //     input: {
    //       '&.Mui-disabled': {
    //         WebkitTextFillColor: theme.palette.common.black,
    //       },
    //     },
    //     root: {
    //       // height: 'unset',
    //       backgroundColor: theme.palette.common.white,
    //       borderRadius: theme.shape.borderRadius, // :))))

    //       '&::after,::before,&.Mui-disabled::before': {
    //         border: 'none',
    //       },

    //       '&:hover:not(.Mui-disabled)': {
    //         backgroundColor: theme.palette.common.white,
    //       },

    //       '&.Mui-focused::before': {
    //         content: '""',
    //         border: '2px solid',
    //         borderRadius: 'inherit',
    //         top: 0,
    //         left: 0,
    //         right: 0,
    //         bottom: 0,
    //         position: 'absolute',
    //       },

    //       '&.Mui-focused': {
    //         backgroundColor: theme.palette.common.white,
    //       },

    //       '&:hover:not(.Mui-disabled)::before': {
    //         borderBottom: '2px solid',
    //         borderRadius: 'inherit',
    //       },

    //       '&:hover:not(.Mui-focused)::before': {
    //         border: '1px solid',
    //         borderRadius: 'inherit',
    //         top: 0,
    //         left: 0,
    //         right: 0,
    //         bottom: 0,
    //       },
    //     },
    //   },
    // },
  },
});
