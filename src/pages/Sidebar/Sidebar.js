import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DoneIcon from '@mui/icons-material/Done';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreIcon from '@mui/icons-material/More';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SearchIcon from '@mui/icons-material/Search';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import CustomLink from './CustomLink';
import SidebarOptions from './SidebarOptions';
import './sidebar.css';


const Sidebar = ({handleLogout,user}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [loggedInUser]=useLoggedInUser();
  const useProfilePic=loggedInUser[0]?.profileImage?loggedInUser[0].profileImage:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'

  // console.log("openmenu:", openMenu, anchorEl);

  const handleClick = e => {
    console.log(e.currentTarget)
    setAnchorEl(e.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  const result=user[0]?.email.split('@')[0];

  return (
    <div className='sidebar'>
      <TwitterIcon className='sidebar_twitterIcon' />
      <CustomLink to='/home/feed'>
      <SidebarOptions active Icon={HomeIcon} text='Home' />
      </CustomLink>
      <CustomLink to='/home/explore'>
      <SidebarOptions active Icon={SearchIcon} text='Explore' />
      </CustomLink>
      <CustomLink to='/home/notifications'>
      <SidebarOptions active Icon={NotificationsIcon} text='Notification' />
      </CustomLink>
      <CustomLink to='/home/messages'>
      <SidebarOptions active Icon={MailOutlineIcon} text='Messages' />
      </CustomLink>
      <CustomLink to='/home/bookmarks'>
      <SidebarOptions active Icon={BookmarkBorderIcon} text='Bookmarks' />
      </CustomLink>
      <CustomLink to='/home/lists'>
      <SidebarOptions active Icon={ListAltIcon} text='List' />
      </CustomLink>
      <CustomLink to='/home/profile'>
      <SidebarOptions active Icon={PermIdentityIcon} text='Profile'/>
      </CustomLink>
      <CustomLink to='/home/more'>
      {/* <SidebarOptions active Icon={MoreHorizIcon} text='More'/> */}
      <SidebarOptions active Icon={MoreIcon} text='More'/>

      </CustomLink>
{/*       
        <SidebarOptions active Icon={DoneIcon} text='Done'/>
        <SidebarOptions active Icon={FormatListBulletedIcon} text='Bullet Icon'/> */}

      <Button variant="outlined" className='sidebar_tweet'>
        Tweet
      </Button>
      <div className="profile-info">
        <Avatar src={useProfilePic}></Avatar>
        <div className='user_info'>
        <h4>
            {loggedInUser[0]?.name?loggedInUser[0]?.name : user && user[0].displayName}
          </h4>
          <h5>@{result}</h5>
        </div>
        <IconButton
          size='large'
          sx={{ ml: 2 }}
          aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon onClick={handleClick} />
        </IconButton>
        <Menu className='basic-menu' anchorEl={anchorEl} open={openMenu} onClick={handleClose} onClose={handleClose} >
          <MenuItem className='Profile_info1' >
            <Avatar src='https://mui.com/static/images/cards/basement-beside-myself.jpeg' />
            <div className='user_info subUser_info'>
              <div>
              <h4>
                  {loggedInUser[0]?.name?loggedInUser[0]?.name : user && user[0].displayName}
                </h4>
                <h5>@{result}</h5>
              </div>
              <ListItemIcon className='done_icom'><DoneIcon/></ListItemIcon>
            </div>
          </MenuItem>
          <Divider/>
          <MenuItem onClick={handleClose}>Add an existing account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout @prashant</MenuItem>
        </Menu>
      </div>

    </div>
  )
}
export default Sidebar;