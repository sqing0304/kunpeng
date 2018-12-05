var express = require('express');
var router = express.Router();
var fs = require('fs');

/* 首页 */
router.get('/', function(req, res, next) {
	var lang = req.cookies.kunpengLang ?  req.cookies.kunpengLang : 'cn';
  res.render('index', { lang: lang });
});

/* 留学申请 */
router.get('/application', function(req, res, next) {
	var lang = req.cookies.kunpengLang ?  req.cookies.kunpengLang : 'cn';
  res.render('application', { lang: lang });
});
/* 学生公寓 */
router.get('/apartment', function(req, res, next) {
  var lang = req.cookies.kunpengLang ?  req.cookies.kunpengLang : 'cn';
  res.render('apartment', { lang: lang });
});
/* 学生公寓详情 */
router.get('/apartment/:index', function(req, res, next) {
  var lang = req.cookies.kunpengLang ?  req.cookies.kunpengLang : 'cn';
  var index = req.params.index;
  res.render('apartment_detail', { lang: lang, index: index });
});

/* 其他服务 */
router.get('/services', function(req, res, next) {
	var lang = req.cookies.kunpengLang ?  req.cookies.kunpengLang : 'cn';
  	res.render('services', { lang: lang });
});


/* 联系我们 */
router.get('/contact', function(req, res, next) {
	var lang = req.cookies.kunpengLang ?  req.cookies.kunpengLang : 'cn';
  res.render('contact', { lang: lang });
});

module.exports = router;
