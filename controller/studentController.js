const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const Student = require('../model/studentModel');
const Counter = require('../model/counterModel');
const Login = require('../model/loginModel'); 

// Add a new student

const addStudent = async (req, res) => {
    console.log(req.body);
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

        const newStudent = new Student({
            StudentName: req.body.StudentName,
            StudentId: id,
            DOB: req.body.DOB,
            Gender: req.body.Gender,
            Religion: req.body.Religion,
            BloodGroup: req.body.BloodGroup,
            Category: req.body.Category,
            Height: req.body.Height,
            Weight: req.body.Weight,
            AadharNumber: req.body.AadharNumber,
            MobileNo: req.body.MobileNo,
            Email: req.body.Email,
            Address: req.body.Address,
            City: req.body.City,
            Area: req.body.Area,
            Pincode: req.body.Pincode,
            AdmissionDate: req.body.AdmissionDate,
            Stream: req.body.Stream,
            AdmissionInClass: req.body.AdmissionInClass,
            House: req.body.House,
            FeeCategory: req.body.FeeCategory,
            RollNo: req.body.RollNo,
            LastSchoolAttended: req.body.LastSchoolAttended,
            IdentificationMark: req.body.IdentificationMark,
            SourceOfAdmission: req.body.SourceOfAdmission,
            TransportNeeded: req.body.TransportNeeded !== undefined ? req.body.TransportNeeded : false,
            Route: req.body.Route,
            FeeDiscount: req.body.FeeDiscount,
            BankName: req.body.BankName,
            BankAccountNumber: req.body.BankAccountNumber,
            IFSC: req.body.IFSC,
            Disability: req.body.Disability || false,
            DisabilityName: req.body.DisabilityName,
            Discount: req.body.Discount,
            Orphan: req.body.Orphan,
            Subject: req.body.Subject,
            FatherDetail: JSON.parse(req.body.FatherDetail),
            MotherDetails: JSON.parse(req.body.MotherDetails),
            EmergencyContact: JSON.parse(req.body.EmergencyContact),
            Document: {
                StudentPhoto: req.files?.StudentPhoto ? req.files.StudentPhoto[0].filename : null,
                Birth: req.files?.Birth ? req.files.Birth[0].filename : null,
                Leaving: req.files?.Leaving ? req.files.Leaving[0].filename : null,
                FatherPhoto: req.files?.FatherPhoto ? req.files.FatherPhoto[0].filename : null,
                MotherPhoto: req.files?.MotherPhoto ? req.files.MotherPhoto[0].filename : null,
            },
        });

        console.log({ Id: id, Password: req.body.MobileNo, Role: "Student" })
        console.log(req.body)

        const newUser = new Login({ Id: id, Password: req.body.MobileNo, Role: "Student" });
        await newUser.save();
        await counter.save();
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error)
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

        // Update fields only if new data is provided
        Object.assign(student, req.body);

        // Update FatherDetail and MotherDetails
        if (req.body.FatherDetail) {
            student.FatherDetail = { ...student.FatherDetail, ...req.body.FatherDetail };
        }
        if (req.body.MotherDetails) {
            student.MotherDetails = { ...student.MotherDetails, ...req.body.MotherDetails };
        }

        // Handle file uploads for Father and Mother
        if (req.files) {
            if (req.files.FatherPhoto) {
                if (student.Document.FatherPhoto) {
                    fs.unlinkSync(path.join(__dirname, 'uploads', student.Document.FatherPhoto));
                }
                student.Document.FatherPhoto = req.files.FatherPhoto[0].filename;
            }
            if (req.files.MotherPhoto) {
                if (student.Document.MotherPhoto) {
                    fs.unlinkSync(path.join(__dirname, 'uploads', student.Document.MotherPhoto));
                }
                student.Document.MotherPhoto = req.files.MotherPhoto[0].filename;
            }
            if (req.files.StudentPhoto) {
                if (student.Document.StudentPhoto) {
                    fs.unlinkSync(path.join(__dirname, 'uploads', student.Document.StudentPhoto));
                }
                student.Document.StudentPhoto = req.files.StudentPhoto[0].filename;
            }
            if (req.files.Birth) {
                if (student.Document.Birth) {
                    fs.unlinkSync(path.join(__dirname, 'uploads', student.Document.Birth));
                }
                student.Document.Birth = req.files.Birth[0].filename;
            }
            if (req.files.Leaving) {
                if (student.Document.Leaving) {
                    fs.unlinkSync(path.join(__dirname, 'uploads', student.Document.Leaving));
                }
                student.Document.Leaving = req.files.Leaving[0].filename;
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
        if (student.Document.StudentPhoto) {
            fs.unlinkSync(path.join(__dirname, 'uploads', student.Document.StudentPhoto));
        }
        if (student.Document.Birth) {
            fs.unlinkSync(path.join(__dirname, 'uploads', student.Document.Birth));
        }
        if (student.Document.Leaving) {
            fs.unlinkSync(path.join(__dirname, 'uploads', student.Document.Leaving));
        }
        if (student.Document.FatherPhoto) {
            fs.unlinkSync(path.join(__dirname, 'uploads', student.Document.FatherPhoto));
        }
        if (student.Document.MotherPhoto) {
            fs.unlinkSync(path.join(__dirname, 'uploads', student.Document.MotherPhoto));
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
