import { SignUp } from "@/models/auth.model";
import { UserData } from "@/models/user.model";
import axios from "axios";

type signProps = {
    username: string;
    email: string;
    password: string;
}
export const signUp = async (user: signProps): Promise<SignUp> => {
    console.log("axios", user);
    const response = await axios.post<SignUp>("/authen/register", user);
    return response.data;
  };