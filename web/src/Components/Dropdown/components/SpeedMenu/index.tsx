import { useEffect, useRef } from "react";
import { CaretLeft } from "phosphor-react";

import { useTrapFocus } from "../../../../hooks/useTrapFocus";

import { Option } from "../Option";

import { MenuItem, MenuList } from "../../styles";

interface SpeedMenuProps{
  speed: number;
  handleChangeActiveMenu: (menu: string) => void;
  handleChangeMenuHeight: (element: HTMLElement) => void;
  handleVideoSpeed: (speed: number) => void;
}

export function SpeedMenu({ 
  speed,
  handleChangeActiveMenu, 
  handleChangeMenuHeight,
  handleVideoSpeed,
}: SpeedMenuProps){
  const speedMenuRef = useRef<HTMLUListElement | null>(null);
  const firstElementRef = useRef<HTMLAnchorElement | null>(null);

  useTrapFocus({
    elementRef: speedMenuRef, 
    firstElementRef,
    focusableElementsQuery: 'a[href]',
  });

  useEffect(() =>{
    if(speedMenuRef.current){
      handleChangeMenuHeight(speedMenuRef.current);
    }
  }, [speedMenuRef]);

  return(
    <MenuList ref={speedMenuRef} id="speed-dropdown" aria-label="speed options">
      <MenuItem onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleChangeActiveMenu('main');
        }}
      >
        <Option.Icon icon={<CaretLeft />} />
        <Option.Button
          ref={firstElementRef}
          href="#" 
        >
          Options
        </Option.Button>
      </MenuItem>

      <MenuItem 
        onClick={(e) => {
          e.preventDefault();
          handleVideoSpeed(0.5)
        }}
        className={speed === 0.5 ? 'active' : ''}
      >
        <Option.Button
          href="#"
        >
          0.5x
        </Option.Button>
      </MenuItem>

      <MenuItem 
        onClick={(e) => {
          e.preventDefault();
          handleVideoSpeed(1)
        }}
        className={speed === 1 ? 'active' : ''}
      >
        <Option.Button
          href="#"
        >
          1x
        </Option.Button>
      </MenuItem>

      <MenuItem 
        onClick={(e) => {
          e.preventDefault();
          handleVideoSpeed(1.5);
        }}
        className={speed === 1.5 ? 'active' : ''}
      >
        <Option.Button
          href="#"
        >
          1.5x
        </Option.Button>
      </MenuItem>

      <MenuItem 
        onClick={(e) => {
          e.preventDefault();
          handleVideoSpeed(2)
        }}
        className={speed === 2 ? 'active' : ''}
      >
        <Option.Button
          href="#"
        >
          2x
        </Option.Button>
      </MenuItem>

      <MenuItem 
        onClick={(e) => {
          e.preventDefault();
          handleVideoSpeed(4)
        }}
        className={speed === 4 ? 'active' : ''}
      >
        <Option.Button
          href="#"
        >
          4x
        </Option.Button>
      </MenuItem>
    </MenuList>
  )
}