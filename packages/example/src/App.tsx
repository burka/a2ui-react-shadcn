import { A2UIProvider, allRenderers } from 'a2ui-shadcn-ui'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Simulator } from './components/Simulator'
import { ThemeProvider } from './context/ThemeContext'
import { HomePage } from './pages/HomePage'

export function App() {
  return (
    <ThemeProvider>
      <A2UIProvider renderers={allRenderers}>
        <BrowserRouter basename="/a2ui-shadcn-ui">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/simulator" element={<Simulator />} />
          </Routes>
        </BrowserRouter>
      </A2UIProvider>
    </ThemeProvider>
  )
}
