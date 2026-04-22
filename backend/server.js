const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')

const app = express()
app.use(cors)
app.use(express.json)

app.use('/api/auth' , authRoutes)

app.get('/' , (req,res) => res.send("Cura API is running"))

const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log("Server is running on PORT ${PORT}"))

```
** `.env`** 
```

PORT = 5000
JWT_SECRET = cura_super_secret_key_change_this
DB_USER=postgres
DB_HOST=localhost
DB_NAME=cura_db
DB_PASSWORD=yourpassword
DB_PORT=5432