import * as React from 'react';
import { useCallback, useMemo } from 'react';
import styled from '@emotion/styled'
import { Box, Container, TextField, Typography, Button } from '@mui/material'
import axios from 'axios';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthState, setAuthState } from '@/redux/authSlice';

const Wrapper = styled(Box)`
    width: 100%;
    max-width: 500px;
    max-height: 300px;
    height: 100vh;
    padding: 20px;
    margin: auto auto;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    border: 2px solid black;
`
export default function LoginPage() {
    const authState = useSelector(selectAuthState);
    const dispatch = useDispatch()

    const router = useRouter()
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(false)

    const handleSignIn = useCallback(async () => {
        try {
            setLoading(true)
            
            const res = await axios.post('http://127.0.0.1:4000/users/login', { email, password })
            setLoading(false)
            console.log(res)
            if(authState.name && authState.email && authState.id){
                dispatch(setAuthState({name: '', email: '', id: ''})) 
            } else { 
                dispatch(setAuthState({name: res?.data?.name, email: res?.data?.email, id: res?.data?._id}))
            }
            if (process.browser) localStorage.setItem('token', res?.data?.token)
            router.push('/conversations')
        } catch (err) {
            console.log(err)
        }
    }, [authState.email, authState.name, authState.id, dispatch, email, password, router])

    return (
        <>
            {loading && <Loading />}
            <Container style={{ height: '100vh' }}>
                <Wrapper>
                    <Typography variant="h3" component="h2">
                        SIGN IN
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        required
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        required
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSignIn}>Sign In</Button>
                </Wrapper>
            </Container>
        </>
    );
}
