import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()
const databasePath = path.resolve('db', 'db.json')

// Function to load users from the JSON file
const loadUsers = () => {
  const data = fs.readFileSync(databasePath, 'utf8')
  return JSON.parse(data).users
}

// Function to save users to the JSON file
const saveUsers = (users) => {
  const data = JSON.stringify({ users }, null, 2)
  fs.writeFileSync(databasePath, data, 'utf8')
}

// Function to check if email already exists
const checkEmail = (email, users) => {
  return users.some((user) => user.email === email)
}

// POST /register - User Registration
router.post('/', (req, res) => {
  const { email, password } = req.body

  const users = loadUsers()

  if (checkEmail(email, users)) {
    return res.status(400).json({
      message: 'Registration failed: Email already in use. Please login.',
    })
  } else {
    const newUser = {
      id: users.length + 1,
      email,
      password, // In a real application, hash the password before storing
      name: '',
      role: 'user',
    }
    users.push(newUser)

    saveUsers(users)

    return res
      .status(200)
      .json({ message: 'Success: user registered successfully' })
  }
})

export default router
