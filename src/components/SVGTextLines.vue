<template>
    <svg ref="svg" width="100%" height="100%">
        <text
            v-for="line, idx in props.lines"
            :key="idx"
            :y="getYPos(idx)"
            :class="props.lineClass"
            x="50%"
            dominant-baseline="auto"
            text-anchor="middle"
        >
            {{ line }}
        </text>
    </svg>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, defineProps, ref, watch } from 'vue'

export interface Props {
    lines: string[]
    lineClass?: string,
    lineHeight?: number,
    margin?: number
}

const props = withDefaults(defineProps<Props>(), {
    lineHeight: 12,
    margin: 0
})

const svg = ref()

function getYPos(idx: number): number {
    return props.lineHeight * (idx+1) + props.margin / 2
}

function recalculateSize() {
    var bbox = svg.value.getBBox()
    const compensate = props.lineHeight / 2
    const width = bbox.width + props.margin
    const height = props.lineHeight * props.lines.length + props.margin + compensate
    svg.value.setAttribute('viewBox', `0 0 ${width} ${height}`)
    if (bbox.width === 0) { setTimeout(recalculateSize, 25) }
}

const stopWatch = watch(props, () => recalculateSize(), { deep: true })

onMounted(() => { recalculateSize() })
onUnmounted(() => { stopWatch() })
</script>
