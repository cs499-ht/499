import dotenv from 'dotenv';
import path from 'path'
const __dirname = path.resolve(path.dirname('..')); 
const parentPath = path.join(__dirname, '../../')
dotenv.config({path: path.join(parentPath, '.env')})