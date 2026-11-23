import { Link } from 'react-router';

import { RtkQueryDemo } from './RtkQueryDemo';

export const HomePage = () => (
    <section className="home">
        <h1>mini-hh</h1>
        <p>Уменьшенная копия hh.ru: BFF собирает стейт страницы, сервер рендерит HTML, клиент гидрирует.</p>
        <ol className="home__scenarios">
            <li>
                <Link to="/account/login">Вход работодателя с подтверждением по коду</Link>
                <span>Пользователь «Работодатель», эксперимент employer_login_2fa включён</span>
            </li>
            <li>
                <Link to="/employer/vacancy/create?fromTemplateId=7">Создание вакансии из шаблона</Link>
                <span>Пользователь «Работодатель», сайт hh.kz, локаль браузера kk-KZ</span>
            </li>
            <li>
                <Link to="/employer/vacancy/create?fromPreparedTemplateId=3">Создание вакансии из готового шаблона</Link>
                <span>Новый источник черновика, о котором забыли на клиенте</span>
            </li>
            <li>
                <Link to="/search/vacancy">Поиск вакансий в BottomSheet</Link>
                <span>DevTools → Performance monitor и Memory</span>
            </li>
        </ol>
        <RtkQueryDemo />
    </section>
);
