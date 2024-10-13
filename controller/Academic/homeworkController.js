const Homework = require('../../model/Academic/homeworkModel');

// Create a new homework entry
exports.createHomework = async (req, res) => {
    const { Date, Type, Class, Section, Subject, Character, Title, Details, Status } = req.body;

    try {
        const homework = new Homework({ Date, Type, Class, Section, Subject, Character, Title, Details, Status });
        await homework.save();
        res.status(201).json(homework);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all homework entries
exports.getAllHomeworks = async (req, res) => {
    try {
        const homeworks = await Homework.find();
        res.status(200).json(homeworks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a homework entry by ID
exports.getHomeworkById = async (req, res) => {
    try {
        const homework = await Homework.findById(req.params.id);
        if (!homework) return res.status(404).json({ message: 'Homework not found' });
        res.status(200).json(homework);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a homework entry
exports.updateHomework = async (req, res) => {
    const { Date, Type, Class, Section, Subject, Character, Title, Details, Status } = req.body;

    try {
        const homework = await Homework.findByIdAndUpdate(
            req.params.id,
            { Date, Type, Class, Section, Subject, Character, Title, Details, Status }, 
            { new: true }
        );
        if (!homework) return res.status(404).json({ message: 'Homework not found' });
        res.status(200).json(homework);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a homework entry
exports.deleteHomework = async (req, res) => {
    try {
        const homework = await Homework.findByIdAndDelete(req.params.id);
        if (!homework) return res.status(404).json({ message: 'Homework not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
