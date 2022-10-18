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
				<link rel="icon" href="data:," />
			</Head>
			
			<Component { ...pageProps } />
		</div>
	);
}