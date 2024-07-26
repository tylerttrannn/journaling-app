// inital setup 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db'); // Adjust the path if necessary

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// console log and setup 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Test connection endpoint
app.get('/test-connection', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Connection successful', time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});


// retrives all users 
app.get('/users', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM public."Users"');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
});


app.post('/add-user', async (req, res) => {
  const { first_name, last_name, email,password } = req.body;

  const insertUserQuery = `
    INSERT INTO public."Users" (first_name, last_name,email, password) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *
  `;

  try {
    const result = await pool.query(insertUserQuery, [first_name, last_name, email, password]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

app.get('/check-existing-user', async (req, res) => {
  const { email } = req.query; // gets exactly only the email part 

  try {
    const checkUserQuery = 'SELECT * FROM public."Users" WHERE email = $1';
    const { rows } = await pool.query(checkUserQuery, [email]);

    if (rows.length > 0) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


