export function findWeatherCondition(
	givenCondition: string | undefined,
	localTime: string | undefined,
) {
	if (!givenCondition || !localTime) return

	const getPeriodOfTheDay = () => {
		if (+localTime >= 12 && +localTime <= 16) return 'Afternoon'
		if (+localTime >= 17 && +localTime <= 20) return 'Evening'
		if (+localTime >= 21 && +localTime <= 5) return 'Night'
		if (+localTime >= 6 && +localTime <= 11) return 'Morning'
	}

	console.log(givenCondition)
	function defineWeatherType() {
		if (!givenCondition) return

		if (
			['Overcast', 'Cloudy', 'Суцільна хмарність', 'Хмарно'].includes(
				givenCondition,
			)
		)
			return 'heavyClouds'
		if (['Clear', 'Sunny', 'Сонячно', 'Ясно'].includes(givenCondition))
			return 'clear'
		if (
			['Partly Cloudy', 'Windy', 'Невелика хмарність'].includes(givenCondition)
		)
			return 'lightClouds'
		if (
			['Mist', 'Fog', 'Freezing fog', 'Туман з памороззю', 'Туман'].includes(
				givenCondition,
			)
		)
			return 'foggy'
		if (
			[
				'Patchy rain nearby',
				'Patchy sleet nearby',
				'Moderate rain',
				'Moderate rain at times',
				'Light rain',
				'Patchy light rain',
				'Light drizzle',
				'Patchy light drizzle',
				'Невеликий дощ',
				'Місцями мряка',
				'Мряка',
				'Місцями невеликий дощ',
				'Час від часу помірний дощ',
				'Помірний дощ',
				'Місцями мокрий сніг',
				'Місцями дощ',
			].includes(givenCondition)
		)
			return 'rainy'
		if (
			[
				'Patchy snow nearby',
				'Freezing drizzle',
				'Heavy freezing drizzle',
				'Patchy freezing drizzle nearby',
				'Blowing snow',
				'Blizzard',
				'Заметіль',
				'Сильна ожеледиця',
				'Ожеледиця',
				'Низова хуртовина',
				'Місцями сніг',
				'Місцями паморозь',
			].includes(givenCondition)
		)
			return 'snowy'
		if (
			['Thundery outbreaks in nearby', 'Місцями грози'].includes(givenCondition)
		)
			return 'storm'
	}

	const urlVariants = {
		clearNight: '/images/night/clear.webp',
		clearAfternoon: '/images/afternoon/clear.webp',
		clearEvening: '/images/evening/clear.webp',
		clearMorning: '/images/morning/clear.webp',

		foggyNight: '/images/night/foggy.webp',
		foggyAfternoon: '/images/afternoon/foggy.webp',
		foggyEvening: '/images/evening/foggy.webp',
		foggyMorning: '/images/morning/foggy.webp',

		heavyCloudsNight: '/images/night/heavyClouds.webp',
		heavyCloudsAfternoon: '/images/afternoon/heavyClouds.webp',
		heavyCloudsEvening: '/images/evening/heavyClouds.webp',
		heavyCloudsMorning: '/images/morning/heavyClouds.webp',

		lightCloudsNight: '/images/night/lightClouds.webp',
		lightCloudsAfternoon: '/images/afternoon/lightClouds.webp',
		lightCloudsEvening: '/images/evening/lightClouds.webp',
		lightCloudsMorning: '/images/morning/lightClouds.webp',

		rainyNight: '/images/night/rainy.webp',
		rainyAfternoon: '/images/afternoon/rainy.webp',
		rainyEvening: '/images/evening/rainy.webp',
		rainyMorning: '/images/morning/rainy.webp',

		snowyNight: '/images/night/snowy.webp',
		snowyAfternoon: '/images/afternoon/snowy.webp',
		snowyEvening: '/images/evening/snowy.webp',
		snowyMorning: '/images/morning/snowy.webp',

		stormNight: '/images/night/storm.webp',
		stormAfternoon: '/images/afternoon/storm.webp',
		stormEvening: '/images/evening/storm.webp',
		stormMorning: '/images/morning/storm.webp',
	}

	return urlVariants.clearEvening
}
