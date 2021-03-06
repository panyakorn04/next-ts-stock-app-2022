import React, { ReactElement } from "react";

import Typography from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field, FormikProps } from "formik";
import Router, { useRouter } from "next/router";
import { Box } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from "next/link";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch } from "@/store/store";
import { signUp } from "@/store/slices/userSlice";

type Props = {};

const Register = ({ }: Props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [user, setUser] = React.useState({});

    const showForm = ({
        values,
        setFieldValue,
        isValid,
        dirty,
        handleSubmit,
    }: FormikProps<any>) => {
        return (
            <Form onSubmit={handleSubmit}>
                <Field
                    component={TextField}
                    name="username"
                    id="username"
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoComplete="name"
                    autoFocus
                />
                <Field
                    component={TextField}
                    name="email"
                    id="email"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
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
                <FormControlLabel className="flex"
                    control={<Checkbox value="remember" className="text-gray" />}
                    label="Remember me"
                />
                <Button className="h-14 text-base font-bold bg-primary-500 hover:bg-primary-700" type="submit" fullWidth >
                    <span className="text-white">Sign Up</span>
                </Button>
                <div className="mt-4 text-sm text-indigo-500 hover:text-indigo-700">
                    <Link href="/login">Already have an account? Sign in</Link>
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
                    <h1 className="font-bold mt-2 text-2xl">
                        Sign Up
                    </h1>
                    <CardContent>
                        <Formik
                            initialValues={{ username: "", email: "", password: "" }}
                            onSubmit={async (values) => {
                                dispatch(signUp(values));
                            }}
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

export default Register;