import { useEffect, useRef, useState } from 'react'
import CodeInput from './CodeInput'
import Button from './Button'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

export default function CodeContainer() {
	const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))
	const [activeInput, setActiveInput] = useState(0)
	const [verifying, setVerifying] = useState(false)
	const activeInputRef = useRef<HTMLInputElement>(null)

	const router = useRouter()

	useEffect(() => {
		activeInputRef.current?.focus()
	}, [activeInput])

	function handleChange(newValue: string, index: number): void {
		const newOtp = [...otp]
		newOtp[index] = newValue
		setOtp(newOtp)
		if (index < 5) setActiveInput(index + 1)
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number): void {
		if (e.key == 'Backspace') {
			// keydown handler runs before onchange
			// other handers are not requied for this key
			e.stopPropagation()
			e.preventDefault()

			const newOtp = [...otp]
			newOtp[index] = ''
			setOtp(newOtp)
			if (index !== 0) setActiveInput(index - 1)
		}
	}

	function handlePaste(e: React.ClipboardEvent<HTMLDivElement>): void {
		// BUG: If oneof the inputsis focused, only the last character is pasted in the input
		const text = e.clipboardData.getData('text').slice(0, 6)
		const newOtp = [...otp]
		text.split('').forEach((c, i) => (newOtp[i] = c))
		setOtp(newOtp)
	}

	async function handleSubmit() {
		setVerifying(true)
		const res = await fetch('/api/otp', {
			method: 'POST',
			body: JSON.stringify({ code: otp.join('') })
		})
		if (res.status === 200) router.push('/success')
		else toast((await res.json()).msg)
		setVerifying(false)
	}
	return (
		<div onPaste={handlePaste} className='p-4 flex flex-col gap-4 justify-center items-center mb-40'>
			<p className='font-bold text-lg'>Enter Your Code</p>
			<div className='flex gap-2'>
				{otp.map((val, index) => (
					<CodeInput
						key={index} // using index as key is fine here
						ref={activeInput === index ? activeInputRef : null}
						onChange={(newValue: string) => handleChange(newValue, index)}
						onKeyDown={(e) => handleKeyDown(e, index)}
						value={val}
					/>
				))}
			</div>
			<Button onClick={handleSubmit} text='Submit' loading={verifying} />
		</div>
	)
}
