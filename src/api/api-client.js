

async function client(url, { payload, ...customConfig } = {}) {
    const config = {
        method: payload ? 'POST' : 'GET',
        body: payload ? JSON.stringify(payload) : undefined,
        ...customConfig
    }

    const response = await fetch(url, config);
    const data = await response.json();
    return data;

}

export { client }