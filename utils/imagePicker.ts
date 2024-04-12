import { ActionSheetOptions } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import { Dispatch, SetStateAction } from "react";

async function handleChooseImageFromLibrary(hasGalleryPermission: boolean | null, setHasGalleryPermission: (value: boolean) => void
, setImage: Dispatch<SetStateAction<string | string[] | null>>, isMultiple: boolean) {
    if (!hasGalleryPermission) {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(status === "granted");
    }
    const newAvatar = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: isMultiple ? false : true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: isMultiple,
    });
    
    if (!newAvatar.canceled) {
        if (isMultiple){
            let images : string[] = [];
            newAvatar.assets?.forEach((element) => {
                if (element.type === "image") {
                    images.push(element.uri);
                }
            });
            setImage(images);
        } else {
            const firstElement = newAvatar.assets?.[0];
            if (firstElement.type === "image") {
                setImage(firstElement.uri);
            }
        }
    }
}

async function handleTakePhotoFromCamera(hasCameraPermission : boolean | null, setHasCameraPermission: (value: boolean) => void, setAvatar: (value: string | null) => void){
    if (!hasCameraPermission) {
        const { status } =
            await ImagePicker.requestCameraPermissionsAsync();
        setHasCameraPermission(status === "granted");
    }
    let options = {
        allowsEditing: true,
        allowsMultipleSelection: false,
        cameraType: ImagePicker.CameraType.front,
        quantity: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
    };
    const result = await ImagePicker.launchCameraAsync(options);

    if (!result.canceled) {
        const firstElement = result.assets?.[0];

        setAvatar(firstElement?.uri || null);
        if (firstElement.type === "image") {
            setAvatar(firstElement.uri);
        }
    }
}

export interface IHandleOpenActionSheetParams {
    registerChooseImageFromLibrary: string,
    registerTakePhotoFromCamera: string,
    cancel: string,
    showActionSheetWithOptions : (options: ActionSheetOptions, callback: (i ?: number | undefined) => void | Promise<void>) => void,
    hasGalleryPermission: boolean | null, setHasGalleryPermission: (value: boolean) => void, 
    setImages: Dispatch<SetStateAction<string | string[] | null>>,
    hasCameraPermission : boolean | null, setHasCameraPermission: (value: boolean) => void,
    isMultiple: boolean,
}

export const handleOpenActionSheet = ({
    registerChooseImageFromLibrary,
    registerTakePhotoFromCamera,
    cancel,
    showActionSheetWithOptions,
    hasGalleryPermission, setHasGalleryPermission, setImages, isMultiple,
    hasCameraPermission, setHasCameraPermission

}: IHandleOpenActionSheetParams) => {
    const options = [
        registerChooseImageFromLibrary,
        registerTakePhotoFromCamera,
        cancel,
    ];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
        {
            options,
            cancelButtonIndex,
        },
        (selectedIndex) => {
            switch (selectedIndex) {
                case 0:
                    handleChooseImageFromLibrary(
                        hasGalleryPermission,
                        setHasGalleryPermission,
                        setImages,
                        isMultiple
                    );
                    break;
                case 1:
                    handleTakePhotoFromCamera(
                        hasCameraPermission,
                        setHasCameraPermission,
                        setImages
                    );
                    break;
                case cancelButtonIndex:
                    break;
                default:
                    break;
            }
        }
    );
};