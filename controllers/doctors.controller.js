import Doctor from "../models/doctors.model.js"
import User from "../models/users.model.js";

// Get all doctors
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    }
    catch (err) {
        res.status(404).json({ "message": err.message });
    }
}

// Get a specific doctor by ID
export const getDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id; // Get doctor ID from request params
        const doctor = await Doctor.findById(doctorId); // Fetch doctor by ID

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json(doctor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new doctor
export const createDoctor = async (req, res) => {
    const newDoctor = new Doctor({
        name: req.body.name,
        specialization: req.body.specialization,
        img: req.body.img,
        appointments: Array.isArray(req.body.appointments) ? req.body.appointments : [] // Initialize appointments if any
    });

    try {
        const doctor = await newDoctor.save();
        res.status(201).json(doctor);
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
};

export const updateDoctor = async (req, res) => {
    const { patientID, patientName, patientAge, date } = req.body;
    const doctorId = req.params.id;

    try {
        // Find doctor by ID
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Normalize `date` to ISO string for accurate comparison
        const formattedDate = new Date(date).toISOString();

        // Check if the appointment already exists for this patient and date
        const existingAppointment = doctor.appointments.find(
            (appt) => appt.patientID.toString() === patientID && new Date(appt.date).toISOString() === formattedDate
        );

        if (existingAppointment) {
            return res.status(400).json({ message: "Appointment already exists for this date" });
        }

        // Add new appointment to doctor
        const newAppointment = { patientID, patientName, patientAge, date: formattedDate };
        doctor.appointments.push(newAppointment);
        await doctor.save();

        // Find the user by patientID
        const user = await User.findById(patientID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the appointment already exists in the user schema
        const existingUserAppointment = user.appointments.find(
            (appt) => appt.doctor.toString() === doctorId && new Date(appt.dates).toISOString() === formattedDate
        );

        if (existingUserAppointment) {
            return res.status(400).json({ message: "User already has an appointment for this doctor on the same date" });
        }

        // Add the doctor's ObjectId to the user's appointments array
        user.appointments.push({ doctor: doctorId, dates: formattedDate });
        await user.save();

        res.status(200).json({ message: "Appointment booked successfully" });
    } catch (err) {
        console.error("Error booking appointment:", err);
        res.status(500).json({ message: "Internal server error while booking appointment" });
    }
};


// Delete a doctor (This doesn't delete appointments associated with this doctor)
export const deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const doctor = await Doctor.findByIdAndDelete(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.json({ message: "Doctor deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
