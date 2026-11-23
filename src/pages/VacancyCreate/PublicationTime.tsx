import { useAppSelector } from '../../app/store';
import { useDemoFix } from '../../app/useDemoFix';
import { environmentLang } from '../../utils/environmentLang';
import { formatPublicationDate } from '../../utils/format';

export const PublicationTime = () => {
    const publicationDate = useAppSelector((state) => state.vacancyCreate.publicationDate);
    const lang = useAppSelector((state) => state.session.lang);
    const localeFromStore = useDemoFix('publicationDateLocale');

    const dateLang = localeFromStore ? lang : environmentLang();

    return (
        <div className="publication-time">
            <span>Дата публикации</span>
            <strong>{formatPublicationDate(publicationDate, dateLang)}</strong>
        </div>
    );
};
