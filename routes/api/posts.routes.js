const express = require('express');
const router = express.Router();
const Post = require('../../models/post.model');

// Index Posts Route - GET
router.route('/').get((req, res) => {
  Post.find((err, docs) => {
    if (!err) res.status(200).json(docs);
    else res.status(400).json(err);
  });
});
// Get by ID Post Route - GET
router.route('/:id').get((req, res) => {
  Post.findOne({ _id: req.params.id }, (err, post) => {
    if (!err) res.status(200).json(post);
    else res.status(404).json(err);
  });
});
// Create Post Route - POST
router.route('/').post((req, res) => {
  const post = new Post({
    text: req.body.text
  });
  post.save((err, doc) => {
    if (!err) res.status(201).json(doc);
    else res.status(400).json(err);
  });
});
// Update Post by ID Route - PUT
router.route('/:id').put((req, res) => {
  const post = {
    text: req.body.text
  };
  Post.findOneAndUpdate(
    { _id: req.params.id },
    { $set: post },
    { new: true, runValidators: true },
    (err, doc) => {
      if (!err) res.status(200).json(doc);
      else res.status(400).json(err);
    }
  );
});
// Delete Post by ID Route - DELETE
router.route('/:id').delete((req, res) => {
  Post.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
    if (!err) res.status(200).json(doc);
    else res.status(400).json(err);
  });
});
// UpVote Post by ID Route - PUT
router.route('/:id/upvote').patch((req, res) => {
  const query = { _id: req.params.id };
  Post.findOne(query, (err, doc) => {
    if (!err) {
      const upvoteCount = doc.upvotes + 1;
      const post = { upvotes: upvoteCount };
      Post.findOneAndUpdate(
        query,
        { $set: post },
        { new: true, runValidators: true },
        (err, doc) => {
          if (!err) res.status(200).json(doc);
          else res.status(400).json(err);
        }
      );
    } else res.status(404).json(err);
  });
});

module.exports = router;
