import * as React from 'react';
import styled from '@emotion/styled'
import { Box, Container, TextField, Typography, Button, CircularProgress } from '@mui/material'
import axios from 'axios'
import Loading from '../../components/Loading';
import { useRouter } from 'next/router';

const Wrapper = styled(Box)`
    width: 100%;
    max-width: 500px;
    max-height: 400px;
    height: 100vh;
    padding: 20px;
    margin: auto auto;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    border: 2px solid black;
`
export default function RegisterPage() {
    const router = useRouter()

    const [name, setName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(false)

    const handleRegister = async () => {
        try {
            setLoading(true)
            await axios.post('http://127.0.0.1:4000/users/register', { name, email, password })

            setLoading(false)
            router.push('/authenticate/login')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        loading ? (
            <Loading />
        ) : (
            <>
            <Container style={{ height: '100vh' }}>
                <Wrapper>
                    <Typography variant="h3" component="h2">
                        SIGN UP
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        type='email'
                        required
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        type='name'
                        required
                        fullWidth
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type='password'
                        required
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleRegister}>Register</Button>
                </Wrapper>
            </Container>
        </>
        )
    );
}
