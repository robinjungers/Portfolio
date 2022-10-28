// Styles
import '@/assets/css/reset.css';
import '@/assets/css/fonts.css';
import '@/assets/css/styles.css';

// Components
import Head from 'next/head';
import Script from 'next/script';

export default function _App( { Component, pageProps } ) {
	return (
		<div>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="icon" type="image/png" href="/images/favicon.png" />
				<Script data-domain="robinjungers.com" src="https://plausible.io/js/plausible.js" />
			</Head>
			
			<Component { ...pageProps } />
		</div>
	);
}