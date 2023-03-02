import DarkImage from './DarkImage.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Core/DarkImage',
  component: DarkImage,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    mode: {
      options: ['grayscale', 'invert']
    }
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { DarkImage },
  setup() {
    return { args };
  },
  template: '<DarkImage v-bind="args" />',
});

export const Normal = Template.bind({});
Normal.args = {
  src: 'http://via.placeholder.com/640x360',
};

export const DarkInvert = Template.bind({});
DarkInvert.args = {
  mode: 'invert',
  src: 'https://placekitten.com/640/360',
  isDark: true,
};

export const DarkGrayscale = Template.bind({});
DarkGrayscale.args = {
  mode: 'grayscale',
  src: 'https://placekitten.com/640/360',
  isDark: true,
};
