import React, { useState } from 'react';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import styled from 'styled-components';
import Link from 'next/link';
import Auth from 'components/Auth';
import Layout from 'Layouts';
import Socials from 'components/Auth/Socials';
import { auth } from '../../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Input = styled(InputGroup)`
  margin-bottom: 2rem;
`;

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerHandler = () => {
    console.log(email, password, confirmPassword);
    if (password == confirmPassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((u) => {
          // console.log(u);
          if (u.user) {
            toast.success('Registered Successfully');
            router.push('/home');
            Cookies.set('user', JSON.stringify(data));
          }
        })
        .catch((error) => {
          // console.log(error.message);
          toast.error(error.message);
        });
    } else {
      toast.error('Password Mismatch');
    }
  };

  return (
    <Layout title="Register">
      <ToastContainer autoClose={5000} hideProgressBar={true} closeOnClick draggable pauseOnHover />
      <Auth title="Create new account">
        <form>
          <Input fullWidth>
            <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
          </Input>
          <Input fullWidth>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Input>
          <Input fullWidth>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Input>
          <Button status="Success" type="button" shape="SemiRound" onClick={registerHandler} fullWidth>
            Register
          </Button>
        </form>
        <Socials />
        <p>
          Already have an account?{' '}
          <Link href="/auth/login">
            <a>Log In</a>
          </Link>
        </p>
      </Auth>
    </Layout>
  );
}
