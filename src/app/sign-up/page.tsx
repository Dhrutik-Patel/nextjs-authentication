'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const SignUp = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;

        setUser({ ...user, [name]: value });
    };

    const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Form validation.
        if (!user.username || !user.email || !user.password) {
            return toast.error('Please fill in all fields!');
        }

        if (user.username.length < 5) {
            return toast.error('Username must be at least 5 characters long!');
        }

        if (!user.email.includes('@')) {
            return toast.error('Please enter a valid email address!');
        }

        if (user.password.length < 6) {
            return toast.error('Password must be at least 6 characters long!');
        }

        // Sign up the user.
        const response = await axios.post('/api/users/sign-up', user);

        // Toaster notification for successful sign up.
        toast.success('You have successfully signed up!');

        // Reset the form after submission to clear the inputs.
        setUser({ username: '', email: '', password: '' });

        // Redirect to the home page after successful sign up.
        router.push('/');
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
                    Sign up for an account
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form className='space-y-6' onSubmit={handleSignUp}>
                    <div>
                        <label
                            htmlFor='username'
                            className='block text-sm font-medium leading-6 text-white'
                        >
                            Username
                        </label>
                        <div className='mt-2'>
                            <input
                                id='username'
                                name='username'
                                type='username'
                                autoComplete='username'
                                required
                                className='block w-full rounded-md border-0 outline-none p-1.5 text-black shadow-sm placeholder:text-gray-500'
                                placeholder='Enter your username'
                                defaultValue={user.username}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

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
                            Sign up
                        </button>
                    </div>
                </form>
                <p className='mt-10 text-center text-sm text-gray-500'>
                    Already have an account?{' '}
                    <Link
                        href='/sign-in'
                        className='font-semibold leading-6 text-indigo-500'
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
