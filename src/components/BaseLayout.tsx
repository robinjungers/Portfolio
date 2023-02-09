import css from './BaseLayout.module.css';
import classnames from 'classnames';
import Link from 'next/link';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import BaseHead from './BaseHead';

export type BaseLayoutProps = {
	isProject : boolean;
  children : ReactNode;
	pageTitle : string;
	pageDescription : string;
}

export default function BaseLayout( props : BaseLayoutProps ) : ReactElement {
  return (
    <div
      className={ classnames( {
        [css['Container']] : true,
        [css['Container-Project']] : props.isProject ?? false,
      } ) }
    >
			<BaseHead
				pageTitle={ props.pageTitle }
				pageDescription={ props.pageDescription }
			/>

      <header className={ css['Header'] }>
				<Link href="/">
					<h1 className={ css['Header_Name'] }>
						Robin Jungers
					</h1>
				</Link>

				<h3 className={ classnames(
					css['Header_Role'],
					css['Header_Role-1']
				) }>
					Creative direction,
				</h3>
				
				<h3 className={ classnames(
					css['Header_Role'],
					css['Header_Role-2']
				) }>
					Interactive software
				</h3>
			</header>

      <main className={ css['Main'] }>
        { props.children }
      </main>

      <div className={ css['Social'] }>
				<span>
					follow me on
				</span>
				
				<span className={ css['Social_Link'] }>
					<a href="https://www.instagram.com/robinjungers/" target="_blank">
						IG
					</a>
				</span>
				
				<span className={ css['Social_Link'] }>
					<a href="https://twitter.com/robinjungers" target="_blank" >
						TW
					</a>
				</span>
				
				<span className={ css['Social_Link'] }>
					<a href="https://www.are.na/robin-jungers/" target="_blank">
						Are.na
					</a>
				</span>
			</div>

			<div className={ css['Email'] }>
				email me at jungersrobin(at)gmail(dot)com
			</div>

			<footer className={ css['Footer'] }>
				<span className={ css['Footer_Copy'] }>
					&copy;
				</span>

				<span className={ css['Footer_Year'] }>
					2023
				</span>

				<span className={ css['Footer_Rights'] }>
					all rights reserved
				</span>
			</footer>
    </div>
  );
}