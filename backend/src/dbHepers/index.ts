import mssql from 'mssql'
import {sqlConfig} from '../config'





class DatabaseHelper{

    private static pool:Promise<mssql.ConnectionPool> 
constructor(){
    DatabaseHelper.pool=mssql.connect(sqlConfig)
}


private static addInputToRequest(request:mssql.Request,data:{[x:string]:number|string}={}){
    const keys =Object.keys(data)
    keys.map(keyName=>{
        return request.input(keyName,data[keyName])
    })

    return request
}


static async exec(storedProc:string,data:{[x:string]:string|number}={}){
    
    let request:mssql.Request =await(await DatabaseHelper.pool).request()
    request = DatabaseHelper.addInputToRequest(request,data)
    return request.execute(storedProc)
}

static async query(queryString:string){
    return (await DatabaseHelper.pool).request().query(queryString)
}

}