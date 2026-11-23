import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/store';
import { fetchPublicationTypes } from '../../models/vacancyCreate';
import { formatMoney } from '../../utils/format';

export const PublicationTypes = () => {
    const dispatch = useAppDispatch();
    const { loading, data } = useAppSelector((state) => state.vacancyCreate.availablePublicationTypes);
    const site = useAppSelector((state) => state.session.site);
    const currency = site === 'hh.kz' ? 'KZT' : 'RUB';

    useEffect(() => {
        if (loading) {
            void dispatch(fetchPublicationTypes());
        }
    }, [dispatch, loading]);

    if (loading || !data) {
        return <div className="spinner" aria-label="Загрузка типов публикации" />;
    }

    return (
        <fieldset className="publication-types">
            <legend>Тип публикации</legend>
            {data.map((type, index) => (
                <label key={type.id}>
                    <input type="radio" name="publicationType" defaultChecked={index === 0} />
                    {type.name} — {formatMoney(type.price, currency)}
                </label>
            ))}
        </fieldset>
    );
};
