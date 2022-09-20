import Avatar from "@mui/material/Avatar"
import styled from "@emotion/styled"

// type Props = ReturnType<typeof useRecipients>
type Props = {
    recipientEmail: string
}

const StyledAvatar = styled(Avatar)`
  margin: 5px 15px 5px 5px;
`

const RecipientAvatar = ({ recipientEmail} : Props) => {
  return <StyledAvatar>
    {recipientEmail && recipientEmail[0].toUpperCase()}
  </StyledAvatar>
}

export default RecipientAvatar