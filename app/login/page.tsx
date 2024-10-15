"use client";

import { useState, forwardRef } from "react";
import { useRouter } from "next/navigation";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { logInUser } from "@/helper/helper";
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function login() {
  const [user, setUser] = useState({ Email: "", Password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAleart] = useState(false);
  const [validatedEmail, setValidatedEmail] = useState(false);
  const [validatedPassword, setValidatedPassword] = useState(false);
  const router = useRouter();

  const onPress = async () => {
    if (user.Email === "") {
      setValidatedEmail(true);
    }
    if (user.Password === "") {
      setValidatedPassword(true);
    }
    if (user.Email != "" && user.Password != "") {
      const response = await logInUser(user);
      if (response) {
        router.push("/");
        router.replace("/");
      }
    } else {
      setAleart(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Snackbar
          open={alert}
          autoHideDuration={4000}
          onClose={() => setAleart(false)}
        >
          <Alert
            severity="error"
            onClose={() => setAleart(false)}
            sx={{ width: "100%", marginBottom: "280%" }}
          >
            invalid Email or Password
          </Alert>
        </Snackbar>

        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={validatedEmail}
              value={user.Email}
              onChange={(e) => {
                setUser({ ...user, Email: e.target.value });
                setValidatedEmail(false);
              }}
            />

            <FormControl sx={{ m: 1, width: "100%", marginLeft: "-1%" }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>

              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                required
                fullWidth
                name="password"
                autoComplete="current-password"
                error={validatedPassword}
                value={user.Password}
                onChange={(e) => {
                  setUser({ ...user, Password: e.target.value });
                  setValidatedPassword(false);
                }}
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => onPress()}
            >
              Log In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="/forgetPss" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
