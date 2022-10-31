import { useEffect, useRef } from "react";
import { CaretRight, DownloadSimple, FrameCorners, Lightning, PictureInPicture } from "phosphor-react";

import { useTrapFocus } from "../../../../hooks/useTrapFocus";

import { Option } from "../Option";

import { MenuItem, MenuList } from "../../styles";

interface MainMenuProps{
  videoUrl: string;
  isPictureInPicture: boolean;
  handleChangeActiveMenu: (menu: string) => void;
  handleChangeMenuHeight: (element: HTMLElement) => void;
  handleRequestPictureInPicture: () => void;
}

export function MainMenu({ 
  videoUrl,
  isPictureInPicture,
  handleChangeActiveMenu, 
  handleChangeMenuHeight, 
  handleRequestPictureInPicture,
}: MainMenuProps){
  const mainMenuRef = useRef<HTMLUListElement | null>(null);
  const firstElementRef = useRef<HTMLAnchorElement | null>(null);

  useTrapFocus({
    elementRef: mainMenuRef,
    firstElementRef,
    focusableElementsQuery: 'a[href]',
  });

  useEffect(() =>{
    if(mainMenuRef.current){
      handleChangeMenuHeight(mainMenuRef.current);
    }
  }, [mainMenuRef]);

  return(
    <MenuList ref={mainMenuRef}>
      <MenuItem>
        <Option.Icon icon={<DownloadSimple />} />
        <Option.Button
          ref={firstElementRef}
          href={videoUrl}
          target="_blank" 
        >
          Download
        </Option.Button>
      </MenuItem>

      <MenuItem onClick={(e) =>{
        e.stopPropagation();
        e.preventDefault();
        handleChangeActiveMenu('speed')
      }}>
        <Option.Icon icon={<Lightning />} />
        <Option.Button
          href="#"
          aria-expanded="false" 
          aria-controls="speed-dropdown"
        >
          Playback Rate
        </Option.Button>
        <Option.Icon icon={<CaretRight />} />
      </MenuItem>

      <MenuItem onClick={(e) =>{
          e.preventDefault();
          handleRequestPictureInPicture();
        }}
      >
        <Option.Icon icon={
            isPictureInPicture
              ? <FrameCorners /> 
              : <PictureInPicture />
          } 
        />
        <Option.Button
          href="#"
        >
          Miniplayer
        </Option.Button>
      </MenuItem>
    </MenuList>
  )
}