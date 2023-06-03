import {dashboard, expenses, transactions, trend} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Panel',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Notlar",
        icon: transactions,
        link: "/notes",
    },
    {
        id: 3,
        title: "Gelir",
        icon: trend,
        link: "/income",
    },
    {
        id: 4,
        title: "Gider",
        icon: expenses,
        link: "/expenses",
    },
]