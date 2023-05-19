import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const handleGenerateUniversities = async () => {
    try {
      const response = await axios.get(
        'http://universities.hipolabs.com/search?country=' + searchTerm
      );

      setUniversities(response.data);
      setSelectedUniversity(null); // Reset selected university
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSelectUniversity = (university) => {
    setSelectedUniversity(university);
  };

  const handleClear = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="input-container">
        <label htmlFor="searchTerm">SEARCH FOR A UNIVERSITY WEBSITE BY COUNTRY:</label>
        <input
          type="text"
          id="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleGenerateUniversities}>Search</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((university) => (
            <tr
              key={university.name}
              onClick={() => handleSelectUniversity(university)}
              className={selectedUniversity === university ? 'selected' : ''}
            >
              <td>{university.name}</td>
              <td>{university.country}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUniversity && (
        <div className="university-details">
          <h2>{selectedUniversity.name}</h2>
          <p>Country: {selectedUniversity.country}</p>
          <p>Website: {selectedUniversity.web_pages[0]}</p>
        </div>
      )}
    </div>
  );
}

export default App;
