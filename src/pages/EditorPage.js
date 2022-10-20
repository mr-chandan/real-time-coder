import React, { useState } from 'react'
import { Client } from '../components/Client';
import Editor from '../components/Editor';

const EditorPage = () => {
  const [clients, setclients] = useState([
    { socketId: 1, username: 'rakesh' },
    { socketId: 2, username: 'john' },
    { socketId: 3, username: 'som' },
    { socketId: 4, username: 'jam' },
  ]);
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