import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()
router.route('/api/users')
.get(userCtrl.list)
.post(userCtrl.create)

router.route('/api/users/:userId')
.get(userCtrl.read)
.put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
.delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID) 

export default router;
