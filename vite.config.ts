import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { qrcode } from 'vite-plugin-qrcode'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), qrcode()],
	resolve: {
		alias: {
			'#components': resolve(
				dirname(fileURLToPath(import.meta.url)),
				'src/components',
			),
			'#pages': resolve(dirname(fileURLToPath(import.meta.url)), 'src/pages'),
			'#schemas': resolve(
				dirname(fileURLToPath(import.meta.url)),
				'src/schemas',
			),
			'#queryOptions': resolve(
				dirname(fileURLToPath(import.meta.url)),
				'src/queryOptions',
			),
			'#store': resolve(dirname(fileURLToPath(import.meta.url)), 'src/store'),
		},
	},
})
