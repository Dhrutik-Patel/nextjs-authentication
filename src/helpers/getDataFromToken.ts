import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export default function getDataFromToken(req: NextRequest): any {
    try {
        const token = req.cookies.get('token')?.value || '';
        const decodedToken = jwt.verify(token, 'JWT_SECRET');

        return decodedToken;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
