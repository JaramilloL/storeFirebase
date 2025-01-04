import { Box, TextField, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CreateContext } from "../../context/CreateContext";
import { errorsRegister } from "../../utils/Errors";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  //traemos el contexto del registro
  const { registerUser } = useContext(CreateContext);

  //navegamos al login despues de registrarse
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await registerUser(data.email, data.password);
      toast.success("User registered successfully");
      reset();
      navigate('/login')
    } catch (error) {
      console.log(error);
      const foundError = errorsRegister.find((err) => err.code == error.code);
      toast.error(foundError.message);
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
        Register
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
      <Box display={"flex"} justifyContent={"end"} mt={2}>
        <Typography variant="subtitle2" component={Link} to={'/login'} color="primary">Login</Typography>
      </Box>
      <Box display={"flex"} justifyContent={"center"} mt={2}>
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Register;
