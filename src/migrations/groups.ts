interface OldUsers {
  [key: string]: string[]
}

interface OldDisplayNames {
  [key: string]: string
}

type OldPermStrings =
  | 'KICK'
  | 'UNBAN'
  | 'BAN'
  | 'BAN-NO-DEVICE'
  | 'BANKICKADMINS'
  | 'BANKICKMODS'
  | 'MOD'
  | 'UNMOD'
  | 'ADMIN'
  | 'UNADMIN'
  | 'STOP'
  | 'HELP'
  | 'WHITELIST'
  | 'UNWHITELIST'
  | 'LISTMOD'
  | 'LISTBAN'
  | 'LISTADMIN'
  | 'LISTWHITELIST'
  | 'PVPON'
  | 'PVPOFF'
  | 'LOADLIST'
  | 'CLEARMOD'
  | 'CLEARADMIN'
  | 'CLEARBAN'
  | 'CLEARWHITELIST'
  | 'SETPASSWORD'
  | 'REMOVEPASSWORD'
  | 'SETPRIVACY'
  | 'GROUPADD'
  | 'GROUPDELETE'

interface OldPermissions {
  [key: string]: OldPermStrings
}

interface NewData {
  // TODO
}

/**
 * From: http://blockheadsfans.com/messagebot/extension/dapersonmgn/DaPgroupManagement
 * To: https://gitcdn.xyz/repo/dapersonmgn/BHMB-groupManagement/master/build/bundle.js
 */
export function groupConverter ({ overwrite }: { overwrite: boolean }): [string[], string[]] {
  const prefix = 'DaPgroupManagement'
  const saveId = 'DaPersonMGN/groupManagement'.toLocaleLowerCase()
  const warnings: string[] = []
  const migrated: string[] = []

  const worldIds = Array.from({ length: localStorage.length })
    .map((_, i) => localStorage.key(i)!)
    .filter(key => key.startsWith(prefix + 'Users'))
    .map(key => key.replace(/.*?(\d+)$/, '$1'))

  for (const id of worldIds) {
    const oldUsers: OldUsers = JSON.parse(localStorage.getItem(prefix + 'Users' + id)!)
    const oldDisplayNames: OldDisplayNames = JSON.parse(localStorage.getItem(prefix + 'DisplayNames' + id)!)
    const oldPerms: OldPermissions = JSON.parse(localStorage.getItem(prefix + 'GroupPermissions' + id)!)

    // /247945/dapersonmgn/groupmanagement/data
    const data: NewData = {}
    const saveKey = `/${id}/${saveId}/data`

    if (localStorage.getItem(saveKey) != null && !overwrite) {
      warnings.push(`Ignoring migration for ${prefix}Users${id} => ${saveKey} as there is already data present`)
    } else {
      localStorage.setItem(saveKey, JSON.stringify(data))
      migrated.push(
        prefix + 'Users' + id,
        prefix + 'DisplayNames' + id,
        prefix + 'GroupPermissions' + id
      )
    }
  }

  return [migrated, warnings]
}
