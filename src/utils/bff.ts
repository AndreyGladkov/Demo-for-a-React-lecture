export const getJson = async <T>(url: string): Promise<T> => {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    return (await response.json()) as T;
};

export const postJson = async <T>(url: string, body: unknown): Promise<T> => {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
    });
    return (await response.json()) as T;
};
