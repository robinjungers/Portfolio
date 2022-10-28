import { projects } from '@/lib/projects.toml';

export function getStaticProps() {
  return {
    props : {
      projects,
    },
  };
}

export { default } from '@/components/Home';