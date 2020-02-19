const express = require('express');
const router = express.Router();
const userDb = require('./userDb');
const postDb = require('../posts/postDb');
const postRouter = require('../posts/postRouter');

router.use('/', postRouter);

router.post('/', validateUser(), async (req, res, next) => {
	try {
		const userName = {
			name: req.body.name
		};
		const add = await userDb.insert(userName);

		res.status(201).json(add);
	} catch (error) {
		next(error);
	}
});

router.post(
	'/:id/posts',
	validateUserId,
	validatePost,
	async (req, res, next) => {
		try {
			const newPost = {
				user_id: req.user.id,
				text: req.body.text
			};
			const post = await postDb.insert(newPost);
			res.status(201).json(post);
		} catch (err) {
			console.log(err);
			next(err);
		}
	}
);

router.get('/', async (req, res, next) => {
	try {
		const post = await userDb.get();
		res.status(200).json(post);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', validateUserId, (req, res, next) => {
	try {
		res.status(200).json(req.user);
	} catch (err) {
		console.log(err);
		next(err);
	}
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
	try {
		const getUser = await userDb.getUserPosts(req.user.id);
		if (getUser) {
			res.status(200).json(getUser);
		} else {
			res.status(400).json({ message: 'error finding ID of specific user' });
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
});

router.delete('/:id', validateUserId, async (req, res, next) => {
	try {
		const removeUser = await userDb.remove(req.user.id);
		res.status(204).end();
	} catch (err) {
		console.log(err);
		next(err);
	}
});

router.put('/:id', validateUserId, validateUser(), async (req, res, next) => {
	const { id } = req.user;
	try {
		const updateUser = await userDb.update(id, req.body);
		res.status(200).json(updateUser);
	} catch (err) {
		console.log(err);
		next(err);
	}
});

//custom middleware

function validateUserId(req, res, next) {
	userDb
		.getById(req.params.id)
		.then((user) => {
			if (user) {
				console.log(user);
				req.user = user;
				next();
			} else {
				res.status(404).json({ message: 'invalid user id' });
			}
		})
		.catch((err) => {
			next(err);
		});
}

function validateUser() {
	return (req, res, next) => {
		if (!req.body) {
			return res.status(400).json({ message: 'missing user data' });
		}

		if (!req.body.name) {
			return res.status(400).json({ message: 'missing required name field' });
		}
		next();
	};
}

function validatePost(req, res, next) {
	if (!req.body) {
		return res.status(400).json({ message: 'missing post data' });
	}
	if (!req.body.text) {
		return res.status(400).json({ message: 'missing required text field' });
	}
	next();
}

module.exports = router;
