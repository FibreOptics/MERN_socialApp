import express from 'express';
import Comment from '../../models/comment';

const router = express.Router();

//now we can set the route path & initialize the API
//test http://port:xxxx/
router.get('/', (req, res) => {
    res.json({ message: 'API Init =]' });
  });

//@route  HTTP GET api/comments
//@descr  GET all comments
//@access Public
router.get('/comments', (req, res) => {
    Comment
        .find((err, comments) => {
            if (err){
                return res.json({ success: false, error: err });
            }
            return res.json({ success: true, data: comments });})
        //.sort({date:-1}) //descending sort
        //return promise
        //.then(()=>res.json(comments))
        ;
  });

//@route  HTTP POST api/comments
//@descr  POST a comment(s)
//@access Public(should be private?)
router.post('/comments', (req, res) => {
    console.log(req.body);
    const comment = new Comment({
        author: req.body.author,
        text: req.body.text,
    });
    //body parser lets us use the req.body
    /*const { author, text } = req.body; // *object destructuring
    console.log({author});
    console.log({text});
    console.log({comment}); */
    /* if (!author || !text) {
      // we should throw an error. we can do
      //this check on the front end
      return res.json({
        success: false,
        error: 'You must provide an author and comment'
      });
    } */
    //comment.author = author;
    //comment.text = text;    
    comment.save(err => {
        if (err) {
          return res.json({ success: false, error: err });
        }
        return res.json({ success: true });
        //return res.json(201,'posted');
    });
  });

  router.put('/comments/:commentId', (req, res) => {
    const { commentId } = req.params;
    if (!commentId) {
      return res.json({ success: false, error: 'No comment id provided' });
    }
    Comment.findById(commentId, (error, comment) => {
      if (error) return res.json({ success: false, error });
      const { author, text } = req.body;
      if (author) comment.author = author;
      if (text) comment.text = text;
      comment.save(error => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true });
      });
    });
  });
  
  router.delete('/comments/:commentId', (req, res) => {
    const { commentId } = req.params;
    if (!commentId) {
      return res.json({ success: false, error: 'No comment id provided' });
    }
    Comment.remove({ _id: commentId }, (error, comment) => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });

export default router;