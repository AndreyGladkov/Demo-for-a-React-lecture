import { fireEvent, screen } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';

import { renderWithStore } from '../../test/renderWithStore';
import { BottomSheet } from './BottomSheet';

const keydownListenerCount = (spy: { mock: { calls: unknown[][] } }) =>
    spy.mock.calls.filter(([type]) => type === 'keydown').length;

afterEach(() => {
    vi.restoreAllMocks();
});

test('closes on Escape', () => {
    const onClose = vi.fn();
    renderWithStore(
        <BottomSheet title="Вакансии" onClose={onClose}>
            <button>Откликнуться</button>
        </BottomSheet>,
        { fixes: { bottomSheetCleanup: true } }
    );

    fireEvent.keyDown(screen.getByText('Откликнуться'), { key: 'Escape' });

    expect(onClose).toHaveBeenCalledOnce();
});

test.each([
    { bottomSheetCleanup: true, removedListeners: 1 },
    { bottomSheetCleanup: false, removedListeners: 0 },
])('unmount removes the body keydown listener: cleanup fixed = $bottomSheetCleanup', ({ bottomSheetCleanup, removedListeners }) => {
    const addSpy = vi.spyOn(document.body, 'addEventListener');
    const removeSpy = vi.spyOn(document.body, 'removeEventListener');
    const { unmount } = renderWithStore(
        <BottomSheet title="Вакансии" onClose={() => {}}>
            content
        </BottomSheet>,
        { fixes: { bottomSheetCleanup } }
    );

    unmount();

    expect(keydownListenerCount(addSpy)).toBe(1);
    expect(keydownListenerCount(removeSpy)).toBe(removedListeners);
});
