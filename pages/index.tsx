import Layout from '@/components/Layouts/Layout'
import { userSelector, resetUsername, signIn } from '@/store/slices/userSlice';
import { useAppDispatch } from '@/store/store';
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
type Props = {}

export default function index({ }: Props) {
  const dispatch = useAppDispatch();
  const user = useSelector(userSelector);

  return (
    <Layout>
      <h1>K.{user.username}</h1>
      <Button type='button' className='bg-primary-500 text-white font-bold hover:bg-primary-700 mr-4' onClick={() => dispatch(resetUsername({ data: "test" }))}>reset</Button>
      <Button type='button' className='bg-primary-500 text-white font-bold hover:bg-primary-700' onClick={() => dispatch(signIn({ data: "test" }))}>Sing in</Button>
    </Layout>
  )
}