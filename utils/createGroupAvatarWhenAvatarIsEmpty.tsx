import { Image, View } from "react-native";
import { IConversation, IGroupConversation } from "../configs/interfaces";

export default function CreateGroupAvatarWhenAvatarIsEmpty(conversation: IConversation | IGroupConversation) {
    let users = conversation.users;
    if (users.length > 4){
        users = users.slice(0, 4);
    }
    return (
        <View
            style={{width: 36, height: 35, borderRadius: 50, flexDirection: "row", flexWrap: "wrap", overflow: "hidden"
            , alignItems :"center", justifyContent: "center"}}
        >
            {
                users.map((user) => {
                    return (
                        <Image
                            source={{
                                uri: user.avatar
                            }}
                            style={{width: 15, height: 15, borderRadius: 50, padding: 3}}
                        />
                    )
                })
            }
        </View>
    )
}