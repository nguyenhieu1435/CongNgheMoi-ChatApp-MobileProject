import { Keyboard, TouchableWithoutFeedback } from "react-native"

interface IProps {
    children: React.ReactNode;
}

const DismissKeyboard = ({ children } : IProps)=>{
    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    )
}
export default DismissKeyboard;