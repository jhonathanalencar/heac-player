import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { MainMenu } from './components/MainMenu';
import { SpeedMenu } from './components/SpeedMenu';

import {
  DropdownContainer,
} from './styles';

interface DropdownProps{
  isOpen: boolean;
  isPictureInPicture: boolean;
  videoUrl: string;
  speed: number;
  handleVideoSpeed: (speed: number) => void;
  handleRequestPictureInPicture: () => void;
}

export function Dropdown({ 
  isOpen, 
  isPictureInPicture,
  handleVideoSpeed, 
  videoUrl, 
  speed,
  handleRequestPictureInPicture,
}: DropdownProps){
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(0);
  const menuRef = useRef<HTMLElement | null>(null);

  const handleChangeActiveMenu = useCallback((menu: string) =>{
    setActiveMenu(menu);
  }, []);

  const handleChangeMenuHeight = useCallback((element: HTMLElement) =>{
    const height = element.offsetHeight;
    setMenuHeight(height + 16);
  }, []);

  const displayDropdown: { [key: string]: ReactNode } = {
    'idle': <div></div>,
    'main': <MainMenu 
              handleChangeActiveMenu={handleChangeActiveMenu} 
              handleChangeMenuHeight={handleChangeMenuHeight}
              handleRequestPictureInPicture={handleRequestPictureInPicture}
              videoUrl={videoUrl}
              isPictureInPicture={isPictureInPicture}
            />,
    'speed': <SpeedMenu 
                handleChangeActiveMenu={handleChangeActiveMenu}
                handleChangeMenuHeight={handleChangeMenuHeight}
                handleVideoSpeed={handleVideoSpeed}
                speed={speed}
              />,
  }

  useEffect(() =>{
    if(menuRef.current){
      const nav = menuRef.current.firstChild as HTMLElement;
      setMenuHeight(nav.offsetHeight + 16);
    }
  }, []);

  useEffect(() =>{
    if(!isOpen){
      setActiveMenu('idle');
    }else{
      setActiveMenu('main');
    }
  }, [isOpen]);

  return useMemo(() =>{
    return(
      <DropdownContainer 
        className={isOpen ? '' : 'visually-hidden'}
        aria-label="Main Navigation" 
        ref={menuRef} 
        style={{height: menuHeight ?? '' }}
      >
        {displayDropdown[activeMenu]}
      </DropdownContainer>
    )
  }, [
    isOpen, 
    activeMenu, 
    menuHeight, 
    menuRef, 
    videoUrl,
    speed,
  ]);
}