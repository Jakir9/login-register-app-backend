import express from 'express'
import cors from 'cors'
import loginRoute from './routes/login.js'
import registerRoute from './routes/register.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/register', registerRoute)
app.use('/login', loginRoute)

app.get('/', (req, res) => {
  res.send('Welcome')
  return res.status(200)
})

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}, url: http://localhost:${PORT}`
  )
})

export default app
