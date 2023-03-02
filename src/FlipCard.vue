<template>
    <div class="card">
        <div class="face face--front" :class="$attrs.class">
            <slot name="front" />
        </div>

        <div class="face face--back" :class="$attrs.class">
            <slot name="back" />
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed, defineProps, toRefs, ref } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

export interface Props {
    flipped: boolean,
    margin?: string
}

const props = withDefaults(defineProps<Props>(), {
    margin: '0px'
})

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { flipped, margin } = toRefs(props)
const flipAngle = computed(() => flipped.value ? 180 : 0)
</script>

<style scoped lang="scss">
$flipAngleFront: calc(v-bind(flipAngle) * 1deg);
$flipAngleBack:  calc(v-bind(flipAngle) * 1deg - 180deg);
$margin:         v-bind(margin);

.card {
    width: calc(100% -  ($margin * 2));
    height: calc(100% - ($margin * 2));
    translate: $margin $margin;
    perspective: 900px;

    .face {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        transition: .5s ease-in-out;
        overflow: hidden;

        &--front {
            transform: rotateY($flipAngleFront);
        }

        &--back {
            transform: rotateY($flipAngleBack);
        }
    }
}
</style>
