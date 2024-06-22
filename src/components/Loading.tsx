import { Spinner } from '@material-tailwind/react'

type LoadingProps = {
	paddingY?: string
}

export default function Loading({ paddingY }: LoadingProps) {
	return (
		<div
			className={`w-full flex justify-center ${paddingY && `py-${paddingY}`}`}
		>
			<Spinner />
		</div>
	)
}
