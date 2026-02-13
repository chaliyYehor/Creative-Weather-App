import {
	clearConditions,
	fogConditions,
	heavyCloudsConditions,
	lightCloudsConditions,
	rainConditions,
	snowConditions,
	stormConditions,
	urlVariants,
} from '#constants/constants'

export function findWeatherCondition(
	givenCondition: string | undefined,
	localTime: string | undefined,
) {
	if (!givenCondition || !localTime) return

	const hour = Number(localTime)

	const getPeriodOfTheDay = () => {
		if (hour >= 12 && hour <= 16) return 'Afternoon'
		if (hour >= 17 && hour <= 20) return 'Evening'
		if (hour >= 21 || hour <= 5) return 'Night'
		if (hour >= 6 && hour <= 11) return 'Morning'
	}

	function defineWeatherType() {
		if (!givenCondition) return

		if (
			heavyCloudsConditions
				.map(el => el.toLowerCase())
				.includes(givenCondition.toLowerCase())
		)
			return 'heavyClouds'
		if (
			clearConditions
				.map(el => el.toLowerCase())
				.includes(givenCondition.toLowerCase())
		)
			return 'clear'
		if (
			lightCloudsConditions
				.map(el => el.toLowerCase())
				.includes(givenCondition.toLowerCase())
		)
			return 'lightClouds'
		if (
			fogConditions
				.map(el => el.toLowerCase())
				.includes(givenCondition.toLowerCase())
		)
			return 'foggy'
		if (
			rainConditions
				.map(el => el.toLowerCase())
				.includes(givenCondition.toLowerCase())
		)
			return 'rainy'
		if (
			snowConditions
				.map(el => el.toLowerCase())
				.includes(givenCondition.toLowerCase())
		)
			return 'snowy'
		if (
			stormConditions
				.map(el => el.toLowerCase())
				.includes(givenCondition.toLowerCase())
		)
			return 'storm'
	}

	const type = defineWeatherType()
	const period = getPeriodOfTheDay()
	if (!type || !period) return

	return urlVariants[`${type}${period}`]
}
