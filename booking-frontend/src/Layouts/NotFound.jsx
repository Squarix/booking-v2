import React from 'react'

const style = {
	backgroundImage: 'url(/404.png)',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center',
	height: '100vh'
}

export default function NotFound() {
	return (
  <>
    <div style={style} />
  </>
	)
}
