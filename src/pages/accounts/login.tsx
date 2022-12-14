import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import { useFormik } from 'formik';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { useState } from 'react';

import GeneralPageLayout from '@layouts/GeneralPageLayout';
import styles from '@styles/Form.module.css';

type FormValues = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
  });

  async function onSubmit(values: FormValues) {
    console.log(values);
  }

  async function handleGoogleSignin() {
    signIn('google', { callbackUrl: 'http://localhost:3000/account' });
  }

  async function handleGithubSignin() {
    signIn('github', { callbackUrl: 'http://localhost:3000/account' });
  }

  return (
    <GeneralPageLayout>
      <div className="flex px-20 items-center">
        <section>
          <Image
            src="/images/girl-student-studying.svg"
            width={650}
            height={650}
            alt=""
          ></Image>
        </section>
        <section className="w-1/4 mx-auto flex flex-col gap-10">
          <div className="title flex flex-col items-center">
            <h1 className="text-4xl font-bold py-4">Resume work!</h1>
            <p>Resume your journey by logging in!</p>
          </div>
          {/* form */}
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <div className={styles.input_group}>
              <input
                type="email"
                placeholder="Email"
                className={styles.input_text}
                {...formik.getFieldProps('email')}
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol size={25} />
              </span>
            </div>
            <div className={styles.input_group}>
              <input
                type={`${show ? 'text' : 'password'}`}
                placeholder="Password"
                className={styles.input_text}
                {...formik.getFieldProps('password')}
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow(!show)}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>

            {/* login buttons */}
            <div className="input-button">
              <button type="submit" className={styles.button}>
                Log In
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={handleGoogleSignin}
                className={styles.button_custom}
              >
                Sign In with Google{' '}
                <Image
                  src={'/images/google.svg'}
                  width="20"
                  height={20}
                  alt=""
                ></Image>
              </button>
            </div>
            <div className="input-button">
              <button
                type="button"
                onClick={handleGithubSignin}
                className={styles.button_custom}
              >
                Sign In with Github{' '}
                <Image
                  src={'/images/github.svg'}
                  width={25}
                  height={25}
                  alt=""
                ></Image>
              </button>
            </div>
          </form>

          {/* bottom */}
          <p className="text-center">
            don&lsquo;t have an account yet?{' '}
            <Link href={'/accounts/signup'}>
              <a className="text-primaryDark">Sign Up</a>
            </Link>
          </p>
        </section>
      </div>
    </GeneralPageLayout>
  );
};

export default LoginPage;
