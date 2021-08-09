import React, { useState } from 'react';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import styled from 'styled-components';
import Link from 'next/link';
import Auth from 'components/Auth';
import Layout from 'Layouts';
import Socials from 'components/Auth/Socials';
import { db } from '../../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Input = styled(InputGroup)`
  margin-bottom: 2rem;
`;

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [fullName, setFullName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerHandler = () => {
    if (password == confirmPassword) {
      var docData = {
        emailAddress: email,
        fullName: fullName,
        phoneNumber: phoneNumber,
        password: password,
        userType: 'CUSTOMER',
      };

      db.collection('users')
        .doc(email)
        .set(docData)
        .then(() => {
          toast.success('Registered Successfully');
          setTimeout(() => router.push('/auth/login'), 1500);
        })
        .catch((error) => {
          console.log(error.message);
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
            <input type="fullName" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} />
          </Input>
          <Input fullWidth>
            <input type="phoneNumber" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
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
