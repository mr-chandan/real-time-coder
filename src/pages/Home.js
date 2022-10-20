import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const [roomid, setroodid] = useState('');
  const [username, setusernmae] = useState('');

  function creatroom(e) {
    e.preventDefault();
    const id = uuid();
    setroodid(id);
    toast.success('Created new room');
  }

  function joinroom() {
    if (!roomid || !username) {
      toast.error('Room id & username is required');
      return;
    }
    navigate('/editor/' + roomid, {
      state: username,
    })
  }
  function handelinput(e) {
    if (e.code === 'Enter') {
      joinroom();
    }
  }
  return (
    <div className='homepagewrapper'>
      <div className='formwrapper'>
        <img src='/code-sync.png' className='homepagelogog' alt='code-sync-logo' />
        <h4 className='mainlabel'>Paste Invention Room Id</h4>
        <div className='inputgroup'>
          <input type="text" className='inputbox' onChange={(e) => { setroodid(e.target.value) }} placeholder='Room Id' value={roomid} onKeyUp={handelinput} />
          <input type="text" className='inputbox' onChange={(e) => { setusernmae(e.target.value) }} placeholder='User name' value={username} onKeyUp={handelinput} />
          <button className='btn  joinbtn' onClick={joinroom}>join</button>
          <span className='createinfo'>If you dont have an invite create &nbsp;
            <a href="/" onClick={creatroom} className='createnewbtn'>New room</a></span>
        </div>
      </div>
      <footer>
        <h4>Built by Chandan </h4>
      </footer>
    </div>
  )
}
export default Home;