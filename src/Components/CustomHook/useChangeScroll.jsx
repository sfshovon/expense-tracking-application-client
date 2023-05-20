import { useState } from 'react';

const useChangeScroll = () => {
  const [scrollStyle, setScrollStyle] = useState(false);
  const changeScroll = () => {
    if(window.scrollY > 120) {
      setScrollStyle(true);
    }
    else {
      setScrollStyle(false);
    }
  }
  window.addEventListener('scroll', changeScroll);
  return scrollStyle;
}

export default useChangeScroll;