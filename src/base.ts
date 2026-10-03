export function withBase(value:string):string {
 const base=import.meta.env.BASE_URL;
 return value.startsWith('/')&&!value.startsWith('//')&&!value.startsWith(base)?base.replace(/\/$/,'')+value:value;
}
