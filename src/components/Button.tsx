import Spinner from './Spinner'

interface Props {
	onClick: () => void
	text: string
	loading: boolean
}

export default function Button({ onClick, text, loading }: Props) {
	return (
		<button
			className='flex justify-center border-none rounded-md py-2 w-40 font-semibold text-sm text-slate-50 bg-blue-500 active:scale-95'
			onClick={onClick}
		>
			{loading ? <Spinner /> : text}
		</button>
	)
}
