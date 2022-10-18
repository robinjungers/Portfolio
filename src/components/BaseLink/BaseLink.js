import Link from 'next/link';
import css from './BaseLink.module.css';
import classnames from 'classnames';

export default function BaseLink( {
  className,
  href,
  newTab,
  text,
} ) {
  const target = newTab ? '_blank' : '_self';

  return (
    <Link href={ href }>
      <a className={ classnames( className, css['Link'] ) } target={ target }>
        { text }
      </a>
    </Link>
  );
}