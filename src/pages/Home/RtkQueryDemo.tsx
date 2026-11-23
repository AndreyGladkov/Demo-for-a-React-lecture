import { useState } from 'react';

import { useGetVacanciesQuery } from '../../models/bffApi';
import { VacancyCard } from '../SearchVacancy/VacancyCard';

const VISIBLE_VACANCIES = 3;

const counterText = ({ data, isLoading, isError }: { data?: unknown[]; isLoading: boolean; isError: boolean }) => {
    if (isLoading) {
        return 'Загружаем…';
    }
    if (isError) {
        return 'Не удалось загрузить вакансии';
    }
    return `Найдено вакансий: ${data?.length ?? 0}`;
};

const VacancyCounter = () => {
    const query = useGetVacanciesQuery({ text: 'frontend' });
    return <p className="rtk-demo__counter">{counterText(query)}</p>;
};

const VacancyList = () => {
    const { data = [] } = useGetVacanciesQuery({ text: 'frontend' });
    return (
        <div className="rtk-demo__list">
            {data.slice(0, VISIBLE_VACANCIES).map((vacancy) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
        </div>
    );
};

export const RtkQueryDemo = () => {
    const [isShown, setIsShown] = useState(false);

    return (
        <section className="rtk-demo">
            <h2>RTK Query: два компонента, один запрос</h2>
            <p className="rtk-demo__hint">
                Network: один запрос vacancies на счётчик и список. Скройте и покажите снова в течение минуты — данные
                придут из кеша без запроса.
            </p>
            <button onClick={() => setIsShown((shown) => !shown)}>
                {isShown ? 'Скрыть вакансии' : 'Показать вакансии'}
            </button>
            {isShown && (
                <>
                    <VacancyCounter />
                    <VacancyList />
                </>
            )}
        </section>
    );
};
