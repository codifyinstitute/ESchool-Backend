const Department = require('../model/departmentModel');

// Get all departments
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a department by ID
exports.getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new department
exports.createDepartment = async (req, res) => {
    const { DepartmentName, Designation, Description } = req.body;

    const newDepartment = new Department({
        DepartmentName,
        Designation,
        Description
    });

    try {
        const savedDepartment = await newDepartment.save();
        res.status(201).json(savedDepartment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a department
exports.updateDepartment = async (req, res) => {
    try {
        const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDepartment) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json(updatedDepartment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
    try {
        const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
        if (!deletedDepartment) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
