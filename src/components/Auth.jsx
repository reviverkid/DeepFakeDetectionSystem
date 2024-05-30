
import React from 'react'
import {useState,useEffect} from  "react";
import {auth} from '../config/firebase'
import {db} from '../config/firebase'
import { set,ref,push,child } from 'firebase/database';
import {createUserWithEmailAndPassword,signOut,sendEmailVerification} from 'firebase/auth'
// import {ref,push,set,database} from 'firebase/database'
import Form from 'react-bootstrap/Form';
//import firebaseApp from '../config/firebase'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBDropdown,
  MDBRadio
}
from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';




const Auth=()=> {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");
    const [phonenumber,setPhoneNumber]=useState("");
    const [age,setAge]=useState("");
    const [gender,setGender]=useState("");
    const [address,setAddress]=useState("");
    const [district,setDistrict]=useState("");
    const [pincode,setPincode]=useState("");
    const history=useNavigate();
    
    const [currentUserUID, setCurrentUserUID] = useState('');




    const signIn= async()=> {


        if(name==""){

          alert("Enter Your Name");
          return false;
        }
        if(age==""){

          alert("Enter Your Age");
          return false;
        }
        if(phonenumber==""){

          alert("Enter Your Phone Number");
          return false;
        }
        if(isNaN(phonenumber)||phonenumber.length<10){

          alert("Enter Valid Phone Number");
          return false;
        }
        if(gender==""){
          alert("Enter Gender");
          return false;
        }
        if(address==""){
          alert("Enter Address");
          return false;
        }
        if(pincode==""){
          alert("Enter Pincode");
          return false;
        }
        if(district==""||district=="0"){
          alert("Enter District");
          return false;
        }
        if(email==""){
          alert("Enter Email");
          return false;
        }
        if(password==""){
          alert("Enter Password");
          return false;
        }
        if(password.length<7){
          alert("Password Should be minimum of 7");
          return false;
        }


      try{

          await createUserWithEmailAndPassword(auth,email,password)
          .then((userCredential) => {
            
            console.log('User created successfully');
            console.log('Registration Successfull');
          
            const user =  auth.currentUser;

        //  const dataRef = ref(db, "data/"+currentUserUID);
          const dataRef = ref(db, "data/"+user.uid);
           // const dataRef = db.ref(`users/${currentUserUID}`);
          //  const userRef = push(dataRef);

           try{

            set(dataRef,{
              Name: name,
              Age: age,
              Address: address,
              Pincode: pincode,
              District: district,
              Gender: gender,
              Phone: phonenumber,
              Email: email,
              
            }).then(()=>{
              console.log('Data Insertion Success');
               sendEmailVerification(auth.currentUser).then(()=>{

                alert("Sign up Successfull...please check your email");
                
                history('/Login');
              })
            })

           }catch(err)
            {
              console.log(err);
              alert("Something went wrong while inserting data try again later...");
            }

            try{

            }catch(err){
              console.log('Failure in user creation');
              alert("Something went wrong try again later...");
            };
    
            
          })

      }catch(err){
          console.log(err);
          alert("Something went wrong try again later...");
      }
        
    }

    const logOut= async()=> {
      try{

        await signOut(auth);

      }catch(err){
          console.log(err);
      }
      console.log(auth?.currentUser);

  }

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setCurrentUserUID(user.uid);
//       } else {
//         setCurrentUserUID(''); // Clear the UID if user is not signed in
//       }
//     });
  
//     return () => unsubscribe(); // Cleanup function to avoid memory leaks
//   }, []);
  
//   // Example usage:
// if (currentUserUID) {
//   console.log('Current user UID:', currentUserUID);
// } else {
//   console.log('User is not signed in');
// }





  return (
    <div>
       

<MDBContainer fluid>

<MDBRow className='justify-content-center align-items-center m-5'>

  <MDBCard>
    <MDBCardBody className='px-4'>

      <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Sign Up</h3>

      <MDBRow>

        <MDBCol md='3'>
          <MDBInput wrapperClass='mb-4' label='Name' size='lg' id='form1' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </MDBCol>

        <MDBCol md='2'>
        <MDBInput wrapperClass='mb-2' label='Age' size='lg' id='form2' type='text' value={age} onChange={(e) => setAge(e.target.value)}/>

        </MDBCol>

      </MDBRow>

      <MDBRow>

        <MDBCol md='2'>
        <MDBInput wrapperClass='mb-4' label='Phone' size='lg' id='form3' type='text' value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
        
        </MDBCol>

        <MDBCol md='3' className='mb-4' value={gender} onChange={(e) => setGender(e.target.value)}>
          <h6 className="fw-bold">Gender: </h6>
          <MDBRadio name='inlineRadio' id='inlineRadio1' value='Female' label='Female' inline />
          <MDBRadio name='inlineRadio' id='inlineRadio2' value='Male' label='Male' inline />
          <MDBRadio name='inlineRadio' id='inlineRadio3' value='Other' label='Other' inline />

          
        </MDBCol>

      </MDBRow>

      <MDBRow>

        <MDBCol md='3'>  
          <MDBInput wrapperClass='mb-4' label='Address' size='lg' id='addr' type='text' value={address} onChange={(e) => setAddress(e.target.value)}/>
        </MDBCol>

        <MDBCol md='2'>
        <MDBInput wrapperClass='mb-4' label='Pincode' size='lg' id='pin' type='text' value={pincode} onChange={(e) => setPincode(e.target.value)}/>

        </MDBCol>

      </MDBRow>


      
      <MDBRow>


      <MDBCol md='5'>  
      <Form.Select aria-label="Select District" value={district} onChange={(e) => setDistrict(e.target.value)}>
        <option value="0">Select your District</option>
        <option value="Alappuzha">Alappuzha</option>
        <option value="Ernakulam">Ernakulam</option>
        <option value="Idukki">Idukki</option>
        <option value="Kannur">Kannur</option>
        <option value="Kasaragod">Kasaragod</option>
        <option value="Kollam">Kollam</option>
        <option value="Kottayam">Kottayam</option>
        <option value="Kozhikode">Kozhikode</option>
        <option value="Malappuram">Malappuram</option>
        <option value="Palakkad">Palakkad</option>
        <option value="Pathanamthitta">Pathanamthitta</option>
        <option value="Thiruvananthapuram">Thiruvananthapuram</option>
        <option value="Thrissur">Thrissur</option>
        <option value="Wayanad">Wayanad</option>
        
      </Form.Select>
       
        </MDBCol>

        <MDBCol md='2'>
       

        </MDBCol>
        
      </MDBRow>
        

      <br>
        </br>
      

    <MDBRow>

        <MDBCol md='3'>  
          <MDBInput wrapperClass='mb-4' label='Email Address' size='lg' id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </MDBCol>

        <MDBCol md='2'>
        <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='pass' type='password' autoComplete='false' value={password} onChange={(e) => setPassword(e.target.value)}/>

        </MDBCol>

      </MDBRow>

      <center>

      <MDBBtn  onClick={signIn} className='mb-4' size='lg'>Submit</MDBBtn>
        </center>
    </MDBCardBody>
  </MDBCard>

</MDBRow>
</MDBContainer>
<center>
<a  href="/LogIn">Already have account??</a>
</center>



        

    </div>




  )
}

export default Auth