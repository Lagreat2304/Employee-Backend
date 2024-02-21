const express = require("express");
const cors = require("cors");
const app = express();
const sql = require("mssql");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
const port = 5000;
require('dotenv').config();
var config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
      trustedconnection: false,
      enableArithAbort: true,
      trustServerCertificate: true,
      instancename: process.env.INSTANCE,
    },
    port: parseInt(process.env.PORT,10)
};

app.post('/addemployee', async (req, res) => {
    const { EmployeeId, EmployeeName, Department, DOB, Gender, Designation, Salary } = req.body;
    try {
      await sql.connect(config);
      const result = await sql.query`INSERT INTO Employee (EmployeeId, EmployeeName, Department, DOB, Gender,Designation,Salary  ) VALUES (${EmployeeId}, ${EmployeeName}, ${Department}, ${DOB}, ${Gender}, ${Designation}, ${Salary})`;
      console.log('Employee added successfully');
      res.status(200).json({ message: 'Added successful' });
    } catch (error) {
      console.error('Error signing up: ', error);
      res.status(500).json({ error: 'An error occurred while adding up' });
    }
  });

  app.get('/getemployee',async (req,res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Employee`;
        res.json(result.recordset);
      } catch (err) {
        console.error('Error fetching Employee:', err);
        res.status(500).json({ error: 'An error occurred while fetching Employees' });
      }
  });

app.listen(port, () => console.log("Listening"));