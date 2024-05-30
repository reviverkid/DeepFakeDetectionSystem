import { useState,useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Report = () => {

  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login'); // Redirect to login page if user is not signed in
      }
    });
  
    return () => unsubscribe(); // Cleanup function
  }, []);



  const [videoFile, setVideoFile] = useState(null);
  const [reportData, setReportData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy metadata and deepfake data
    const metadata = {
      title: 'Deepfake Video Title',
      author: 'John Doe',
      // ... other metadata properties
    };

    const deepfakeData = {
      technique1: 'Face Swap',
      technique2: 'Voice Synthesis',
      // ... other deepfake techniques properties
    };

    // Set the report data based on the uploaded video (dummy data)
    setReportData({
      metadata,
      deepfakeData,
    });
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="videoUpload">
          <Form.Label>Upload Video:</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>

      {reportData && (
        <Card className="mt-4">
          <Card.Header as="h5">Deepfake Video Report</Card.Header>
          <Card.Body>
            <Card.Title>{reportData.metadata.title}</Card.Title>
            <Card.Text>
              <strong>Author:</strong> {reportData.metadata.author}
              {/* Display other metadata properties */}
            </Card.Text>
            {/* Display other metadata properties */}
          </Card.Body>

          <Card.Header as="h5" className="mt-3">
            Deepfake Techniques
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <strong>Technique 1:</strong> {reportData.deepfakeData.technique1}
            </Card.Text>
            <Card.Text>
              <strong>Technique 2:</strong> {reportData.deepfakeData.technique2}
            </Card.Text>
            {/* Display other deepfake techniques properties */}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Report;