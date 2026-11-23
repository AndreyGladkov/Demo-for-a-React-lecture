import { useAppSelector } from '../../app/store';
import { useDemoFix } from '../../app/useDemoFix';
import { AccountLoginForm } from './AccountLoginForm';

export const AccountLoginContent = () => {
    const loginError = useAppSelector((state) => state.login.error);
    const stableKey = useDemoFix('loginFormKey');

    const form = <AccountLoginForm key={stableKey ? 'account-login-form' : undefined} />;

    if (loginError?.code === '2fa_check') {
        return (
            <>
                <div className="login-error">Неверный код подтверждения</div>
                {form}
            </>
        );
    }
    return form;
};
