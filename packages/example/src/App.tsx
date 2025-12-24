import { A2UIProvider } from '@a2ui/react'
import { shadcnRenderers } from '@a2ui/shadcn'
import { Simulator } from './components/Simulator'

export function App() {
  return (
    <A2UIProvider renderers={shadcnRenderers}>
      <Simulator />
    </A2UIProvider>
  )
}
