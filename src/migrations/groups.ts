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

type NewPermStrings = 
  | 'BH.HELP'
  | 'BH.PLAYERS'
  | 'BH.KICK'
  | 'BH.KICK_MOD'
  | 'BH.KICK_ADMIN'
  | 'BH.BAN'
  | 'BH.BAN_MOD'
  | 'BH.BAN_ADMIN'
  | 'BH.BAN_NO_DEVICE'
  | 'BH.BAN_NO_DEVICE_MOD'
  | 'BH.BAN_NO_DEVICE_ADMIN'
  | 'BH.UNBAN'
  | 'BH.WHITELIST'
  | 'BH.UNWHITELIST'
  | 'BH.LIST_BLACKLIST'
  | 'BH.LIST_WHITELIST'
  | 'BH.LIST_ADMINLIST'
  | 'BH.LIST_MODLIST'
  | 'BH.STOP'
  | 'BH.PVPON'
  | 'BH.PVPOFF'
  | 'BH.LOADLISTS'
  | 'BH.MOD'
  | 'BH.UNMOD'
  | 'BH.ADMIN'
  | 'BH.UNADMIN'
  | 'BH.CLEAR_BLACKLIST'
  | 'BH.CLEAR_WHITELIST'
  | 'BH.CLEAR_MODLIST'
  | 'BH.CLEAR_ADMINLIST'
  | 'BH.SET_PASSWORD'
  | 'BH.SET_PRIVACY'
  | 'BH.REMOVE_PASSWORD'
  | 'GM.ADD'
  | 'GM.REMOVE'


interface NewPermissionStrings {
  [oldPermission: string]: NewPermStrings|NewPermStrings[]
}

interface OldPermissions {
  [key: string]: OldPermStrings[]
}

interface UserData {
  player: string
  permissions: {
    allowed: string[],
    disabled: string[]
  }
}

interface GroupData {
  id: number
  name: string
  permissions: {
    allowed: string[],
    disabled: string[]
  },
  players: string[],
  managed: boolean
}

interface ManagedGroupPermissions {
  [groupName: string]: {
    allowed: string[],
    disabled: string[]
  }
}

/*

        prefix + 'DisplayNames' + id,
        prefix + 'GroupPermissions' + id
*/

/**
 * From: http://blockheadsfans.com/messagebot/extension/dapersonmgn/DaPgroupManagement
 * To: https://gitcdn.xyz/repo/dapersonmgn/BHMB-groupManagement/master/build/bundle.js
 */
export function groupConverter ({ overwrite }: { overwrite: boolean }): [string[], string[]] {
  const prefix = 'DaPgroupManagement'
  const saveId = 'DaPersonMGN/groupManagement'.toLocaleLowerCase()

  const warnings: string[] = []
  const migrated: string[] = []

  const permissionConversions: NewPermissionStrings = {
    'KICK': 'BH.KICK',
    'UNBAN': 'BH.UNBAN',
    'BAN': 'BH.BAN',
    'BAN-NO-DEVICE': 'BH.BAN_NO_DEVICE',
    'BANKICKADMINS': ['BH.BAN_ADMIN', 'BH.KICK_ADMIN', 'BH.BAN_NO_DEVICE_ADMIN'],
    'BANKICKMODS': ['BH.BAN_MOD', 'BH.BAN_NO_DEVICE_MOD', 'BH.KICK_MOD'],
    'MOD': 'BH.MOD',
    'UNMOD': 'BH.UNMOD',
    'ADMIN': 'BH.ADMIN',
    'UNADMIN': 'BH.UNADMIN',
    'STOP': 'BH.STOP',
    'HELP': 'BH.HELP',
    'WHITELIST': 'BH.WHITELIST',
    'UNWHITELIST': 'BH.UNWHITELIST',
    'LISTMOD': 'BH.LIST_MODLIST',
    'LISTBAN': 'BH.LIST_BLACKLIST',
    'LISTADMIN': 'BH.LIST_ADMINLIST',
    'LISTWHITELIST': 'BH.LIST_WHITELIST',
    'PVPON': 'BH.PVPON',
    'PVPOFF': 'BH.PVPOFF',
    'LOADLIST': 'BH.LOADLISTS',
    'CLEARMOD': 'BH.CLEAR_MODLIST',
    'CLEARADMIN': 'BH.CLEAR_ADMINLIST',
    'CLEARBAN': 'BH.CLEAR_BLACKLIST',
    'CLEARWHITELIST': 'BH.CLEAR_WHITELIST',
    'SETPASSWORD': 'BH.SET_PASSWORD',
    'REMOVEPASSWORD': 'BH.REMOVE_PASSWORD',
    'SETPRIVACY': 'BH.SET_PRIVACY',
    'GROUPADD': 'GM.ADD',
    'GROUPDELETE': 'GM.REMOVE'
  }

  const managedGroupPermissions: ManagedGroupPermissions = {
    'administrator': {
      allowed: ['BH.HELP', 'BH.PLAYERS', 'BH.KICK_MOD', 'BH.KICK_ADMIN', 'BH.KICK', 'BH.BAN_MOD', 'BH.BAN_ADMIN', 'BH.BAN', 'BH.BAN_NO_DEVICE_MOD', 'BH.BAN_NO_DEVICE_ADMIN', 'BH.BAN_NO_DEVICE', 'BH.UNBAN', 'BH.WHITELIST', 'BH.UNWHITELIST', 'BH.LIST_MODLIST', 'BH.LIST_BLACKLIST', 'BH.LIST_WHITELIST', 'BH.LIST_ADMINLIST', 'BH.LOADLISTS', 'BH.STOP', 'BH.PVPON', 'BH.PVPOFF', 'BH.MOD', 'BH.UNMOD', 'BH.ADMIN', 'BH.UNADMIN', 'BH.CLEAR_MODLIST', 'BH.CLEAR_ADMINLIST', 'BH.CLEAR_WHITELIST', 'BH.CLEAR_BLACKLIST'],
      disabled: ['BH.HELP', 'BH.PLAYERS', 'BH.KICK_MOD', 'BH.KICK_ADMIN', 'BH.KICK', 'BH.BAN_MOD', 'BH.BAN_ADMIN', 'BH.BAN', 'BH.BAN_NO_DEVICE_MOD', 'BH.BAN_NO_DEVICE_ADMIN', 'BH.BAN_NO_DEVICE', 'BH.UNBAN', 'BH.WHITELIST', 'BH.UNWHITELIST', 'BH.LIST_MODLIST', 'BH.LIST_BLACKLIST', 'BH.LIST_WHITELIST', 'BH.LIST_ADMINLIST', 'BH.LOADLISTS', 'BH.STOP', 'BH.PVPON', 'BH.PVPOFF', 'BH.MOD', 'BH.UNMOD', 'BH.ADMIN', 'BH.UNADMIN', 'BH.CLEAR_MODLIST', 'BH.CLEAR_ADMINLIST', 'BH.CLEAR_WHITELIST', 'BH.CLEAR_BLACKLIST']
    },
    'moderator': {
      allowed: ['BH.HELP', 'BH.PLAYERS', 'BH.KICK', 'BH.BAN', 'BH.BAN_NO_DEVICE', 'BH.UNBAN', 'BH.WHITELIST', 'BH.UNWHITELIST', 'BH.LIST_BLACKLIST', 'BH.LIST_WHITELIST'],
      disabled: ['BH.HELP', 'BH.PLAYERS', 'BH.KICK', 'BH.BAN', 'BH.BAN_NO_DEVICE', 'BH.UNBAN', 'BH.WHITELIST', 'BH.UNWHITELIST', 'BH.LIST_BLACKLIST', 'BH.LIST_WHITELIST']
    }
  }

  const convertPermissions = (permissions: OldPermStrings[]) => permissions.map(permission => permissionConversions[permission]).reduce((a, b) => {
    if (typeof a === "string") {
      if (typeof b === "string") {
        return [a, b]
      } else {
        return b.concat(a)
      }
    } else {
      if (typeof b === "string") {
        return a.concat(b)
      } else {
        return a.concat(b)
      }
    }
  }) as NewPermStrings[]

  const worldIds = Array.from({ length: localStorage.length })
    .map((_, i) => localStorage.key(i)!)
    .filter(key => key.startsWith(prefix + 'Users'))
    .map(key => key.replace(/.*?(\d+)$/, '$1'))

  for (const id of worldIds) {
    const oldUsers: OldUsers = JSON.parse(localStorage.getItem(prefix + 'Users' + id)!)
    const oldDisplayNames: OldDisplayNames = JSON.parse(localStorage.getItem(prefix + 'DisplayNames' + id)!)
    const oldPerms: OldPermissions = JSON.parse(localStorage.getItem(prefix + 'GroupPermissions' + id)!)

    const groupUsers: {[name: string]: string[]} = {}

    //Let's migrate users.
    // /247945/dapersonmgn/groupmanagement/key
    const userData: UserData[] = []
    const userSaveKey = `/${id}/${saveId}/users`
    for (const name in oldUsers) {
      const oldUserGroups = oldUsers[name]
      for (const group of oldUserGroups) {
        if (!groupUsers[group]) {
          groupUsers[group] = []
        }
        groupUsers[group].push(name)
      }
      userData.push({
        player: name,
        permissions: {
          allowed: [],
          disabled: []
        }
      })
    }

    //Let's migrate groups.
    const groupData: GroupData[] = []
    const groupSaveKey = `/${id}/${saveId}/groups`
    let groupId = 1
    for (const groupName in oldPerms) {
      const oldPermissions = oldPerms[groupName]
      const newPermissions = convertPermissions(oldPermissions)
      const managedPermissions = managedGroupPermissions[groupName]
      const displayName = oldDisplayNames[groupName]
      groupData.push({
        id: groupId,
        name: displayName,
        permissions: {
          allowed: managedPermissions ? Array.from(new Set(managedPermissions.allowed.concat(newPermissions))) : newPermissions,
          disabled: managedPermissions ? managedPermissions.disabled : []
        },
        players: groupUsers[groupName] || [],
        managed: ['anyone', 'moderator', 'administrator'].includes(groupName)
      })
      groupId++
    }

    //Is there data set? If so, is the data more than the 3 default groups?
    if ((localStorage.getItem(groupSaveKey) != null && JSON.parse(localStorage.getItem(groupSaveKey)!).length) > 3 && !overwrite) {
      warnings.push(`Ignoring migration for ${prefix}GroupPermissions${id} => ${groupSaveKey} and ${prefix}DisplayNames${id} => ${groupSaveKey} as there is already data present`)
    } else {
      localStorage.setItem(groupSaveKey, JSON.stringify(groupData))
      migrated.push(
        prefix + 'GroupPermissions' + id,
        prefix + 'DisplayNames' + id
      )
    }

    if (localStorage.getItem(userSaveKey) != null && !overwrite) {
      warnings.push(`Ignoring migration for ${prefix}Users${id} => ${userSaveKey} as there is already data present`)
    } else {
      localStorage.setItem(userSaveKey, JSON.stringify(userData))
      migrated.push(
        prefix + 'Users' + id
      )
    }
  }

  return [migrated, warnings]
}
