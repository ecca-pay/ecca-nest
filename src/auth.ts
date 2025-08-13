import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '../generated/prisma';
import { organization } from 'better-auth/plugins';

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  trustedOrigins: ['http://localhost:5173'],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [organization()],
  // user: {
  //   additionalFields: {
  //     roles: {
  //       type: [Role.ADMIN, Role.TRADER, Role.MEMBER],
  //       required: true,
  //       defaultValue: [Role.MEMBER],
  //     },
  //   },
  // },
});
