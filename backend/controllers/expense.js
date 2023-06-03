const Expense = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const expense = new Expense({
        title,
        amount,
        category,
        description,
        date,
        userId: req.user.id, // auth middleware ile gelecek user id'si
    });

    try {
        if(!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        await expense.save();
        res.status(200).json({ message: 'Expense Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getExpense = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findOne({ _id: id, userId: req.user.id });

        if(!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        await expense.remove();
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}
