import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Avatar,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigationRoutes from "../../constants/routes";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../context";
import AccountService from "../../services/Users";
import { useContext, useState } from "react";
import { LockOutlined } from "@mui/icons-material";
import { useAccountStore } from "../../context/Store";

const LoginScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // const { saveUser } = useContext(UserContext) as UserContextProps;
  const [validEmailAddress, setValidEmailAddress] = useState(true);
  const [emailErrorAlert, setEmailErrorAlert] = useState(
    `Your email doesn't look like an email`
  );
  const { dispatch } = AuthContext.useLogin();
  const navigate = useNavigate();
  const saveUser = useAccountStore((state) => state.saveUser);

  const logIn = async (email: string, password: string) => {
    try {
      const response = await AuthService.authenticate(email, password);

      if (response.status === 200) {
        const authDetails = {
          accessToken: response.data.tokens.accessToken,
          refreshToken: response.data.tokens.refreshToken,
        };
        const userDetails = response.data.account;
        saveUser(
          userDetails.id,
          userDetails.first_name,
          userDetails.last_name,
          userDetails.email
        );
        localStorage.setItem("emailAddress", userDetails.email);
        localStorage.setItem("user", JSON.stringify(authDetails));

        dispatch({
          type: "authentication",
          ...authDetails,
        });
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    try {
      console.log(email + " " + password);
      logIn(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      registerHandler(newEmail, newPassword, firstName, lastName);
    } catch (err) {
      console.log(err);
    }
  };

  const registerHandler = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const response = await AccountService.createAccount(
        email,
        firstName,
        lastName,
        password
      );
      if (response.status === 201) {
        const authDetails = {
          accessToken: response.data.tokens.accessToken,
          refreshToken: response.data.tokens.refreshToken,
        };
        localStorage.setItem("user", JSON.stringify(authDetails));
        dispatch({ type: "authentication", ...authDetails });
      }
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  // const validateEmailAddress = (event: any) => {
  //   const { value } = event.target;
  //   if (value.trim() === "" || value.length === 0) {
  //     setEmailErrorAlert(`Email Address Required`);
  //     setValidEmailAddress(false);
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
  //     setEmailErrorAlert(`Your email doesn't look like an email`);
  //     setValidEmailAddress(false);
  //   } else {
  //     setValidEmailAddress(true);
  //     setEmail(value);
  //   }
  // };

  const onChangeEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const onChangeFirstname = (event: any) => {
    setFirstName(event.target.value);
  };

  const onChangeLastname = (event: any) => {
    setLastName(event.target.value);
  };

  const onChangeNewEmail = (event: any) => {
    setNewEmail(event.target.value);
  };

  const onChangeNewPassword = (event: any) => {
    setNewPassword(event.target.value);
  };
  return (
    <Container
      sx={{
        width: "100vw",
        height: "100vh",
        paddingTop: 10,
      }}
    >
      <Typography variant="h2" sx={{ textAlign: "center", width: "100vw" }}>
        Who Wants To Be A Rich Unicorn
      </Typography>
      <Typography variant="h3" sx={{ textAlign: "center", width: "100vw" }}>
        Rich in Enjoyment
      </Typography>
      <Grid
        container
        sx={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100vw",
          paddingTop: 5,
        }}
      >
        <Box
          sx={{
            p: 2,
            mt: 3,
            borderRadius: 5,
            m: 1,
            width: 350,
            backgroundColor: "#02328b",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#90e0ef", color: "#03045e" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            sx={{
              mt: 3,
              flexDirection: "column",
              alignItems: "center",
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  value={email}
                  onChange={onChangeEmail}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={onChangePassword}
                />
              </Grid>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  container
                  alignItems={"center"}
                  sx={{ paddingLeft: "16px", paddingRight: "16px" }}
                >
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 2 }}
                onClick={handleLogin}
              >
                Sign In
              </Button>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            p: 2,
            borderRadius: 5,
            m: 1,
            width: 350,
            backgroundColor: "#02328b",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#90e0ef", color: "#03045e" }}>
            <LockOutlined />
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
                  onChange={onChangeFirstname}
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
                  onChange={onChangeLastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChangeNewEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={onChangeNewPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
};

export default LoginScreen;
