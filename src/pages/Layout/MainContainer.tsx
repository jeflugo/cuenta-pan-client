import React from 'react'

type TProps = {
	children: React.ReactElement | null
}

export default function MainContainer({ children }: TProps) {
	return <main>{children}</main>
}
