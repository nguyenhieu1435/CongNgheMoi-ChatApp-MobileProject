import { LINK_GET_MESSAGE_HISTORY } from "@env";
import { IConversation, IGroupConversation, IMessageItem } from "../configs/interfaces";
import { userInfoInterfaceI } from "../redux_toolkit/slices/userInfo.slice";
import { getAccurancyDateVN } from "./date";

export async function handleNavigateToChatDetail(conversation: IGroupConversation | IConversation,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    userInfo: userInfoInterfaceI,
    navigation: any
) {
    console.log("conversation:::", conversation._id);
    try {
        setIsLoading(true);
        const messageHistoryResponse = await fetch(LINK_GET_MESSAGE_HISTORY + conversation._id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userInfo.accessToken
            }
        })
        if (messageHistoryResponse.ok){
            let messageHistoryData = await messageHistoryResponse.json();
            let newData : IMessageItem[] = []
            Array.isArray(messageHistoryData) &&  messageHistoryData.forEach((item: IMessageItem) => {
                newData.push(
                    {
                        ...item,
                        createdAt: getAccurancyDateVN(item.createdAt),
                        updatedAt: getAccurancyDateVN(item.updatedAt),
                    }
                )
            })
            setIsLoading(false);
            if (messageHistoryData.length > 0){
                navigation.navigate("ChatDetail", {
                    conversation: conversation,
                    messages: newData.reverse()
                });
            } else {
                navigation.navigate("ChatDetail", {
                    conversation: conversation,
                    messages: []
                });
            }
        }

    } catch (error) {
        console.log("error get message history");
    }
    setIsLoading(false);
}