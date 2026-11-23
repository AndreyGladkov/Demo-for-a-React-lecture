import { useState } from 'react';

import { useAppSelector } from '../../app/store';
import { useDemoFix } from '../../app/useDemoFix';
import { PublicationTime } from './PublicationTime';
import { PublicationTypes } from './PublicationTypes';
import { useSourceStatus } from './useSourceStatus';
import { useSourceStatusWithLoop } from './useSourceStatusWithLoop';

export const VacancyCreatePage = () => {
    const guardFixed = useDemoFix('sourceStatusGuard');
    const [useSourceStatusVariant] = useState(() => (guardFixed ? useSourceStatus : useSourceStatusWithLoop));
    useSourceStatusVariant();
    const draft = useAppSelector((state) => state.vacancyCreate.draft);

    return (
        <form className="vacancy-create" onSubmit={(event) => event.preventDefault()}>
            <h1>Новая вакансия</h1>
            <label className="vacancy-create__field">
                Название
                <input defaultValue={draft.title} />
            </label>
            <label className="vacancy-create__field">
                Описание
                <textarea defaultValue={draft.description} rows={4} />
            </label>
            <PublicationTypes />
            <PublicationTime />
            <button className="button button_primary">Опубликовать</button>
        </form>
    );
};
