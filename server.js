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
const classRoute = require('./routes/Academic/classRoute');
const academicYearRoute = require('./routes/Academic/academicYearRoute');
const examRoutes = require('./routes/examStaticsRoute');
const periodRoutes = require('./routes/Academic/periodRoutes');
const timeTableRoute = require('./routes/Academic/timeTableRoute');
const addVendorRoute = require('./routes/addVendorRoute');
const cashDetailsRoute = require('./routes/cashDetailsRoutes');
const BankRoute = require('./routes/bankRoutes');
const expenseHeaderRoute = require('./routes/expenseHeaderRoutes');
const RevenueDataRoute = require('./routes/revenueDataRoutes');
const homeworkRoutes = require('./routes/Academic/homeworkRoutes');
const addSubjectRoute = require('./routes/addSubjectRoutes');
const teachingProgressRoutes = require('./routes/Academic/teachingProgressRoutes');
const studentAttendanceRoutes = require('./routes/studentAttendanceRoutes');
const feeHeaderRoutes = require('./routes/feeHeaderRoutes');
const feeSlabRoutes = require('./routes/feeSlabRoutes');
const fineSetupRoutes = require('./routes/fineSetupRoutes');
const discountRoutes = require('./routes/discountRoutes');
const payrollHeaderRoutes = require('./routes/payrollHeaderRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const designationRoutes = require('./routes/designationRoutes');
const roleRoutes = require('./routes/rolesRoutes');
const departmentRoutes = require('./routes/departmentRoutes')
const feeDataRoutes = require('./routes/feeDataRoutes');
const payrollDataRoutes = require('./routes/payrollDataRoutes');
const schoolsetupRoutes = require('./routes/schoolSetupRoutes')

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
app.use('/class', classRoute);
app.use('/academic-year', academicYearRoute);
app.use('/exam', examRoutes);
app.use('/period', periodRoutes);
app.use('/timetable', timeTableRoute);
app.use('/vendor', addVendorRoute);
app.use('/cash-detail', cashDetailsRoute);
app.use('/bank', BankRoute);
app.use('/expense-header', expenseHeaderRoute);
app.use('/revenue', RevenueDataRoute);
app.use('/homework', homeworkRoutes);
app.use('/add-subject', addSubjectRoute);
app.use('/teaching-progress', teachingProgressRoutes);
app.use('/student-attendance', studentAttendanceRoutes);
app.use('/feeHeader', feeHeaderRoutes);
app.use('/feeSlab', feeSlabRoutes);
app.use('/fine-setup', fineSetupRoutes);
app.use('/discount', discountRoutes);
app.use('/payroll-header', payrollHeaderRoutes);
app.use('/grade', gradeRoutes);
app.use('/designation', designationRoutes);
app.use('/role', roleRoutes);
app.use('/department', departmentRoutes);
app.use('/fee-data', feeDataRoutes);
app.use('/payroll-data', payrollDataRoutes);

app.use('/schoolsetup', schoolsetupRoutes);


app.get('/', (req, res) => res.send('<h1 style="display:flex;height: 100%;align-items: center;justify-content: center;margin:0;">Server Is Running!!!!</h1>'));

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));