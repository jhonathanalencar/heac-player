import { Route, Routes } from 'react-router-dom';

import { DefaultLayout } from './Layouts/DefaultLayout';

import { Home } from './pages/Home';
import { Player } from './pages/Player';
import { Upload } from './pages/Upload';

export function Router(){
  return(
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="video/:videoId" element={<Player />} />
        <Route path="upload" element={<Upload />} />
        
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}