import { useEffect, useState } from 'react';

export const routingConditions = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {

    }, [])


    return {
        isLogin,
        isUser,
    }

}