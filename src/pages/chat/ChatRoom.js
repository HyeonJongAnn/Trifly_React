import React, { useEffect, useState } from 'react';
import '../../scss/pages/chat/ChatRoom.scss';
import Modal from '../../components/ui/Modal';
import { SvgIcon } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Input from '../../components/ui/lnput/Input';
import { useNavigate, useParams } from 'react-router-dom';
import ChatByPartner from './ChatByPartner';
import ChatByOwn from './ChatByOwn';
import { useSelector } from 'react-redux';
import * as StompJs from '@stomp/stompjs';

const ChatRoom = ( ) => {
    const navi = useNavigate();
    const param = useParams();
    const chatRoomId = param.chatRoomId;
    const token = JSON.stringify(localStorage.getItem('token'));

    const [client, changeClient] = useState(null);
    const [chat, setChat] = useState("");
    const [chatList, setChatList] = useState([]);

    const userId = useSelector((state) => {
        return state.user.loginid;
    })

    // 미들웨어 설정
    const { createProxyMiddleware } = require('http-proxy-middleware');

    module.exports = (app) => {
        app.use (
            "ws",
            createProxyMiddleware({
                target: "ws://localhost:3000",
                ws: true
            })
        )
    }

    // 소켓 연결
    const clientdata = new StompJs.Client({
        brokerURL: 'ws://localhost:3000/chat-room',
        connectHeaders: {
            Authorization: token
        },
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });

    // 구독


    const handleBack = () => {
        navi(-1);
    }

    useEffect(() => {
        const contentElement = document.querySelector('.content');

        contentElement.style.padding = '0';
        contentElement.style.marginBottom = '0';
        contentElement.style.width = '100%';

        return () => {
            contentElement.style.padding = '';
        };
    }, []);

    const menu = [
        {
          text: "나가기",
          onclick: () => {console.log('나가기')}
        },
        {
          text: "신고하기",
          style: {color: '#ED3737'},
          onclick: () => {console.log('신고하기')}
        }
      ];

      const userInfo = {
        name: '김태현',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7MnOcQUfqtgTKRpCld7E-_P2JCyF-QMlesD887gUZ6A&s',
        tag1: '태그1',
        tag2: '태그2',
        tag3: '태그3'
      }

  return (
    <div className='ChatRoom'>
        <div className='chat-room-title-container'>
            <div className='chat-room-title-backbutton'>
                <img src={process.env.PUBLIC_URL + '/assets/icons/back_btn.svg'} alt="" onClick={handleBack}/>
            </div>
            <div className='chat-room-title-name'>
                <h1>{userInfo.name}</h1>
            </div>
            <div className='chat-room-title-option'>
                <Modal svg={<SvgIcon component={MoreHorizIcon}/>} item={menu}/>
            </div>
        </div>
        <div className='chat-room-chat-area'>
            {}
            <ChatByPartner></ChatByPartner>
            <ChatByOwn></ChatByOwn>
            <ChatByPartner></ChatByPartner>
            <ChatByOwn></ChatByOwn>
            <ChatByPartner></ChatByPartner>
            <ChatByOwn></ChatByOwn>
            <ChatByPartner></ChatByPartner>
            <ChatByPartner></ChatByPartner>
            <ChatByPartner></ChatByPartner>
            
        </div>     



        <div className='chat-room-input-container'>
            <div className='chat-room-input-file'>
                <img src={process.env.PUBLIC_URL + '/assets/icons/clip.svg'} alt="" />
            </div>
            <div className='chat-room-input-text'>
                <Input></Input>
            </div>
            <div className='chat-room-input-send'>
                <img src={process.env.PUBLIC_URL + '/assets/icons/send_out.svg'} alt="" />
            </div>
        </div>
    </div>
  );
}

export default ChatRoom;