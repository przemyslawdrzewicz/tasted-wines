import { useImperativeHandle, forwardRef, cloneElement, RefObject } from 'react'
import React from 'react'

interface FormRef {
  validate: () => void
}

interface FormProps {
  children: JSX.Element[]
}

const Form = forwardRef<FormRef, FormProps>(({ children }, ref) => {
  const createChildWithRef = (child: JSX.Element) => {
    const ref = child.type.displayName && React.createRef()
    return cloneElement(child, {
      ref,
    })
  }

  const childrenWithRefs = React.Children.map(children, createChildWithRef)

  const validateForm = () =>
    childrenWithRefs.every(
      ({ ref }) => !ref || !!(ref as RefObject<FormRef>).current?.validate()
    )

  useImperativeHandle(ref, () => ({
    validate() {
      return validateForm()
    },
  }))

  return <div>{childrenWithRefs}</div>
})

Form.displayName = 'Form'

export default Form
