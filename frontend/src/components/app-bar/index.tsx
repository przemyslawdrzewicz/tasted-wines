import styles from './Appbar.module.css'
import Logo from '@/components/Logo'
import Hamburger from '@/components/app-bar/Hamburger'

export default function Appbar() {
  return (
    <div className={`${styles.appbar} flex justify-between items-center`}>
      <Logo />
      <Hamburger />
    </div>
  )
}
