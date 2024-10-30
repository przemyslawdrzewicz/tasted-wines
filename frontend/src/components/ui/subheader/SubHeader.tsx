import styles from './SubHeader.module.css'

interface HeaderProps {
  title: string
}

export default function SubHeader({ title }: HeaderProps) {
  return <h1 className={styles.subHeader}>{title}</h1>
}
