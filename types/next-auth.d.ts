import { CustomTypes } from '@/types/custom-types';

declare module 'next-auth/jwt' {
  interface JWT {
    user: CustomTypes;
  }
}
declare module 'next-auth' {
  interface Session {
    user: CustomTypes;
  }
  interface User extends CustomTypes {}
}
