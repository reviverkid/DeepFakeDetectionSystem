import React, { useState } from 'react';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const VideoAnalyzer = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const handleVideoUpload = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const analyzeVideo = async () => {
    setProgress(0); // Reset progress to 0 when starting the analysis
    setIsProcessing(true); // Set processing state to true

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await axios.post('http://localhost:5000/process_video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100));
          setProgress(progress);
        }
      });

      setVideoUrl(URL.createObjectURL(videoFile));
      setPrediction(response.data.average_prediction);
      setPdfUrl(URL.createObjectURL(response.data.pdf));
      setShowProgress(true); // Show progress bar only after response received
    } catch (error) {
      console.error('Error analyzing video:', error);
    } finally {
      setIsProcessing(false); // Set processing state to false after receiving the response
    }
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col md={8}>
          <Form.Group controlId="videoInput">
            <Form.Control type="file" accept="video/*" onChange={handleVideoUpload} />
          </Form.Group>
          {videoUrl && (
            <div className="mt-4 text-center">
              <video controls className="w-75 mx-auto">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </Col>
        <Col md={4} className="d-flex flex-column justify-content-between">
          <Button variant="primary" onClick={analyzeVideo} style={{ width: '100%' }}>Analyze</Button>
          {showProgress && (
            <div style={{ width: '100px', margin: 'auto' }}>
              <CircularProgressbar
                value={progress}
                text={`${progress}%`}
                styles={{ path: { stroke: '#007bff' } }}
                strokeWidth={10}
                className={isProcessing ? 'circular-progressbar--processing' : ''}
              />
            </div>
          )}
        </Col>
      </Row>
      {prediction && (
        <div className="mt-4">
          <Card>
            <Card.Body>
              <h5>Prediction</h5>
              <p>{prediction}</p>
              <h5>Result</h5>
              {prediction !== null && (
        <p>{prediction > 0.5 ? 'FAKE' : 'REAL'}</p>
      )}
            </Card.Body>
          </Card>
        </div>
        
      )}
      {pdfUrl && (
        <div className="mt-4">
          <Card>
            <Card.Body>
              <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default VideoAnalyzer;
