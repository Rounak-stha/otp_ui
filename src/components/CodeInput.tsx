import React, { forwardRef, useEffect, useState } from 'react'

interface Props {
	value: string
	onChange: (val: string) => void
	onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
	onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void
}

const CodeInput = forwardRef(
	({ value, onChange, onKeyDown, onPaste }: Props, ref: React.ForwardedRef<HTMLInputElement> | null) => {
		function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
			onChange(e.target.value.slice(-1))
		}
		function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
			onKeyDown(e)
		}
		return (
			<input
				onPaste={onPaste}
				ref={ref}
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				pattern='\d{1}'
				inputMode='numeric'
				className='flex justify-center items-center text-center font-semibold pt-1.5 pb-2 h-8 w-8 rounded-md border border-gray-500 focus:border-blue-500 invalid:border-red-500 outline-none'
				type='text'
			/>
		)
	}
)

export default CodeInput
