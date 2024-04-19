<h1 align="center">
  <br>
  <img src="https://themesbrand.com/chatvia/layouts/assets/images/logo-dark.png" alt="" width="250">
  <br>
  Chat App
  <br>
</h1>
<p align="center">
    <!-- iOS -->
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-000.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
    <!-- Android -->
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-000.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
    <!-- Web -->
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-000.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

## 🚩 Table of Contents

- [Build With](#built-with)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Features](#features)
- [Contact](#contact)

### Built With

This section list major frameworks/libraries used to bootstrap my project.

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?logo=react&logoColor=%2361DAFB&style=for-the-badge) 
![Typescript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?logo=redux&logoColor=white&style=for-the-badge)
![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB&style=for-the-badge)
![Expo](https://img.shields.io/badge/Expo-000020.svg?style=for-the-badge&logo=Expo&logoColor=white)
![ReactHookForm](https://img.shields.io/badge/React%20Hook%20Form-EC5990.svg?style=for-the-badge&logo=React-Hook-Form&logoColor=white)
![SocketIO](https://img.shields.io/badge/Socket.io-010101.svg?style=for-the-badge&logo=socketdotio&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57.svg?style=for-the-badge&logo=SQLite&logoColor=white)
![I18next](https://img.shields.io/badge/i18next-26A69A.svg?style=for-the-badge&logo=i18next&logoColor=white)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nguyenhieu1435/CongNgheMoi_ChatApp_MobileProject.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run app
   ```sh
   npm start > (press a to open Android | press w to open Web)
   ```

### Dependencies

| Name | Version | Description |  
| --- | --- | --- | 
| @reduxjs/toolkit | ^2.0.1 | Redux Toolkit is an official package from Redux that provides simplified tools and best practices for managing state in React applications. | 
| @react-navigation | ^6.1.10 | React Native Navigation is a library that allows for efficient navigation and routing in React Native applications, offering native navigation components and performance optimizations. |
| react-hook-form | ^7.49.3 | React Hook Form is a lightweight and performant library for managing form state and validation using React hooks. | 
| react-i18next | ^14.0.0 | react-i18next is a powerful internationalization framework for React applications, integrating the i18next library to handle multilingual content. |
| socket.io-client | ^4.7.5 | socket.io-client is a JavaScript library that allows real-time, bidirectional communication between a client (like a web browser) and a server using WebSockets or other fallback mechanisms. |
| expo-sqlite | ~11.3.3 | is a SQLite database implementation for Expo projects, providing local, persistent storage capabilities. | 
| rn-emoji-keyboard | ^1.6.1 |  is a React Native component that provides an emoji picker and keyboard for easy emoji input in mobile applications. | 
| react-native-maps | 1.7.1 | is a React Native library for displaying maps using native components on both iOS and Android platforms. | 
| expo-location | ~16.1.0 | is an Expo library that provides access to the device's location services, including GPS data and geolocation features. | 
| expo-av | ~13.4.1 |  is an Expo library that allows developers to incorporate audio and video playback features into their Expo projects. | 
| expo-camera | ~13.4.4 | is an Expo library that enables developers to access device camera functionality in React Native applications. |
| expo-file-system | ~15.4.5 | is an Expo library that provides access to the device's file system for managing files and directories in React Native applications. |
| expo-document-picker | ~11.5.4 | is an Expo library that allows developers to pick documents from the device's file system in React Native applications. |
| expo-image-picker | ~14.3.2 |  is an Expo library that enables developers to access and select images from the device's gallery or camera in React Native applications. | 

### Features
  * Multi-language
    - My chat app uses i18next, so you can easily add a new language if you want.
    ![multi-languages](https://github.com/nguyenhieu1435/CongNgheMoi_ChatApp_MobileProject/assets/70377398/1d411fd5-0f53-4e3b-b360-29164c878310)
  
  * Sign up
    - The application allows users to sign up for accounts. To sign up, users need to provide their full name, email or phone number, gender, date of birth, and avatar (optional).
    ![sign-up-1](https://github.com/nguyenhieu1435/CongNgheMoi_ChatApp_MobileProject/assets/70377398/af6ba139-88a7-4736-9482-47b33916b57d)
    ![sign-up-2](https://github.com/nguyenhieu1435/CongNgheMoi_ChatApp_MobileProject/assets/70377398/7b8bb1ac-0861-4c03-80c4-6a48caaa84f8)
  
  * Sign in
    - The application requires a username (phone or email address) and password to sign in.
    ![sign-in](https://github.com/nguyenhieu1435/CongNgheMoi_ChatApp_MobileProject/assets/70377398/e4456ea8-ce5c-4624-8ccf-bf412a2e2ea9)
  
  * Add friend
    - A user can request to add friend to one user and wait for the response.
    ![addFriend1](https://github.com/nguyenhieu1435/CongNgheMoi_ChatApp_MobileProject/assets/70377398/61b01f6a-63c2-472e-8ad2-94d8bf9ce416)
      + Login to Thao account, and when accepting the request "add friend" from Hieu Nguyen, The application will add Hieu Nguyen to the friend list.
    ![addfriend2](https://github.com/nguyenhieu1435/CongNgheMoi_ChatApp_MobileProject/assets/70377398/90cda800-b6c1-42b6-8492-2b2e94ecd2fc)
  
  * Create new group
    - The user can create a group, which must have at least three people (including the creator), create a group layout that only shows people who are friends of the user, and the user can enter the group name and avatar (optional).
      
    ![create-group1](https://github.com/nguyenhieu1435/CongNgheMoi_ChatApp_MobileProject/assets/70377398/82b5b057-1409-4a73-a82a-d16fa71183c8)
    ![create-group2](https://github.com/nguyenhieu1435/CongNgheMoi_ChatApp_MobileProject/assets/70377398/655a892b-25a3-4381-9640-66d1bf645547)
  
  * Chat 1 - 1 with socketIO
    - Chat 1-1: The user can chat text messages that come with emojis and send images, files, and locations. More users can react to messages, delete messages, delete me messages, pin messages, play video files, and reply to previous messages.
    ![chat-one-one-part1](https://github.com/nguyenhieu1435/CongNgheMoi_ChatApp_MobileProject/assets/70377398/dd2527a3-7222-4af0-86eb-3f1e5bab2d5e)
    ![chat-one-one-part2](https://github.com/nguyenhieu1435/CongNgheMoi_ChatApp_MobileProject/assets/70377398/09627ee5-661b-4140-893c-e708203f6f20)

  * Chat group with socketIO
    - Chat group: Chat groups can add new members to the group. With admin roles, users can remove users, yield admin roles, and add new deputy. The user can chat text messages that come with emojis and send images, files, and locations. More users can react to messages, delete messages, delete me messages, pin messages, play video files, and reply to previous messages.
    ![chat-group-part1](https://github.com/nguyenhieu1435/CongNgheMoi_ChatApp_MobileProject/assets/70377398/2f1e5dcf-7a22-4e38-98d0-60ec97832cef)
    ![chat-group-part2](https://github.com/nguyenhieu1435/CongNgheMoi_ChatApp_MobileProject/assets/70377398/26870144-e1f2-495c-af26-2c6e74f9f898)

    

### Contact

Nguyễn Văn Hiếu - hieurio12@gmail.com

Project Link: https://github.com/nguyenhieu1435/CongNgheMoi_ChatApp_MobileProject.git

[![GitHub Streak](https://github-readme-streak-stats.herokuapp.com?user=nguyenhieu1435&theme=vue-dark&date_format=j%2Fn%5B%2FY%5D)](https://git.io/streak-stats)

<img align="center" src="https://github-readme-stats.vercel.app/api?username=nguyenhieu1435&show_icons=true&include_all_commits=true&theme=cobalt&hide_border=true" alt="My github stats" /> 

<img align="center" src="https://github-readme-stats.vercel.app/api/top-langs/?username=nguyenhieu1435&layout=compact&theme=cobalt&hide_border=true" />
