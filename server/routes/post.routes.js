import express from 'express'
import postCtrl from '../controllers/post.controller.js'
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
router.route('/api/posts').post(postCtrl.create)
router.route('/api/posts').get(postCtrl.list)
router.route('/api/posts').delete(postCtrl.removeMany)
router.param('postId', postCtrl.postByID)
router.route('/api/posts/:postId').get(postCtrl.read)
router.route('/api/posts/:postId').put(postCtrl.update)
router.route('/api/posts/:postId').delete(postCtrl.remove)
export default router
