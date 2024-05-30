import React, { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { getDatabase, ref, get, update } from 'firebase/database';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBRadio, MDBProgress } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [editableFields, setEditableFields] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading
  const history = useNavigate();

  useEffect(() => {
    const authStateChange = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => authStateChange();
  }, []);

  useEffect(() => {
    if (user) {
      const userId = user.uid;
      const databaseRef = ref(db, `/data/${userId}`);
      
      get(databaseRef)
        .then((snapshot) => {
          const userData = snapshot.val();
          setUserData(userData);
          setEditableFields(Object.keys(userData).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {}));
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching data
        });
    }
  }, [user]);

  const renderUserDetails = () => {
    if (loading) {
      return (
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBProgress className="my-5" style={{ height: '20px' }} color="info" striped animated value={100}>
              Loading...
            </MDBProgress>
          </MDBCol>
        </MDBRow>
      );
    }

    if (!userData) return null;

    const userDetails = Object.entries(userData).map(([key, value]) => {
      return (
        <MDBRow key={key}>
          <MDBCol md="6">
            {key === 'Gender' ? (
              <div className="mb-4">
                <h6 className="fw-bold">Gender:</h6>
                <MDBRadio name="gender" id="male" label="Male" value="Male" checked={value === 'Male'} disabled={!editableFields[key]} onChange={(e) => handleFieldChange(key, e.target.value)} />
                <MDBRadio name="gender" id="female" label="Female" value="Female" checked={value === 'Female'} disabled={!editableFields[key]} onChange={(e) => handleFieldChange(key, e.target.value)} />
                <MDBRadio name="gender" id="other" label="Other" value="Other" checked={value === 'Other'} disabled={!editableFields[key]} onChange={(e) => handleFieldChange(key, e.target.value)} />
              </div>
            ) : (
              <MDBInput wrapperClass="mb-4" label={key} size="lg" id={key} type="text" value={value} readOnly={!editableFields[key]} onChange={(e) => handleFieldChange(key, e.target.value)} />
            )}
          </MDBCol>
          {!editableFields[key] ? (
            <MDBCol md="6">
              <MDBBtn onClick={() => handleEdit(key)} className="mb-4" size="lg">Edit</MDBBtn>
            </MDBCol>
          ) : (
            <MDBCol md="6">
              <MDBBtn onClick={() => handleSave(key, userData[key])} className="mb-4" size="lg">Save</MDBBtn>
            </MDBCol>
          )}
        </MDBRow>
      );
    });

    return userDetails;
  };

  const handleEdit = (key) => {
    setEditableFields(prevState => ({
      ...prevState,
      [key]: true,
    }));
  };

  const handleSave = (key, prevValue) => {
    const newValue = userData[key];
    const userId = user.uid;
    const databaseRef = ref(db, `/data/${userId}`);
    const updates = {};
    updates[key] = newValue;

    update(databaseRef, updates)
      .then(() => {
        setSuccessMessage('Updated Successfully');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
        setEditableFields(prevState => ({
          ...prevState,
          [key]: false,
        }));
      })
      .catch((error) => {
        console.error('Error updating user details:', error);
        // Show error message
      });
  };

  const handleFieldChange = (key, value) => {
    setUserData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <div>
      <MDBContainer fluid>
        <MDBRow className="justify-content-center align-items-center m-5">
          <MDBCard>
            <MDBCardBody className="px-4">
              <h5 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">User Profile</h5>
              {renderUserDetails()}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default UserProfile;
