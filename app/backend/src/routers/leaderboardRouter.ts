import { Router } from 'express';
import { getAll, filterByHome, filterByAway } from '../controllers/LeaderboardController';

const router = Router();

router.get('/', getAll);
router.get('/home', filterByHome);
router.get('/away', filterByAway);

export default router;
