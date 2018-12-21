import { Converter } from './abstract'

/**
 * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/biblio_cron_messages
 * => ex.messages.push({message: message.value, minutes: minutes.value});
 * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-Cron-Messages/master/build/bundle.js
 * => messages.push({ message: message.value, minutes: minutes.value });
 */
export class CronConverter implements Converter {
  id = 'bibliofile/cron'

  supports (key: string) {
    return key === 'biblio_cron_messages_messages'
  }

  convert (_key: string, data: string): { key: string; data: string } {
    return { key: 'messages', data }
  }
}
