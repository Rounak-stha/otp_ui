import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	msg: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'POST') return res.status(404).end()
	const { code }: { code: string } = JSON.parse(req.body)
	if (code.length !== 6) return res.status(400).json({ msg: 'OTP must be six digits long' })
	try {
		code.split('').forEach((char) => parseInt(char))
	} catch {
		return res.status(400).json({ msg: 'Letters are not valid in OTP' })
	}
	if (code.slice(-1) === '7') return res.status(400).json({ msg: 'Invalid OTP' })
	return res.status(200).json({ msg: 'Success' })
}
