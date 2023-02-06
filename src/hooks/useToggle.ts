import { useCallback, useState } from "react";

export default function useToggle( initialValue : boolean ) : [boolean, () => void] {
  const [isActive, setIsActive] = useState<boolean>( initialValue );

  const toggleIsActive = useCallback( () => {
    setIsActive( isActive => !isActive );
  }, [] );

  return [isActive, toggleIsActive];
}