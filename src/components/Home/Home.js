import css from './Home.module.css';
import classnames from 'classnames';
import projects from '@/lib/projects';
import React from 'react';
import OffsetContainer from '../OffsetContainer'
import Link from 'next/link';
import useNoiseValues from '@/hooks/useNoiseValues';
import BaseLayout from '../BaseLayout';
import BaseLink from '../BaseLink';

export default function Home() {
	const offsets = useNoiseValues( projects.length + 3 );
	const angles = useNoiseValues( projects.length, 0.2 );

	return (
		<BaseLayout
			isProject={ false }
			titleNoiseValue={ offsets[0] }
			roleNoiseValue1={ offsets[1] }
			roleNoiseValue2={ offsets[2] }
		>
			<div className={ css['Container'] }>
				<h6 className={ css['Intro'] }>
					Featured projects:
				</h6>

				<ol className={ css['Summaries'] }>
					{ projects.map( ( project, i ) => (
						<li className={ css['Summary'] } key={ project.slug } style={{
							transform : `rotate(${3.0 * angles[i]}deg)`,
						}}>
							<OffsetContainer randomValue={ offsets[i + 3] }>
								<span>
									<BaseLink
										href={ `/projects/${ project.slug }` }
										newTab={ false }
										text={ project.title }
									/>

									<span className={ css['Headline'] }>
										{ project.headline }
									</span>
								</span>
							</OffsetContainer>
						</li>
					) ) }
				</ol>
			</div>
		</BaseLayout>
	);
};