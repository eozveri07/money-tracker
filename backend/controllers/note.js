const Note = require("../models/NoteModel");

exports.addNote = async (req, res) => {
    const { title, amount, description, date } = req.body;

    const note = new Note({
        title,
        amount,
        description,
        date,
        userId: req.user.id, // auth middleware ile gelecek user id'si
    });

    try {
        await note.save();
        res.status(200).json({ message: 'Note Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findOne({ _id: id, userId: req.user.id });

        if(!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        await note.remove();
        res.status(200).json({ message: 'Note Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}
