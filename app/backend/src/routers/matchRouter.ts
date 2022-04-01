import { Router } from 'express';
import { getInProgress, getAll } from '../controllers/MatchController';

const router = Router();

router.get('/', getAll, getInProgress);

export default router;
