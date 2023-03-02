import AudioPlayer from './AudioPlayer.vue'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Media/Audio Player',
  component: AudioPlayer,
  argTypes: {
    uri: {
      control: { type: 'text' }
    },
    playing: {
      control: { type: 'boolean' }
    },
  },
};

const status = action("status")

const Template = (args) => ({
  components: { AudioPlayer },
  methods: {
    onStatusChanged(data) { status(data) }
  },
  setup() {
    return { args };
  },
  template: '<AudioPlayer v-bind="args" @status="onStatusChanged" />',
});

export const Default = Template.bind({});
Default.args = {
  uri: 'https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Diablo_Swing_Orchestra_-_01_-_Heroines.mp3',
  playing: false,
  title: 'Title',
  album: 'Album',
  artist: 'Artist',
  loop: false
};

