import { Router } from 'express';
import { userLogin, userAuthentication } from '../controllers/UserController';
import loginValidationMid from '../middlewares/loginValidationMid';

const router = Router();

router.post('/', loginValidationMid, userLogin);
router.get('/validate', userAuthentication);

export default router;
