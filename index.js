const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message })
});

app.get("/users", async (req, res, next) => {
  try {
    const users = await pool.query("SELECT * FROM users2")
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: users[0]
      }
    });
  
  }  catch (error) {
    next(error)
  }
});

app.post("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await pool.query("SELECT * FROM users2 WHERE user_id = ?", [id]);
    if (!result) {
      const error = new Error(`User with id=${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: result[0]
      }
    });
  } catch (error) {
   next(error)
  }
});

app.put("/user", async (req, res, next) => {
  try {
    const { userName } = req.body

    console.log(req.body)
    const newUser = await pool.query(
      "INSERT INTO users2 (userName) VALUES (?)",

      [userName]
    );

    res.json({
      status: 'success',
      code: 200,
      data: {
        result: newUser
      }
    });
  } catch (error) {
   next(error)
  }
});


app.listen(5000, () => {
  console.log('server is running on port 5000')
})
