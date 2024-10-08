const Login = require('../model/loginModel');

// Login function
exports.login = async (req, res) => {
    const { Id, Password } = req.body;

    try {
        const user = await Login.findOne({ Id });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provided password matches the stored password
        if (user.Password !== Password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Successful login (you may want to return a token here)
        res.status(200).json({ message: 'Login successful', role: user.Role, Data:user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Change password function
exports.changePassword = async (req, res) => {
    const { Id, OldPassword, NewPassword } = req.body;

    try {
        const user = await Login.findOne({ Id });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check the old password
        if (user.Password !== OldPassword) {
            return res.status(401).json({ message: 'Invalid old password' });
        }

        // Update the password
        user.Password = NewPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllLogins = async (req, res) => {
    try {
        const logins = await Login.find();
        res.status(200).json(logins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
