import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prediction, setPrediction] = useState(null);

  const handlePrediction = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handlePrediction} accept="video/*" />
      {prediction !== null && (
        <p>{prediction >= 0.5 ? 'Fake video' : 'Real video'}</p>
      )}
    </div>
  );
}

export default App;
