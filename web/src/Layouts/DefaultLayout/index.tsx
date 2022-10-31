import { Outlet } from 'react-router-dom';

import { Sidebar } from '../../Components';

import {
  LayoutContainer,
  LayoutContent,
} from './styles';

export function DefaultLayout(){
  return(
    <LayoutContainer>
      <Sidebar />
      
      <LayoutContent>
        <Outlet />
      </LayoutContent>
    </LayoutContainer>
  )
}