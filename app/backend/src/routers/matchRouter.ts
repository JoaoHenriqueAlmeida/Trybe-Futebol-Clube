import { Router } from 'express';
import matchValidationMiddleware from '../middlewares/matchValidationMiddleware';
import {
  getInProgress,
  getAll,
  createNewMatch,
  updateById,
  finishById } from '../controllers/MatchController';

const router = Router();

router.get('/', getAll, getInProgress);
router.post('/', matchValidationMiddleware, createNewMatch);
router.patch('/:id', updateById);
router.patch('/:id/finish', finishById);

export default router;
