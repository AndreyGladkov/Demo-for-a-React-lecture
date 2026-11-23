import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

import { fuseTripped } from '../models/demo';
import { loadPageState } from './loadPageState';
import { useAppDispatch, useAppSelector } from './store';

const FUSE_LIMIT = 5;
const FUSE_WINDOW_MS = 4000;

export const usePageStateLoader = (): void => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const isFuseTripped = useAppSelector((state) => state.demo.fuseTripped);
    const loadedLocationKey = useRef(location.key);
    const recentLoads = useRef<number[]>([]);

    useEffect(() => {
        if (loadedLocationKey.current === location.key || isFuseTripped) {
            return;
        }
        loadedLocationKey.current = location.key;

        const now = Date.now();
        recentLoads.current = [...recentLoads.current.filter((time) => now - time < FUSE_WINDOW_MS), now];
        if (recentLoads.current.length > FUSE_LIMIT) {
            dispatch(fuseTripped());
            return;
        }
        void dispatch(loadPageState(location.pathname + location.search));
    }, [dispatch, isFuseTripped, location.key, location.pathname, location.search]);
};
