import { useContext } from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from 'recharts';
import { GlobalContext } from '../context/globalState';

function Dashboard() {
  const { transactions } = useContext(GlobalContext);

  // Group amounts by category
  const categoryMap = {};

  transactions.forEach((txn) => {
    if (txn.type === '-') {
      const category = txn.category || 'Uncategorized';
      console.log('Amont', txn);

      // Safely parse amount
      const amount = Number(txn.Amount);
      if (isNaN(amount)) return; // Skip invalid amounts

      categoryMap[category] = (categoryMap[category] || 0) + amount;
    }
  });

  // Convert to chart-compatible format
  const categoryData = Object.entries(categoryMap).map(
    ([category, amount]) => ({
      category,
      amount,
    }),
  );
  const timeMap = {};
  transactions.forEach((txn) => {
    if (txn.type === '-') {
      const date = new Date(txn.time).toLocaleDateString();
      const amount = txn.Amount;
      timeMap[date] = (timeMap[date] || 0) + amount;
    }
  });
  const timeData = Object.entries(timeMap).map(([date, amount]) => ({
    date,
    amount,
  }));
  const COLORS = [
    '#0088FE', // Blue
    '#00C49F', // Teal
    '#FFBB28', // Amber
    '#FF8042', // Orange
    '#8884d8', // Purple
    '#82ca9d', // Light Green
    '#a4de6c', // Lime
    '#d0ed57', // Yellow Green
    '#ffc658', // Soft Orange
    '#ff6666', // Coral Red
    '#66b3ff', // Sky Blue
    '#c2c2f0', // Lavender
    '#ffb3e6', // Pink
    '#c4e17f', // Green-Yellow
    '#76c7c0', // Cool Cyan
    '#f7a35c', // Light Brown-Orange
    '#90ee90', // Light Green
    '#ff7373', // Light Red
  ];

  const renderLabel = ({ name, value }) => `${name}: ₹${value}`;
  return (
    <div style={{ padding: '0px', textAlign: 'center' }}>
      <h3>Spending by Category</h3>
      {categoryData.length === 0 ? (
        <p>No expense data available</p>
      ) : (
        <PieChart width={400} height={400}>
          <Pie
            data={categoryData}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label={renderLabel}
          >
            {categoryData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value}`} />
        </PieChart>
      )}
      <h3 style={{ marginTop: '3rem' }}>Spending Over Time</h3>
      <BarChart width={600} height={300} data={timeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" name="Amount (₹)" />
      </BarChart>
    </div>
  );
}

export default Dashboard;
