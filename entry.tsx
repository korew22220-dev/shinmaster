import React from 'react';
import {hydrateRoot} from 'react-dom/client';
import Site from './src/components/site';
import './styles.css';
const page=(window as any).__SM_PAGE__;
hydrateRoot(document.getElementById('root')!, <Site path={page.path} data={page.data}/>);
