import DarkImage from '../components/DarkImage.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Core/DarkImage',
  component: DarkImage,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    mode: {
      options: ['grayscale', 'invert']
    }
    // backgroundColor: { control: 'color' },
    // onClick: {},
    // size: {
    //   control: { type: 'select' },
    //   options: ['small', 'medium', 'large'],
    // },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { DarkImage },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<DarkImage v-bind="args" />',
});

export const Normal = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
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

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
