import styles from './Button.module.css'
import { useRouter } from 'next/router'

type Variant = 'text' | 'fab' | 'normal' | 'outlined'

interface ButtonProps {
  children: React.ReactNode
  variant?: Variant
  color?: string
  to?: string
  onClick?: () => void
}

export default function Button({
  children,
  variant = 'text',
  color,
  to,
  onClick,
}: ButtonProps) {
  const router = useRouter()

  const variantClass = () => {
    switch (variant) {
      case 'text':
        return styles.buttonText
      case 'fab':
        return styles.buttonFab
      case 'normal':
        return styles.buttonNormal
      case 'outlined':
        return styles.buttonOutlined
      default:
        return styles.buttonText
    }
  }

  const customStyles = {
    background: color,
  }

  const onButtonClicked = () => {
    if (!to) {
      onClick()
      return
    }
    router.push(to)
  }

  return (
    <button
      className={`${styles.button} ${variantClass()}`}
      style={customStyles}
      onClick={onButtonClicked}
    >
      {children}
    </button>
  )
}
