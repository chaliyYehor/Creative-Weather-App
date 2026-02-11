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

	console.log(givenCondition)
	function defineWeatherType() {
		if (!givenCondition) return

		if (heavyCloudsConditions.includes(givenCondition)) return 'heavyClouds'
		if (clearConditions.includes(givenCondition)) return 'clear'
		if (lightCloudsConditions.includes(givenCondition)) return 'lightClouds'
		if (fogConditions.includes(givenCondition)) return 'foggy'
		if (rainConditions.includes(givenCondition)) return 'rainy'
		if (snowConditions.includes(givenCondition)) return 'snowy'
		if (stormConditions.includes(givenCondition)) return 'storm'
	}

	const type = defineWeatherType()
	const period = getPeriodOfTheDay()
	if (!type || !period) return

	return urlVariants[`${type}${period}`]
}
