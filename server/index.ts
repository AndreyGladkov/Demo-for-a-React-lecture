import { readFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

import cookieParser from 'cookie-parser';
import express, { type Request } from 'express';
import { createServer } from 'vite';

import { LECTURER_COOKIE, parseLecturerSettings } from '../src/models/lecturer';
import type { PageName } from '../src/models/page';
import type { PageState } from '../src/models/pageState';
import { searchVacancies } from './data/vacancies';
import { buildPageState } from './pages';
import { checkConfirmationCode, nextStepAfterCredentials, sendConfirmationCode } from './pages/login';
import { publicationTypes } from './pages/vacancyCreate';

const PORT = Number(process.env.PORT ?? 4040);
const BFF_LATENCY_MS = 150;
const VACANCIES_LATENCY_MS = 600;

const lecturerSettings = (req: Request) => parseLecturerSettings(req.cookies[LECTURER_COOKIE]);
const requestUrl = (path: string) => new URL(path, `http://localhost:${PORT}`);
const serializeState = (state: PageState) => JSON.stringify(state).replace(/</g, '\\u003c');
const httpStatuses: Partial<Record<PageName, number>> = { forbidden: 403, notFound: 404 };

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const app = express();

app.use(vite.middlewares);
app.use(express.json());
app.use(cookieParser());

app.get('/bff/page', async (req, res) => {
    await delay(BFF_LATENCY_MS);
    res.json(buildPageState(lecturerSettings(req), requestUrl(String(req.query.url))));
});

app.post('/bff/login', (req, res) => {
    res.json({ step: nextStepAfterCredentials(lecturerSettings(req)) });
});

app.post('/bff/login/send-code', (req, res) => {
    const result = sendConfirmationCode(String(req.body.login ?? ''));
    res.status(result.sent ? 200 : 400).json(result);
});

app.post('/bff/login/code', (req, res) => {
    res.json(checkConfirmationCode(String(req.body.code)));
});

app.get('/bff/vacancies', async (req, res) => {
    await delay(VACANCIES_LATENCY_MS);
    res.json(searchVacancies(lecturerSettings(req).site, String(req.query.text ?? '')));
});

app.get('/bff/vacancy/publication-types', async (req, res) => {
    await delay(300);
    res.json(publicationTypes(lecturerSettings(req).site));
});

app.use(async (req, res, next) => {
    if (req.method !== 'GET') {
        next();
        return;
    }
    try {
        const state = buildPageState(lecturerSettings(req), requestUrl(req.originalUrl));
        const template = await vite.transformIndexHtml(req.originalUrl, await readFile('index.html', 'utf-8'));
        const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
        const html = template
            .replace('<!--app-html-->', render(req.originalUrl, state))
            .replace('<!--initial-state-->', serializeState(state));
        res.status(httpStatuses[state.page.name] ?? 200)
            .type('html')
            .send(html);
    } catch (error) {
        vite.ssrFixStacktrace(error as Error);
        next(error);
    }
});

app.listen(PORT, () => {
    console.log(`mini-hh: http://localhost:${PORT}`);
});
