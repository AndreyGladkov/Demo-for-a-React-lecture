import { useRef, useState, type ReactNode } from 'react';

import { useDemoFix } from '../../app/useDemoFix';
import { useEscapeToClose } from './useEscapeToClose';
import { useEscapeToCloseWithLeak } from './useEscapeToCloseWithLeak';

interface BottomSheetProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
}

export const BottomSheet = ({ title, onClose, children }: BottomSheetProps) => {
    const cleanupFixed = useDemoFix('bottomSheetCleanup');
    const [useEscape] = useState(() => (cleanupFixed ? useEscapeToClose : useEscapeToCloseWithLeak));
    const sheetRef = useRef<HTMLDivElement>(null);
    useEscape(sheetRef, onClose);

    return (
        <div className="bottom-sheet__overlay" onClick={onClose}>
            <div
                ref={sheetRef}
                className="bottom-sheet"
                role="dialog"
                aria-label={title}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="bottom-sheet__header">
                    <strong>{title}</strong>
                    <button onClick={onClose} aria-label="Закрыть">
                        ✕
                    </button>
                </div>
                <div className="bottom-sheet__content">{children}</div>
            </div>
        </div>
    );
};
