const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const Staff = require('../model/staffModel');
const Counter = require('../model/counterModel');
const Login = require("../model/loginModel")

// Add a new staff member
const addStaff = async (req, res) => {
    const month = moment().format('MM');
    const year = moment().format('YYYY');
    let id;
    try {
        console.log(req.body)
        const {
            Role, Department, Name, DOB, DOJ, Gender,
            Category, LanguageKnown, Nationality, MobileNo, Salary,
            BloodGroup, Email, JobGrade, Experience, LastSchool,
            ReferredName, ReferredContact, Transport, Route, Address,
            City, Area, Pincode, Religion, MaritalStatus, FamilyDetail,
            EmergencyContact, TeachingSubject, Assign, AadharNo,
            PanNo, PFNo, BankName, AccountNumber, IFSCCode, HomeWorkPublish,
            ClassTeacher, Class, Status
        } = req.body;

        let counter = await Counter.findOne({ Title: `${Role.slice(0, 3).toUpperCase()}-${year}-${month}` });

        if (!counter) {
            counter = new Counter({ Title: `${Role.slice(0, 3).toUpperCase()}-${year}-${month}`, Count: 1 });
        } else {
            counter.Count += 1;
        }


        id = `${Role.slice(0, 3).toUpperCase()}${year}${month}${counter.Count.toString().padStart(4, '0')}`;

        const newStaff = new Staff({
            EmployeeId: id, Role, Department, Name, DOB, DOJ, Gender,
            Category, LanguageKnown, Nationality, MobileNo, Salary,
            BloodGroup, Email, JobGrade, Experience, LastSchool,
            ReferredName, ReferredContact, Transport, Route, Address,
            City, Area, Pincode, Religion, MaritalStatus, FamilyDetail: JSON.parse(FamilyDetail),
            EmergencyContact: JSON.parse(EmergencyContact), TeachingSubject, Assign: JSON.parse(Assign), AadharNo,
            PanNo, PFNo, BankName, AccountNumber, IFSCCode, HomeWorkPublish,
            ClassTeacher, Class, Status: Status || "Active"
        });

        // Handle file uploads
        if (req.files) {
            if (req.files.Photo) newStaff.Documents.Photo = req.files.Photo[0].filename;
            if (req.files.QualificationCertificate)
                newStaff.Documents.QualificationCertificate = req.files.QualificationCertificate[0].filename;
            if (req.files.ExperienceLetter)
                newStaff.Documents.ExperienceLetter = req.files.ExperienceLetter[0].filename;
        }

        const newUser = new Login({ Id: id, Password: newStaff.MobileNo, Role: newStaff.Role });
        await newUser.save();
        await counter.save();
        await newStaff.save();
        res.status(201).json(newStaff);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};

// Get all staff members
const getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.find();
        res.status(200).json(staff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get staff member by EmployeeId
const getStaffByEmployeeId = async (req, res) => {
    try {
        const staff = await Staff.findOne({ EmployeeId: req.params.EmployeeId });
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.status(200).json(staff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update staff member
const updateStaff = async (req, res) => {
    try {
        const staff = await Staff.findOne({ EmployeeId: req.params.EmployeeId });
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        // Destructure the request body
        const {
            Role, Department, Name, DOB, DOJ, Gender,
            Category, LanguageKnown, Nationality, MobileNo, Salary,
            BloodGroup, Email, JobGrade, Experience, LastSchool,
            ReferredName, ReferredContact, Transport, Route, Address,
            City, Area, Pincode, Religion, MaritalStatus, FamilyDetail,
            EmergencyContact, TeachingSubject, Assign, AadharNo,
            PanNo, PFNo, BankName, AccountNumber, IFSCCode, HomeWorkPublish,
            ClassTeacher, Class, Status
        } = req.body;

        // Update fields only if new data is provided
        staff.Role = Role || staff.Role;
        staff.Department = Department || staff.Department;
        staff.Name = Name || staff.Name;
        staff.DOB = DOB || staff.DOB;
        staff.DOJ = DOJ || staff.DOJ;
        staff.Gender = Gender || staff.Gender;
        staff.Category = Category || staff.Category;
        staff.LanguageKnown = LanguageKnown.length ? LanguageKnown : staff.LanguageKnown;
        staff.Nationality = Nationality || staff.Nationality;
        staff.MobileNo = MobileNo || staff.MobileNo;
        staff.Salary = Salary || staff.Salary;
        staff.BloodGroup = BloodGroup || staff.BloodGroup;
        staff.Email = Email || staff.Email;
        staff.JobGrade = JobGrade || staff.JobGrade;
        staff.Experience = Experience || staff.Experience;
        staff.LastSchool = LastSchool || staff.LastSchool;
        staff.ReferredName = ReferredName || staff.ReferredName;
        staff.ReferredContact = ReferredContact || staff.ReferredContact;
        staff.Transport = Transport !== undefined ? Transport : staff.Transport;
        staff.Route = Route || staff.Route;
        staff.Address = Address || staff.Address;
        staff.City = City || staff.City;
        staff.Area = Area || staff.Area;
        staff.Pincode = Pincode || staff.Pincode;
        staff.Religion = Religion || staff.Religion;
        staff.MaritalStatus = MaritalStatus || staff.MaritalStatus;
        staff.FamilyDetail = FamilyDetail || staff.FamilyDetail;
        staff.EmergencyContact = EmergencyContact || staff.EmergencyContact;
        staff.TeachingSubject = TeachingSubject.length ? TeachingSubject : staff.TeachingSubject;
        staff.Assign = Assign.length ? Assign : staff.Assign;
        staff.AadharNo = AadharNo || staff.AadharNo;
        staff.PanNo = PanNo || staff.PanNo;
        staff.PFNo = PFNo || staff.PFNo;
        staff.BankName = BankName || staff.BankName;
        staff.AccountNumber = AccountNumber || staff.AccountNumber;
        staff.IFSCCode = IFSCCode || staff.IFSCCode;
        staff.HomeWorkPublish = HomeWorkPublish !== undefined ? HomeWorkPublish : staff.HomeWorkPublish;
        staff.ClassTeacher = ClassTeacher !== undefined ? ClassTeacher : staff.ClassTeacher;
        staff.Class = Class.length ? Class : staff.Class;
        staff.Status = Status || staff.Status;

        // Handle file uploads
        if (req.files) {
            if (req.files.photo) {
                // Delete old photo file if exists
                if (staff.Documents.Photo) {
                    fs.unlinkSync(path.join(__dirname, 'uploads', staff.Documents.Photo));
                }
                staff.Documents.Photo = req.files.Photo[0].filename;
            }
            if (req.files.QualificationCertificate) {
                if (staff.Documents.QualificationCertificate) {
                    fs.unlinkSync(path.join(__dirname, 'uploads', staff.Documents.QualificationCertificate));
                }
                staff.Documents.QualificationCertificate = req.files.QualificationCertificate[0].filename;
            }
            if (req.files.ExperienceLetter) {
                if (staff.Documents.ExperienceLetter) {
                    fs.unlinkSync(path.join(__dirname, 'uploads', staff.Documents.ExperienceLetter));
                }
                staff.Documents.ExperienceLetter = req.files.ExperienceLetter[0].filename;
            }
        }
        await staff.save();
        res.status(200).json(staff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete staff member
const deleteStaff = async (req, res) => {
    try {
        const staff = await Staff.findOneAndDelete({ EmployeeId: req.params.EmployeeId });
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        // Delete files associated with the staff member
        if (staff.Documents.Photo) {
            fs.unlinkSync(path.join(__dirname, 'uploads', staff.Documents.Photo));
        }
        if (staff.Documents.QualificationCertificate) {
            fs.unlinkSync(path.join(__dirname, 'uploads', staff.Documents.QualificationCertificate));
        }
        if (staff.Documents.ExperienceLetter) {
            fs.unlinkSync(path.join(__dirname, 'uploads', staff.Documents.ExperienceLetter));
        }

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    addStaff,
    updateStaff,
    getAllStaff,
    getStaffByEmployeeId,
    deleteStaff,
};
