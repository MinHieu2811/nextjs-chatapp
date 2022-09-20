export interface Conversation {
    users: string[]
}

export interface User {
    id: string, 
    name: string,
    email: string
}

export interface Message {
    id: string,
    conversation_id: string,
    text: string,
    sent_at: string,
    user: User
}