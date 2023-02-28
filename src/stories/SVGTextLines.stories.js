import SVGTextLines from '../components/SVGTextLines.vue';

export default {
  title: 'Core/SVGTextLines',
  component: SVGTextLines,
  argTypes: {
    // mode: {
    //   options: ['grayscale', 'invert']
    // }
    // backgroundColor: { control: 'color' },
    // onClick: {},
    // size: {
    //   control: { type: 'select' },
    //   options: ['small', 'medium', 'large'],
    // },
  },
};

const Template = (args) => ({
  components: { SVGTextLines },
  setup() {
    return { args };
  },
  template: '<SVGTextLines v-bind="args" />',
});

export const Normal = Template.bind({});
Normal.args = {
  lines: [
    "dhṛtarāṣṭra uvāca",
    "dharma-kṣetre kuru-kṣetre",
    "samavetā yuyutsavaḥ",
    "māmakāḥ pāṇḍavāś caiva",
    "kim akurvata sañjaya"
  ],
};

export const MarginAndLineHeight = Template.bind({});
MarginAndLineHeight.args = {
  lines: [
    "dhṛtarāṣṭra uvāca",
    "dharma-kṣetre kuru-kṣetre",
    "samavetā yuyutsavaḥ",
    "māmakāḥ pāṇḍavāś caiva",
    "kim akurvata sañjaya"
  ],
  margin: 75,
  lineHeight: 15
};

export const OneLine = Template.bind({});
OneLine.args = {
  lines: [ "dhṛtarāṣṭra uvāca" ],
};