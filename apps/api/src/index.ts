import 'dotenv/config';

import { log } from '@repo/logger/src';

import { createServer } from './server';

const port = 3001;
const server = createServer();

server.listen(port, () => {
    log(`api running on ${port}`);
});
