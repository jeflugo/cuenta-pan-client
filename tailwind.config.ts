import type { Config } from 'tailwindcss'
import withMT from '@material-tailwind/react/utils/withMT'

export default withMT({
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [],
} satisfies Config)
