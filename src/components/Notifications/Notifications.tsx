import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/store';
import { notificationRemoved, type Notification } from '../../models/notifications';

const NOTIFICATION_TTL_MS = 4000;

const NotificationItem = ({ notification }: { notification: Notification }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timer = setTimeout(() => dispatch(notificationRemoved(notification.id)), NOTIFICATION_TTL_MS);
        return () => clearTimeout(timer);
    }, [dispatch, notification.id]);

    return <div className={`notification notification_${notification.kind}`}>{notification.text}</div>;
};

export const Notifications = () => {
    const notifications = useAppSelector((state) => state.notifications);

    return (
        <div className="notifications">
            {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
            ))}
        </div>
    );
};
