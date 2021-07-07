import { useEffect, useRef } from 'react';

export default (func, params) => {
  const initialRender = useRef(false);
  useEffect(() => {
    if (initialRender.current) {
      return func();
    }
    initialRender.current = true;
  }, params);
};
