const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../db')
const router = express.Router()

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body
    try {
      const hashed = await bcrypt.hash(password, 10)
      const result = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
        [name, email, hashed, role || 'patient']
      )
      res.status(201).json({ user: result.rows[0] })
    } catch (err) {
      res.status(400).json({ error: "Email already exists" })
    }
  })

router.post('/login',async(req,res) => {
    const {email,password} = req.body
    try{
        const result = await pool.query('select * from users where email = $1',[email])
        const user = result.rows[0]
        if (!user) return res.status(401).json({error : "User not found"})

        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) return res.status(401).json({error: 'Invalid Password'})

        const token = jwt.sign(
          {id: user.id , role : user.role},
          process.env.JWT_SECRET,
          {
            expiresIn :'7d'
          }
      )
      res.json({ token, user: { id: user.id, name: user.name, role: user.role } })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})
module.exports = router