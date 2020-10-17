import React, { useState, useEffect } from 'react';
import { Container, Modal, Form, Image, ListGroup, Row, Col, Tabs, Tab } from 'react-bootstrap';

// Components
import Sidebar from '../components/Account/Sidebar';
import Branding from '../components/Account/Branding';
import BasicInfo from '../components/Account/BasicInfo';
// API
import API from '../utils/API';

import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  TextField,
  makeStyles
} from '@material-ui/core';

import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

require('dotenv').config();

const AccountPage = () => {
 
  /** ===== User Profile Info ====== */
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [submit, setSubmit] = useState(1);
 
  // Profile 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [profession, setProfession] = useState('');
  const [about, setAbout] = useState('');
  const [link1, setLink1] = useState('');
  const [link2, setLink2] = useState('');
  const [link3, setLink3] = useState('');
  const [link4, setLink4] = useState('');

  // To handle profile info input 
  const [infoInput, setInfoInput] = useState('');

  const inputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setInfoInput({ ...value, [name]: value })

    console.log(infoInput)
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    document.title = `Music eXchange | Account`;
    if (localStorage.getItem("currentUser")) {
      const userObj = JSON.parse(localStorage.getItem("currentUser"));
      setUserId(JSON.parse(localStorage.getItem("currentUser")))
      setUserId(userObj._id)
    }
    // For demonstration purposes, we mock an API call.
    API.getSavedUsersById(userId).then((res) => {
      if (res.data) {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setFirstName(res.data.profile.firstName);
        setLastName(res.data.profile.lastName);
        setProfession(res.data.profile.profession)
        setAbout(res.data.profile.about);
        setLink1(res.data.profile.link1);
        setLink2(res.data.profile.link2);
        setLink3(res.data.profile.link3);
        setLink4(res.data.profile.link4);
        setProfilePic(res.data.profile.profilePic);
      }
    });
  }, [submit, userId]);

  // Upload Profile Information
  const handleSubmit = async () => {
    handleClose(); // closes the modal
    if (infoInput.firstNameInput) await API.updateProfile(userId, "firstName", infoInput.firstNameInput);
    if (infoInput.lastNameInput) await API.updateProfile(userId, "lastName", infoInput.lastNameInput);
    if (infoInput.professionInput) await API.updateProfile(userId, "profession", infoInput.professionInput);
    if (infoInput.aboutInput) await API.updateProfile(userId, "about", infoInput.aboutInput);
    if (infoInput.link1Input) await API.updateProfile(userId, "link1", infoInput.link1Input);
    if (infoInput.link2Input) await API.updateProfile(userId, "link2", infoInput.link2Input);
    if (infoInput.link3Input) await API.updateProfile(userId, "link3", infoInput.link3Input);
    if (infoInput.link4Input) await API.updateProfile(userId, "link4", infoInput.link4Input);
  }

  /** ===== Bootstrap modal ===== */
  // State and Functions for Bootstrap modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const uploadFileState = e => {
  //   const files = e.target.files;
  //   console.log('from profile', files)
  //   setUploadFiles(files);
  // }

  return (<>
    <Container fluid style={{ height: '100%', width: '100%', fontFamily: 'Kumbh Sans, sans-serif' }} className=' mt-0' >
      <Row style={{height: '100%'}}>
        <Col xs={12} md={2} className='p-0 bg-info' style={{ background: '#F8F8F8' }}>
          <Sidebar 
            profilePic={profilePic} 
            firstName={firstName}
            lastName={lastName}
          />
        </Col>

        <Col xs={12} md={10}>
          <h1 className='mt-5' style={{fontSize: '30px', fontWeight: 700}}>Profile Customization</h1>
          <Tabs defaultActiveKey="branding" id="uncontrolled-tab-example">
            <Tab eventKey="branding" title="Branding">
              <Branding 
                userId={userId}
                profilePic={profilePic}
                submit={submit}
                setSubmit={setSubmit}
              />
            </Tab>
            <Tab eventKey="basic info" title="Basic info">
              <Row>
                <Col xs={12} md={9}>
                  <BasicInfo 
                    userId={userId} 
                    submit={submit}
                    setSubmit={setSubmit}
                    currentFirstName={firstName} 
                    currentLastName={lastName}
                  />
                </Col>
                <Col xs={12} md={3}>

                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  </>)
}

export default AccountPage;