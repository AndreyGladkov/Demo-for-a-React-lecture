import { useState, type ReactNode } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/store';
import {
    fixToggled,
    type BrowserLocale,
    type DemoFix,
    type LecturerSettings,
    type Site,
    type UserType,
} from '../../models/lecturer';
import { DEMO_CONFIRMATION_CODE } from '../../models/login';
import type { Lang } from '../../models/session';
import { applyLecturerSettings, resetLecturerSettings, saveLecturerSettings } from '../../utils/lecturerCookie';

const fixLabels: Record<DemoFix, string> = {
    loginFormKey: '2FA: стабильный key у формы',
    publicationDateLocale: 'Дата: локаль из стора',
    sourceStatusGuard: 'Черновик: честный стейт и guard',
    bottomSheetCleanup: 'BottomSheet: cleanup слушателя',
};

const fixesApplyWithoutReload: DemoFix[] = ['bottomSheetCleanup'];

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
    <label className="lecturer-panel__row">
        <span>{label}</span>
        {children}
    </label>
);

export const LecturerPanel = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.lecturer);
    const counters = useAppSelector((state) => state.demo);
    const [expanded, setExpanded] = useState(true);

    const update = (patch: Partial<LecturerSettings>) => applyLecturerSettings({ ...settings, ...patch });

    const toggleFix = (fix: DemoFix) => {
        const next = { ...settings, fixes: { ...settings.fixes, [fix]: !settings.fixes[fix] } };
        if (fixesApplyWithoutReload.includes(fix)) {
            saveLecturerSettings(next);
            dispatch(fixToggled(fix));
        } else {
            applyLecturerSettings(next);
        }
    };

    if (!expanded) {
        return (
            <button className="lecturer-panel lecturer-panel_collapsed" onClick={() => setExpanded(true)}>
                Панель лектора
            </button>
        );
    }

    return (
        <aside className="lecturer-panel">
            <div className="lecturer-panel__header">
                <strong>Панель лектора</strong>
                <button onClick={() => setExpanded(false)}>свернуть</button>
            </div>

            <Row label="Пользователь">
                <select
                    value={settings.userType}
                    onChange={(event) => update({ userType: event.target.value as UserType })}
                >
                    <option value="anonymous">Аноним</option>
                    <option value="applicant">Соискатель</option>
                    <option value="employer">Работодатель</option>
                </select>
            </Row>
            <Row label="Сайт">
                <select value={settings.site} onChange={(event) => update({ site: event.target.value as Site })}>
                    <option value="hh.ru">hh.ru</option>
                    <option value="hh.kz">hh.kz</option>
                </select>
            </Row>
            <Row label="Язык сайта">
                <select value={settings.siteLang} onChange={(event) => update({ siteLang: event.target.value as Lang })}>
                    <option value="ru">русский</option>
                    <option value="kk">қазақша</option>
                </select>
            </Row>
            <Row label="Локаль браузера">
                <select
                    value={settings.browserLocale}
                    onChange={(event) => update({ browserLocale: event.target.value as BrowserLocale })}
                >
                    <option value="ru-RU">ru-RU</option>
                    <option value="kk-KZ">kk-KZ</option>
                </select>
            </Row>
            <Row label="Эксперимент employer_login_2fa">
                <input
                    type="checkbox"
                    checked={settings.experiments.employer_login_2fa}
                    onChange={(event) =>
                        update({ experiments: { ...settings.experiments, employer_login_2fa: event.target.checked } })
                    }
                />
            </Row>
            <Row label="StrictMode">
                <input
                    type="checkbox"
                    checked={settings.strictMode}
                    onChange={(event) => update({ strictMode: event.target.checked })}
                />
            </Row>

            <div className="lecturer-panel__section">Исправлено</div>
            {(Object.keys(fixLabels) as DemoFix[]).map((fix) => (
                <Row key={fix} label={fixLabels[fix]}>
                    <input type="checkbox" checked={settings.fixes[fix]} onChange={() => toggleFix(fix)} />
                </Row>
            ))}

            <div className="lecturer-panel__section">Счётчики</div>
            <dl className="lecturer-panel__counters">
                <dt>Запросов в BFF</dt>
                <dd>{counters.bffRequests}</dd>
                <dt>Отправлено кодов</dt>
                <dd>{counters.codesSent}</dd>
                <dt>Проверок кода</dt>
                <dd>{counters.codeChecks}</dd>
                <dt>Открытий BottomSheet</dt>
                <dd>{counters.sheetOpens}</dd>
            </dl>
            <p className="lecturer-panel__hint">Верный код подтверждения: {DEMO_CONFIRMATION_CODE}</p>
            <button
                onClick={() => {
                    resetLecturerSettings();
                    window.location.reload();
                }}
            >
                Сбросить настройки
            </button>
        </aside>
    );
};
