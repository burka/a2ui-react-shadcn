import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CardRenderer } from '../renderers/container/CardRenderer'
import { ModalRenderer } from '../renderers/container/ModalRenderer'
import { ButtonRenderer } from '../renderers/interactive/ButtonRenderer'
import { CheckboxRenderer } from '../renderers/interactive/CheckboxRenderer'
import { SelectRenderer } from '../renderers/interactive/SelectRenderer'
import { SliderRenderer } from '../renderers/interactive/SliderRenderer'
import { TextFieldRenderer } from '../renderers/interactive/TextFieldRenderer'

describe('Component Renderers', () => {
  describe('ButtonRenderer', () => {
    it('should render button with text child', () => {
      const component = { type: 'Button' as const, id: 'btn-1', child: 'text-1' }
      const data = { get: vi.fn(), set: vi.fn() }
      const onAction = vi.fn()
      const children = [<span key="text-1">Click me</span>]

      render(
        <ButtonRenderer.render
          id="btn-1"
          component={component}
          data={data}
          onAction={onAction}
          children={children}
        />,
      )

      expect(screen.getByRole('button')).toBeInTheDocument()
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('should render primary button variant', () => {
      const component = {
        type: 'Button' as const,
        id: 'btn-primary',
        child: 'text-1',
        primary: true,
      }
      const data = { get: vi.fn(), set: vi.fn() }
      const onAction = vi.fn()
      const children = [<span key="text-1">Primary</span>]

      render(
        <ButtonRenderer.render
          id="btn-primary"
          component={component}
          data={data}
          onAction={onAction}
          children={children}
        />,
      )

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('bg-primary')
    })

    it('should render outline button variant when not primary', () => {
      const component = {
        type: 'Button' as const,
        id: 'btn-outline',
        child: 'text-1',
        primary: false,
      }
      const data = { get: vi.fn(), set: vi.fn() }
      const onAction = vi.fn()
      const children = [<span key="text-1">Outline</span>]

      render(
        <ButtonRenderer.render
          id="btn-outline"
          component={component}
          data={data}
          onAction={onAction}
          children={children}
        />,
      )

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      // Check for outline variant by checking it doesn't have primary background
      expect(button.className).toContain('border')
      expect(button.className).not.toContain('bg-primary')
    })

    it('should call onAction when clicked with action', () => {
      const component = {
        type: 'Button' as const,
        id: 'btn-2',
        action: 'submit',
        child: 'text-1',
      }
      const data = { get: vi.fn(), set: vi.fn() }
      const onAction = vi.fn()
      const children = [<span key="text-1">Submit</span>]

      render(
        <ButtonRenderer.render
          id="btn-2"
          component={component}
          data={data}
          onAction={onAction}
          children={children}
        />,
      )

      fireEvent.click(screen.getByRole('button'))
      expect(onAction).toHaveBeenCalledWith({ type: 'submit', payload: undefined })
    })

    it('should not call onAction when clicked without action', () => {
      const component = { type: 'Button' as const, id: 'btn-3', child: 'text-1' }
      const data = { get: vi.fn(), set: vi.fn() }
      const onAction = vi.fn()
      const children = [<span key="text-1">No Action</span>]

      render(
        <ButtonRenderer.render
          id="btn-3"
          component={component}
          data={data}
          onAction={onAction}
          children={children}
        />,
      )

      fireEvent.click(screen.getByRole('button'))
      expect(onAction).not.toHaveBeenCalled()
    })
  })

  describe('TextFieldRenderer', () => {
    it('should render text input with label', () => {
      const component = {
        type: 'TextField' as const,
        id: 'tf-1',
        label: 'Username',
        dataPath: 'form.username',
      }
      const data = { get: vi.fn(() => ''), set: vi.fn() }
      const onAction = vi.fn()

      render(
        <TextFieldRenderer.render
          id="tf-1"
          component={component}
          data={data}
          onAction={onAction}
        />,
      )

      expect(screen.getByLabelText('Username')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('should render with initial value from data.get', () => {
      const component = {
        type: 'TextField' as const,
        id: 'tf-2',
        label: 'Name',
        dataPath: 'form.name',
      }
      const data = { get: vi.fn(() => 'John Doe'), set: vi.fn() }
      const onAction = vi.fn()

      render(
        <TextFieldRenderer.render
          id="tf-2"
          component={component}
          data={data}
          onAction={onAction}
        />,
      )

      expect(screen.getByRole('textbox')).toHaveValue('John Doe')
    })

    it('should call data.set when value changes', () => {
      const component = {
        type: 'TextField' as const,
        id: 'tf-3',
        label: 'Email',
        dataPath: 'form.email',
      }
      const data = { get: vi.fn(() => ''), set: vi.fn() }
      const onAction = vi.fn()

      render(
        <TextFieldRenderer.render
          id="tf-3"
          component={component}
          data={data}
          onAction={onAction}
        />,
      )

      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'test@example.com' } })

      expect(data.set).toHaveBeenCalledWith('form.email', 'test@example.com')
    })

    it('should render as textarea for longText type', () => {
      const component = {
        type: 'TextField' as const,
        id: 'tf-4',
        label: 'Description',
        inputType: 'longText' as const,
        dataPath: 'form.description',
      }
      const data = { get: vi.fn(() => ''), set: vi.fn() }
      const onAction = vi.fn()

      render(
        <TextFieldRenderer.render
          id="tf-4"
          component={component}
          data={data}
          onAction={onAction}
        />,
      )

      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA')
    })

    it('should render password input for obscured type', () => {
      const component = {
        type: 'TextField' as const,
        id: 'tf-5',
        label: 'Password',
        inputType: 'obscured' as const,
        dataPath: 'form.password',
      }
      const data = { get: vi.fn(() => ''), set: vi.fn() }
      const onAction = vi.fn()

      render(
        <TextFieldRenderer.render
          id="tf-5"
          component={component}
          data={data}
          onAction={onAction}
        />,
      )

      const input = screen.getByLabelText('Password') as HTMLInputElement
      expect(input.type).toBe('password')
    })

    it('should render number input for number type', () => {
      const component = {
        type: 'TextField' as const,
        id: 'tf-6',
        label: 'Age',
        inputType: 'number' as const,
        dataPath: 'form.age',
      }
      const data = { get: vi.fn(() => ''), set: vi.fn() }
      const onAction = vi.fn()

      render(
        <TextFieldRenderer.render
          id="tf-6"
          component={component}
          data={data}
          onAction={onAction}
        />,
      )

      const input = screen.getByLabelText('Age') as HTMLInputElement
      expect(input.type).toBe('number')
    })
  })

  describe('CheckboxRenderer', () => {
    it('should render checkbox with label', () => {
      const component = {
        type: 'Checkbox' as const,
        id: 'cb-1',
        label: 'Accept terms',
        dataPath: 'form.terms',
      }
      const data = { get: vi.fn(() => false), set: vi.fn() }
      const onAction = vi.fn()

      render(
        <CheckboxRenderer.render id="cb-1" component={component} data={data} onAction={onAction} />,
      )

      expect(screen.getByRole('checkbox')).toBeInTheDocument()
      expect(screen.getByText('Accept terms')).toBeInTheDocument()
    })

    it('should render checked state from data.get', () => {
      const component = {
        type: 'Checkbox' as const,
        id: 'cb-2',
        label: 'Subscribe',
        dataPath: 'form.subscribe',
      }
      const data = { get: vi.fn(() => true), set: vi.fn() }
      const onAction = vi.fn()

      render(
        <CheckboxRenderer.render id="cb-2" component={component} data={data} onAction={onAction} />,
      )

      expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('should call data.set when toggled', () => {
      const component = {
        type: 'Checkbox' as const,
        id: 'cb-3',
        label: 'Notifications',
        dataPath: 'form.notifications',
      }
      const data = { get: vi.fn(() => false), set: vi.fn() }
      const onAction = vi.fn()

      render(
        <CheckboxRenderer.render id="cb-3" component={component} data={data} onAction={onAction} />,
      )

      const checkbox = screen.getByRole('checkbox')
      fireEvent.click(checkbox)

      expect(data.set).toHaveBeenCalledWith('form.notifications', true)
    })
  })

  describe('SelectRenderer', () => {
    it('should render select with placeholder', () => {
      const component = {
        type: 'Select' as const,
        id: 'select-1',
        placeholder: 'Choose an option',
        options: [
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
        ],
        dataPath: 'form.option',
      }
      const data = { get: vi.fn(() => ''), set: vi.fn() }
      const onAction = vi.fn()

      render(
        <SelectRenderer.render
          id="select-1"
          component={component}
          data={data}
          onAction={onAction}
        />,
      )

      expect(screen.getByText('Choose an option')).toBeInTheDocument()
    })

    it('should render all options when opened', () => {
      const component = {
        type: 'Select' as const,
        id: 'select-2',
        placeholder: 'Select country',
        options: [
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'de', label: 'Germany' },
        ],
        dataPath: 'form.country',
      }
      const data = { get: vi.fn(() => ''), set: vi.fn() }
      const onAction = vi.fn()

      render(
        <SelectRenderer.render
          id="select-2"
          component={component}
          data={data}
          onAction={onAction}
        />,
      )

      // Click to open select
      const trigger = screen.getByRole('combobox')
      fireEvent.click(trigger)

      // Check if options are rendered
      expect(screen.getByText('United States')).toBeInTheDocument()
      expect(screen.getByText('United Kingdom')).toBeInTheDocument()
      expect(screen.getByText('Germany')).toBeInTheDocument()
    })

    it('should show selected value from data.get', () => {
      const component = {
        type: 'Select' as const,
        id: 'select-3',
        placeholder: 'Select country',
        options: [
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
        ],
        dataPath: 'form.country',
      }
      const data = { get: vi.fn(() => 'uk'), set: vi.fn() }
      const onAction = vi.fn()

      render(
        <SelectRenderer.render
          id="select-3"
          component={component}
          data={data}
          onAction={onAction}
        />,
      )

      expect(screen.getByText('United Kingdom')).toBeInTheDocument()
    })
  })

  describe('SliderRenderer', () => {
    it('should render slider with default value', () => {
      const component = {
        type: 'Slider' as const,
        id: 'slider-1',
        min: 0,
        max: 100,
        step: 1,
        dataPath: 'form.volume',
      }
      const data = { get: vi.fn(() => 50), set: vi.fn() }
      const onAction = vi.fn()

      render(
        <SliderRenderer.render
          id="slider-1"
          component={component}
          data={data}
          onAction={onAction}
        />,
      )

      expect(screen.getByRole('slider')).toBeInTheDocument()
      expect(screen.getByText('50')).toBeInTheDocument()
    })

    it('should display value from data.get', () => {
      const component = {
        type: 'Slider' as const,
        id: 'slider-2',
        min: 0,
        max: 10,
        step: 0.5,
        dataPath: 'form.rating',
      }
      const data = { get: vi.fn(() => 7.5), set: vi.fn() }
      const onAction = vi.fn()

      render(
        <SliderRenderer.render
          id="slider-2"
          component={component}
          data={data}
          onAction={onAction}
        />,
      )

      expect(screen.getByText('7.5')).toBeInTheDocument()
    })

    it('should use min value when data is undefined', () => {
      const component = {
        type: 'Slider' as const,
        id: 'slider-3',
        min: 10,
        max: 100,
        step: 5,
        dataPath: 'form.value',
      }
      const data = { get: vi.fn(() => undefined), set: vi.fn() }
      const onAction = vi.fn()

      render(
        <SliderRenderer.render
          id="slider-3"
          component={component}
          data={data}
          onAction={onAction}
        />,
      )

      expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('should have correct min, max, and step attributes', () => {
      const component = {
        type: 'Slider' as const,
        id: 'slider-4',
        min: 20,
        max: 200,
        step: 10,
        dataPath: 'form.value',
      }
      const data = { get: vi.fn(() => 100), set: vi.fn() }
      const onAction = vi.fn()

      render(
        <SliderRenderer.render
          id="slider-4"
          component={component}
          data={data}
          onAction={onAction}
        />,
      )

      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuemin', '20')
      expect(slider).toHaveAttribute('aria-valuemax', '200')
    })
  })

  describe('CardRenderer', () => {
    it('should render card with children', () => {
      const component = {
        type: 'Card' as const,
        id: 'card-1',
        children: ['child-1'],
      }
      const data = { get: vi.fn(), set: vi.fn() }
      const onAction = vi.fn()
      const children = [<div key="child-1">Card Content</div>]

      render(
        <CardRenderer.render
          id="card-1"
          component={component}
          data={data}
          onAction={onAction}
          children={children}
        />,
      )

      expect(screen.getByText('Card Content')).toBeInTheDocument()
    })

    it('should render multiple children', () => {
      const component = {
        type: 'Card' as const,
        id: 'card-2',
        children: ['child-1', 'child-2', 'child-3'],
      }
      const data = { get: vi.fn(), set: vi.fn() }
      const onAction = vi.fn()
      const children = [
        <h3 key="child-1">Title</h3>,
        <p key="child-2">Description</p>,
        <button key="child-3">Action</button>,
      ]

      render(
        <CardRenderer.render
          id="card-2"
          component={component}
          data={data}
          onAction={onAction}
          children={children}
        />,
      )

      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
    })
  })

  describe('ModalRenderer', () => {
    it('should render modal trigger and content', () => {
      const component = {
        type: 'Modal' as const,
        id: 'modal-1',
        trigger: 'trigger-1',
        content: 'content-1',
      }
      const data = { get: vi.fn(), set: vi.fn() }
      const onAction = vi.fn()
      const children = [
        <button key="trigger-1">Open Modal</button>,
        <div key="content-1">Modal Content</div>,
      ]

      render(
        <ModalRenderer.render
          id="modal-1"
          component={component}
          data={data}
          onAction={onAction}
          children={children}
        />,
      )

      expect(screen.getByText('Open Modal')).toBeInTheDocument()
    })

    it('should show content when trigger is clicked', () => {
      const component = {
        type: 'Modal' as const,
        id: 'modal-2',
        trigger: 'trigger-1',
        content: 'content-1',
      }
      const data = { get: vi.fn(), set: vi.fn() }
      const onAction = vi.fn()
      const children = [
        <button key="trigger-1">Open</button>,
        <div key="content-1">Modal Body</div>,
      ]

      render(
        <ModalRenderer.render
          id="modal-2"
          component={component}
          data={data}
          onAction={onAction}
          children={children}
        />,
      )

      const trigger = screen.getByText('Open')
      fireEvent.click(trigger)

      expect(screen.getByText('Modal Body')).toBeInTheDocument()
    })

    it('should handle single child as trigger', () => {
      const component = {
        type: 'Modal' as const,
        id: 'modal-3',
        trigger: 'trigger-1',
        content: 'content-1',
      }
      const data = { get: vi.fn(), set: vi.fn() }
      const onAction = vi.fn()
      const children = <button key="trigger-1">Single Child</button>

      render(
        <ModalRenderer.render
          id="modal-3"
          component={component}
          data={data}
          onAction={onAction}
          children={children}
        />,
      )

      expect(screen.getByText('Single Child')).toBeInTheDocument()
    })
  })
})
