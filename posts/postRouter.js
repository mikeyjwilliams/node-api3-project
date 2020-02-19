const express = require('express');
const postDb = require('./postDb');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const posts = await postDb.get();
		//console.log(posts);
		res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		next(err);
	}
});

router.get('/:id', validatePostId(), async (req, res, next) => {
	try {
		const post = await postDb.getById(req.post.id);
		res.status(200).json(post);
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// router.delete('/:id', (req, res) => {
// 	// do your magic!
// });

// router.put('/:id', (req, res) => {
// 	// do your magic!
// });

// custom middleware

function validatePostId(postId) {
	return (req, res, next) => {
		postDb
			.getById(req.params.id)
			.then((post) => {
				if (post) {
					req.post = post;

					next();

					//console.log('postId', req.post);
				} else {
					return res
						.status(400)
						.json({ message: 'specific post ID not found' });
				}
			})
			.catch((err) => {
				console.log(err);
				next(err);
			});
	};
}

module.exports = router;
