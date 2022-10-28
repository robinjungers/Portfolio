import css from './Home.module.css';
import React from 'react';
import useNoiseValues from '@/hooks/useNoiseValues';
import BaseLayout from '../BaseLayout';
import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';

function makeTransform( offset, angle ) {
	return `translateX(${ offset }px) rotateZ(${ angle }deg)`;
}

export default function Home( { projects } ) {
	const maxWidth = useWindowSize()[0]; 
	const maxSpan = maxWidth > 900 ? maxWidth * 0.1 : 0.0;
	const randomOffsets = useNoiseValues( projects.length, 0.3 );
	const randomAngles = useNoiseValues( projects.length, 0.4 );

	return (
		<BaseLayout
			isProject={ false }
			pageTitle="Creative direction, Interactive software"
			pageDescription="Robin Jungers is a software engineer with a focus on art direction and interactive systems"
		>
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
									randomOffsets[i] * maxSpan,
									randomAngles[i] * 3.0,
								),
							}}
						>
							<span className={ css['Summary_Divider'] } />
							
							<Link href={ `/projects/${ project.slug }` }>
								<a className={ css['Summary_Link'] }>
									<span className={ css['Summary_Title'] }>
										{ project.title }
									</span>

									<span className={ css['Summary_Headline'] }>
										{ project.headline }
									</span>
								</a>
							</Link>
						</li>
					) ) }
				</ol>
			</div>
		</BaseLayout>
	);
};