import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head />
			<body className='h-screen w-screen flex justify-center items-center'>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
