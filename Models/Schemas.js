import mongoose from "mongoose"

const Schema = mongoose.Schema;
export const Admin = new Schema({
    adminKey: {
        type: String,
        required: 'Enter Admin Key'
    },
    name: {
        type: String,
        required: 'Enter Username'
    },
    password: {
        type: String,
        required: 'Enter password'
    }
});

export const Booking = new Schema({
    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Phone:{
        type: String,
        required: true
    },
    Slot:{
        type: String,
        required: true,
    },
    Haircut: {
        type: String,
        required: true
    },
    Addon: {
        type: String,
        required: false
    },
    Note: {
        type: String,
        required: false
    }
});

export const Schedule = new Schema({
    slot:{
        type: String,
        required: true
    },
    booked:{
        type: Boolean,
        default: false,
        required: true
    }
});