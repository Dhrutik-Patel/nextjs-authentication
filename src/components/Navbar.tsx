'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Navbar = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            const response = await axios.get('/api/users/sign-out');

            // Toster notification for success message
            toast.success(response.data.message);

            // Redirect to sign-in page
            router.push('/sign-in');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <nav className='bg-white border-gray-200 dark:bg-gray-900'>
            <div className='max-w-screen-xl flex items-center justify-between mx-auto p-4'>
                {/* Logo on the left */}
                <Link
                    href='/'
                    className='flex items-center space-x-3 rtl:space-x-reverse'
                >
                    <Image
                        src='https://flowbite.com/docs/images/logo.svg'
                        className='h-8'
                        alt='Flowbite Logo'
                        width={32}
                        height={32}
                    />
                    <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
                        Codeems
                    </span>
                </Link>

                {/* Navigation in the center */}
                <div className='flex items-center justify-center flex-grow'>
                    {/* Navigation items go here */}
                    <ul className='flex space-x-6'>
                        <li>
                            <Link
                                href='/profile'
                                className='text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500 text-lg tracking-wide'
                            >
                                Profile
                            </Link>
                        </li>
                        {/* Add more navigation items as needed */}
                    </ul>
                </div>

                {/* Avatar and Logout button on the right */}
                <div className='flex items-center space-x-5'>
                    {/* Avatar */}
                    {/* <Image
                        src='/docs/images/people/profile-picture-3.jpg'
                        className='w-8 h-8 rounded-full'
                        alt='User Avatar'
                        width={32}
                        height={32}
                    /> */}

                    {/* Logout button */}
                    <button
                        className='text-gray-700 hover:text-blue-700 dark:text-white dark:hover:text-blue-500 text-lg tracking-wide bg-transparent border border-gray-500 rounded-md px-3 py-1 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500'
                        onClick={handleSignOut}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
