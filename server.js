const express = require('express');
const cors = require('cors');
const app = express();
const studentRoutes = require('./routes/studentRoute');
const staffRoutes = require('./routes/staffRoute');
const enquiryRoutes = require('./routes/enquiryRoutes');
const loginRoutes = require('./routes/loginRoutes');

app.use(express.json());

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

require('./config/db');

app.use('/student', studentRoutes);
app.use('/staff', staffRoutes);
app.use('/enquiry', enquiryRoutes);
app.use('/user', loginRoutes);

app.get('/', (req, res) => res.send('<h1 style="display:flex;height: 100%;align-items: center;justify-content: center;margin:0;">Server Is Running!!!!</h1>'));

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));