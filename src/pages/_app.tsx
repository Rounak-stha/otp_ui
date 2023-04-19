import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
			<Toaster
				toastOptions={{
					style: {
						background: '#FCA5A5',
						color: '#991B1B'
					}
				}}
			/>
		</>
	)
}
