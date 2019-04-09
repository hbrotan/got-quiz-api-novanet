// BASE SETUP
// =============================================================================
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// AZURE SQL DATABASE CONNECTION USING SERIATE
// ===================================================================================
var sql = require( "seriate" );
var config = {  
    "server": process.env.server,
	"port": 1433,
    "user": process.env.database_username,
    "password": process.env.database_password,
    "database": process.env.database,
    "pool": { "max": 5, "min": 1 },
	"options": { "encrypt": true }
};
sql.setDefaultConfig( config );

// CONFIG
// ===================================================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,POST');
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization, X-Requested-With, X-Auth-Token");
    if ('OPTIONS' == req.method){
        return res.send(200);
    }
    next();
});
app.use(function (req, res, next) {
	res.header('Content-Type', 'application/json; charset=utf-8');
	next();
});

var port = process.env.PORT || 3000;        // set the port

// ROUTES FOR THE API
// ===================================================================================
var router = express.Router();
	
router.get('/', function(req, res) {
    res.json({ message: req.headers['x-forwarded-for'] || req.connection.remoteAddress });   
});	
	
router.route('/answers')	
	.post(function(req, res){
        // Add answer			
		
		var ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		
        sql.execute({  
            query: 'INSERT INTO [dbo].[GotQuizNovanet]([Name],[Email],[IpAddress],[Q1],[Q2],[Q3],[Q4],[Q5],[Q6],[Q7],[Q8],[Q9],[Q10],[Q11],[Q12],[Q13],[Q14],[Q15],[Q16],[Q17],[Q18],[Q19],[Q20],[Q21],[Q22],[Q23],[Q24],[Q25],[Q26],[Q27],[Q28],[Q29],[Q30],[When])      VALUES(@name,@email,@ipAddress,@q1,@q2,@q3,@q4,@q5,@q6,@q7,@q8,@q9,@q10,@q11,@q12,@q13,@q14,@q15,@q16,@q17,@q18,@q19,@q20,@q21,@q22,@q23,@q24,@q25,@q26,@q27,@q28,@q29,@q30,GETDATE())',
            params: {
                name: {
                    type: sql.VARCHAR,
                    val: req.body.name,
                },
                email: {
                    type: sql.VARCHAR,
                    val: req.body.email,
                },
				ipAddress: ipAddress,
				q1: {
                    type: sql.VARCHAR,
                    val: req.body.q1,
                },
				q2: {
                    type: sql.VARCHAR,
                    val: req.body.q2,
                },
				q3: {
                    type: sql.VARCHAR,
                    val: req.body.q3,
                },
				q4: {
                    type: sql.VARCHAR,
                    val: req.body.q4,
                },
				q5: {
                    type: sql.VARCHAR,
                    val: req.body.q5,
                },
				q6: {
                    type: sql.VARCHAR,
                    val: req.body.q6,
                },
				q7: {
                    type: sql.VARCHAR,
                    val: req.body.q7,
                },
				q8: {
                    type: sql.VARCHAR,
                    val: req.body.q8,
                },
				q9: {
                    type: sql.VARCHAR,
                    val: req.body.q9,
                },
				q10: {
                    type: sql.VARCHAR,
                    val: req.body.q10,
                },
				q11: {
                    type: sql.VARCHAR,
                    val: req.body.q11,
                },
				q12: {
                    type: sql.VARCHAR,
                    val: req.body.q12,
                },
				q13: {
                    type: sql.VARCHAR,
                    val: req.body.q13,
                },
				q14: {
                    type: sql.VARCHAR,
                    val: req.body.q14,
                },
				q15: {
                    type: sql.VARCHAR,
                    val: req.body.q15,
                },
				q16: {
                    type: sql.VARCHAR,
                    val: req.body.q16,
                },
				q17: {
                    type: sql.VARCHAR,
                    val: req.body.q17,
                },
				q18: {
                    type: sql.VARCHAR,
                    val: req.body.q18,
                },
				q19: {
                    type: sql.VARCHAR,
                    val: req.body.q19,
                },
				q20: {
                    type: sql.VARCHAR,
                    val: req.body.q20,
                },
				q21: {
                    type: sql.VARCHAR,
                    val: req.body.q21,
                },
				q22: {
                    type: sql.VARCHAR,
                    val: req.body.q22,
                },
				q23: {
                    type: sql.VARCHAR,
                    val: req.body.q23,
                },
				q24: {
                    type: sql.VARCHAR,
                    val: req.body.q24,
                },
				q25: {
                    type: sql.VARCHAR,
                    val: req.body.q25,
                },
				q26: {
                    type: sql.VARCHAR,
                    val: req.body.q26,
                },
				q27: {
                    type: sql.VARCHAR,
                    val: req.body.q27,
                },
				q28: {
                    type: sql.VARCHAR,
                    val: req.body.q28,
                },
				q29: {
                    type: sql.VARCHAR,
                    val: req.body.q29,
                },
				q30: {
                    type: sql.VARCHAR,
                    val: req.body.q30,
                }				
            }
        }).then( function() {
            res.json({success: true});
        }).catch(function(error){
            res.json(error);
            throw error;
        });														
	});
	
// REGISTER THE ROUTES
// ===================================================================================
app.use('/api', router);


// START THE SERVER
// ===================================================================================
app.listen(port);
console.log('Listening on port ' + port);