import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Authentication {
    async pwsToHash(password: string) {

        const salt = randomBytes(8).toHex();
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buf.toHex()}.${salt}`
    }

    async pwdCompare(storedPassword: string, suppliedPassword: string) {

        const [hashedPassword, salt] = storedPassword.split('.');


        if (!hashedPassword || !salt) {
            throw new Error('Invalid stored password format');
        }

        const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

        return buf.toHex() === hashedPassword;
    }
}

export const authenticationService = new Authentication();