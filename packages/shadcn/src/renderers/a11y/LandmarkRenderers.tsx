/**
 * @extension a2ui-shadcn-ui
 * Semantic HTML Landmark Renderers
 * These components provide proper page structure for screen reader navigation.
 */

import type {
  ArticleComponent,
  AsideComponent,
  FooterComponent,
  HeaderComponent,
  MainComponent,
  NavComponent,
  SectionComponent,
} from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import type { ReactNode } from 'react'

export const MainRenderer: A2UIRenderer<MainComponent> = {
  type: 'Main',
  render: ({ children, id }: RendererProps<MainComponent>) => {
    return (
      <main id={id} className="flex-1">
        {children as ReactNode}
      </main>
    )
  },
  example: {
    name: 'Main',
    description: 'Main content landmark for page structure',
    category: 'a11y',
    messages: [
      { createSurface: { surfaceId: 'main-example', root: 'main-1' } },
      {
        updateComponents: {
          surfaceId: 'main-example',
          components: [
            { id: 'main-1', component: { type: 'Main', id: 'main-1', children: ['content'] } },
            { id: 'content', component: { type: 'Text', id: 'content', content: 'Main content area', style: 'body' } },
          ],
        },
      },
    ],
  },
}

export const NavRenderer: A2UIRenderer<NavComponent> = {
  type: 'Nav',
  render: ({ component, children, id }: RendererProps<NavComponent>) => {
    return (
      <nav id={id} aria-label={component.label}>
        {children as ReactNode}
      </nav>
    )
  },
  example: {
    name: 'Nav',
    description: 'Navigation landmark for navigation links',
    category: 'a11y',
    messages: [
      { createSurface: { surfaceId: 'nav-example', root: 'nav-1' } },
      {
        updateComponents: {
          surfaceId: 'nav-example',
          components: [
            { id: 'nav-1', component: { type: 'Nav', id: 'nav-1', label: 'Main navigation', children: ['link-text'] } },
            { id: 'link-text', component: { type: 'Text', id: 'link-text', content: 'Navigation items here' } },
          ],
        },
      },
    ],
  },
}

export const SectionRenderer: A2UIRenderer<SectionComponent> = {
  type: 'Section',
  render: ({ component, children, id }: RendererProps<SectionComponent>) => {
    return (
      <section id={id} aria-label={component.label}>
        {children as ReactNode}
      </section>
    )
  },
  example: {
    name: 'Section',
    description: 'Section landmark for thematic content grouping',
    category: 'a11y',
    messages: [
      { createSurface: { surfaceId: 'section-example', root: 'section-1' } },
      {
        updateComponents: {
          surfaceId: 'section-example',
          components: [
            { id: 'section-1', component: { type: 'Section', id: 'section-1', label: 'Features', children: ['content'] } },
            { id: 'content', component: { type: 'Text', id: 'content', content: 'Section content' } },
          ],
        },
      },
    ],
  },
}

export const AsideRenderer: A2UIRenderer<AsideComponent> = {
  type: 'Aside',
  render: ({ component, children, id }: RendererProps<AsideComponent>) => {
    return (
      <aside id={id} aria-label={component.label}>
        {children as ReactNode}
      </aside>
    )
  },
  example: {
    name: 'Aside',
    description: 'Aside landmark for tangentially related content',
    category: 'a11y',
    messages: [
      { createSurface: { surfaceId: 'aside-example', root: 'aside-1' } },
      {
        updateComponents: {
          surfaceId: 'aside-example',
          components: [
            { id: 'aside-1', component: { type: 'Aside', id: 'aside-1', label: 'Related links', children: ['content'] } },
            { id: 'content', component: { type: 'Text', id: 'content', content: 'Sidebar content' } },
          ],
        },
      },
    ],
  },
}

export const HeaderRenderer: A2UIRenderer<HeaderComponent> = {
  type: 'Header',
  render: ({ children, id }: RendererProps<HeaderComponent>) => {
    return (
      <header id={id}>
        {children as ReactNode}
      </header>
    )
  },
  example: {
    name: 'Header',
    description: 'Header landmark for introductory content',
    category: 'a11y',
    messages: [
      { createSurface: { surfaceId: 'header-example', root: 'header-1' } },
      {
        updateComponents: {
          surfaceId: 'header-example',
          components: [
            { id: 'header-1', component: { type: 'Header', id: 'header-1', children: ['title'] } },
            { id: 'title', component: { type: 'Text', id: 'title', content: 'Page Title', style: 'h1' } },
          ],
        },
      },
    ],
  },
}

export const FooterRenderer: A2UIRenderer<FooterComponent> = {
  type: 'Footer',
  render: ({ children, id }: RendererProps<FooterComponent>) => {
    return (
      <footer id={id}>
        {children as ReactNode}
      </footer>
    )
  },
  example: {
    name: 'Footer',
    description: 'Footer landmark for footer content',
    category: 'a11y',
    messages: [
      { createSurface: { surfaceId: 'footer-example', root: 'footer-1' } },
      {
        updateComponents: {
          surfaceId: 'footer-example',
          components: [
            { id: 'footer-1', component: { type: 'Footer', id: 'footer-1', children: ['copyright'] } },
            { id: 'copyright', component: { type: 'Text', id: 'copyright', content: '© 2024 Company', style: 'caption' } },
          ],
        },
      },
    ],
  },
}

export const ArticleRenderer: A2UIRenderer<ArticleComponent> = {
  type: 'Article',
  render: ({ children, id }: RendererProps<ArticleComponent>) => {
    return (
      <article id={id}>
        {children as ReactNode}
      </article>
    )
  },
  example: {
    name: 'Article',
    description: 'Article element for self-contained content',
    category: 'a11y',
    messages: [
      { createSurface: { surfaceId: 'article-example', root: 'article-1' } },
      {
        updateComponents: {
          surfaceId: 'article-example',
          components: [
            { id: 'article-1', component: { type: 'Article', id: 'article-1', children: ['title', 'body'] } },
            { id: 'title', component: { type: 'Text', id: 'title', content: 'Article Title', style: 'h2' } },
            { id: 'body', component: { type: 'Text', id: 'body', content: 'Article content...' } },
          ],
        },
      },
    ],
  },
}
