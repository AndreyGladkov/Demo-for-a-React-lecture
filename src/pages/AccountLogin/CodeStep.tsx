import { useEffect, useState, type FormEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/store';
import { sendCode, submitCode } from '../../models/login';
import { useCountdown } from './useCountdown';

const RESEND_TIMEOUT_SECONDS = 30;

export const CodeStep = ({ login }: { login: string }) => {
    const dispatch = useAppDispatch();
    const email = useAppSelector((state) => state.login.email);
    const error = useAppSelector((state) => state.login.error);
    const [code, setCode] = useState('');
    const [secondsLeft, restartCountdown] = useCountdown(RESEND_TIMEOUT_SECONDS);

    const isFilled = login !== '' && code !== '';

    useEffect(() => {
        void dispatch(sendCode(login));
    }, [dispatch, login]);

    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (isFilled) {
            void dispatch(submitCode({ login, code }));
        }
    };

    const resend = () => {
        void dispatch(sendCode(login));
        restartCountdown();
    };

    return (
        <form className="login-form" onSubmit={submit}>
            <h2>Подтверждение входа</h2>
            <p>
                Код отправлен на <strong>{email}</strong>
            </p>
            <input
                aria-label="Код подтверждения"
                className={error ? 'input_invalid' : undefined}
                value={code}
                onChange={(event) => setCode(event.target.value)}
            />
            {secondsLeft > 0 ? (
                <span className="login-form__resend">Получить код повторно через 00:{String(secondsLeft).padStart(2, '0')}</span>
            ) : (
                <button type="button" className="link" onClick={resend}>
                    Получить код повторно
                </button>
            )}
            <button className="button button_primary">Войти в личный кабинет</button>
        </form>
    );
};
