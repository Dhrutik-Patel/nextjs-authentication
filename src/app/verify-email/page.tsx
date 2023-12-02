'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

const ConfirmEmail = () => {
    const [token, setToken] = useState<string>('');
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const verifyEmail = async () => {
        try {
            const response = await axios.post('/api/users/verify-email', {
                token: token,
            });

            console.log('Response: ', response);

            if (response.status === 200) {
                setIsVerified(true);
            }

            router.push('/');
        } catch (err: any) {
            setError(err.message);
            throw new Error(err.message);
        }
    };

    useEffect(() => {
        const urlToken = window.location.href.split('?token=')[1];
        setToken(urlToken);

        console.log('Token: ', token);
    }, []);

    // useEffect(() => {
    //     if (token.length > 0) {
    //         verifyEmail();
    //     }
    // }, [token]);

    return (
        <div className='min-h-screen flex items-center justify-center text-black'>
            <div className='bg-white p-8 rounded-md shadow-md'>
                <h2 className='text-2xl font-bold mb-4'>Confirm Your Email</h2>
                <p className='text-gray-700 mb-6'>
                    Thank you for signing up with Codeems! To get started and
                    make the most of our services, we need to confirm your email
                    address.
                </p>
                <button
                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    onClick={verifyEmail}
                >
                    Confirm Email
                </button>
            </div>
        </div>
    );
};

export default ConfirmEmail;
