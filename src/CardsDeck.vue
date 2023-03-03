<template>
    <div>
      <div
        v-for="item in cards"
        :key="item.id"
        :class="cardClass"
        :style="props.computeStyle(item)"
        @touchstart="$event => onEvent($event, 'start', item)"
        @touchmove="$event => onEvent($event, 'moving', item)"
        @touchend="$event => onEvent($event, 'moved', item)"
        @mousedown="$event => onEvent($event, 'start', item)"
        @mousemove="$event => onEvent($event, 'moving', item)"
        @mouseup="$event => onEvent($event, 'moved', item)"
      >
        <slot :card="item" />
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { useArrayFind, useArrayMap } from '@vueuse/core'
  import { watch, defineEmits, defineProps, toRefs } from 'vue'


  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  export interface Card {
    /** Unique Id of a card */
    id: string

    /** Index of a card in the deck: 0 is the top card */
    index: number
  }

  const props = defineProps<{
    /** List of cards to be displayed */
    cards: Card[],

    /**
     * Computes style for a card and applies it
     * @param card Card to calculate style for
     */
    computeStyle: (card: Card) => string,

    /** Class to be applied to the card */
    cardClass?: string,
  }>()

  const emit = defineEmits<{
    (e: 'place',  card: Card): void
    (e: 'moving', card: Card, start: Position, current: Position): void
    (e: 'moved',  card: Card, start: Position, current: Position): void
  }>()


  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const { cards, cardClass } = toRefs(props)
  const topCard = useArrayFind(props.cards, x => x.index === 0)
  const cardIds = useArrayMap(cards, x => x.id)
  let startPosition: [number, number] | undefined = undefined


  /* -------------------------------------------------------------------------- */
  /*                                    Watch                                   */
  /* -------------------------------------------------------------------------- */

  watch(topCard, () => { props.cards.forEach(x => emit('place', x)) })
  watch(cardIds, () => { props.cards.forEach(x => emit('place', x)) }, {immediate: true})


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  type InteractionEvent = TouchEvent | MouseEvent
  type ActionType = 'start' | 'moving' | 'moved'
  type Position = [number, number]


  function getPosition(event: InteractionEvent): Position {
    if (event instanceof TouchEvent) {
      const touch = event.touches[0] || event.changedTouches[0]
      return [touch.pageX, touch.pageY]
    } else if (event instanceof MouseEvent) {
      return [event.clientX, event.clientY]
    }
    return [0, 0]
  }


  function onEvent(
    event: InteractionEvent,
    type: ActionType,
    card: Card,
  ) {
    const currentPosition = getPosition(event)

    if (type === 'start') {
      startPosition = getPosition(event)
    } else if (startPosition) {
      emit(type as any, card, startPosition, currentPosition)
      if (type === 'moved') { startPosition = undefined }
    }
  }
  </script>
