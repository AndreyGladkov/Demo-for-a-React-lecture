import { useState } from 'react';
import { Link } from 'react-router';

import { useAppSelector } from '../../app/store';
import { CodeStep } from './CodeStep';
import { CredentialsStep } from './CredentialsStep';

export const AccountLoginForm = () => {
    const step = useAppSelector((state) => state.login.step);
    const [login, setLogin] = useState('');

    if (step === 'code') {
        return <CodeStep login={login} />;
    }
    if (step === 'done') {
        return (
            <div className="login-form">
                <h2>Вы вошли</h2>
                <Link to="/employer/vacancy/create?fromTemplateId=7">Создать вакансию</Link>
            </div>
        );
    }
    return <CredentialsStep onLoginEntered={setLogin} />;
};
