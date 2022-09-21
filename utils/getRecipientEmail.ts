import { Conversation, User } from "@/types/index";

export const getRecipientEmail = (conversationUsers: Conversation['users'], loggedInUser?: User | null) => conversationUsers.find(userEmail => userEmail !== loggedInUser?.email) 