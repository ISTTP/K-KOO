import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

/*
 * useIsPC
 * width 값을 가져와서 width가 point 이상이면 true, 아니면 false를 돌려준다.
 */
function useIsPC(point: number): boolean {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [isPC, setIsPC] = useState<boolean>(window.innerWidth > point);

  useEffect(() => {
    const handleResize = debounce(() => {
      setWidth(window.innerWidth);
    }, 0);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsPC(width > point);
  }, [width, point]);

  return isPC;
}

export default useIsPC;
