import {build} from 'vite';
import react from '@vitejs/plugin-react';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import React from 'react';
import {renderToString} from 'react-dom/server';
const root=dirname(dirname(fileURLToPath(import.meta.url))),base='/shinmaster/',origin='https://korew22220-dev.github.io/shinmaster';
const require=createRequire(import.meta.url);const esbuild=require(require.resolve('esbuild',{paths:[dirname(require.resolve('vite/package.json'))]}));
await mkdir(join(root,'.runtime'),{recursive:true});
esbuild.buildSync({entryPoints:[join(root,'src/components/site.tsx')],outfile:join(root,'.runtime/site.cjs'),bundle:true,format:'cjs',platform:'node',external:['react','react/*','react-dom','react-dom/*'],alias:{'@':root},define:{'import.meta.env.BASE_URL':JSON.stringify(base)},jsx:'automatic'});
esbuild.buildSync({entryPoints:[join(root,'src/data/site-data.ts')],outfile:join(root,'.runtime/data.cjs'),bundle:true,format:'cjs',platform:'node'});
const Site=require('../.runtime/site.cjs').default;const data=require('../.runtime/data.cjs').seedData;
await build({configFile:false,root,base,plugins:[react()],resolve:{alias:{'@':root}},build:{outDir:'docs',emptyOutDir:true}});
const template=await readFile(join(root,'docs/index.html'),'utf8');
const titles={shiny:'Каталог шин',diski:'Каталог дисков',podbor:'Подбор шин',avto:'Подбор по автомобилю',shinomontazh:'Шиномонтаж',akcii:'Акции',filialy:'Шинные центры',contacts:'Контакты',about:'О ШинМастер',faq:'Частые вопросы',favorites:'Избранное',compare:'Сравнение',brands:'Бренды',privacy:'Политика конфиденциальности',consent:'Согласие',agreement:'Соглашение'};
const routes=['',...Object.keys(titles),...['zimnie','letnie','vsesezonnye'].map(s=>'shiny/'+s),...new Set(data.products.filter(p=>p.kind==='tire').map(p=>'shiny/r'+p.diameter)),...new Set(data.products.filter(p=>p.kind==='tire').map(p=>'shiny/'+p.width+'-'+p.profile+'-r'+p.diameter)),...new Set(data.products.filter(p=>p.kind==='tire').map(p=>'brands/'+p.brand.toLowerCase())),...data.branches.map(b=>'filialy/'+b.id),...data.products.map(p=>'product/'+p.id)];
const escape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function document(route){const path=route?route.split('/'):[];const product=path[0]==='product'?data.products.find(p=>p.id===path[1]):null;const title=product?product.brand+' '+product.model:(titles[path[0]]||'ШинМастер');const state=JSON.stringify({path,data}).replace(/</g,'\\u003c');const html=renderToString(React.createElement(Site,{path,data}));return template.replace('<title>ШинМастер</title>','<title>'+escape(title)+(route?' — ШинМастер':'')+'</title><meta name="description" content="Шины, диски и шиномонтаж. Демонстрационная версия сайта ШинМастер."><link rel="canonical" href="'+origin+'/'+route+'">').replace('<div id="root"></div>','<div id="root">'+html+'</div><script>window.__SM_PAGE__='+state+';</script>');}
for(const route of routes){const folder=join(root,'docs',route);await mkdir(folder,{recursive:true});await writeFile(join(folder,'index.html'),document(route));}
await writeFile(join(root,'docs/404.html'),document('404'));
await writeFile(join(root,'docs/.nojekyll'),'');
await writeFile(join(root,'docs/robots.txt'),'User-agent: *\nDisallow: /\n');
await writeFile(join(root,'docs/sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(route=>'<url><loc>'+origin+'/'+route+'</loc></url>').join('')+'</urlset>');
await writeFile(join(root,'export-info.json'),JSON.stringify({builtAt:new Date().toISOString(),routes:routes.length,base,sourceCommit:'47b3bc6e4b952c9c6bec865c53ce85742f53f180',dataRevision:1},null,2));
console.log(JSON.stringify({routes:routes.length,output:join(root,'docs')}));
