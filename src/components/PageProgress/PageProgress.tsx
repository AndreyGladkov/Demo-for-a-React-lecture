import { useAppSelector } from '../../app/store';

export const PageProgress = () => {
    const loading = useAppSelector((state) => state.page.loading);
    const fuseTripped = useAppSelector((state) => state.demo.fuseTripped);

    return (
        <>
            {loading && <div className="page-progress" />}
            {fuseTripped && (
                <div className="fuse-banner" role="alert">
                    Предохранитель: страница перезагрузилась больше 5 раз за 4 секунды, цикл остановлен
                </div>
            )}
        </>
    );
};
