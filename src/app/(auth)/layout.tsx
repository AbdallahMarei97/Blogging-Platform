import React, { type PropsWithChildren } from 'react'

const AuthLayout = ({children}: PropsWithChildren) => {
  return (
    <div className='h-screen grid place-items-center'>{children}</div>
  )
}

export default AuthLayout