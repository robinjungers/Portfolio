// Styles
import '@/assets/css/reset.css';
import '@/assets/css/fonts.css';
import '@/assets/css/styles.css';

// Components
import Head from 'next/head';

export default function _App( { Component, pageProps } ) {
	return (
		<div>
			<Head>
				<title>Robin Jungers - Creative direction, interactive software</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="icon" type="image/png" href="/images/favicon.png" />
			</Head>
			
			<Component { ...pageProps } />
		</div>
	);
}