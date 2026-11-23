import { useEffect, useRef, type RefObject } from 'react';

export const useEscapeToClose = (sheetRef: RefObject<HTMLElement | null>, onClose: () => void): void => {
    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        const sheet = sheetRef.current;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && sheet?.isConnected) {
                onCloseRef.current();
            }
        };
        document.body.addEventListener('keydown', handleKeyDown);
        return () => document.body.removeEventListener('keydown', handleKeyDown);
    }, [sheetRef]);
};
