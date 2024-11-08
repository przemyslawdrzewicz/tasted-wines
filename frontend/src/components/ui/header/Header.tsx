import styles from './Header.module.css'

interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return <h1 className={`${styles.header} py-3 text-center`}>{title}</h1>
}
