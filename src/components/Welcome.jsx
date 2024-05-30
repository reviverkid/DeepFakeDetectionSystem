import React from 'react';
import {useEffect} from 'react';
import { Carousel, Card, Badge, Image,Button } from 'react-bootstrap';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import './Welcome.css'
import image1 from '../assets/a3.jpg'
import image2 from '../assets/a2.jpg'
import image3 from '../assets/a4.jpeg'

const Welcome = () => {

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
  





  const slides = [
    {
      image: image1,
      caption: 'Unmask the deception. Detect deepfakes with MyDeepEye.',
    },
    {
      image: image2,
      caption: 'Protect yourself from misinformation and manipulation.',
    },
    {
      image: image3,
      caption: 'Empower yourself with reliable deepfake detection technology.',
    },
  ];

  return (
    <div>
      {/* Carousel with captivating images and captions */}
      <Carousel fade interval={3000}>
        {slides.map((slide) => (
          <Carousel.Item key={slide.image}>
            <Image
              className="d-block w-100"
              src={slide.image}
              alt={slide.caption}
            />
            <Carousel.Caption>
              <h3>{slide.caption}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Cards showcasing key features */}
      <div className="container my-5">
        <div className="row">
          <Card className="col-md-4">
            <Image
              className="card-img-top"
              src="https://eu-images.contentstack.com/v3/assets/blt6d90778a997de1cd/blt76c190d8cc7ffc8e/64f1596b7de67f339a00e3b9/deepfake_shuttersv_shutterstock.jpg?width=850&auto=webp&quality=95&format=jpg&disable=upscalep"
              alt="Upload and Analyze"
            />
            <Card.Body>
              <Card.Title>Upload Any Media</Card.Title>
              <Card.Text>
                Easily upload videos, audio, or images for immediate analysis.
              </Card.Text>
              <Badge variant="primary">Fast & Accurate</Badge>
            </Card.Body>
          </Card>
          <Card className="col-md-4">
            <Image
              className="card-img-top"
              src="data:image/jpeg;base64,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"
              alt="In-Depth Insights"
            />
            <Card.Body>
              <Card.Title>Get Detailed Reports</Card.Title>
              <Card.Text>
                Receive comprehensive analysis highlighting manipulation techniques.
              </Card.Text>
              <Badge variant="success">Advanced AI</Badge>
            </Card.Body>
          </Card>
          <Card className="col-md-4">
            <Image
              className="card-img-top"
              src="https://analyticsindiamag.com/wp-content/uploads/2021/12/deepfake-banner_11zon.jpg"
              alt="Stay Informed"
            />
            <Card.Body>
              <Card.Title>Stay Ahead of the Curve</Card.Title>
              <Card.Text>
                Access essential resources and updates on deepfake trends.
              </Card.Text>
              <Badge variant="info">Stay Vigilant</Badge>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Call to action buttons */}
      <div className="text-center my-5">
        <Button variant="primary" size="lg" href="/analysis">
          Analyze Now
        </Button>
        <Button variant="outline-secondary" size="lg" href="/learn">
          Learn More
        </Button>
      </div>
      <br></br>
    </div>

  );
};

export default Welcome;