import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Definisikan tipe data sebagai objek JavaScript biasa
type Data = {
  id: number;
  name: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.name}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
