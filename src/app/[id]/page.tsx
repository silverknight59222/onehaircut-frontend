"use client"
import Reset from '@/components/pages/[id]';
import React from 'react'


const page = ({searchParams}:any) => {
	return (
		<Reset email={searchParams.email} token={searchParams.token}/>
	)
}

export default page;          