import {prisma} from "../prisma-client";

export async function usersSeed() {
  await prisma.user.createMany({
    data: [
      {
        email: "danil@email.com",
        name: "danil",
        password: "hashed_password_here",
        method: "CREDENTIALS"
      },
      {
        email: "kirill@email.com",
        name: "kirill",
        password: "hashed_password_here",
        method: "CREDENTIALS"
      }
    ]
  })
}