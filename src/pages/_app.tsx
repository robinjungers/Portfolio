// Styles
import '@/assets/css/reset.css';
import '@/assets/css/fonts.css';
import '@/assets/css/styles.css';

// Components
import Head from 'next/head';
import Script from 'next/script';
import { ReactElement } from 'react';
import { AppProps } from 'next/app';

export default function _App( props : AppProps ) : ReactElement {
	return (
		<>
			<Head>
				<link rel="icon" type="image/png" href="/images/favicon.png" />
			</Head>
			
			<props.Component
				{ ...props.pageProps }
			/>

			<Script
				data-domain="robinjungers.com"
				src="https://plausible.io/js/plausible.js"
			/>
		</>
	);
}