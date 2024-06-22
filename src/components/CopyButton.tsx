import { Button } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import toast from 'react-hot-toast'
import { TBread } from '../lib/types'

type CopyButtonProps = {
	breads: TBread[]
}

export default function CopyButton({ breads }: CopyButtonProps) {
	const [text, setText] = useState<string | null>()

	const handleCopy = () => toast.success('Panes copiados')

	useEffect(() => {
		setText(() => {
			const newTextArray = breads.map(
				({ name, left, make }) => `${name}: ${left}/${make}`
			)
			const newText = newTextArray.join('\n')
			return newText
		})
	}, [breads])

	return (
		<>
			{text && (
				<CopyToClipboard text={text} onCopy={handleCopy}>
					<Button size='sm'>Copiar</Button>
				</CopyToClipboard>
			)}
		</>
	)
}
