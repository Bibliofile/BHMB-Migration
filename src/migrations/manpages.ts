import { Converter } from './abstract'

/**
 * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/manpages
 * => manpages_messages - {default: string, parts: {[k: string]: string}}
 * Drop the default message as it is generated in MB7
 * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-Manpages/master/build/bundle.js
 * => command - string = '/?'
 * => pages - {[k: string]: string};
 */
export class ManpageConverter implements Converter {
  id = 'bibliofile/manpages'

  supports (key: string) {
    return key === 'manpages_messages'
  }

  convert (_key: string, data: string): Array<{ key: string; data: string }> {
    const parsed = JSON.parse(data) as { default: string, parts: { [k: string]: string } }
    return [
      { key: 'pages', data: JSON.stringify(parsed.parts) },
      { key: 'command', data: '/?' }
    ]
  }
}
