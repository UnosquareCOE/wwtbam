import { Palette } from "@mui/icons-material";
import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#03045e",
      light: "#03045e",
      dark: "#03045e",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#90e0ef",
      paper: "#0077b6",
    },
    text: {
      primary: "#caf0f8",
      secondary: "#caf0f8",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            border: `1px solid #caf0f8`,
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: `1px solid #caf0f8`,
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#caf0f8",
          "&.MuiInputLabel-shrink": {
            color: "#caf0f8",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#caf0f8",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#03045e",
          backgroundColor: "#caf0f8",
          "&:hover": {
            color: "#03045e",
            backgroundColor: "#caf0f8",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "& .MuiSvgIcon-root": {
            color: "#caf0f8",
          },
          "& .Mui-checked .MuiIconButton-label": {
            color: "#caf0f8",
          },
          "& .Mui-checked .MuiIconButton-root": {
            color: "#caf0f8",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            backgroundColor: "#03045e",
            color: "#ffffff",
          },
        },
      },
    },
  },
};
