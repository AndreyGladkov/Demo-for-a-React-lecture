import { Link } from 'react-router';

import { useAppSelector } from '../../app/store';
import type { UserType } from '../../models/lecturer';
import type { Lang } from '../../models/session';
import { applyLecturerSettings } from '../../utils/lecturerCookie';

const userTypeNames: Record<UserType, string> = {
    anonymous: 'Аноним',
    applicant: 'Соискатель',
    employer: 'Работодатель',
};

const langNames: Record<Lang, string> = {
    ru: 'Рус',
    kk: 'Қаз',
};

export const Header = () => {
    const { site, userType, lang } = useAppSelector((state) => state.session);
    const lecturer = useAppSelector((state) => state.lecturer);

    const switchLang = (siteLang: Lang) => {
        if (siteLang !== lang) {
            applyLecturerSettings({ ...lecturer, siteLang });
        }
    };

    return (
        <header className="header">
            <Link to="/" className="header__logo">
                <span className="header__logo-mark">hh</span>
                <span className="header__site">mini · {site}</span>
            </Link>
            <nav className="header__nav">
                <Link to="/search/vacancy">Поиск вакансий</Link>
                {userType === 'employer' && <Link to="/employer/vacancy/create?fromTemplateId=7">Создать вакансию</Link>}
                <Link to="/account/login">Войти</Link>
            </nav>
            <div className="header__user">
                <div className="header__lang" role="group" aria-label="Язык сайта">
                    {(Object.keys(langNames) as Lang[]).map((siteLang) => (
                        <button
                            key={siteLang}
                            className="link"
                            aria-pressed={siteLang === lang}
                            onClick={() => switchLang(siteLang)}
                        >
                            {langNames[siteLang]}
                        </button>
                    ))}
                </div>
                <span>{userTypeNames[userType]}</span>
            </div>
        </header>
    );
};
