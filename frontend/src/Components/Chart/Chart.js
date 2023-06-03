import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment'; // Moment.js kütüphanesini import ediyoruz
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days')); // Son 30 günü varsayılan olarak belirliyoruz
  const [endDate, setEndDate] = useState(moment()); // Bugünün tarihini bitiş tarihi olarak belirliyoruz
  const [focusedInput, setFocusedInput] = useState(null);

  const filteredIncomes = incomes.filter(income => {
    const date = new Date(income.date);
    return (!startDate || date >= startDate._d) && (!endDate || date <= endDate._d);
  });
  const filteredExpenses = expenses.filter(expense => {
    const date = new Date(expense.date);
    return (!startDate || date >= startDate._d) && (!endDate || date <= endDate._d);
  });

  const data = {
    labels: [...new Set([...filteredIncomes, ...filteredExpenses].map(item => dateFormat(item.date)))],
    datasets: [
      {
        label: 'Gelir',
        data: filteredIncomes.map(income => income.amount),
        backgroundColor: 'green',
        tension: .2
      },
      {
        label: 'Gider',
        data: filteredExpenses.map(expense => expense.amount),
        backgroundColor: 'red',
        tension: .2
      }
    ]
  };

  return (
    <ChartStyled>
      <DateRangePicker
        startDate={startDate}
        startDateId="your_unique_start_date_id"
        endDate={endDate}
        endDateId="your_unique_end_date_id"
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        displayFormat="DD/MM/YYYY"
        isOutsideRange={() => false}
      />
      <Line data={data} />
    </ChartStyled>
  );
}


const ChartStyled = styled.div`
  background: #FCF6F9;
  border: 2px solid #FFFFFF;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default Chart;
