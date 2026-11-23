import { expect, test } from 'vitest';

import { defaultLecturerSettings, type LecturerSettings } from '../../src/models/lecturer';
import { searchVacancies } from '../data/vacancies';
import { buildPageState } from './index';
import { checkConfirmationCode, nextStepAfterCredentials } from './login';

const settings = (patch: Partial<LecturerSettings>): LecturerSettings => ({ ...defaultLecturerSettings, ...patch });
const url = (path: string) => new URL(path, 'http://localhost');

test('routes unknown paths to notFound', () => {
    expect(buildPageState(settings({}), url('/nope')).page.name).toBe('notFound');
});

test.each(['ru', 'kk'] as const)('session language follows the site language %s', (siteLang) => {
    expect(buildPageState(settings({ siteLang }), url('/')).session.lang).toBe(siteLang);
});

test('vacancy creation is forbidden for non-employers', () => {
    expect(buildPageState(settings({ userType: 'applicant' }), url('/employer/vacancy/create')).page.name).toBe(
        'forbidden'
    );
});

test.each([
    { path: '/employer/vacancy/create?fromDraftId=1', status: 'draftLoaded' },
    { path: '/employer/vacancy/create?fromTemplateId=7', status: 'templateLoaded' },
    { path: '/employer/vacancy/create?fromPreparedTemplateId=3', status: 'templateLoaded' },
    { path: '/employer/vacancy/create', status: null },
])('$path → load source status $status', ({ path, status }) => {
    expect(buildPageState(settings({ userType: 'employer' }), url(path)).vacancyCreate?.loadSourceStatus).toBe(status);
});

test.each([
    { sourceStatusGuard: false, loading: true, hasData: false },
    { sourceStatusGuard: true, loading: false, hasData: true },
])('publication types loading = $loading when honest state fix = $sourceStatusGuard', ({ sourceStatusGuard, loading, hasData }) => {
    const employer = settings({ userType: 'employer', fixes: { ...defaultLecturerSettings.fixes, sourceStatusGuard } });
    const { availablePublicationTypes } = buildPageState(employer, url('/employer/vacancy/create')).vacancyCreate!;

    expect(availablePublicationTypes.loading).toBe(loading);
    expect(availablePublicationTypes.data !== null).toBe(hasData);
});

test.each([
    { userType: 'employer', experiment: true, step: 'code' },
    { userType: 'employer', experiment: false, step: 'done' },
    { userType: 'applicant', experiment: true, step: 'done' },
] as const)('$userType with experiment $experiment goes to step $step', ({ userType, experiment, step }) => {
    expect(nextStepAfterCredentials(settings({ userType, experiments: { employer_login_2fa: experiment } }))).toBe(
        step
    );
});

test('accepts only the demo confirmation code', () => {
    expect(checkConfirmationCode('4242')).toEqual({ ok: true });
    expect(checkConfirmationCode('1111')).toEqual({ ok: false, error: { code: '2fa_check' } });
});

test('vacancy search matches titles case-insensitively', () => {
    const titles = new Set(searchVacancies('hh.ru', 'FRONTEND').map((vacancy) => vacancy.title));

    expect([...titles].sort()).toEqual(['Frontend-разработчик', 'Junior Frontend-разработчик', 'Senior Frontend Engineer']);
});
