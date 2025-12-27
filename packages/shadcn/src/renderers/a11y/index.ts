/**
 * @extension a2ui-react-shadcn
 * Accessibility Extension Renderers
 *
 * These components extend the A2UI protocol for enhanced accessibility.
 * They are NOT part of the official A2UI standard but are recommended
 * for WCAG 2.1 AA compliance.
 */

// Alert & Live Region Components
export { AlertRenderer } from './AlertRenderer.js'
// Landmark Components
export {
  ArticleRenderer,
  AsideRenderer,
  FooterRenderer,
  HeaderRenderer,
  MainRenderer,
  NavRenderer,
  SectionRenderer,
} from './LandmarkRenderers.js'
export { LiveRegionRenderer } from './LiveRegionRenderer.js'
export { ProgressRenderer } from './ProgressRenderer.js'
// Navigation & Progress Components
export { SkipLinkRenderer } from './SkipLinkRenderer.js'
