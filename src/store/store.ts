import { configureStore } from '@reduxjs/toolkit'
import langSliceReducer from 'src/store/slices/languageSlice.ts'

const store = configureStore({
	reducer: {
		langSlice: langSliceReducer,
	},
})

export type RootType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
