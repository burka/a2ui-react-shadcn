/**
 * @extension a2ui-shadcn-ui
 * Accessibility Extension Renderers
 *
 * These components extend the A2UI protocol for enhanced accessibility.
 * They are NOT part of the official A2UI standard but are recommended
 * for WCAG 2.1 AA compliance.
 */

// Landmark Components
export {
  MainRenderer,
  NavRenderer,
  SectionRenderer,
  AsideRenderer,
  HeaderRenderer,
  FooterRenderer,
  ArticleRenderer,
} from './LandmarkRenderers.js'

// Alert & Live Region Components
export { AlertRenderer } from './AlertRenderer.js'
export { LiveRegionRenderer } from './LiveRegionRenderer.js'

// Navigation & Progress Components
export { SkipLinkRenderer } from './SkipLinkRenderer.js'
export { ProgressRenderer } from './ProgressRenderer.js'
