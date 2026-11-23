import { useState } from 'react';
import { flushSync } from 'react-dom';

import { useAppDispatch, useAppSelector } from '../../app/store';
import { BottomSheet } from '../../components/BottomSheet/BottomSheet';
import { sheetOpened } from '../../models/demo';
import { VacancyCard } from './VacancyCard';

const STRESS_ITERATIONS = 10;

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));

export const SearchVacancyPage = () => {
    const dispatch = useAppDispatch();
    const { total, vacancies } = useAppSelector((state) => state.search);
    const [sheetOpen, setSheetOpen] = useState(false);

    const openSheet = () => {
        dispatch(sheetOpened());
        setSheetOpen(true);
    };

    const openAndCloseRepeatedly = async () => {
        for (let iteration = 0; iteration < STRESS_ITERATIONS; iteration += 1) {
            flushSync(openSheet);
            await nextFrame();
            flushSync(() => setSheetOpen(false));
            await nextFrame();
        }
    };

    return (
        <section className="search">
            <h1>Работа frontend-разработчиком</h1>
            <div className="search__filters">
                <span className="chip">Зарплата от 150 000</span>
                <span className="chip">Удалённо</span>
                <span className="chip">Полный день</span>
            </div>
            <button className="button button_primary" onClick={openSheet}>
                Показать {total} вакансий
            </button>
            <button className="button" onClick={openAndCloseRepeatedly}>
                Открыть и закрыть ×{STRESS_ITERATIONS}
            </button>
            {sheetOpen && (
                <BottomSheet title={`Найдено ${total} вакансий`} onClose={() => setSheetOpen(false)}>
                    {vacancies.map((vacancy) => (
                        <VacancyCard key={vacancy.id} vacancy={vacancy} />
                    ))}
                </BottomSheet>
            )}
        </section>
    );
};
