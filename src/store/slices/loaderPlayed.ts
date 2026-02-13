import { createSlice } from '@reduxjs/toolkit'

type LoaderPlayedState = {
	played: boolean
}

const initialState: LoaderPlayedState = {
	played: false
}

const loaderPlayedSlice = createSlice({
	name: 'loaderPlayed',
	initialState,
	reducers: {
		setLoaderPlayed: (state) => {
			state.played = true
		}
	}
})

export const {setLoaderPlayed} = loaderPlayedSlice.actions
export default loaderPlayedSlice.reducer