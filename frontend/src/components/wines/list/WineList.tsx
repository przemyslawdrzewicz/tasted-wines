import { Wine } from '@/interfaces/wine'
import Card from '@/components/ui/card/Card'

interface WineListProps {
  wineList: Wine[]
}

const imageSrc = (item: Wine) =>
  typeof item.image === 'string' ? item.image : ''

export default function WineList({ wineList }: WineListProps) {
  return (
    <div className="grid grid-cols-12">
      {wineList.map((item, index) => (
        <div key={index} className="col-span-12 mb-10">
          <Card
            name={item.name}
            year={item.year}
            grape={item.grape}
            image={imageSrc(item)}
          />
        </div>
      ))}
    </div>
  )
}
