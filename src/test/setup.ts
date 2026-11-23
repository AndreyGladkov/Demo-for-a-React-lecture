import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Node's Request (undici) throws on relative URLs, while a browser resolves them against the page.
// fetchBaseQuery({ baseUrl: '/bff' }) builds such a Request, so tests need the browser behaviour.
class BrowserLikeRequest extends Request {
    constructor(input: RequestInfo | URL, init?: RequestInit) {
        super(typeof input === 'string' ? new URL(input, window.location.href) : input, init);
    }
}
globalThis.Request = BrowserLikeRequest;

afterEach(() => {
    cleanup();
});
