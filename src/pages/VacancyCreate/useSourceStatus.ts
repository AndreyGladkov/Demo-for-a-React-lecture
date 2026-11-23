import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../app/store';
import { notificationAdded } from '../../models/notifications';
import { loadSourceStatusReset } from '../../models/vacancyCreate';
import { hrefOf, hrefWithoutSourceParameters, sourceStatusNotifications } from './sourceParameters';

export const useSourceStatus = (): void => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const status = useAppSelector((state) => state.vacancyCreate.loadSourceStatus);

    useEffect(() => {
        if (!status) {
            return;
        }

        const currentHref = hrefOf(location);
        const nextHref = hrefWithoutSourceParameters(location);
        if (currentHref !== nextHref) {
            navigate(nextHref, { replace: true });
        }

        dispatch(notificationAdded(...sourceStatusNotifications[status]));
        dispatch(loadSourceStatusReset());
    }, [dispatch, navigate, location, status]);
};
