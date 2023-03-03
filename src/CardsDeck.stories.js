import CardsDeck from './CardsDeck.vue'
import FlipCard from './FlipCard.vue'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Deck/Cards Deck',
  component: { CardsDeck, FlipCard },
};

const flip = action("flip")

const Template = (args) => ({
  components: { CardsDeck, FlipCard },
  methods: {
    flip(data) { flip(data); data.card.flipped = !data.card.flipped },
    computeStyle(card) {
      return `transform: translateX(${card.x}px)` +
      `           translateY(${card.y}px)` +
      `           translateZ(${card.z}px)` +
      `           rotateX(${card.x}deg)` +
      `           rotateY(${card.y}deg)` +
      `           rotateZ(${card.z}deg);` +
      `transition: .25s linear;`+
      `z-index: ${10 - card.index}`
    }
  },
  setup() {
    const cardsToShow = [
      { id: "0", index: 0, px: 0, py: 0, rx: 0, ry: 0, rz: 0, flipped: false },
      { id: "1", index: 1, px: 0, py: 0, rx: 0, ry: 0, rz: 0, flipped: false },
      { id: "2", index: 2, px: 0, py: 0, rx: 0, ry: 0, rz: 0, flipped: false },
    ]
    return { args, cardsToShow };
  },
  template: `
  <div style="width:200px;height:400px;background-color:gray">
    <CardsDeck
      :cards="cardsToShow"
      :compute-style="computeStyle"
      class="deck"
      card-class="card1"
      v-slot="data"
    >
      <FlipCard @click="() => flip(data)" card-class="padding" side-class="side" :showOverlay="false" :flipped="data.card.flipped">
        <template #front>FRONT {{data.card.flipped}}</template>
        <template #back>BACK</template>
      </FlipCard>
    </CardsDeck>
    </div>
    `
});

export const Default = Template.bind({});
Default.args = {};
