import { computed, onBeforeUnmount, ref, type Ref } from 'vue'

type DirectionLock = 'pending' | 'horizontal' | 'vertical'

interface MainTabSwipeOptions {
  activeIndex: Ref<number>
  tabCount: number
  blocked: Readonly<Ref<boolean>>
  onCommit: (index: number) => void
}

const DIRECTION_THRESHOLD = 7
const DIRECTION_RATIO = 1.2
const DISTANCE_RATIO = 0.25
const FLING_MIN_DISTANCE = 36
const FLING_MIN_VELOCITY = 0.45
const ANIMATION_DURATION = 280

export const useMainTabSwipe = ({ activeIndex, tabCount, blocked, onCommit }: MainTabSwipeOptions) => {
  const viewport = ref<HTMLElement | null>(null)
  const dragOffset = ref(0)
  const transitionEnabled = ref(false)
  const isDragging = ref(false)
  const isAnimating = ref(false)

  let pointerId: number | null = null
  let startX = 0
  let startY = 0
  let startTime = 0
  let direction: DirectionLock = 'pending'
  let suppressNextClick = false
  let animationTimer: ReturnType<typeof setTimeout> | undefined
  let clickResetTimer: ReturnType<typeof setTimeout> | undefined

  const trackStyle = computed(() => ({
    transform: `translate3d(calc(${-activeIndex.value * 100}% + ${dragOffset.value}px), 0, 0)`,
    transitionDuration: transitionEnabled.value ? `${ANIMATION_DURATION}ms` : '0ms',
  }))

  const isExcludedTarget = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return true

    return Boolean(
      target.closest(
        '[data-swipe-exclude], button, a, input, textarea, select, [contenteditable=""], [contenteditable="true"]',
      ),
    )
  }

  const clearAnimationTimer = () => {
    if (animationTimer !== undefined) {
      clearTimeout(animationTimer)
      animationTimer = undefined
    }
  }

  const resetGesture = () => {
    pointerId = null
    direction = 'pending'
    isDragging.value = false
  }

  const applyBoundaryResistance = (deltaX: number, width: number) => {
    const beyondStart = activeIndex.value === 0 && deltaX > 0
    const beyondEnd = activeIndex.value === tabCount - 1 && deltaX < 0

    if (!beyondStart && !beyondEnd) return deltaX

    return Math.sign(deltaX) * Math.min(Math.abs(deltaX) * 0.28, width * 0.12)
  }

  const onPointerDown = (event: PointerEvent) => {
    if (
      pointerId !== null ||
      isAnimating.value ||
      blocked.value ||
      !event.isPrimary ||
      (event.pointerType === 'mouse' && event.button !== 0) ||
      isExcludedTarget(event.target)
    ) {
      return
    }

    pointerId = event.pointerId
    startX = event.clientX
    startY = event.clientY
    startTime = performance.now()
    direction = 'pending'
    dragOffset.value = 0
    transitionEnabled.value = false
    suppressNextClick = false
  }

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerId !== pointerId || blocked.value) return

    const deltaX = event.clientX - startX
    const deltaY = event.clientY - startY
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    if (direction === 'pending' && Math.max(absX, absY) >= DIRECTION_THRESHOLD) {
      if (absX > absY * DIRECTION_RATIO) {
        direction = 'horizontal'
        isDragging.value = true
        suppressNextClick = true
        viewport.value?.setPointerCapture(event.pointerId)
      } else if (absY > absX * DIRECTION_RATIO) {
        direction = 'vertical'
      }
    }

    if (direction !== 'horizontal') return

    event.preventDefault()
    const width = viewport.value?.clientWidth ?? 1
    dragOffset.value = applyBoundaryResistance(deltaX, width)
  }

  const finishGesture = (event: PointerEvent, cancelled = false) => {
    if (event.pointerId !== pointerId) return

    if (viewport.value?.hasPointerCapture(event.pointerId)) {
      viewport.value.releasePointerCapture(event.pointerId)
    }

    const deltaX = event.clientX - startX
    const elapsed = Math.max(performance.now() - startTime, 1)
    const width = viewport.value?.clientWidth ?? 1
    const distancePassed = Math.abs(deltaX) >= width * DISTANCE_RATIO
    const velocityPassed = Math.abs(deltaX) >= FLING_MIN_DISTANCE && Math.abs(deltaX) / elapsed >= FLING_MIN_VELOCITY
    const requestedIndex = activeIndex.value + (deltaX < 0 ? 1 : -1)
    const canSwitch = requestedIndex >= 0 && requestedIndex < tabCount
    const shouldSwitch = !cancelled && direction === 'horizontal' && canSwitch && (distancePassed || velocityPassed)

    transitionEnabled.value = true
    isAnimating.value = true
    dragOffset.value = 0

    if (shouldSwitch) {
      activeIndex.value = requestedIndex
    }

    resetGesture()
    clearAnimationTimer()
    animationTimer = setTimeout(() => {
      isAnimating.value = false
      transitionEnabled.value = false
      animationTimer = undefined
      if (shouldSwitch) onCommit(requestedIndex)
    }, ANIMATION_DURATION)

    if (suppressNextClick) {
      if (clickResetTimer !== undefined) clearTimeout(clickResetTimer)
      clickResetTimer = setTimeout(() => {
        suppressNextClick = false
        clickResetTimer = undefined
      }, 0)
    }
  }

  const onPointerUp = (event: PointerEvent) => finishGesture(event)
  const onPointerCancel = (event: PointerEvent) => finishGesture(event, true)

  const onClickCapture = (event: MouseEvent) => {
    if (!suppressNextClick) return

    event.preventDefault()
    event.stopPropagation()
    suppressNextClick = false
  }

  const syncToIndex = (index: number, animate: boolean) => {
    clearAnimationTimer()
    isAnimating.value = false
    dragOffset.value = 0
    transitionEnabled.value = animate
    activeIndex.value = index

    if (animate) {
      isAnimating.value = true
      animationTimer = setTimeout(() => {
        isAnimating.value = false
        transitionEnabled.value = false
        animationTimer = undefined
      }, ANIMATION_DURATION)
    }
  }

  onBeforeUnmount(() => {
    clearAnimationTimer()
    if (clickResetTimer !== undefined) clearTimeout(clickResetTimer)
  })

  return {
    viewport,
    trackStyle,
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onClickCapture,
    syncToIndex,
  }
}
