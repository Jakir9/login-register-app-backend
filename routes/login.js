import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()
const databasePath = path.resolve('db', 'db.json')

//load users from the JSON file
const loadUsers = () => {
  try {
    const data = fs.readFileSync(databasePath, 'utf8')
    return JSON.parse(data).users
  } catch (err) {
    console.error('Error reading or parsing db.json:', err)
    return []
  }
}

// POST /login - User Login
router.post('/', (req, res) => {
  const { email, password } = req.body
  console.log('Received login request:', { email, password })

  const users = loadUsers()
  console.log('Loaded users:', users)

  const user = users.find(
    (user) => user.email === email && user.password === password
  )

  if (user) {
    console.log('User authenticated:', user)
    return res.status(200).json({ message: 'Login successful' })
  } else {
    console.log('Authentication failed for:', { email, password })
    return res.status(400).json({ message: 'Authentication failed' })
  }
})

export default router
