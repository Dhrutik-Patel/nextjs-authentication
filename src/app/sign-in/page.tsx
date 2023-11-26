'use client';

import Link from 'next/link';
import React, { FormEvent, useState } from 'react';

const SignIn = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;

        setUser({ ...user, [name]: value });
    };

    const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(user);

        // Reset the form after submission to clear the inputs.
        setUser({ email: '', password: '' });
    };

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 tracking-normal'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <img
                    className='mx-auto h-10 w-auto'
                    src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                    alt='Your Company'
                />
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 text-white'>
                    Sign in to your account
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form className='space-y-6' onSubmit={handleSignIn}>
                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium leading-6 text-white'
                        >
                            Email address
                        </label>
                        <div className='mt-2'>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                autoComplete='email'
                                required
                                className='block w-full rounded-md border-0 outline-none p-1.5 text-black shadow-sm placeholder:text-gray-500'
                                placeholder='Enter your email address'
                                defaultValue={user.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor='password'
                            className='block text-sm font-medium leading-6 text-white'
                        >
                            Password
                        </label>
                        <div className='mt-2'>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                autoComplete='current-password'
                                required
                                className='block w-full rounded-md border-0 outline-none p-1.5 text-black shadow-sm placeholder:text-gray-500'
                                placeholder='Enter your password'
                                defaultValue={user.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <p className='mt-10 text-center text-sm text-gray-500'>
                    Not a member?{' '}
                    <Link
                        href='/sign-up'
                        className='font-semibold leading-6 text-indigo-500'
                    >
                        Sign up now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
