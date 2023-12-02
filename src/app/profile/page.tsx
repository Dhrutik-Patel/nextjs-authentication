'use client';

import axios from 'axios';
import { useState } from 'react';

export default function Profile() {
    const [user, setUser]: any = useState(null);

    const getUserData = async () => {
        const response = await axios.get('/api/users/current-user');
        setUser(response.data.user);
    };

    return (
        <>
            <h1>Profile</h1>
            <button onClick={getUserData}>Get Profile</button>
            {user && (
                <>
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                </>
            )}
        </>
    );
}
