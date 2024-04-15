import { ISectionFriendData } from "../components/contacts"
import { IUserResultSearch } from "../configs/interfaces"

export default function classificationFriendListByName(friendList: IUserResultSearch[]){
    const sectionData: ISectionFriendData[] = []
    
    friendList.forEach((friend) => {
        const firstChar = friend.name[0].toUpperCase()
        const index = sectionData.findIndex((section) => section.title === firstChar)
        if(index !== -1){
            sectionData[index].data.push(friend)
        }else{
            sectionData.push({
                title: firstChar,
                data: [friend]
            })
        }
    })
    return sectionData;
}