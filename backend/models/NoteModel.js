const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        maxLength: 20,
        trim: true
    },
    date: {
        type: Date,
        trim: true
    },
    description: {
        type: String,
        maxLength: 500, // Bu değeri isteğinize göre değiştirebilirsiniz
        trim: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Note', NoteSchema)
