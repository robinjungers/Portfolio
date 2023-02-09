import css from './HomePage.module.css';
import React, { ReactElement } from 'react';
import useNoiseValues from '@/hooks/useNoiseValues';
import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';
import { makeCSSTransform } from '@/lib/utils';
import { Project } from '@/interfaces';
import BaseLayout from './BaseLayout';

export type HomePageProps = {
	projects : Project[];
}

export default function HomePage( props : HomePageProps ) : ReactElement {
	const maxWidth = useWindowSize()[0]; 
	const maxSpan = maxWidth > 900 ? maxWidth * 0.1 : 0.0;
	const randomOffsets = useNoiseValues( props.projects.length, 0.3 );
	const randomAngles = useNoiseValues( props.projects.length, 0.4 );

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
					{ props.projects.map( ( project, i ) => (
						<li
							className={ css['Summary'] }
							key={ project.slug } style={{
								transform : makeCSSTransform(
									randomOffsets[i] * maxSpan,
									randomAngles[i] * 3.0,
								),
							}}
						>
							<span className={ css['Summary_Divider'] } />
							
							<Link
								className={ css['Summary_Link'] }
								href={ `/projects/${ project.slug }` }
							>
								<span className={ css['Summary_Title'] }>
									{ project.title }
								</span>

								<span className={ css['Summary_Headline'] }>
									{ project.headline }
								</span>
							</Link>
						</li>
					) ) }
				</ol>
			</div>
		</BaseLayout>
	);
};