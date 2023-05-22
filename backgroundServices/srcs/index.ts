
// //send email
import cron from 'node-cron'
import { sendWelcomeEmail ,sendResetEmail} from './emailServices/welcomEmail';




cron.schedule('*/59 */3 * * * *', async () => {
    await sendWelcomeEmail()
    await sendResetEmail()
   
  });