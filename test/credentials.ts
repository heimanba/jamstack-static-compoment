import path from 'path';
import fs from 'fs';

const env = fs.readFileSync(path.resolve(process.cwd(), '.env'));
const credentials = JSON.parse(env.toString());

export default credentials;
