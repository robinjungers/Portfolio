import OffsetContainer from '../OffsetContainer';
import css from './BaseLayout.module.css';
import classnames from 'classnames';
import BaseLink from '../BaseLink';
import Link from 'next/link';

export default function BaseLayout( {
  isProject = false,
  titleNoiseValue = 0.0,
  roleNoiseValue1 = 0.0,
  roleNoiseValue2 = 0.0,
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
				<OffsetContainer
					className={ css['Header_Name'] }
					randomValue={ titleNoiseValue }
					leftAlignOnMedium={ false }
					leftAlignOnSmall={ true }
				>
          <Link href="/">
            <a>
              <h1>
                Robin Jungers
              </h1>
            </a>
          </Link>
				</OffsetContainer>

				<OffsetContainer
					className={ classnames(
						css['Header_Role'],
						css['Header_Role-1']
					) }
					randomValue={ roleNoiseValue1 }
					leftAlignOnMedium={ false }
					leftAlignOnSmall={ true }
				>
					<h3>
						Creative direction,
					</h3>
				</OffsetContainer>
				
				<OffsetContainer
					className={ classnames(
						css['Header_Role'],
						css['Header_Role-2']
					) }
					randomValue={ roleNoiseValue2 }
					leftAlignOnMedium={ false }
					leftAlignOnSmall={ true }
				>
					<h3>
						Interactive software
					</h3>
				</OffsetContainer>
			</header>

      <main className={ css['Main'] }>
        { children }
      </main>

      <div className={ css['Social'] }>
				<span>
					Follow me on
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