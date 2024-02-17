"use client"
import { RouteGuard } from '@/components/utilis/routeGuard'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import {useEffect} from "react";
import {Auth} from "@/api/auth";
import {setLocalStorage} from "@/api/storage";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {

  useEffect(() => {
    Auth.getExchangeRates().then(({data}) => {
      setLocalStorage('exchangeRates', JSON.stringify(data))
    })
  },[])

	return (
		<html lang="en">
			<RouteGuard>
				<body className={inter.className}>
					<ToastContainer
						position="top-right"
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
					/>
					{children}
					<SpeedInsights />
					<Analytics />
				</body>
			</RouteGuard>
		</html>
	)
}
