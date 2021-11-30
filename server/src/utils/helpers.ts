import { InputUser } from '../types/InputUser';
import validator from 'validator';

interface RegisterFeedback {
  valid: boolean;
  error?: string;
}

export function isValidRegisterInfo(inputUser: InputUser): RegisterFeedback {
  const fields = ['name', 'lastname', 'email', 'password', 'role'];
  for (const field of fields) {
    if (!inputUser[field])
      return { valid: false, error: 'All fields are required!' };

    if (field !== 'password' && !validator.isStrongPassword(inputUser[field]))
      return {
        valid: false,
        error:
          'Password must have at least one lowercase and one uppercase letters, one symbol and at least 8 characters!',
      };

    if (field === 'email' && !validator.isEmail(inputUser[field]))
      return { valid: false, error: 'Invalid email format!' };
  }
  return { valid: true };
}
