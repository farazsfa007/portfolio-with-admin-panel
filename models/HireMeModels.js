const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hireMeSchema = new Schema({
    idNumber: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    projectType: {
        type: String,
        required: true,
        enum: ['frontend', 'backend', 'fullstack']
    },
    budget: {
        type: Number,
        required: true,
        min: 0
    },
    projectDetails: {
        type: String,
        required: true,
        trim: true
    },
    developerResponse: {
        type: String,
        default: 'Developer Has not responded yet'
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const HireMe = mongoose.model('HireMe', hireMeSchema);

module.exports = HireMe