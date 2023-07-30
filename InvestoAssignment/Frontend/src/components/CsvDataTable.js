import React from 'react';

const CsvDataTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>datetime</th>
          <th>close</th>
          <th>high</th>
          <th>low</th>
          <th>open</th>
          <th>volume</th>
          <th>instrument</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.datetime}</td>
            <td>{item.close}</td>
            <td>{item.high}</td>
            <td>{item.open}</td>
            <td>{item.volume}</td>
            <td>{item.instrument}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CsvDataTable;
