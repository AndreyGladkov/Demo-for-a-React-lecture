import type { LecturerSettings } from '../../src/models/lecturer';
import { DEMO_CONFIRMATION_CODE, type LoginError, type LoginStep } from '../../src/models/login';
import type { PageHandler } from './types';

export const loginPage: PageHandler = () => ({
    page: { name: 'login', loading: false },
    login: { step: 'credentials', email: '', error: null },
});

export const nextStepAfterCredentials = (settings: LecturerSettings): LoginStep =>
    settings.userType === 'employer' && settings.experiments.employer_login_2fa ? 'code' : 'done';

export const sendConfirmationCode = (login: string): { sent: boolean } => ({ sent: login !== '' });

export const checkConfirmationCode = (code: string): { ok: boolean; error?: LoginError } =>
    code === DEMO_CONFIRMATION_CODE ? { ok: true } : { ok: false, error: { code: '2fa_check' } };
