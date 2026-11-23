import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

import { checkConfirmationCode, sendConfirmationCode } from '../../../server/pages/login';
import { DEMO_CONFIRMATION_CODE } from '../../models/login';
import { isDemoBugEnabled, renderWithStore } from '../../test/renderWithStore';
import { AccountLoginContent } from './AccountLoginContent';

const bff: Record<string, (body: Record<string, string>) => unknown> = {
    '/bff/login': () => ({ step: 'code' }),
    '/bff/login/send-code': ({ login }) => sendConfirmationCode(login),
    '/bff/login/code': ({ code }) => checkConfirmationCode(code),
};

const fetchMock = vi.fn(async (url: string, init?: RequestInit) =>
    Response.json(bff[url](JSON.parse(String(init?.body ?? '{}'))))
);

beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
    vi.unstubAllGlobals();
    fetchMock.mockClear();
});

const submitCode = async (code: string) => {
    const codeInput = screen.getByLabelText('Код подтверждения');
    await userEvent.clear(codeInput);
    await userEvent.type(codeInput, code);
    await userEvent.click(screen.getByRole('button', { name: 'Войти в личный кабинет' }));
};

test('correct confirmation code after a wrong one logs the user in', async () => {
    renderWithStore(<AccountLoginContent />, {
        fixes: { loginFormKey: !isDemoBugEnabled('loginFormKey') },
    });
    await userEvent.click(screen.getByRole('button', { name: 'Войти' }));
    await screen.findByLabelText('Код подтверждения');

    await submitCode('1111');
    expect(await screen.findByText('Неверный код подтверждения')).toBeInTheDocument();

    await submitCode(DEMO_CONFIRMATION_CODE);
    expect(await screen.findByText('Вы вошли')).toBeInTheDocument();
});
