import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CaretRight, FileArrowUp, MonitorPlay } from 'phosphor-react';

import {
  SidebarContainer,
  ToggleButton,
} from './styles';

export function Sidebar(){
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return(
    <SidebarContainer isOpen={isSidebarOpen}>
      <strong>HEAC</strong>

      <nav>
        <ul>
          <li>
            <NavLink 
              to="/" 
              onClick={() => setIsSidebarOpen(false)}
            >
              <MonitorPlay className={location.pathname === '/' ? 'active' : ''} />
            </NavLink>
          </li>
          <li>
            <NavLink to="upload" onClick={() => setIsSidebarOpen(false)}>
              <FileArrowUp className={location.pathname === '/upload' ? 'active' : ''} />
            </NavLink>
          </li>
        </ul>
      </nav>

      <ToggleButton
        type="button"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        <CaretRight weight="bold" />
      </ToggleButton>
    </SidebarContainer>
  )
}