import { ReactElement } from 'react';
import css from './ProjectPage.module.css';
import ProjectImg from './ProjectImg';
import BaseLayout from './BaseLayout';
import ProjectText from './ProjectText';
import { Project } from '@/interfaces';

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
              <a
                className={ css['Link'] }
                key={ i }
                href={ link.url }
                target="_blank"
              >
                { link.title }
              </a>
            ) ) }
          </div>
        ) }
      </div>

      <div className={ css['Container'] }>
        <ul className={ css['Images'] }>
          { props.project.images.map( ( image, i ) => (
            <li className={ css['Image'] } key={ i }>
              <ProjectImg
                image={ image }
              />
            </li>
          ) ) }
        </ul>
      </div>
    </BaseLayout>
  )
}