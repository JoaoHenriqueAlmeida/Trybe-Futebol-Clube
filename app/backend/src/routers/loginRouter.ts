import { Router } from 'express';
import { userLogin, loginGet } from '../controllers/UserController';
import loginValidationMid from '../middlewares/loginValidationMid';

const router = Router();

router.post('/', loginValidationMid, userLogin);
router.get('/', loginGet);
export default router;
