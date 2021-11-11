import express from 'express';

import { writeProblem } from '../service/problemService';

import { isLogin } from '../service/loginService';

const router = express.Router();

router.post('/', isLogin, writeProblem);

export { router };
