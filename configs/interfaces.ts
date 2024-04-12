
export interface IMessageDetail{
    content: string,
    type: string,
    _id ?: string
}
export interface IFileMessage{
    link: string,
    name: string,
    type: string,
}
export interface IMessageStatus{
    userId: String;
    status: String;
    react: String;
}
export interface IMessageSender{
    _id: string,
    name: string,
    avatar: string,
}
export interface IPinnedMessageConver{
    sender: {
        _id: string,
        name: string,
    },
    messages: IMessageDetail[],
    files: IFileMessage[],
}
export interface IConversationInMessage{
    _id: string,
    pinnedMessages: IPinnedMessageConver[],
}
export interface IMessageItem{
    _id: string,
    sender: IMessageSender,
    messages: IMessageDetail[] | [],
    conversation: IConversationInMessage,
    reply : null | IMessageItem,
    files: [] | IFileMessage[],
    createdAt: string,
    updatedAt: string
    "__v": number,
    statuses: [] | IMessageStatus[],
    location: ILocation | null,
    deleted: "0" | "1" | "2",
}

export interface ILocation{
    coords: {
        lat: number,
        lng: number
    },
    icon: string,
    name: string,
    vicinity: string
    _id: string
}

export interface IRequestFriendList{
    _id: string,
    sender_id: string,
    receiver_id: {
        _id: string,
        name: string,
        avatar: string
    },
    createdAt: string,
    updatedAt: string
    "__v": number
}

export interface IConversation{
    _id: string,
    name: string,
    isGroup: boolean,
    picture: string,
    users: IUserInConversation[],
    bannedMembers: IUserInConversation[],
    public: boolean,
    pinnedMessages: [],
    pin: boolean,
    createdAt: string,
    updatedAt: string,
    qrCode: string,
    "__v": number,
    lastMessage: IMessageItem,
    pinBy: string[]
}

export interface IUserInConversation{
    _id: string,
    name: string,
    gender: string,
    avatar: string,
    status: string,
    deleted: boolean,
    "__v": number
}

export interface IRequestFriendSent{
    _id: string,
    sender_id: string,
    receiver_id: {
        _id: string,
        name: string,
        avatar: string
    },
    createdAt: string,
    updatedAt: string,
    "__v": number
}

export interface IRequestFriendWaitResponse{    
    _id: string,
    sender_id: {
        _id: string,
        name: string,
        avatar: string
    },
    receiver_id: string,
    createdAt: string,
    updatedAt: string,
    "__v": number
}