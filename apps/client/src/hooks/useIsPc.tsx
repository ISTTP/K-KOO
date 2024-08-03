import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

/*
 * useIsPC
 * width 값을 가져와서 width가 800이상이면 true, 아니면 false를 돌려준다.
 */
function useIsPC(): boolean {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [isPC, setIsPC] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = debounce(() => {
      setWidth(window.innerWidth);
    }, 0);
    window.addEventListener(`resize`, handleResize);
    return () => {
      window.removeEventListener(`resize`, handleResize);
    };
  }, []);

  useEffect(() => {
    setIsPC(width > 800);
  }, [width]);

  return isPC;
}

export default useIsPC;
