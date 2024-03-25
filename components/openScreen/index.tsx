import { Image, SafeAreaView, StatusBar, Text, View } from "react-native";
import { styles } from "./styles";
import commonStyle from "../../CommonStyles/commonStyles";
import { useEffect } from "react";
import { getDBConnection, insertUserInfo } from "../../utils/sqlite";
import { LINK_SIGN_IN_ENCRYPT } from "@env";
import { setUserInfo } from "../../redux_toolkit/slices/userInfo.slice";
import { useDispatch } from "react-redux";

interface Props {
    navigation: any;
}

export default function OpenScreen({ navigation }: Props) {
    const dispatch = useDispatch();

    useEffect(() => {
        // loading data insteaf of setTimeout
        async function loadData() {
            try {
                const db = getDBConnection();
                const resultQuery = await db.execAsync(
                    [{ sql: `SELECT * FROM user_info`, args: [] }],
                    false
                );
                const obj = resultQuery[0];
              
                if ("rows" in obj && obj.rows.length > 0) {
                    const phone = obj.rows?.[0].phone;
                    const password = obj.rows?.[0].password;
                    if (phone && password) {

                        const response = await fetch(LINK_SIGN_IN_ENCRYPT, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                phone: phone,
                                password: password,
                            }),
                        });
                        if (!response.ok) {
                            navigation.navigate("InitialScreen");
                            return;
                        } else {
                            const data = await response.json();
                            dispatch(
                                setUserInfo({
                                    user: {
                                        __v: data.user.__v,
                                        _id: data.user._id,
                                        avatar: data.user.avatar,
                                        background: data.user.background,
                                        createdAt: data.user.createdAt,
                                        dateOfBirth: data.user.dateOfBirth,
                                        deleted: data.user.deleted,
                                        gender: data.user.gender,
                                        name: data.user.name,
                                        password: data.user.password,
                                        phone: data.user.phone,
                                        qrCode: data.user.qrCode,
                                        updatedAt: data.user.updatedAt,
                                        friends : data.user.friends,
                                    },
                                    accessToken: data.accessToken,
                                    refreshToken: data.refreshToken,
                                })
                            );
                            
                            navigation.navigate("PrimaryBottomTab");
                            return;
                        }
                    }
                }
            } catch (error) {
                console.log("error: ", error);
            }
            navigation.navigate("InitialScreen");
        }
        loadData();
        // setTimeout(()=>{})
        // navigation.navigate('InitialScreen')
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <StatusBar />
            <SafeAreaView style={[styles.container]}>
                <Image
                    source={require("../../assets/bg_zalo.png")}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                />
                <Text style={[styles.logoText, commonStyle.darkPrimaryText]}>
                    Zalo
                </Text>
            </SafeAreaView>
        </View>
    );
}
