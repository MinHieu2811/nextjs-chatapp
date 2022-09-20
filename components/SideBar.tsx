import * as React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../redux/authSlice';
import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import Tooltip from "@mui/material/Tooltip"
import ChatIcon from '@mui/icons-material/Chat'
import MoreVerticalIcon from '@mui/icons-material/MoreVert'
import LogoutIcon from '@mui/icons-material/Logout'
import SearchIcon from '@mui/icons-material/Search'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import styled from '@emotion/styled'

interface User {
  name: string;
  email: string;
}

const StyledContainer = styled.div`
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;
    border-right: 1px solid whitesmoke;

    ::-webkit-scrollbar{
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
`

const StyledSearch = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 2px;
`

const StyledUserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity: 0.8;
    }
`

const StyledSearchInput = styled.input`
    outline: none;
    border: none;
    flex: 1;
`

const StyledSidebarButton = styled(Button)`
    width: 100%;
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
`

export default function Sidebar() {
  const authState = useSelector(selectAuthState)
  console.log(authState)

  const [keyword, setKeyword] = React.useState('')

  const [listUser, setListUser] = React.useState<User[]>([])
  React.useEffect(() => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    const res = axios.get('http://127.0.0.1:4000/conversation/all', { cancelToken: source.token })

    return () => {
      source.cancel()
    }
  }, [])

  return (
    <StyledContainer>
      <StyledHeader>
        <Tooltip title={authState?.name || ''} placement="right">
          <StyledUserAvatar src='' />
        </Tooltip>

        <div>
          <IconButton>
            <Tooltip title="Messages" placement="bottom">
              <ChatIcon />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title="More Options" placement="bottom">
              <MoreVerticalIcon />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title="Logout" placement="bottom">
              <LogoutIcon />
            </Tooltip>
          </IconButton>
        </div>
      </StyledHeader>
      <StyledSearch>
        <SearchIcon />
        <StyledSearchInput value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder='Searching by email...' />
      </StyledSearch>
      <StyledSidebarButton>
        Start a new conversation
      </StyledSidebarButton>

      {/* list of conversation */}
      {/* {userMatch?.length === 0 ? (
        conversationSnapshot?.docs.map(conversation => <ConversationSelect key={conversation.id} id={conversation.id} conversationUsers={(conversation.data() as Conversation).users} />)
      ) : (
        userMatch && userMatch.map(conversation => <ConversationSelect key={conversation.id} id={conversation.id} conversationUsers={(conversation.data() as Conversation).users} />)
      )} */}
      <Dialog open={false}>
        <DialogTitle>New Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a Google email address for the user you wish to chat with
          </DialogContentText>
          <TextField
            autoFocus
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button>Cancel</Button>
          <Button>Create</Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
}

// http://127.0.0.1:4000/conversation/all
