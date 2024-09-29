import bcrypt from 'bcrypt';

export const generateCode = (len: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let otp = '';
    for (let i = 0; i < len; i++) {
        otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
};

export const hashString = async (s: string): Promise<string> => {
    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(s, saltRounds);
    return hashedOTP;
};

export const verifyHash = async (s: string, h: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(s, h);
    return isMatch;
};

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};