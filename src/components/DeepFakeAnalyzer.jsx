import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

function DeepFakeAnalyzer() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('Login'); // Redirect to login page if user is not signed in
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post('/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error analyzing video:', error);
    }
  };

  return (
    <div className="container text-center"> {/* Apply text-center class to center align content */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleAnalyze} className="btn btn-primary mt-3">Analyze</button> {/* Add margin top and use Bootstrap button */}
      {prediction && <p className="mt-3">Prediction: {prediction}</p>} {/* Add margin top */}
    </div>
  );
}

export default DeepFakeAnalyzer;
