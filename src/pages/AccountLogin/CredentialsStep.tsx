import { useState, type FormEvent } from 'react';

import { useAppDispatch } from '../../app/store';
import { submitCredentials } from '../../models/login';

export const CredentialsStep = ({ onLoginEntered }: { onLoginEntered: (login: string) => void }) => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('hr@romashka.ru');
    const [password, setPassword] = useState('password');

    const submit = (event: FormEvent) => {
        event.preventDefault();
        onLoginEntered(email);
        void dispatch(submitCredentials({ email, password }));
    };

    return (
        <form className="login-form" onSubmit={submit}>
            <h2>Вход в личный кабинет</h2>
            <input aria-label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <input
                aria-label="Пароль"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button className="button button_primary">Войти</button>
        </form>
    );
};
