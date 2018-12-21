/**
 * mb_lastLogLoad -> lastPlayersUpdate
 */
export function logLoadConverter ({ overwrite }: { overwrite: boolean }): [string[], string[]] {
  const logLoads = Array.from({ length: localStorage.length })
    .map((_, i) => localStorage.key(i)!)
    .filter(key => key.startsWith('mb_lastLogLoad'))

  if (!overwrite) {
    return [logLoads, ['Last log updates were not copied from V6.']]
  }

  for (const key of logLoads) {
    const id = key.replace('mb_lastLogLoad', '')
    localStorage.setItem(`/${id}/lastPlayersUpdate`, localStorage.getItem(key)!)
  }

  return [logLoads, []]
}

export function playersConverter ({ overwrite }: { overwrite: boolean }): [string[], string[]] {
  const players = Array.from({ length: localStorage.length })
    .map((_, i) => localStorage.key(i)!)
    .filter(key => key.startsWith('mb_players'))

  if (!overwrite) {
    return [players, ['Player lists were not copied from V6.']]
  }

  for (const key of players) {
    const id = key.replace('mb_players', '')
    localStorage.setItem(`/${id}/players`, localStorage.getItem(key)!)
  }

  return [players, []]
}

// No longer saved.
export function versionConverter (): [string[], string[]] {
  localStorage.removeItem('mb_version')
  return [['mb_version'], []]
}
