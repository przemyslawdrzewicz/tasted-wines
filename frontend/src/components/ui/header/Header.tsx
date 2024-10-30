import styles from './Header.module.css'

interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return <h1 className={styles.header}>{title}</h1>
}
