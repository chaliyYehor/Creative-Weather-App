import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type MovieSliceType = {
	lang: 'uk' | 'en'
}

const initialState: MovieSliceType = {
	lang: 'en',
}

const langSlice = createSlice({
	name: 'language',
	initialState,
	reducers: {
		changeLang: (state, actions: PayloadAction<'uk' | 'en'>) => {
			state.lang = actions.payload
		},
	},
})

export const {changeLang} = langSlice.actions
export default langSlice.reducer