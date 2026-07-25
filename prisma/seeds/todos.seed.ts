import {prisma} from "../prisma-client";

export async function todoSeed() {
  const user1 = await prisma.user.findFirst({
    where: {
      email: "danil@email.com"
    }
  });

  const user2 = await prisma.user.findFirst({
    where: {
      email: "kirill@email.com"
    }
  });

  if (!user1 || !user2) {
    console.error("TODO_SEED ERROR");
    return;
  }

  await prisma.todo.createMany({
    data: [
      {
        description: "Learn React",
        isCompleted: false,
        userId: user1.id
      },
      {
        description: "Prototyping To-Do List",
        isCompleted: true,
        userId: user1.id
      },
      {
        description: "Push to Github",
        isCompleted: false,
        userId: user1.id
      },
      {
        description: "TASK 1",
        isCompleted: false,
        userId: user2.id
      },
    ]
  })
}