const auth = require('../middlewares/auth');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { addNote, getNotes, deleteNote } = require('../controllers/note'); // Yeni route'lar

const router = require('express').Router();

router.post('/add-income', auth, addIncome)
    .get('/get-incomes', auth, getIncomes)
    .delete('/delete-income/:id', auth, deleteIncome)
    .post('/add-expense', auth, addExpense)
    .get('/get-expenses', auth, getExpense)
    .delete('/delete-expense/:id', auth, deleteExpense)
    .post('/add-note', auth, addNote)             
    .get('/get-notes', auth, getNotes)            
    .delete('/delete-note/:id', auth, deleteNote) 

module.exports = router;
