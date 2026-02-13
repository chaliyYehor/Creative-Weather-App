import { configureStore } from '@reduxjs/toolkit'
import langSliceReducer from '#store/slices/languageSlice'
import { autocompleteApi } from './services/autocompleteApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
	reducer: {
		langSlice: langSliceReducer,
		[autocompleteApi.reducerPath]: autocompleteApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(autocompleteApi.middleware),
})

setupListeners(store.dispatch)

export type RootType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
