var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();

var dbConn = require('../../config/db.js');

//INSERT
// @routes POST api/temperature/add
// @desc Insert Data to Database
// @access Public/Private
router.post('/add',(req,res) =>{   
const token = req.headers.authorization.split(' ')[1];

if (!token){
  res.status(200).json({success:false,msg:'Error: Token was not found'});
}

const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);

console.log(decodedToken.data['email']);

    var userEmail = decodedToken.data['email'];

    var temperature = req.body.temperature;

    var device_id = req.body.device_id;

    var date = req.body.date;

    // connect to mysql database and perform INSERT Query

    sqlQuery = `INSERT INTO temp_tb (temperature, device_id,date) VALUES (${temperature},"${device_id}","${date}")`;

    dbConn.query(sqlQuery,  function( error, results, fields ){ 

         if (error) throw error;

        res.status(200).json(results);

    });

});

// SELECT or (VIEW)
// @routes GET temperature/view
// @desc View Data from the Database
// @access Public

router.get('/view', (req, res) => {
    sqlQuery = 'SELECT * FROM temp_tb';
    dbConn.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);  
    });
    
});

// SEARCH
// @routes GET temperature/view/id:
// @desc Search Data from the Database
// @access Public/Private

router.get('/view/:id', (req, res) => {

var readingId = req.params.id;

console.log(req.params.id);

  sqlQuery = `SELECT * FROM temp_tb WHERE id=${readingId}`;
    dbConn.query(sqlQuery, function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({
      msg: 'Data Successfully Fetched',
      results: results,
      });
    });
});

// SEARCH using LIKE
// @routes GET temperature/view
// @desc View Data from the Database
// @access Public/Private

router.get('/search/:device_id', (req, res) => {

  var device_id = req.params.device_id;
  
  console.log(req.params.device_id);
  
    sqlQuery = `SELECT * FROM temp_tb WHERE device_id LIKE "${device_id}"`;
      dbConn.query(sqlQuery, function (error, results, fields) {
        if (error) throw error;
        res.status(200).json({
        msg: 'Data Successfully Fetched',
        results: results,
        });
      });
  });


// UPDATE
// @routes POST /temperature/update/:id
// @desc Update Data to Database
// @access Public/Private
router.post('/update/:id',(req,res) =>{   

  console.log(req.body);
  var readingId = req.params.id;

  var temperature = req.body.temperature;

  var device_id = req.body.device_id;

  var date = req.body.date;
  
    sqlQuery = `UPDATE temp_tb SET temperature = ${temperature}, device_id = "${device_id}", date = "${date}" WHERE id = ${readingId}`;

    dbConn.query(sqlQuery,  function( error, results, fields ){ 

      if (error) throw error;
      res.status(200).json({
      msg: 'Data Successfully Updated',
      results: results,
      });
    });
})

// DELETE
// @routes DELETE temperature/delete/:id
// @desc DELETE Data
// @access PRIVATE
router.delete('/delete/:id', (req, res) => {
    //print body for checking
    console.log(req.params.id);
    var readingId = req.params.id;
    sqlQuery = `DELETE FROM temp_tb WHERE id=${readingId}`;
    dbConn.query(sqlQuery, function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({
        msg: 'Data Successfully Deleted',
        results: results,
    });
});
})











module.exports = router;