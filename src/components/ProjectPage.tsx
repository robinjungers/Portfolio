import { ReactElement } from 'react';
import css from './ProjectPage.module.css';
import ProjectImage from './ProjectImage';
import BaseLayout from './BaseLayout';
import ProjectText from './ProjectText';
import { Project } from '@/interfaces';
import Link from 'next/link';

export type ProjectPageProps = {
  project : Project;
}

export default function ProjectPage( props : ProjectPageProps ) : ReactElement {
  return (
    <BaseLayout
      isProject={ true }
      pageTitle={ props.project.title }
			pageDescription={ props.project.headline }
    >
      <div className={ css['Intro'] }>
        <h4 className={ css['Title'] }>
          { props.project.title }
        </h4>

        <ProjectText
          text={ props.project.text }
        />

        { props.project.links && (
          <div className={ css['Links'] }>
            { props.project.links.map( ( link, i ) => (
              <Link
                className={ css['Link'] }
                key={ i }
                href={ link.url }
                target={
                  link.url.startsWith( '/' )
                    ? '_self'
                    : '_blank' }
              >
                { link.title }
              </Link>
            ) ) }
          </div>
        ) }
      </div>

      <div className={ css['Container'] }>
        <ul className={ css['Images'] }>
          { props.project.images.map( ( image, i ) => (
            <li className={ css['Image'] } key={ i }>
              <ProjectImage
                info={ image }
              />
            </li>
          ) ) }
        </ul>
      </div>
    </BaseLayout>
  )
}