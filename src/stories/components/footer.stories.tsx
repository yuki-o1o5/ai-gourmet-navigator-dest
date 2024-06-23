import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from '@/components/footer'

const meta = {
  title: 'Components/Footer',
  component: Footer,
} satisfies Meta<typeof Footer>

export default meta

type Story = StoryObj<typeof meta>

export const FooterComponent: Story = {}
