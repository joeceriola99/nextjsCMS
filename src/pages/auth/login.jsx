import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { auth } from '../../../firebase';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Auth, { Group } from 'components/Auth';
import Socials from 'components/Auth/Socials';
import Layout from 'Layouts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginHandler = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((u) => {
        if (u.user) {
          toast.success("Logged In Successfully");
          router.push('/orderNow');
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <Layout title="Login">
      <ToastContainer autoClose={5000} hideProgressBar={true} closeOnClick draggable pauseOnHover />
      <Auth title="Login" subTitle="Hello! Login with your email">
        <form>
          <InputGroup fullWidth>
            <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </InputGroup>
          <Group>
            <Link href="/auth/request-password">
              <a>Forgot Password?</a>
            </Link>
          </Group>
          <Button status="Success" type="button" shape="SemiRound" onClick={loginHandler} fullWidth>
            Login
          </Button>
        </form>
        <Socials />
        <p>
          Don&apos;t have account?{' '}
          <Link href="/auth/register">
            <a>Register</a>
          </Link>
        </p>
      </Auth>
    </Layout>
  );
}
