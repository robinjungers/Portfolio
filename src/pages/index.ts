import { GetStaticPropsResult } from 'next';
import { HomePageProps } from '@/components/HomePage';
import { Project } from '@/interfaces';

export function getStaticProps() : GetStaticPropsResult<HomePageProps> {
  return {
    props : {
      projects : require( '@/lib/projects.toml' ).projects as Project[],
    },
  };
}

export { default } from '@/components/HomePage';