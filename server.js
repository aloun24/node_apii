const express  = require('express')
const mysql = require('mysql');

const app  = express();

app.use(express.json());

//Mysql connection
const connection = mysql.createConnection({
     host:'163.44.198.71',
     user:'cp195280',
     password:'Changeme1!2@',
     database:'cp195280_mahaxay',

   // host:'localhost',
   // user:'root',
   // password:'',
   // database:'mahaxay',
    // port:2988,
})


connection.connect((err)=>
{
    if(err){
        console.log('Error  connecting to Mysql database = ', err);
        return; 
    }
    console.log('Mysql  successfuly connected!!');
})

//create Routes

app.post("/create", async (req,res) => {
    const {name, email, password} =req.body;

    try {
        connection.query(
            "INSERT INTO   users(name,email,password) VALUES (?,?,?)",
            [name, email, password],
            (err, results, fields) => {
                if(err){
                    console.log("Error while Insert ", err);
                    return res.status(400).send();

                }
                return res.status(201).json({message: "Insert is successfuly"});
            }

        )
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})


//READ
app.get("/read", async(req,res) => {
    try {
        connection.query(
            "SELECT * FROM products", (err,results,fields)=>
            {if(err){
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        }
        )
    } catch (error) {
        console.log(error);
        return res.status(500),send();
    }
})

app.listen(3000, () => console.log('Server is running on port 3000'));
