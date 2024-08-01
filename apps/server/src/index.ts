import { createServer } from './server';
import { deleteExpiredVerifyCode } from './service/verify';
import auth from './routes/auth';
import user from './routes/user';
import cake from './routes/cake';
import letter from './routes/letter';
import candle from './routes/candle';
import verify from './routes/verify';
import 'dotenv/config';

const port = process.env.SERVER_PORT;
const server = createServer();

server.listen(port, () => {
  console.log(`api running on ${port}`);
  deleteExpiredVerifyCode();
});

server.use('/api', auth);
server.use('/api', user);
server.use('/api', cake);
server.use('/api', letter);
server.use('/api', candle);
server.use('/api', verify);
