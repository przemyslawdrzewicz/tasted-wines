import WineIcon from '@/components/icons/WineIcon'
import styles from './Logo.module.css'

export default function Logo() {
  return (
    <div className="flex">
      <WineIcon />
      <div className={`${styles.title} ml-3`}>tasted wines</div>
    </div>
  )
}
