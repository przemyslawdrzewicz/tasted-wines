import Image from 'next/image'
import styles from './Card.module.css'

interface CardProps {
  name: string
  year: string
  grape: string
  image: string
}

export default function Card({ name, year, grape, image }: CardProps) {
  return (
    <div className={styles.card}>
      <Image
        className={styles.image}
        src={image}
        alt={name}
        width="109"
        height="264"
      />
      <div className={styles.name}>{name}</div>
      <div className={styles.year}>{year}</div>
      <div className={styles.grape}>{grape}</div>
    </div>
  )
}
