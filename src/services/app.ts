import { z } from 'zod'
import { toNotNullableString } from '@/services/api/transforms'

const ApiAppSchema = z.object({
  isOpenMenuDropdown: z.boolean(),
  selectedTreeType: z.nullable(z.string()).transform(toNotNullableString),
  currentNetwork: (z.string()).transform(toNotNullableString),
  userBalance: (z.number()),
  safeBalance: (z.number()),
  currency: z.string(),
  activeAccordionTabId: (z.number())
})

export type ApiApp = z.infer<typeof ApiAppSchema>
