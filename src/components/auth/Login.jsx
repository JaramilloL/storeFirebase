import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { errorsGoogleLogin, errorsLogin } from "../../utils/Errors";
import { toast, ToastContainer } from "react-toastify";
import { CreateContext } from "../../context/CreateContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  //creamos un estado para ver la carga de la petision
  const [loading, setLoading] = useState(false)

  //usamos useForm para traer los daos del formulario
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  //traemos el contexto de login
  const { loginUser, resetPassword, signInGoogle } = useContext(CreateContext);

  //creamos un navigate para redirigir al usuario
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      console.log(data);
      await loginUser(data.email, data.password);
      toast.success("User logged in successfully");
      navigate("/home");
      reset();
    } catch (error) {
      console.log(error);
      if (error) {
        const errorFound = errorsLogin.find((err) => err.code == error.code);
        toast.error(errorFound.message);
      } else {
        toast.error("An error occurred");
      }
    }finally{
      setLoading(false)
    }
  };
  const resetPass = async () => {
    try {
      const email = getValues("email");
      if (email) {
        await resetPassword(email);
        toast.success("Email sent to reset password");
      } else {
        toast.error("Email is required");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginGoogleAuth = async () => {
    try {
      setLoading(true)
      await signInGoogle();
      await navigate("/home");
    } catch (error) {
      console.log(error);
      if (error) {
        const errorFound = errorsGoogleLogin.find(
          (err) => err.code == error.code
        );
        toast.error(errorFound.message);
      } else {
        toast.error("An error occurred");
      }
    }finally{
      setLoading(false)
    }
  };

  return (
    <Box
      component={"form"}
      width={"50%"}
      mx={"auto"}
      mt={5}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography textAlign={"center"} variant="h1">
        Login
      </Typography>
      <TextField
        id="outlined-basic"
        label="Email"
        name="email"
        variant="outlined"
        margin="normal"
        fullWidth
        error={errors?.email ? true : false}
        helperText={errors?.email?.message}
        type="email"
        {...register("email", {
          required: {
            value: true,
            message: "Email is required",
          },
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Email is invalid",
          },
        })}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        name="password"
        variant="outlined"
        margin="normal"
        fullWidth
        error={errors?.password ? true : false}
        helperText={errors?.password?.message}
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Password is required",
          },
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
      />
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography
          variant="subtitle2"
          color="primary"
          component={"a"}
          href="#"
          onClick={resetPass}
        >
          Forgot password?
        </Typography>
        <Typography
          variant="subtitle2"
          color="primary"
          component={Link}
          to="/register"
        >
          Register
        </Typography>
      </Box>
      <Box display={"flex"} justifyContent={"space-evenly"} mt={2}>
        <Button variant="contained" color="primary" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
        <Button
          variant="contained"
          color="error"
          type="button"
          onClick={loginGoogleAuth}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login with Google"}
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Login;
