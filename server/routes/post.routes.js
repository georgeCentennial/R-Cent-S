import express from 'express'
import postCtrl from '../controllers/post.controller.js'
import authCtrl from '../controllers/auth.controller.js';
//import authCtrl from '../controllers/auth.controller.js'       //updated  20250313
const router = express.Router()
router.route('/api/posts')
.get(postCtrl.list)
.post(postCtrl.create)

/*             //updated(4)   20250313
router.route('/api/posts/:postId')
.get(authCtrl.requireSignin, postCtrl.read)
.put(authCtrl.requireSignin, authCtrl.hasAuthorization,postCtrl.update)
.delete(authCtrl.requireSignin, authCtrl.hasAuthorization,postCtrl.remove)
*/
router.route('/api/posts')
.post(postCtrl.create)
.get(postCtrl.list)
.delete(postCtrl.removeMany)
router.param('postId', postCtrl.postByID)
router.route('/api/posts/:postId')
.get(authCtrl.requireSignin, postCtrl.read) 
.put(authCtrl.requireSignin, postCtrl.isOwner, postCtrl.update) //put auth
.delete(authCtrl.requireSignin, postCtrl.isOwner, postCtrl.remove) //put auth

export default router
