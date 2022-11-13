import { existsSync } from "fs";


export function getFileEnv(): string 
{
    const env: string | undefined = process.env.NODE_ENV;
    const devEnvPath: string = `${process.cwd()}/.env`
    const localEnvPath : string = `${process.cwd()}/local.env`

    let filename = '';
    if (env === 'dev') 
    {
      if (existsSync(devEnvPath))
      {
        filename = '.env'
      }else{
        throw new Error("No se encuentra el archivo .Env Develoment");     
      }
    } 
    else if(env=== 'local') 
    {
      if (existsSync(localEnvPath))
      {
        filename = 'local.env'
      }else{
        throw new Error("No se encuentra el archivo .Env Local");     
      }
    }
    return filename;
}

