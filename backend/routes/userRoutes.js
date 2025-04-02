import express from 'express';
import { loginUser, signUpUser, getUserDetailsByUsername, changePassword, getdetails } from '../controllers/userController.js';

const router = express.Router();

// Route for user login
router.post('/login', loginUser);

// Route for user sign-up
router.post('/signup', signUpUser);

router.get('/:username', getUserDetailsByUsername);

router.get('/fetch/:username', getdetails);

router.post('/change-password', changePassword);

export default router;
