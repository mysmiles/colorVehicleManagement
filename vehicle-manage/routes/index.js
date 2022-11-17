var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/*
import statis from './statis'
import member from './member'
import shopping from './shopping'
import promotion from './promotion'

export default app => {
  app.use('/member', member);
  app.use('/statis', statis);
  app.use('/shopping', shopping);
  app.use('/promotion', promotion);
}*/
