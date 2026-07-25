import cron from 'node-cron';
import {prisma} from "../../../../prisma/prisma-client";

export const deleteExpiredToken = () => {
  // запуск в 13:45 каждый день
  return  cron.schedule('56 13 * * *', async () => {
    try {
      await prisma.token.deleteMany({
        where: {
          expiresIn: {
            lt: new Date(),
          }
        }
      });

      console.log(`All expired tokens have been deleted.`);

    } catch (error) {
      console.error(`[Cron Error] Failed to delete expired tokens:`, error);
    }
  })
}