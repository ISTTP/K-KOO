import { createServer } from './server';
import auth from './routes/auth';
import user from './routes/user';
import cake from './routes/cake';
import letter from './routes/letter';
import candle from './routes/candle';
import 'dotenv/config';

const port = process.env.SERVER_PORT;
const server = createServer();

server.listen(port, () => {
  console.log(`api running on ${port}`);
});

server.use('/api', auth);
server.use('/api', user);
server.use('/api', cake);
server.use('/api', letter);
server.use('/api', candle);
