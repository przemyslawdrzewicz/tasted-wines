import styles from './Button.module.css'

type Variant = 'text' | 'fab'

interface ButtonProps {
  children: React.ReactNode
  variant?: Variant
}

export default function Button({ children, variant = 'text' }: ButtonProps) {
  const variantClass = () => {
    switch (variant) {
      case 'text':
        return styles.buttonText
      case 'fab':
        return styles.buttonFab
      default:
        return styles.buttonText
    }
  }

  return (
    <button className={`${styles.button} ${variantClass()}`}>{children}</button>
  )
}
