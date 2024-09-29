import express from 'express';

export const NotFound = (req: express.Request, res: express.Response) => {
    res.status(404).json({
        status: 'error',
        message: 'Oops! We couldn’t find that endpoint. It seems you are wandering off the beaten path.',
        suggestion: 'Try checking the URL for typos, or visit our documentation for available endpoints!',
        documentationLink: 'Not Available'
    });
}

export const Welcome = (req: express.Request, res: express.Response) => {
    const message = `
     __    __     _                            _
    / / /\\ \\ \\___| | ___ ___  _ __ ___   ___  | |
    \\ \\/  \\/ / _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\ | |
     \\  /\\  /  __/ | (_| (_) | | | | | |  __/ |_|
      \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___| (_)

    `;
    res.status(200).send(`<pre>${message}</pre>`);
}