
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
    user: String;
    status: "seen" | "delivered" | "sent";
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
export interface IUserResultSearch {
    avatar: string;
    name: string;
    _id: string;
}
export interface IUserIsMyFriendsResult{
    createdAt: string;
    updatedAt: string;
    friends: IUserResultSearch[] | [];
    // userID
    _id: string;
}
// DANH SÁCH MÌNH ĐÃ GỬI YÊU CẦU KẾT ĐI 
export interface IRequestFriendList{
    _id: string,
    blockView: boolean,
    createdAt: string,
    updatedAt: string,
    message: string,
    receiver_id: IUserResultSearch,
    sender_id: string,
}
// DANH SÁCH MÌNH ĐÃ NHẬN YÊU CẦU KẾT BẠN
export interface IReceivedRequestFriendList{
    _id: string,
    blockView: boolean,
    createdAt: string,
    updatedAt: string,
    message: string,
    receiver_id: string,
    sender_id: IUserResultSearch,
}

export interface IConversation{
    _id: string,
    name: string,
    isGroup: boolean,
    picture: string,
    users: IUserInConversation[],
    bannedMembers: IUserInConversation[],
    public: boolean,
    pinnedMessages: IMessageItem[],
    pin: boolean,
    createdAt: string,
    updatedAt: string,
    qrCode: string,
    "__v": number,
    lastMessage ?: IMessageItem,
    pinBy: string[],
    deputy: string[],
    admin ?: string,
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
export interface IGroupConversation{
    _id: string,
    name: string,
    isGroup: boolean,
    picture: string,
    users: IUserInConversation[],
    admin: string,
    deputy: string[],
    bannedMembers: IUserInConversation[],
    public: boolean,
    pinnedMessages: IMessageItem[],
    pinBy: string[],
    deleted: boolean,
    createdAt: string,
    updatedAt: string,
    qrCode: string,
    "__v": number,
}