import React, { ReactElement } from "react";

import { makeStyles } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field, FormikProps } from "formik";
import Router, { useRouter } from "next/router";
import { Box } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from "next/link";


type Props = {};

const Login = ({ }: Props) => {
    const router = useRouter();

    const showForm = ({
        values,
        setFieldValue,
        isValid,
        dirty,
        handleSubmit,
    }: FormikProps<any>) => {
        return (
            <Form onSubmit={handleSubmit} >
                <Field
                    component={TextField}
                    name="username"
                    id="username"
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoComplete="email"
                    autoFocus
                />
                <Field
                    component={TextField}
                    name="password"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <div className="flex items-center justify-between">
                    <FormControlLabel
                        control={<Checkbox value="remember" className="text-gray" />}
                        label="Remember me"
                    />
                    <div className="text-sm text-indigo-700 hover:text-indigo-500" >
                        <Link href="/forgot-password">Forgot password</Link>
                    </div>
                </div>
                <Button className="h-14 text-base font-bold bg-primary-500 hover:bg-primary-700" type="submit" fullWidth >
                    <span className="text-white">Sing In</span>
                </Button>
                <div className="container mt-4">
                    <div className="text-sm text-indigo-700 hover:text-indigo-500">
                        <Link href="/register">{"Don't have an account?Sing Up Now"}</Link>
                    </div>
                </div>
            </Form>
        );
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", alignItems: 'center', pt: 2 }}>
                    <Avatar className="bg-primary-500">
                        <LockOutlinedIcon />
                    </Avatar>
                    <h1 className="font-bold text-2xl mt-2">
                        Sign in
                    </h1>
                    <CardContent>
                        <Formik
                        // initialValues={{ username: "", password: "" }}
                        // onSubmit={async (values) => {
                        //     const response = await dispatch(signIn(values));
                        //     if (response.meta.requestStatus === "rejected") {
                        //       alert("Login failed");
                        //     } else {
                        //       router.push("/stock");
                        //     }
                        //   }}
                        >
                            {(props) => showForm(props)}
                        </Formik>
                    </CardContent>
                </Card>

                <style jsx global>
                    {`
            body {
              min-height: 100vh;
              position: relative;
              margin: 0;
              background-size: cover;
              background-image: url("/img/bg4.jpeg");
              text-align: center;
            }
          `}
                </style>
            </Box>
        </React.Fragment>
    );
};

export default Login;