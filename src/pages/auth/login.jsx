import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { db } from '../../../firebase';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Auth, { Group } from 'components/Auth';
import Socials from 'components/Auth/Socials';
import Layout from 'Layouts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/publicReducer/publicActions';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const loginHandler = () => {
    var docRef = db.collection('users').doc(email);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          toast.success('Logged In Successfully');
          dispatch(setUser(doc.data()));
          setTimeout(() => router.push('/orderNow'), 2000);
        } else {
          toast.error('No such users');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
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
