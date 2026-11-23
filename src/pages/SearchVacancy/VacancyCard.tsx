import type { Vacancy } from '../../models/search';
import { formatSalary } from '../../utils/format';

export const VacancyCard = ({ vacancy }: { vacancy: Vacancy }) => {
    return (
        <article className="vacancy-card">
            <h3 className="vacancy-card__title">{vacancy.title}</h3>
            <div className="vacancy-card__salary">{formatSalary(vacancy.salary.from, vacancy.salary.currency)}</div>
            <div className="vacancy-card__company">
                {vacancy.company} · {vacancy.city}
            </div>
            <ul className="vacancy-card__tags">
                {vacancy.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                ))}
            </ul>
            <div className="vacancy-card__actions">
                <button>Откликнуться</button>
                <button>В избранное</button>
            </div>
        </article>
    );
};
