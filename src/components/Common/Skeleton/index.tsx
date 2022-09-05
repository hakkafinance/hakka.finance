import React from 'react'
import './skeleton.css'

type Props = {
  isLoaded?: boolean
  className: string
}

const Skeleton = ({isLoaded, className}: Props) => {
  if (typeof(isLoaded) === undefined) {
    return <></>
  }
  return (
    <div style={{display: isLoaded ? 'none' : ''}} className={className} />
  )
}

export default Skeleton