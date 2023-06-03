const Income = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const income = new Income({
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

        await income.save();
        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const income = await Income.findOne({ _id: id, userId: req.user.id });

        if(!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        await income.remove();
        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}
