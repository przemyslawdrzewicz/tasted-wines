import styles from './Input.module.css'
import { useState, useImperativeHandle, forwardRef } from 'react'
import { ValidationRule } from '@/interfaces/validation'
import { validateRules } from '@/utils/validation/global'

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>

interface InputRef {
  validate: () => boolean
}

interface InputProps {
  label: string
  rules?: ValidationRule[]
  value: string
  onChange: (value: string) => void
}

const Input = forwardRef<InputRef, InputProps>(
  ({ label, rules = [], value, onChange }, ref) => {
    const [errors, setErrors] = useState<string[]>([])

    const validateInput = (inputValue: string) => {
      const errorMessages = validateRules(rules, inputValue)
      setErrors(errorMessages)
      return !errorMessages.length
    }

    const onInputChange = (event: InputChangeEvent) => {
      const newValue = event.target.value
      onChange(newValue)
      validateInput(newValue)
    }

    const errorInputClass = errors.length ? 'errorBorder' : ''

    useImperativeHandle(ref, () => ({
      validate: () => validateInput(value),
    }))

    return (
      <div className="my-10">
        <div className={styles.formGroup}>
          <input
            className={`${styles.input} ${errorInputClass}`}
            placeholder=" "
            value={value}
            onChange={onInputChange}
          />
          <label className={styles.label}>{label}</label>
        </div>
        <div className="error">{errors[0]}</div>
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
