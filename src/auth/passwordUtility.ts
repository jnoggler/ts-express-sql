import { hash, compare } from 'bcrypt';

// see https://github.com/kelektiv/node.bcrypt.js?tab=readme-ov-file#a-note-on-rounds
const SALT_ROUNDS = 10;

/* 
Explanation on how bcrypt regarding hashing, salt rounds and comparing.
For further information, see: https://github.com/kelektiv/node.bcrypt.js

Bcrypt generates a salt based on the SALT_ROUNDS value.
The salt is then appended to the password and hashed.
We do not need to store the salt separately, as it is already included in the hashed string.
See contents of this string below.  
When comparing a password to a hashed password, bcrypt extracts the salt from the hashed password beforehand.

$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa
 |  |  |                     |
 |  |  |                     hash-value = K0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa
 |  |  |
 |  |  salt = nOUIs5kJ7naTuTFkBy1veu
 |  |
 |  cost-factor => 10 = 2^10 rounds
 |
 hash-algorithm identifier => 2b = BCrypt
 */

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await hash(password, SALT_ROUNDS);
  return hashedPassword;
}

export async function comparePasswords(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const isPasswordCorrect = await compare(password, hashedPassword);
  return isPasswordCorrect;
}
