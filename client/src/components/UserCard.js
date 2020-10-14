import React, { useState, useEffect } from 'react'
import { Card, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
const UserCard = ({ user }) => {
  const [hover, setHover] = useState(false);
  const [close, setClose] = useState(false);
  const [screenWidth, setScreenWidth] = useState();

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    if (close) {
      setClose(false);
      setHover(false);
    }
  }, [close])

  const hoverTrue = () => {
    setHover(true);
  }

  const hoverFalse = () => {
    setHover(false);
  }

  const toggleClose = () => {
    setHover(false)
    setClose(true);
  }

  let cardStyle;
  if (hover) {
    cardStyle = {
      opacity: 1,
      background: 'rgba(0,0,0,0.8)',
      transition: `${hover ? '0.5s' : '0.5s;'}`
    }
  } else {
    cardStyle = {
      opacity: 0,
      background: 'rgba(0,0,0,0)',
      transition: `${hover ? '0.5s' : '0.5s;'}`,
      alignItems: 'center',
    }
  }

  return <>
    <Card style={{backgroundColor: 'transparent'}}> 
      <Card.Img variant='top' src={user.profile.profilePic} style={{ border: '0px' }} />
      <Card.ImgOverlay className='image-overlay'
        style={cardStyle}
        onMouseEnter={hoverTrue} onMouseLeave={hoverFalse}
        className='d-flex justify-content-center'>
  
        <div className='align-self-center'>
          <Link to={`/profile/${user.username}`} >
            <Button variant='outline-light' >
              Visit Profile
            </Button>
          </Link>
          {/* <div className='d-flex justify-content-center mt-3'>
            <FavoriteBorderIcon style={{color: '#fff'}}/>
          </div> */}
        </div>
        

      </Card.ImgOverlay>

    </Card>
  </>
}

export default UserCard;