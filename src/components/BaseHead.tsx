import Head from "next/head";
import { ReactElement } from "react";

type BaseHeadProps = {
  pageTitle : string;
  pageDescription : string;
}

export default function BaseHead( props : BaseHeadProps ) : ReactElement {
  return (
    <Head>
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