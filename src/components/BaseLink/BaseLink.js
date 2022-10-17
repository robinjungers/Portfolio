import Link from 'next/link';
import css from './BaseLink.module.css';

export default function BaseLink( {
  href,
  newTab,
  text,
} ) {
  const target = newTab ? '_blank' : '_self';

  return (
    <Link href={ href }>
      <a className={ css['Link'] } target={ target }>
        { text }
      </a>
    </Link>
  );
}