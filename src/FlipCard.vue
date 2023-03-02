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
import { computed, defineProps, toRefs, defineEmits } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
    flipped: boolean
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { flipped } = toRefs(props)
const flipAngle = computed(() => flipped.value ? 180 : 0)
</script>

<style scoped lang="scss">
$flipAngleFront: calc(v-bind(flipAngle) * 1deg);
$flipAngleBack: calc(v-bind(flipAngle) * 1deg - 180deg);

.card {
    width: 100%;
    height: 100%;
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
