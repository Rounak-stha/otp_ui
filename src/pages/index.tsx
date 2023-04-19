import Image from 'next/image'
import { Inter } from 'next/font/google'
import CodeContainer from '@/components/CodeContainer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	return <CodeContainer />
}
