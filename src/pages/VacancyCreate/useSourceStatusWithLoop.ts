import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../app/store';
import { notificationAdded } from '../../models/notifications';
import { loadSourceStatusReset } from '../../models/vacancyCreate';
import { hrefWithoutSourceParameters, sourceStatusNotifications } from './sourceParameters';

export const useSourceStatusWithLoop = (): void => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const status = useAppSelector((state) => state.vacancyCreate.loadSourceStatus);

    useEffect(() => {
        if (!status) {
            return;
        }

        navigate(hrefWithoutSourceParameters(location), { replace: true });

        dispatch(notificationAdded(...sourceStatusNotifications[status]));
        dispatch(loadSourceStatusReset());
    }, [dispatch, navigate, location, status]);
};
