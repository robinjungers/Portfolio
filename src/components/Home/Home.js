import css from './Home.module.css';
import classnames from 'classnames';
import projects from '@/lib/projects';
import React from 'react';
import OffsetContainer from '../OffsetContainer'
import useNoiseValues from '@/hooks/useNoiseValues';
import BaseLayout from '../BaseLayout';
import BaseLink from '../BaseLink';
import useWindowSize from '@/hooks/useWindowSize';

function makeTransform( offset, angle ) {
	return `translateX(${ offset }px) rotateZ(${ angle }deg)`;
}

export default function Home() {
	const width = useWindowSize()[0];
	const randomOffsets = useNoiseValues( projects.length, 0.3 );
	const randomAngles = useNoiseValues( projects.length, 0.4 );

	return (
		<BaseLayout isProject={ false }>
			<div className={ css['Container'] }>
				<h6 className={ css['Intro'] }>
					Featured projects:
				</h6>

				<ol className={ css['Summaries'] }>
					{ projects.map( ( project, i ) => (
						<li
							className={ css['Summary'] }
							key={ project.slug } style={{
								transform : makeTransform(
									randomOffsets[i] * 0.1 * width,
									randomAngles[i] * 3.0,
								),
							}}
						>
							<span className={ css['Summary_Divider'] } />
							<span className={ css['Summary_Line'] }>
								<BaseLink
									className={ css['Summary_Link'] }
									href={ `/projects/${ project.slug }` }
									newTab={ false }
									text={ project.title }
								/>

								<span className={ css['Summary_Headline'] }>
									{ project.headline }
								</span>

								<img
									className={ css['Summary_Arrow'] }
									src="/icons/arrow5.svg"
								/>
							</span>
						</li>
					) ) }
				</ol>
			</div>
		</BaseLayout>
	);
};