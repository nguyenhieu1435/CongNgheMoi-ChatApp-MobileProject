import * as Clipboard from "expo-clipboard"

import { IMessageItem } from '../configs/interfaces';

async function saveToClipboard(messages: IMessageItem) {
    let text = "";
    messages.messages.forEach((message) => {
        if (message.type === "text") {
            text += message.content;
        } else {
            text += "@" + message.content
        }
    })
    console.log(text);
    
    await Clipboard.setStringAsync(text);
}

export { saveToClipboard }