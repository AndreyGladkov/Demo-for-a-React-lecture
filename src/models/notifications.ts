import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

export type NotificationKind = 'success' | 'error' | 'info';

export interface Notification {
    id: string;
    kind: NotificationKind;
    text: string;
}

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [] as Notification[],
    reducers: {
        notificationAdded: {
            reducer: (state, action: PayloadAction<Notification>) => {
                state.push(action.payload);
            },
            prepare: (kind: NotificationKind, text: string) => ({ payload: { id: nanoid(), kind, text } }),
        },
        notificationRemoved: (state, action: PayloadAction<string>) =>
            state.filter((notification) => notification.id !== action.payload),
    },
});

export const { notificationAdded, notificationRemoved } = notificationsSlice.actions;
