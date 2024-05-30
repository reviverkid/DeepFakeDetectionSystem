import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './css/Footer.css'; // Import CSS for styling

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="footer fixed-bottom">
      <Container>
        <Nav className="mr-auto">
          <Nav.Link href="#">License</Nav.Link>
          <Nav.Link href="#">Copyright © {new Date().getFullYear()} MyDeepEye</Nav.Link>
          <Nav.Link href="#">Terms of Service</Nav.Link>
          <Nav.Link href="#">Privacy Policy</Nav.Link>
        </Nav>
        <Nav className="social-icons">
          <Nav.Link href="https://www.facebook.com/MyDeepEye/" target="_blank"><FontAwesomeIcon icon={faFacebook} /></Nav.Link>
          <Nav.Link href="https://www.twitter.com/MyDeepEye/" target="_blank"><FontAwesomeIcon icon={faTwitter} /></Nav.Link>
          <Nav.Link href="https://www.instagram.com/MyDeepEye/" target="_blank"><FontAwesomeIcon icon={faInstagram} /></Nav.Link>
          <Nav.Link href="https://www.linkedin.com/company/MyDeepEye/" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></Nav.Link>
        </Nav>
        <hr className="footer-divider" />
        <p className="text-center mt-3 mb-0">Connect with us on social media</p>
      </Container>
    </Navbar>
  );
};

export default Footer;
