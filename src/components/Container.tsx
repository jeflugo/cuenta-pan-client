import React from 'react'

export default function Container({ children }: { children: React.ReactNode }) {
	return <div className='w-11/12 mx-auto max-w-[400px]'>{children}</div>
}
