import OffsetContainer from '../OffsetContainer';
import css from './BaseLayout.module.css';
import classnames from 'classnames';
import BaseLink from '../BaseLink';
import Link from 'next/link';

export default function BaseLayout( {
  isProject = false,
  children,
} ) {
  return (
    <div
      className={ classnames( {
        [css['Container']] : true,
        [css['Container-Project']] : isProject,
      } ) }
    >
      <header className={ css['Header'] }>
				<Link href="/">
					<a>
						<h1 className={ css['Header_Name'] }>
							Robin Jungers
						</h1>
					</a>
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
        { children }
      </main>

      <div className={ css['Social'] }>
				<span>
					follow me on
				</span>
				
				<span className={ css['Social_Link'] }>
          <BaseLink
            href="https://www.instagram.com/robinjungers/"
            newTab={ true }
            text="IG"
          />
				</span>
				
				<span className={ css['Social_Link'] }>
          <BaseLink
            href="https://twitter.com/robinjungers"
            newTab={ true }
            text="TW"
          />
				</span>

				<span className={ css['Social_Link'] }>
          <BaseLink
            href="https://www.are.na/robin-jungers/"
            newTab={ true }
            text="Are.na"
          />
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
					2022
				</span>

				<span className={ css['Footer_Rights'] }>
					all rights reserved
				</span>
			</footer>
    </div>
  );
}