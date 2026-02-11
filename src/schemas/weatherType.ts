export interface ForecastResponse {
	location: {
		name: string
		country: string
		lat: number
		lon: number
		localtime: string
	}
	current: {
		temp_c: number
		condition: {
			text: string
			icon: string
		},
		is_day: '1' | '0'
	}
	forecast: {
		forecastday: ForecastDay[]
	}
}

export interface ForecastDay {
	date: string
	day: {
		maxtemp_c: number
		mintemp_c: number
		condition: {
			text: string
			icon: string
		}
	}
	hour: Hour[]
}

export interface Hour {
	time: string
	temp_c: number
	condition: {
		text: string
		icon: string
	}
}
