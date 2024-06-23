import Header from '@/components/Navigation/Header'
import store from '@/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
	;<Head>
		<link rel='icon' href='/favicon.ico' />
		{/* Другие мета-теги и настройки заголовка... */}
	</Head>

	return (
		<Provider store={store}>
			<Header />
			<Component {...pageProps} />
		</Provider>
	)
}
