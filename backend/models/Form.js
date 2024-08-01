const mongoose = require('mongoose');

const flowElementSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    elementType: {
        type: String,
        enum: ['bubble', 'input'],
        required: true,
    },
    message: {
        type: [String], 
        default: [],    
    },
    messageSide: {
        type: String,
        enum: ['admin', 'user'], 
    },
    url: {
        type: String,
        default: null,
    },
}, { _id: false });

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        default: null,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    steps: {
        type: [String],
        default: ['flow', 'theme', 'response'],
    },
    flow: [flowElementSchema],
    theme: {  
        type: String,
        enum: ['light', 'dark', 'blue'],
        default: 'light', 
    },
    views: { type: Number, default: 0 },
    starts: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 },
    ResponseMap: {
        type: Map,
        of: String,
        default: {}
    },
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);