"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { addNewUser } from "@/data/remote/serverData";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
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
      <Link color="inherit" href="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const [user, setUser] = React.useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    confirmPassword: "",
  });

  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [misMach, setmisMach] = React.useState(false);
  const [alert, setAleart] = React.useState(false);
  const [massge, setMassge] = React.useState("");
  const [validatedEmail, setValidatedEmail] = React.useState(false);
  const [validatedFirstName, setValidatedFirstName] = React.useState(false);
  const [validatedLastName, setValidatedLastName] = React.useState(false);
  const [validatedPassword, setValidatedPassword] = React.useState(false);
  const [validatedConfirmPassword, setValidatedConfirmPassword] =
    React.useState(false);
  const router = useRouter();

  const onPress = async() => {
    if (user.LastName === "") {
      setValidatedLastName(true);
    }
    if (user.FirstName === "") {
      setValidatedFirstName(true);
    }
    if (user.Email === "") {
      setValidatedEmail(true);
    }
    if (user.Password === "") {
      setValidatedPassword(true);
    }
    if (user.confirmPassword === "") {
      setValidatedConfirmPassword(true);
    }
    if (user.Password === user.confirmPassword) {
      setmisMach(false);
    } else {
      setMassge("Password MisMach");
      setAleart(true);
      setmisMach(true);
    }
    if (
      user.Email != "" &&
      user.FirstName != "" &&
      user.LastName != "" &&
      user.Password != "" &&
      user.confirmPassword != "" &&
      user.Password === user.confirmPassword
    ){
    const response = await   addNewUser(user);
      if (response === "Done") {
        router.push("/login");
        router.replace("/login");
      } else {
         setMassge("Email alredy exists");
        setAleart(true);

        setmisMach(true);
      }}
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
            sx={{ width: "100%", marginBottom: "330%" }}
          >
            {massge}
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
            Sign up
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  sx={{ marginLeft: "-10%" }}
                  margin="normal"
                  error={validatedFirstName}
                  value={user.FirstName}
                  onChange={(e) => {
                    setUser({ ...user, FirstName: e.target.value });
                    setValidatedFirstName(false);
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  margin="normal"
                  error={validatedLastName}
                  value={user.LastName}
                  onChange={(e) => {
                    setUser({ ...user, LastName: e.target.value });
                    setValidatedLastName(false);
                  }}
                />
              </Grid>

              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={validatedEmail}
                  value={user.Email}
                  onChange={(e) => {
                    setUser({ ...user, Email: e.target.value });
                    setValidatedEmail(false);
                  }}
                />

                <FormControl sx={{ m: 1, width: "100%", marginLeft: "-0.2%" }}>
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
                <FormControl sx={{ m: 1, width: "100%", marginLeft: "-0.2%" }}>
                  <InputLabel htmlFor="outlined-adornment-password">
                    confirmPassword
                  </InputLabel>

                  <OutlinedInput
                    id="ConfirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowConfirmPassword((show) => !show)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Conform password"
                    required
                    fullWidth
                    name="Conform password"
                    autoComplete="current-password"
                    error={validatedConfirmPassword}
                    value={user.confirmPassword}
                    onChange={(e) => {
                      setUser({ ...user, confirmPassword: e.target.value });
                      setValidatedConfirmPassword(false);
                    }}
                  />
                </FormControl>
              </Box>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>onPress()}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
