import React from 'react'
import Avatar from 'react-avatar'

export const Client = (props) => {

  return (
    <div className='client'>
        <Avatar name={props.username} size={50} round={"14px"}/>
        <span className='props.username'>{props.username}</span>
    </div>
  )
}
