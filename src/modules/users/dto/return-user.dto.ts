import { UserTypes } from '../user.entity';

export class ReturnUserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  type: UserTypes;
}
