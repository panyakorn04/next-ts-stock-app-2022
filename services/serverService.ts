import { SignUp, SignIn } from "@/models/auth.model";
import { UserData } from "@/models/user.model";
import axios from "axios";

interface signProps {
    username?: string;
    email?: string;
    password?: string;
}
export const signUp = async (user: signProps): Promise<SignUp> => {
    console.log("axios", user);
    const response = await axios.post<SignUp>(process.env.NEXT_PUBLIC_BASE_URL_API + "/register", user);
    return response.data;
};
export const signIn = async (user: signProps): Promise<SignIn> => {
    console.log("axios", user);
    const { data: response } = await axios.post<SignIn>(process.env.NEXT_PUBLIC_BASE_URL_API + "/login", user
    )
    return response;
};