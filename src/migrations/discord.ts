import { Converter, MaybeArray } from './abstract'

/**
 * From: http://blockheadsfans.com/messagebot/extension/Wingysam/discord
 * => botToken -string
 * => channelId - string
 * To: ???
 * TODO
 */
export class DiscordConverter implements Converter {
  id = 'xyz.wingysam.discord'

  supports (key: string) {
    return ['botToken', 'channelId'].includes(key)
  }

  convert (_key: string, _data: string): MaybeArray<{ key: string; data: string }> {
    return []
  }
}
