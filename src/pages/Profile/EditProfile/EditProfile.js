import { Button } from '@mui/base';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import React from 'react';
import './editProfile.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 8,
};

// const EditChild = ({ dob, setDob }) => {

//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   }

//   const handleClose = () => {
//     setOpen(false);
//   }

//   return (
//     <React.Fragment>
//       <div className='birthdate-section' onClick={handleOpen}>
//         <text>Edit</text>
//       </div>
//       <Modal
//         hideBackdrop
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >

//         <Box sx={{ ...style, width: 300, height: 300 }}>
//           <div className='text'>
//             <h2>Edit date of birth</h2>
//             <p>This can only be changed a few times.<br />
//               make sure you enter the age of the <br />
//               person using account
//             </p>
//             <input
//               type='date'
//               onChange={e => setDob(e.target.value)}
//             />
//             <Button className='e-button' onClick={() => { setOpen(false) }}>Cancel</Button>
//           </div>
//         </Box>
//       </Modal>
//     </React.Fragment>
//   )
// }


function EditChild({ dob, setDob }) {
  const [open, setOpen] = React.useState(true);


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className='birthdate-section' onClick={handleOpen}>
        <text>Edit</text>
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 300 }}>
          <div className='text'>
            <h2>Edit date of birth?</h2>
            <p>This can only be changed a few times.<br />
              Make sure you enter the age of the <br />
              person using the account. </p>
            {/* <Button className='e-button'>Edit</Button> */}
            <input
              type="date"
              onChange={e => setDob(e.target.value)}
            />
            <Button className='e-button' onClick={() => { setOpen(false); }}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}


const EditProfile = ({ user, loggedInUser }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [website, setWebsite] = React.useState('');
  const [dob, setDob] = React.useState('');

  const HandleSave = async () => {
    const editedInfo = {
      email:user?.email,
      name,
      bio,
      location,
      website,
      dob
    }
    if (editedInfo) {
      await axios.patch(`https://twitter-backend-5c72.onrender.com/userUpdates/${user?.email}`, editedInfo);
      setOpen(false)
    }

  }

  return (
    <div>
      <button className='edit-profile-btn' onClick={() => setOpen(true)}>Edit Profile</button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='model'>
          <div className='header'>
            <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
            <h2 className='header-title'>Edit Profile</h2>
            <button className='save-btn' onClick={HandleSave}>Save</button>
          </div>

          <form className='fill-content'>
            <TextField
              className='text-field'
              fullWidth
              label='Name'
              id='fullWidth'
              variant='filled'
              value={name} // Use value instead of defaultValue
              onChange={(e) => setName(e.target.value)}
              defaultValue={loggedInUser[0]?.name ? loggedInUser[0]?.name : ''}
            />
            {/* <TextField className='text-field' fullWidth label='Name' is='fullWidth' variant='filled' onChange={(e)=>setName(e.target.value)} }/> */}
            <TextField className='text-field' fullWidth label='Bio' id='fullWidth' variant='filled' onChange={(e) => setBio(e.target.value)} defaultValue={loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ''} />
            <TextField className='text-field' fullWidth label='Location' id='fullWidth' variant='filled' onChange={(e) => setLocation(e.target.value)} defaultValue={loggedInUser[0]?.location ? loggedInUser[0]?.location : ''} />
            <TextField className='text-field' fullWidth label='Website' id='fullWidth' variant='filled' onChange={(e) => setWebsite(e.target.value)} defaultValue={loggedInUser[0]?.website ? loggedInUser[0]?.website : ''} />


          </form>
          <div className='birthdate-section'>
            <p>Birth Date</p>
            <p>.</p>
            <EditChild dob={dob} setDob={setDob} />

          </div>
          <div className='last-section'>
            {
              loggedInUser[0]?.dob ?
                <h2>{loggedInUser[0]?.dob}</h2> :
                <h2>
                  {
                    dob ? dob : 'Add your date of birth'
                  }
                </h2>
            }
            <div className='last-btn'>
              <h2>Switch to professional</h2>
              <ChevronRightIcon />
            </div>
          </div>

        </Box>

      </Modal>
    </div>
  )
}
export default EditProfile;

