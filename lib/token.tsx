import * as jwt from 'jsonwebtoken';

// Генерация токена
export const generateToken = (userId: string): string => {
    const payload = { userId };
    const secretKey = '1q2w3e'; // Замените на ваш секретный ключ
    const options: jwt.SignOptions = { expiresIn: '24h' }; // Установите срок действия токена

    try {
        const tokenObject = jwt.sign(payload, secretKey, options);
        if (typeof tokenObject === 'object') {
            return tokenObject;
        } else {
            console.error('Token generation failed: Invalid token structure');
            return '';
        }
    } catch (error) {
        console.error('Token generation failed', error);
        return '';
    }
};

// Проверка токена
export const verifyToken = (token: string): null | { userId: string } => {
    const secretKey = '1q2w3e'; // Замените на ваш секретный ключ

    try {
        const decoded = jwt.verify(token, secretKey);

        if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
            return decoded as { userId: string };
        } else {
            console.error('Token verification failed: Invalid token structure');
            return null;
        }
    } catch (error) {
        console.error('Token verification failed', error);
        return null;
    }
};
