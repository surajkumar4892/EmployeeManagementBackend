export interface CRUD<C,PA,PU>{
    list:(limit:number,page:number)=>Promise<C[]>;
    create:(resource:C)=>Promise<string>;
    putById:(id:string,resource:PU)=>Promise<string>;
    readById:(id:string)=>Promise<C>;
    deleteById:(id:string)=>Promise<string>;
    patchById:(id:string,resource:PA)=>Promise<string>;
}