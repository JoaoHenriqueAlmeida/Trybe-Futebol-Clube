import { Router } from 'express';
import { getAll, getById } from '../controllers/ClubController';
import clubIdMiddleware from '../middlewares/clubIdMiddleware';

const router = Router();

router.get('/', getAll);
router.get('/:id', clubIdMiddleware, getById);

export default router;
