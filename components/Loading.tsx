import React from 'react'
import styled from '@emotion/styled'
import { CircularProgress } from '@mui/material'

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.2);
` 

const Loading = () => {
  return (
    <Wrapper>
        <CircularProgress />
    </Wrapper>
  )
}

export default Loading