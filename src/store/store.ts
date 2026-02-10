import { configureStore } from '@reduxjs/toolkit'
import langSliceReducer from '#store/slices/languageSlice'

export const store = configureStore({
	reducer: {
		langSlice: langSliceReducer,
	},
})

export type RootType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
