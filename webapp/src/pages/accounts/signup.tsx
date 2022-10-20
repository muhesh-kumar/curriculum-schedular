import { useState } from 'react';

import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { useFormik } from 'formik';
import { HiOutlineUser, HiAtSymbol, HiFingerPrint } from "react-icons/hi";

import AuthPageLayout from '@layouts/AuthPageLayout';
import styles from '@styles/Form.module.css';

const SignupPage: NextPage = () => {
  const [show, setShow] = useState({ password: false, cpassword: false })
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    onSubmit,
  });

  // FIXME: give a proper type for values
  async function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <AuthPageLayout>
      <div className="flex px-20 items-center">
        <section>
          <Image src="/images/girl-student-studying.svg" width={650} height={650} alt=""></Image>
        </section>

        <section className='w-1/4 mx-auto flex flex-col gap-10'>
          <div className="title flex flex-col items-center">
            <h1 className='text-4xl font-bold py-4'>Get Started!</h1>
            <p>Start your learning journey by creating an account here!</p>
          </div>

          {/* form */}
          <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder='Username'
                className={styles.input_text}
                {...formik.getFieldProps('username')}
              />
              <span className='icon flex items-center px-4'>
                <HiOutlineUser size={25} />
              </span>
            </div>
            <div className={styles.input_group}>
              <input
                type="email"
                placeholder='Email'
                className={styles.input_text}
                {...formik.getFieldProps('email')}
              />
              <span className='icon flex items-center px-4'>
                <HiAtSymbol size={25} />
              </span>
            </div>
            <div className={styles.input_group}>
              <input
                type={`${show.password ? "text" : "password"}`}
                placeholder='Password'
                className={styles.input_text}
                {...formik.getFieldProps('password')}
              />
              <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password })}>
                <HiFingerPrint size={25} />
              </span>
            </div>

            <div className={styles.input_group}>
              <input
                type={`${show.cpassword ? "text" : "password"}`}
                placeholder='Confirm Password'
                className={styles.input_text}
                {...formik.getFieldProps('cpassword')}
              />
              <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword })}>
                <HiFingerPrint size={25} />
              </span>
            </div>

            {/* login buttons */}
            <div className="input-button">
              <button type='submit' className={styles.button}>
                Sign Up
              </button>
            </div>
          </form>

          {/* bottom */}
          <p className='text-center'>
            Already have an account? <Link href={'/accounts/login'}><a className='text-primaryDark'>Log In</a></Link>
          </p>
        </section>
      </div>
    </AuthPageLayout>
  )
}

export default SignupPage;