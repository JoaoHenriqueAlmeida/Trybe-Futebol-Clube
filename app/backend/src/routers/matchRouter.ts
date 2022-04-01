import { Router } from 'express';
import matchValidationMiddleware from '../middlewares/matchValidationMiddleware';
import { getInProgress, getAll, createNewMatch } from '../controllers/MatchController';

const router = Router();

router.get('/', getAll, getInProgress);
router.post('', matchValidationMiddleware, createNewMatch);

export default router;
