import FlipCard from './FlipCard.vue'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Deck/Flip Card',
  component: FlipCard,
  argTypes: {
    flipped: {
      control: { type: 'boolean' }
    },
  },
};

const flip = action("flip")

const Template = (args) => ({
  components: { FlipCard },
  methods: {
    flip(data) { flip(data); args.flipped = !args.flipped }
  },
  setup() {
    return { args };
  },
  template: `
    <div style="width:200px;height:400px">
    <FlipCard v-bind="args" @click="flip" class="card">
      <template #front><div style="background-color:lightblue;height:100%">FRONT</div></template>
      <template #back><div style="background-color:lightgreen;height:100%">BACK</div></template>
    </FlipCard>
    </div>`,
});

export const Default = Template.bind({});
Default.args = {
  flipped: false
};
