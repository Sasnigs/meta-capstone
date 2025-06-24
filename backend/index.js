import express from 'express'
import cors from "cors";

const app = express()
const PORT = process.env.PORT || 4500
app.get('/', (req, res) => {
    res.send('Backend is working')
})


app.use(cors());
app.use(express.json())
app.listen(PORT,
  console.log(`Server running on http://localhost:${PORT}`)
);