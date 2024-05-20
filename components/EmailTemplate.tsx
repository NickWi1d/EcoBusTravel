import React from 'react'

const EmailTemplate = ({
    firstName,
  } : {
    firstName:string
  }) => {
  return (
    <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
  )
}

export default EmailTemplate