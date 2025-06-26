# cbeta-md
convert cbeta TEI p5 to obsidian md

## prerequisite
* nodejs or bun
* latest bookcase.zip from https://cbeta.org/downloads

## preparation
* extract bookcase to any folder
* make a join link to Bookcase/CBETA/XML
  
    mklink/j XML d:\CBreader\Bookcase\CBETA\XML

## convert
### create 大正藏 md in folder obsidian/cbeta_T

    node md

### create 卍字續藏 md in obsidian/cbeta_X

    node md X


## obsidian
*  open vault in cbeta_T

