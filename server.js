const express = require('express');
const cors = require('cors');
const app = express();
const studentRoutes = require('./routes/studentRoute');
const staffRoutes = require('./routes/staffRoute');
const enquiryRoutes = require('./routes/enquiryRoutes');
const loginRoutes = require('./routes/loginRoutes');
const compliantRoutesFO = require('./routes/compliantRoutesFO');
const electricityRoutesFO = require('./routes/electricityRoutesFO');
const postalRoutesFO = require('./routes/postalRoutesFO');
const staffLeavingRoutesFO = require('./routes/staffLeavingRoutesFO');
const studentLeavingRoutesFO = require('./routes/studentLeavingRoutesFO');
const visitorRoutesFO = require('./routes/visitorRoutesFO');

app.use(cors());

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

require('./config/db');

app.use('/student', studentRoutes);
app.use('/staff', staffRoutes);
app.use('/enquiry', enquiryRoutes);
app.use('/user', loginRoutes);
app.use('/complaint', compliantRoutesFO);
app.use('/electricity', electricityRoutesFO);
app.use('/postal', postalRoutesFO);
app.use('/staff-leaving', staffLeavingRoutesFO);
app.use('/student-leaving', studentLeavingRoutesFO);
app.use('/visitor', visitorRoutesFO);

app.get('/', (req, res) => res.send('<h1 style="display:flex;height: 100%;align-items: center;justify-content: center;margin:0;">Server Is Running!!!!</h1>'));

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));