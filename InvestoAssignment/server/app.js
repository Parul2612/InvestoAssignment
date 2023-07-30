const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const db = require('./db');

const app = express();
const upload = multer({ dest: 'server/uploads/' });

app.use(express.json());

// Route to handle CSV file upload
app.post('/api/upload-csv', upload.single('csvFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No CSV file uploaded' });
  }

  const csvRows = [];
  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on('data', (row) => csvRows.push(row))
    .on('end', () => {
      fs.unlinkSync(req.file.path); // Delete the temporary uploaded file

      // Assuming the CSV file has a header row and columns "name" and "age"
      const insertQuery = 'INSERT INTO stocks_data(datetime ,close ,high ,low ,open ,volume ,instrument) VALUES ? ? ? ? ? ? ?';
      const values = csvRows.map((row) => [row.datetime, row.close, row.high, row.low, row.open, row.volume, row.instrument ]);

      db.query(insertQuery, [values], (error, results) => {
        if (error) {
          console.error('Error inserting data into database:', error);
          return res.status(500).json({ error: 'Failed to insert data into database' });
        }

        return res.status(200).json({ message: 'CSV data uploaded successfully' });
      });
    });
});

// Route to fetch data from MySQL database
app.get('/api/fetch-data', (req, res) => {
  const selectQuery = 'SELECT * FROM stocks_data';

  db.query(selectQuery, (error, results) => {
    if (error) {
      console.error('Error fetching data from database:', error);
      return res.status(500).json({ error: 'Failed to fetch data from database' });
    }

    return res.status(200).json(results);
  });
});

const PORT = 5000; // Change this port number as needed
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
