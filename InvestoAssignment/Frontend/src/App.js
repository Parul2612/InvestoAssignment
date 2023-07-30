// src/App.js

import React, { useState, useEffect } from 'react';
import CsvUpload from './components/CsvUpload';
import CsvDataTable from './components/CsvDataTable';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);

  // Fetch data from the server on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the server
  const fetchData = () => {
    axios
      .get('/api/fetch-data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="App">
      <h1>CSV Upload and Fetch</h1>
      <CsvUpload />
      <hr />
      <h2>Data from MySQL Database</h2>
      <CsvDataTable data={data} />
    </div>
  );
};

export default App;
