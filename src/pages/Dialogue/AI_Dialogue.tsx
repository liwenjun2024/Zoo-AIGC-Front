import { Button, Input } from 'antd';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EventSourcePolyfill } from 'event-source-polyfill';
import ChatItem from './ChatItem';
import { closeConnect, sseChatDialogue } from '@/services/swagger/dialogueController';
import { saveUserMessage, selectMessage } from '@/services/swagger/messageController';

interface SendMsgProps {
  selectedItemId: string | null; // Add selectedItemId property
  onNewMenu : (menu:boolean) =>void;
}

const SendMessage: React.FC<SendMsgProps> = ({selectedItemId,onNewMenu}) => {
  const [message, setMessage] = useState<any>('');
  const [conversation, setConversation] = useState<any[]>([]);
  const [sse, setSse] = useState<EventSourcePolyfill | null>(null);
  const [uuid,setUuid] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() =>{
    //调用后端服务，拿到数据后就渲染给conversation,如果字段为question则 isSent = true,type = sent
    //如果字段为message则 isSent = false,type = received,
    if(selectedItemId){
      const fetchData = async ()=>{
        try{
          const res = await selectMessage({
            sid:selectedItemId
          });//请求后端
          const processedDate = [];
          if(res){
            for(const item of res?.data){
              //插入question 
              processedDate.push({
                type:'send',
                content: item.question,
                isSent: true,
              });
    
              processedDate.push({
                type:'received',
                content: item.message,
                isSent: false,
              })
            }
            setConversation(processedDate);

          }
          
        }catch(error){
          console.error('Error fetching message data:', error);
        }
      }
      fetchData();
    }
  },[selectedItemId]) // 需要在页面初始化的时候调用

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      // 用户发送的信息
      const timestamp = new Date().getTime();
      const newMessage = { type: 'sent', content: message, isSent: true,mid:timestamp};

      setConversation([...conversation, newMessage]);

      setMessage('');
      let id = selectedItemId;
      if (id == null || id == '' || id == 'null') {
        id = uuidv4();
      }
      localStorage.setItem("uuid", id);
      setUuid(id)

      // 用户发送信息后，服务回复信息
      replyMessage(message, id,timestamp);
    }
  };

  const replyMessage = (msg: string, id: string,timestamp:number) => {

    let sse;
    if (msg.length > 0) {
      const newObj = { type: 'received', content: '',isSent: false,mid:timestamp};

      setConversation((prevConversation) => [...prevConversation, newObj]);

      const eventSource = new EventSourcePolyfill('http://localhost:7050/api/test/create_sse', {
        headers: {
          'uuid': id,
        }
      });

      setSse(eventSource);
      
      eventSource.onopen = (event :any) => {
          sse = event.target;

          sseChatDialogue({
            message: msg,
            sid: id,
            question:'',
            mid: timestamp,
          })
        }
    }
  };


  useEffect(() => {
    if (sse) {
      sse.onmessage = (event) => {
        const data = event.data;
        if (event.data == "[DONE]") {
          if (sse) {
            sse.close()
            setTimeout(() => {
              //执行断开连接方法
              closeConnect({
                headers: {
                  'uuid': uuid,
                }
              });
              saveUserMessage({
                message: conversation[conversation.length-1].content,
                sid:uuid,
                mid:conversation[conversation.length-2].mid,
                question:conversation[conversation.length-2].content,
              });
            }, 1000);
          if(!selectedItemId){
            onNewMenu(true);
          }
          }
          return;
        }
        let json_data = JSON.parse(data)
        if (json_data.content == null || json_data.content == 'null') {
          return;
        }
        setConversation(prev => {
          const newArr = [...prev]
          const selelct = newArr[newArr.length - 1]
          newArr[newArr.length - 1] = { ...selelct, content: selelct.content += json_data.content }
          return newArr
        })
      };
      sse.onerror = (error) => {
        console.error('Error occurred:', error);
        // 在发生错误时可以根据需要进行处理，比如重新连接等
      };

    }

  }, [sse, conversation]);

  return (
    <>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', marginBottom: 100 }}>
        <div style={{ flex: 1, minHeight: '0' }} >
          {/* 显示聊天消息 */}
          {conversation.map((messageItem) => (
            <ChatItem
              key={messageItem.id}
              message={messageItem.content}
              isSent={messageItem.isSent}
            />
          ))}
        </div>
      </div>
      <div style={{ marginTop: '1rem', position: 'fixed', bottom: '4%', width: '60%' }}>
        <Input.Search
          key={'search'}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          enterButton={<Button onClick={handleSendMessage}>发送</Button>}
          placeholder="请输入消息，按 Enter 键发送消息"
        />
      </div>
    </>
  );
};

export default SendMessage;
