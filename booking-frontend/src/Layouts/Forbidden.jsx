import React from 'react'

const style = {
	backgroundImage: 'url(/403.png)',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center',
	height: '100vh'
}

export default function Forbidden() {
	return (
		<React.Fragment>
			<div style={style}/>
		</React.Fragment>
	)
}
