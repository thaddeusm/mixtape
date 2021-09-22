import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { join } from 'path';

const privateKey = readFileSync(join(__dirname, './files', 'AuthKey.p8'), 'utf8').toString();
const teamId = process.env.APPLE_TEAM_ID;
const keyId = process.env.APPLE_KEY_ID;

module.exports = async (req, res) => {
    const jwtToken = jwt.sign({}, privateKey, {
        algorithm: "ES256",
        expiresIn: "180d",
        issuer: teamId,
        header: {
          alg: "ES256",
          kid: keyId
        }
    });

    console.log('test')

    return res.status(200).json(jwtToken);
    return res.status(403).json({message: 'error'});
}
