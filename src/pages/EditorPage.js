import React, { useState, useRef, useEffect } from 'react'
import actions from '../Actions';
import { initSocket } from '../socket';
import { Client } from '../components/Client';
import Editor from '../components/Editor';
import { useLocation, useParams } from 'react-router-dom';

const EditorPage = () => {
  const roomid = useParams().roomId;
  const socketRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      socketRef.current.on('connect_error', (err) => handelerrors(err));
      socketRef.current.on('connect_failed', (err) => handelerrors(err));

      function handelerrors(e) {
        console.log(e);
      }

      socketRef.current = await initSocket();
      socketRef.current.emit(actions.JOIN, {
        roomid,
        username: useLocation.state?.username,
      });
      //listemning for join
      socketRef.current.on(actions.JOINED, ({ clients, username }) => {
        if (username !== useLocation.state?.username) {
          console.log("user joined the room")
          
        }
        setclients(clients);
        console.log(clients)
      })
    }
    init();
  }, []);
  const [clients, setclients] = useState([]);
  return (
    <div className='mainwrap'>
      <div className='aside'>
        <div className='asideinner'>
          <div className='logo'>
            <img className='logoimage' src='/code-sync.png' alt='logo' />
          </div>
          <h3>Connected</h3>
          <div className='clintlist'>
            {clients.map((client) => {
              return <Client key={client.socketId} username={client.username} />
            })
            }
          </div>
        </div>
        <button className='btn leavebtn' >leave </button>
        <button className='btn copybtn' >copy room id</button>
      </div>

      <div className='editorwrap'>
        <Editor />
      </div>
    </div>
  )
}
export default EditorPage;