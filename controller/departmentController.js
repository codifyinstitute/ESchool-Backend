const Department = require("../model/departmentModel"); // Ensure this import is correct

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

    // Ensure that Designation is an array of objects
    if (!Array.isArray(Designation)) {
        return res.status(400).json({ message: "Designation must be an array of objects" });
    }

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


// Update a department's designation (either add new or update existing)
exports.updateDepartment = async (req, res) => {
    try {
        const { departmentId, Designation } = req.body; // departmentId is passed in the URL, Designation array is passed in the body

        // Find the department by its ID
        const department = await Department.findById(departmentId);

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        // Add new designations or update existing ones
        if (Designation && Array.isArray(Designation) && Designation.length > 0) {
            // Assuming Designation is an array of objects with { DesignationName, DesignationDescription }
            Designation.forEach(newDesignation => {
                // Check if the Designation already exists by name
                const existingDesignationIndex = department.Designation.findIndex(
                    item => item.DesignationName === newDesignation.DesignationName
                );

                if (existingDesignationIndex !== -1) {
                    // Update the existing designation if found
                    department.Designation[existingDesignationIndex].DesignationDescription = newDesignation.DesignationDescription;
                } else {
                    // Add new designation if not found
                    department.Designation.push({
                        DesignationName: newDesignation.DesignationName,
                        DesignationDescription: newDesignation.DesignationDescription
                    });
                }
            });
        }

        // Save the updated department
        const updatedDepartment = await department.save();

        // Return the updated department as a response
        res.status(200).json(updatedDepartment);

    } catch (error) {
        console.error("Error updating department:", error);
        res.status(500).json({ message: error.message });
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
