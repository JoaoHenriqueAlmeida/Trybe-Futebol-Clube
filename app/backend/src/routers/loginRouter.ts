import { Router } from 'express';
import { userLogin } from '../controllers/UserController';
import loginValidationMid from '../middlewares/loginValidationMid';

const router = Router();

router.post('/', loginValidationMid, userLogin);
export default router;
