/* eslint-disable prefer-destructuring */
import fs from 'fs';
import path from 'path';

import { Server } from 'socket.io';
import * as workerpool from 'workerpool';
import { debug } from '../service/debugService';
import { ProblemCodeModel } from './mongoConfig';

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const chaiPath = path.dirname(require.resolve('chai'));
const chaiString = fs.readFileSync(path.join(chaiPath, 'chai.js')).toString();

const gradingWithWorkerpool = ({ pool, socket, code, testCode }) => {
  pool
    .exec(debug.runner, [{ chaiString, code, testCode }])
    .then(result => {
      socket.emit('result', result);
    })
    .catch(err => {
      socket.emit('error', err);
    });
};

const getTestCode = async problemId => {
  const problemCodeData = await ProblemCodeModel.findOne({ _id: problemId });
  return problemCodeData.testCode;
};

export const socketConnection = (httpServer, sessionConfig) => {
  const pool = workerpool.pool();

  const io = new Server(httpServer, {
    cors: { origin: process.env.ORIGIN_URL, credentials: true },
  });
  io.use((socket, next) => {
    sessionConfig(socket.request, {}, next);
  });

  io.on('connection', socket => {
    console.log(
      'handshake',
      (socket.request as unknown as { session: unknown })?.session,
    );
    socket.on('submit', async ({ code, id }) => {
      const testCode = await getTestCode(id);
      gradingWithWorkerpool({ pool, socket, code, testCode: [...testCode] });
    });

    socket.once('forceDisconnect', () => {
      socket.disconnect(true);
    });
  });
};
