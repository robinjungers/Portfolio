import css from './Appearing.module.css';
import classNames from "classnames";
import { CSSProperties, ElementType, ReactElement, ReactNode } from "react";

type AppearingProps = {
  className? : string;
  as? : ElementType;
  children? : ReactNode;
  delay? : number;
  duration? : number;
  style? : CSSProperties;
};

export default function Appearing( props : AppearingProps ) : ReactElement {
  const Tag = props.as ?? 'div';

  return (
    <Tag
      className={ classNames(
        css['Container'],
        props.className,
      ) }
      style={{
        animationDelay : `${ props.delay ?? 0 }ms`,
        animationDuration : `${ props.duration ?? 200 }ms`,
        ...props.style,
      }}
    >
      { props.children }
    </Tag>
  );
}