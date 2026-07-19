import { computed, reactive } from 'vue'

const blockers = reactive(new Set<symbol>())

export const isMainSwipeBlocked = computed(() => blockers.size > 0)

export const setMainSwipeBlocked = (id: symbol, blocked: boolean) => {
  if (blocked) {
    blockers.add(id)
    return
  }

  blockers.delete(id)
}

export const releaseMainSwipeBlocker = (id: symbol) => {
  blockers.delete(id)
}
