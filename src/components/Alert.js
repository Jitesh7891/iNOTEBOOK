import React from 'react'
import './Alert.css'

export default function Alert(props) {
  return (

    <div className='alert'>
      {/* //first we will evaluate props.alert , like if it is null aage ka code will not execute */}
      {props.alert&&<div className={`alert alert-${props.alert.type} alert-dismissible fade show `} role="alert">

        {/* <strong>{(props.alert.type)}</strong>:{props.alert.message} */}
        <strong>{props.alert.msg}</strong>
      </div>}
    </div>
  )
}