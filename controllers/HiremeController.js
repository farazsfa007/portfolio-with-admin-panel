const { v4: uuidv4 } = require('uuid')
const HireMe = require('../models/HiremeModels');

const createHireMe = async (req, res) => {
    try {
        const { name, email, phoneNumber, projectType, budget, projectDetails } = req.body;

        // Create a new HireMe document
        const newHireMe = new HireMe({
            idNumber:uuidv4(),
            name,
            email,
            phoneNumber,
            projectType,
            budget,
            projectDetails,
        });

        // Save to database
        await newHireMe.save();
        
        res.status(201).json({ message: 'Submission successful', idNumber:newHireMe.idNumber });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', error });
    }
}

const getAllHireMeEntries = async (req, res) => {
    try {
        const allEntries = await HireMe.find().sort({ createdAt: -1 }); // Optional: sort by latest
        res.status(200).json(allEntries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all submissions', error });
    }
};

const getHireMeById = async (req, res) => {
    try {
        const { idNumber } = req.params;
        console.log("Received ID to check:", idNumber); 
        const hireMeEntry = await HireMe.findOne({ idNumber }); 

        if (!hireMeEntry) {
            return res.status(404).json({ message: 'No record found for this ID' });
        }

        res.status(200).json(hireMeEntry);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data', error });
    }
}


// PATCH - Update status to "Approved"
const updateHireMeStatus = async (req, res) => {
    const { idNumber } = req.params;
    const { status, developerResponse } = req.body;

    try {
        const updatedEntry = await HireMe.findOneAndUpdate(
            { idNumber },
            { status, developerResponse },
            { new: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: 'Record not found' });
        }

        res.status(200).json({ message: 'Status updated successfully', data: updatedEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error updating status', error });
    }
};


// DELETE - Delete entry by idNumber
const deleteHireMeEntry = async (req, res) => {
    const { idNumber } = req.params;

    try {
        const deleted = await HireMe.findOneAndDelete({ idNumber });

        if (!deleted) {
            return res.status(404).json({ message: 'Record not found' });
        }

        res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting entry', error });
    }
};

module.exports = {
    createHireMe,
    getHireMeById,
    getAllHireMeEntries,
    updateHireMeStatus, // ✅ export new controller
    deleteHireMeEntry   // ✅ export delete controller
};