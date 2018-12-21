import { Converter } from './abstract'

/**
 * From: https://github.com/Blockheads-Messagebot/MessageBot/blob/efd7a66/dev/messages/announcements/index.js#L24
 * => announcementArr - { message: string }[]
 * https://github.com/Blockheads-Messagebot/MessageBot/blob/efd7a66/dev/messages/join/index.js#L50
 * => joinArr - { message: string, joins_low: number, joins_high: number, group: string, not_group: string }[]
 * https://github.com/Blockheads-Messagebot/MessageBot/blob/efd7a66/dev/messages/leave/index.js#L51
 * => leaveArr - { message: string, joins_low: number, joins_high: number, group: string, not_group: string }[]
 * https://github.com/Blockheads-Messagebot/MessageBot/blob/efd7a66/dev/messages/trigger/index.js#L52
 * => triggerArr - { message: string, trigger: string, joins_low: number, joins_high: number, group: string, not_group: string }[]
 * To: https://github.com/Blockheads-Messagebot/Messages-Extension/blob/master/src/index.ts#L9
 * => messages.push({ message: message.value, minutes: minutes.value });
 */
export class MessageConverter implements Converter {
  id = 'messages'

  supports (key: string) {
    return ['announcementArr', 'joinArr', 'leaveArr', 'triggerArr'].includes(key)
  }

  convert (key: string, data: string): { key: string; data: string } {
    return { key, data }
  }
}
