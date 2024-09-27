const Enquiry = require('../model/enquiryModel');

exports.addEnquiry = async (req, res) => {
    const { RegistrationNo, StudentName, DOB, Gender, MobileNo, AdmissionClass, FatherName, MotherName, Address, Message, Refer, Requirement, Status } = req.body;
    try {
        const enquiry = new Enquiry({
            RegistrationNo,
            StudentName,
            DOB,
            Gender,
            MobileNo,
            AdmissionClass,
            FatherName,
            MotherName,
            Address,
            Message,
            Refer,
            Requirement,
            Status
        });

        const saveData = await enquiry.save();

        res.status(201).json({ message: "Enquiry Added Successfully.", saveData });
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};

exports.getAlldata = async (req, res) => {
    try {
        const allData = await Enquiry.find();
        res.status(200).json(allData);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};

exports.getById = async (req, res) => {
    const { id } = req.params;
    try {
        const enquiry = await Enquiry.findOne({ RegistrationNo: id });
    
        if(!enquiry){
            return res.status(404).json({ message: "Enquiry Not Found." });
        }

        res.status(200).json(enquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};

exports.deleteEnquiry = async (req,res) =>{
    const { id } = req.params;

    try {
        const enquiry = await Enquiry.findOneAndDelete({ RegistrationNo: id });
    
        if(!enquiry){
            return res.status(404).json({ message: "Enquiry Not Found." });
        }

        res.status(200).json({message:"Enquiry Deleted successfully."})
    } catch (error) {
        res.status(400).json({message: error.message});
        console.log(error);
    }
};

exports.updateEnquiry = async (req,res) =>{
    const { id } = req.params;
    const { StudentName, DOB, Gender, MobileNo, AdmissionClass, FatherName, MotherName, Address, Message, Refer, Requirement, Status } = req.body;

    try {
        const enquiry = await Enquiry.findOneAndUpdate(
            { RegistrationNo: id },
            { StudentName, DOB, Gender, MobileNo, AdmissionClass, FatherName, MotherName, Address, Message, Refer, Requirement, Status },
            { new: true, runValidators: true }
        );
    
        if(!enquiry){
            return res.status(404).json({ message: "Enquiry Not Found." });
        }

        res.status(200).json({message:"Enquiry Updated successfully."}, enquiry);
    } catch (error) {
        res.status(400).json({message: error.message});
        console.log(error);
    }
};