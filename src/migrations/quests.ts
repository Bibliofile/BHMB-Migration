export type QuestListing = { id: number, children: QuestListing[] }

/**
 * Describes how the quests are ordered.
 */
export type QuestList = QuestListing[]

type Quests = { id: number, name: string, code: string, description: string, xp: number, completeMessage: string }[]

type OldUsers = { [k: string]: { xp: string, questMaster?: boolean, completed: string[] } }
type NewUsers = { [k: string]: { xp: number, questmaster: boolean, completed: number[] } }

/**
 * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/quests
 * => quests_log - { message: string, user: string, timestamp: number }[]
 * => quests_quests - { title: string, description: string, xp: string, code: string }[]
 * => quests_settings - {
 *      addxp: string,
 *      quest_already_completed: string,
 *      quest_complete: string,
 *      level: string,
 *      leveltop: string,
 *      player_does_not_exist: string,
 *      quest_details: string,
 *      quest_not_found: string,
 *      quest_list: string,
 *      quest_list_all_complete: string,
 *      removexp: string
 *   }
 * => quests_users - { [k: string]: { xp: string, questMaster?: boolean, completed: string[] }}
 * => quests_levels - { xp: number, title: string, onLevelUp: string }[]
 * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-Quests/master/build/bundle.js
 * https://github.com/Bibliofile/BHMB-Quests/blob/master/src/quests-tab.ts
 * => quests - { id: number, name: string, code: string, description: string, xp: number, completeMessage: string }[]
 * => quest_id - number <- start at length of quests
 * => order - QuestList <- https://github.com/Bibliofile/BHMB-Quests/blob/master/src/quest.ts#L33
 * https://github.com/Bibliofile/BHMB-Quests/blob/master/src/log-tab.ts
 * => log - { message: string, timestamp: number, user: string }[]
 * https://github.com/Bibliofile/BHMB-Quests/blob/master/src/users-tab.ts
 * => users - { [k: string]: { xp: number, questmaster: boolean, completed: number[] }}
 * https://github.com/Bibliofile/BHMB-Quests/blob/master/src/levels-tab.ts
 * => levels - { xp: number, title: string, onLevelUp: string }[]
 */

export function questsConverter ({ overwrite }: { overwrite: boolean }): [string[], string[]] {
  const questsId = 'bibliofile/quests'
  const migrated: string[] = []
  const warnings: string[] = []

  const worldIds = new Set(Array.from({ length: localStorage.length })
    .map((_, i) => localStorage.key(i)!)
    .filter(key => key.startsWith('quests_'))
    .map(key => key.replace(/.*?(\d+)$/, '$1')))

  for (const id of worldIds) {
    const setOrWarn = (key: string, data: string) => {
      const saveKey = `/${id}/${questsId}/${key}`
      migrated.push(`quests_${key}${id}`)
      if (localStorage.getItem(saveKey) != null && !overwrite) {
        warnings.push(`Ignoring migration for ${saveKey} as there is already data present`)
      } else {
        localStorage.setItem(saveKey, data)
      }
    }

    // Log, format is the same
    setOrWarn('log', localStorage.getItem('quests_log' + id) || '[]')
    // Levels format is the same.
    setOrWarn('levels', localStorage.getItem('quests_levels' + id) || '[]')
    // Settings is removed
    migrated.push('quests_settings' + id)

    // Users & Quests have changed
    // Users migration depends on quests migration.
    // quests -> quests, order

    const oldQuests = JSON.parse(localStorage.getItem('quests_quests' + id) || '[]') as { title: string; description: string; xp: string; code: string }[]

    const order: QuestList = oldQuests.map((_, i) => ({ id: i, children: [] }))
    const quests: Quests = oldQuests
      .map((q, i) => ({ name: q.title, description: q.description, id: i, code: q.code, xp: +q.xp, completeMessage: '' }))
    setOrWarn('order', JSON.stringify(order))
    setOrWarn('quest_id', JSON.stringify(order.length + 1))
    setOrWarn('quests', JSON.stringify(quests))

    // Transform the "completed" property of users to ids
    const oldUsers = JSON.parse(localStorage.getItem('quests_users' + id) || '{}') as OldUsers
    delete oldUsers.QUESTS_INVALID_NAME
    const newUsers: NewUsers = {}

    for (const [ name, data ] of Object.entries(oldUsers)) {
      newUsers[name] = {
        xp: +data.xp,
        questmaster: !!data.questMaster,
        completed: data.completed.map(c => quests.findIndex(q => q.code === c)).filter(id => id !== -1)
      }
    }
    setOrWarn('users', JSON.stringify(newUsers))
  }

  return [migrated, warnings]
}
