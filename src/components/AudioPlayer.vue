<template>
    <audio ref="audioRef" :src="uri" :loop="loop" />
</template>


<script lang="ts" setup>
import { useMediaControls, syncRef } from '@vueuse/core'
import { ref, toRefs, watch, withDefaults, defineEmits } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

export interface Props {
    uri?: string,
    playing?: boolean,
    title?: string,
    artist?: string,
    album?: string,
    loop?: boolean
}

export interface PlayingStatus {
    playing: boolean,
    duration: number,
    time: number
}

export interface Emits {
    (event: 'status', status: PlayingStatus): void,
}

const props = withDefaults(defineProps<Props>(), {
    uri: '', playing: false, title: '', artist: '', album: '', loop: false
})

const emit = defineEmits<Emits>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const audioRef = ref()
const { uri, title, artist, loop, album, playing } = toRefs(props)
const player = useMediaControls(audioRef)

// If the audio file changes, stop the player
watch(uri, () => { player.playing.value = false })
watch([player.playing, player.currentTime], () => onPlayingStatusChanged())

// If the title or artist changes, update the media session
// TODO: artwork is not working on iOS for some reason
//       https://github.com/akdasa-studios/shlokas/issues/174
watch([title, artist], () => {
    if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: title.value,
            artist: artist.value,
            album: album.value
        })
    }
})

syncRef(playing, player.playing, { direction: 'ltr' })

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onPlayingStatusChanged() {
    emit('status', {
        playing: player.playing.value,
        duration: player.duration.value,
        time: player.currentTime.value,
    })
}
</script>
