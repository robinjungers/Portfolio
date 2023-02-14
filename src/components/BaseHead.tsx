import Head from "next/head";
import { ReactElement } from "react";

type BaseHeadProps = {
  pageTitle : string;
  pageDescription : string;
  disableZoom? : boolean;
}

export default function BaseHead( props : BaseHeadProps ) : ReactElement {
  return (
    <Head>
      <meta
        name="viewport"
        content={
          props.disableZoom
            ? 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
            : 'width=device-width, initial-scale=1.0' }
        key="viewport"
      />

      <title>
        { `Robin Jungers - ${ props.pageTitle }` }
      </title>
      
      <meta
        name="description"
        content={ props.pageDescription }
        key="description"
      />
      <meta
        property="og:title"
        content={ props.pageTitle }
        key="og:title"
      />
      <meta
        property="og:description"
        content={ props.pageDescription }
        key="og:description"
      />
      <meta
        name="twitter:title"
        content={ props.pageTitle }
        key="twitter:title"
      />
      <meta
        name="twitter:description"
        content={ props.pageDescription }
        key="twitter:description"
      />
    </Head>
  )
}