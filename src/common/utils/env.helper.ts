export function getFileEnv(): string 
{
    const env: string | undefined = process.env.NODE_ENV;
    console.log(env)
    let filename = '';
    if (env === 'PROD') {
      filename = '.env'
    } else {
      filename = 'local.env';
    }
    return filename;
}