import styles from './SubHeader.module.css'

interface SubHeaderProps {
  title: string
}

export default function SubHeader({ title }: SubHeaderProps) {
  return <h2 className={`${styles.subHeader} py-3 text-center`}>{title}</h2>
}
