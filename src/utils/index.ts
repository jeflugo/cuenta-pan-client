function decimalToFraction(decimal: number): string {
	const gcd = (a: number, b: number): number => {
		if (b === 0) return a
		return gcd(b, a % b)
	}

	const numerator = decimal.toString().split('.')[1]
	const denominator = Math.pow(10, numerator.length)
	const commonDivisor = gcd(parseInt(numerator, 10), denominator)

	return `${parseInt(numerator, 10) / commonDivisor} / ${denominator / commonDivisor}`
}

function capitalizeFirstLetter(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export { decimalToFraction, capitalizeFirstLetter }
