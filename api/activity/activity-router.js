const router = require('express').Router();

router.get('/user_activity', ActivityController.getActivity)