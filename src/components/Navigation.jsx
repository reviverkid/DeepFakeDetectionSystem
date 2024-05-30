import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { FaUser } from 'react-icons/fa'; // Import user icon from react-icons/fa

async function getUserId() {
  try {
    const auth = getAuth();
    if (!auth.currentUser) {
      throw new Error("User is not signed in");
    }
    const user = auth.currentUser;
    const uid = user.uid;
    return uid;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }
}

function Navigation() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Signed out successfully!');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="">MyDeepEye</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"> {/* Align items to the left */}
              <Nav.Link href="/">Home</Nav.Link>
              {user && <Nav.Link href="/DeepfakeDetection">Deepfake Detection</Nav.Link>}
              {user && <Nav.Link href="/Updates">News</Nav.Link>}
            </Nav>
            <Nav>
              <NavDropdown title={<FaUser />} id="basic-nav-dropdown"> {/* User icon */}
                {user ? (
                  <>
                    <NavDropdown.Item href="/Profile">
                      <span>{user.displayName || 'User Profile'}</span> {/* Display user name or fallback to 'User' */}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="" onClick={handleSignOut}>Sign Out</NavDropdown.Item>
                  </>
                ) : (
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                )}
                
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
