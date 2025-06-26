import { writeChanged,nodefs,filesFromPattern,meta_cbeta,fromBase26 } from "./src/nodebundle.cjs";
await nodefs;
const col=(process.argv[2]||'T');
const collectionpath='XML/'+(process.argv[2]||'T')
const outpath='obsidian/cbeta-'+col
if (!fs.existsSync('obsidian')) fs.mkdirSync('obsidian')
if (!fs.existsSync(outpath)) fs.mkdirSync(outpath);

if (!fs.existsSync(collectionpath) ) {
    console.log('missing ',collectionpath);
    console.log('mklink /j XML path-of-cbeta-bookcase-XML');
    process.abort();
}

const files=filesFromPattern("*",collectionpath);

const toObsidianBlockId=(str,from,to)=>{
    let prev='';
    str=str.replace(from,(m,m1,m2,m3)=>{ //move sentence id to end of block
        const repl=to(m,m1,m2,m3)
        const r=prev? (prev+'\n'):'\n';
        prev=repl;
        return r;
    })
    return str+prev;
}
const tidy=str=>{
    str=str.replace(/\^z([a-z]+)<t="(.+?)">/g,(m,m1,m2)=>{
         return '\n'+"#".repeat(fromBase26(m1)+1)+' '+m2+'\n';
    })
    .replace(/\^h<o=(.+?)>/g,'$1:: ')
    .replace(/\^gatha/g,'　　')
    .replace(/\^bk\d+【.*?】/,'')
    .replace(/\^v\d+/,'')
    .replace(/\^juan\d+/g,'')
    return str;
}
// files.length=1;
const ctx={};
for (let i=0;i<files.length;i++) {
    const s=await meta_cbeta.parseFile( collectionpath+'/'+files[i],ctx)
    const content=tidy(toObsidianBlockId(s,/\n?\^cb(\d+[abcd]\d+)/g,(m,m1)=>{
        return ' ^'+m1+'\n';
    }));
    const outfn=outpath+'/'+files[i].replace('.xml','.md').replace(/\/T\d\dn/,'/');
    if (!fs.existsSync( Path.dirname(outfn))) fs.mkdirSync(Path.dirname(outfn));
    writeChanged(outfn,content,true)
}
