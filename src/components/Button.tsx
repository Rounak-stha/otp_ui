interface Props {
	onClick: () => void
	text: string
}

export default function Button({ onClick, text }: Props) {
	return (
		<button
			className='border-none rounded-md py-2 px-6 font-semibold text-sm text-slate-50 bg-blue-500 active:scale-95'
			onClick={onClick}
		>
			{text}
		</button>
	)
}
