const fs = require('fs');
const moment = require('moment-timezone');
const path = require('path');
const Student = require('../model/studentModel');
const Counter = require('../model/counterModel');

// Add a new student
const addStudent = async (req, res) => {
    const month = moment().format('MM');
    const year = moment().format('YYYY');
    let id;

    try {
        let counter = await Counter.findOne({ Title: `STU-${year}-${month}` });

        if (!counter) {
            counter = new Counter({ Title: `STU-${year}-${month}`, Count: 1 });
        } else {
            counter.Count += 1;
        }

        id = `STU${year}${month}${counter.Count.toString().padStart(4, '0')}`;
        const {
            StudentName, StudentId, DOB, Gender, Religion, BloodGroup,
            Category, Height, Weight, AadharNumber, MobileNo, Address,
            City, Area, Pincode, AdmissionDete, Stream, AdmissionInClass,
            FeeCategory, RollNo, LastSchoolAttended, IdentificationMark,
            SourceOfAdmission, TransportNeeded, Route, FeeDiscount,
            BankName, BankAccountNumber, IFSC, Disability, Discount,
            Orphan, Subject, FatherDetail, MotherDetails, EmergencyContact
        } = req.body;

        const newStudent = new Student({
            StudentName, StudentId, DOB, Gender, Religion, BloodGroup,
            Category, Height, Weight, AadharNumber, MobileNo, Address,
            City, Area, Pincode, AdmissionDete, Stream, AdmissionInClass,
            FeeCategory, RollNo, LastSchoolAttended, IdentificationMark,
            SourceOfAdmission, TransportNeeded, Route, FeeDiscount,
            BankName, BankAccountNumber, IFSC, Disability, Discount,
            Orphan, Subject, FatherDetail, MotherDetails, EmergencyContact
        });

        // Handle file uploads
        if (req.files) {
            if (req.files.photo) newStudent.Document.Photo = req.files.photo[0].filename;
            if (req.files.birth) newStudent.Document.Birth = req.files.birth[0].filename;
            if (req.files.leaving) newStudent.Document.Leaving = req.files.leaving[0].filename;
        }

        const newUser = new Login({ Id: id, Password: MobileNo, Role: "Student" });
        await newUser.save();
        await counter.save();
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get student by StudentId
const getStudentByStudentId = async (req, res) => {
    try {
        const student = await Student.findOne({ StudentId: req.params.StudentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update student
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findOne({ StudentId: req.params.StudentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Destructure the request body
        const {
            StudentName, DOB, Gender, Religion, BloodGroup,
            Category, Height, Weight, AadharNumber, MobileNo,
            Address, City, Area, Pincode, AdmissionDete,
            Stream, AdmissionInClass, FeeCategory, RollNo,
            LastSchoolAttended, IdentificationMark, SourceOfAdmission,
            TransportNeeded, Route, FeeDiscount, BankName,
            BankAccountNumber, IFSC, Disability, Discount,
            Orphan, Subject, FatherDetail, MotherDetails, EmergencyContact
        } = req.body;

        // Update fields only if new data is provided
        student.StudentName = StudentName || student.StudentName;
        student.DOB = DOB || student.DOB;
        student.Gender = Gender || student.Gender;
        student.Religion = Religion || student.Religion;
        student.BloodGroup = BloodGroup || student.BloodGroup;
        student.Category = Category || student.Category;
        student.Height = Height || student.Height;
        student.Weight = Weight || student.Weight;
        student.AadharNumber = AadharNumber || student.AadharNumber;
        student.MobileNo = MobileNo || student.MobileNo;
        student.Address = Address || student.Address;
        student.City = City || student.City;
        student.Area = Area || student.Area;
        student.Pincode = Pincode || student.Pincode;
        student.AdmissionDete = AdmissionDete || student.AdmissionDete;
        student.Stream = Stream || student.Stream;
        student.AdmissionInClass = AdmissionInClass || student.AdmissionInClass;
        student.FeeCategory = FeeCategory || student.FeeCategory;
        student.RollNo = RollNo || student.RollNo;
        student.LastSchoolAttended = LastSchoolAttended || student.LastSchoolAttended;
        student.IdentificationMark = IdentificationMark || student.IdentificationMark;
        student.SourceOfAdmission = SourceOfAdmission || student.SourceOfAdmission;
        student.TransportNeeded = TransportNeeded !== undefined ? TransportNeeded : student.TransportNeeded;
        student.Route = Route || student.Route;
        student.FeeDiscount = FeeDiscount || student.FeeDiscount;
        student.BankName = BankName || student.BankName;
        student.BankAccountNumber = BankAccountNumber || student.BankAccountNumber;
        student.IFSC = IFSC || student.IFSC;
        student.Disability = Disability || student.Disability;
        student.Discount = Discount || student.Discount;
        student.Orphan = Orphan || student.Orphan;
        student.Subject = Subject.length ? Subject : student.Subject;
        student.FatherDetail = FatherDetail || student.FatherDetail;
        student.MotherDetails = MotherDetails || student.MotherDetails;
        student.EmergencyContact = EmergencyContact || student.EmergencyContact;

        // Handle file uploads
        if (req.files) {
            if (req.files.photo) {
                // Delete old photo file if exists
                if (student.Document.Photo) {
                    fs.unlinkSync(path.join(__dirname, 'uploads', student.Document.Photo));
                }
                student.Document.Photo = req.files.photo[0].filename;
            }
            if (req.files.birth) {
                if (student.Document.Birth) {
                    fs.unlinkSync(path.join(__dirname, 'uploads', student.Document.Birth));
                }
                student.Document.Birth = req.files.birth[0].filename;
            }
            if (req.files.leaving) {
                if (student.Document.Leaving) {
                    fs.unlinkSync(path.join(__dirname, 'uploads', student.Document.Leaving));
                }
                student.Document.Leaving = req.files.leaving[0].filename;
            }
        }

        await student.save();
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete student
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({ StudentId: req.params.StudentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Delete files associated with the student
        if (student.Document.Photo) {
            fs.unlinkSync(path.join(__dirname, 'uploads', student.Document.Photo));
        }
        if (student.Document.Birth) {
            fs.unlinkSync(path.join(__dirname, 'uploads', student.Document.Birth));
        }
        if (student.Document.Leaving) {
            fs.unlinkSync(path.join(__dirname, 'uploads', student.Document.Leaving));
        }

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    addStudent,
    updateStudent,
    getAllStudents,
    getStudentByStudentId,
    deleteStudent,
};
