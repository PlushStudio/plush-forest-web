import { ModalContent } from '@/types/ModalContent'

const modalData: ModalContent = {
  Confirmation: {
    step: '1',
    title: 'Verifying tree availability',
    timing: 'This should take about 15 sec.',
    content: "Peru is one of the 10 most biodiverse countries in the world. Over half of the country is covered with forests and species that are still being discovered. More than 330,000 people depend directly on the country's forests for their livelihoods, including 350 Indigenous and ethnic groups."
  },
  'Planting your tree': {
    step: '2',
    title: 'Minting your tree token',
    timing: 'This should take about 10 sec.',
    content: 'The Amazon deforestation and degradation is expected to reach critical levels by 2030. According to WWF, the Amazon is close to a tipping point past which it will no longer be able to sustain itself. This will result in significant impact on the well-being and health of our planet and our children.'
  }
}

export default modalData
