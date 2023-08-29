import { default as avatarImage, default as avatarServerImage } from '../../../public/img/qwe.png';
import styles from './Dialogue.less';
import ReactMarkdown  from 'react-markdown';

interface chatItemState {
  message: string | "";  
  isSent: boolean | null;
}

const ChatItem :React.FC<chatItemState> = ({ message , isSent  }) => {
  const avatarUrl = isSent ? avatarImage : avatarServerImage; // 假设这是头像图片的 URL
  const messageStyle = isSent ? styles.sentMessage : styles.receivedMessage;
  const avatarStyle = isSent ? styles.userAvatar : styles.serverAvatar;


  return (
    <div className={styles.chatItem} style={{ height: '15%' }}>
      <img src={avatarUrl} className={avatarStyle} alt="Avatar" />
      <div className={messageStyle}><ReactMarkdown>{message}</ReactMarkdown></div>
    </div>
  );
};

export default ChatItem;
