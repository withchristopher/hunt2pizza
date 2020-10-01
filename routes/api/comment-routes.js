const router = require('express').Router();
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');

// add /api/comments/:pizzaId
router.route('/:pizzaId').post(addComment);

// add /api/comments/:pizzaId/:commentId
// /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').put(addReply).delete(removeComment);

router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;