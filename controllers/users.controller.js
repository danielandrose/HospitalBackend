import User from "../models/users.model.js"

export const getAllUsers = async (req, res) => {
    try {
        const response = await User.find();
        res.json(response);
    }
    catch (err) {
        res.status(404).json({ "message": err.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Fetch user by ID
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user); // Return the user's data, including appointments
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ name: req.body.name });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const newUser = new User({
            name: req.body.name,
            password: req.body.password,
            appointments: Array.isArray(req.body.appointments) ? req.body.appointments : []
        })

        const user = await newUser.save();
        res.json(newUser)
    }
    catch (err) {
        res.status(404).json({ "message": err.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== req.body.password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateUser = async (req, res) => {
    const { doctor, dates } = req.body; // Destructure doctor and dates from the request body
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if doctor and dates are provided
        if (!doctor || !dates) {
            return res.status(400).json({ message: "Missing required fields: doctor or dates" });
        }

        // Check for duplicate appointment (same doctor and date)
        const existingAppointment = user.appointments.find(
            (appointment) => appointment.doctor.toString() === doctor && appointment.dates.toString() === dates
        );

        if (existingAppointment) {
            return res.status(400).json({ message: "Appointment already exists" });
        }

        // Add the new appointment to the user's appointments array
        user.appointments.push({ doctor, dates: new Date(dates) });
        await user.save();

        res.status(200).json({ message: "Appointment added to user" });
    } catch (err) {
        console.error("Error adding appointment to user:", err);
        res.status(500).json({ message: "Failed to add appointment" });
    }
};


  

export const deleteUser = (req, res) => {
    res.json({ 'message': 'user got deleted' })
}
