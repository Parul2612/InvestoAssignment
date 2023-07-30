import React, { useState } from 'react';
import axios from 'axios';

const CsvUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('csvFile', selectedFile);

    axios
      .post('/api/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('CSV data uploaded successfully');
        // Refresh the data after successful upload
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error uploading CSV:', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload CSV</button>
    </div>
  );
};

export default CsvUpload;
