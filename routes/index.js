var express = require('express');
var router = express.Router();
var fs = require('fs')

var db = 'mongodb+srv://thangnvph13623:Vm6HzyIRgIxxqZFq@cluster0.iegjn.mongodb.net/student?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(db).catch(error => {
  console.log("co loi xay ra" + error)
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function (request, response) {

  response.render('index')
})

// b1 : định nghĩa Schema - model
var studentSch = new mongoose.Schema({
  ngayThang: 'string',
  noiDung: 'string',
  linkAnh: 'string'
});
// b2 : khai báo Schema với thư viện mongosee
var Student = mongoose.model('student', studentSch);

router.post('/student', function (request, response) {

  var ngayThang = request.body.ngayThang;
  var noiDung = request.body.noiDung;
  var linkAnh = request.body.linkAnh;


  const data = new Student({
    ngayThang:  ngayThang,
    noiDung: noiDung,
    linkAnh: linkAnh,
  });
  data.save(function (error) {
    var mes;
    if (error == null) {
      mes = 'Them thanh cong'
      console.log('them thanh cong')
    } else mes = error
    response.render('index', {message: mes})
  })


  router.get('/Danhsach', function (request, response) {
    Student.find({}, function (err, data) {

      if (err) {
        response.send("File tối thiểu 2MB hoặc upload không được quá 5 file hoặc file không phải jpg");
        return;
      }
      else {
        response.send(data);

      }
      response.render('Danhsach')
    })
  })
  // lấy danh sách

  // xóa
  Student.deleteOne({_id: ''}, function (error) {

  })

  // sửa



})

module.exports = router;
