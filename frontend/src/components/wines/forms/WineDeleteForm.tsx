import Button from '@/components/ui/button/Button'
import Card from '@/components/ui/card/Card'
import { Wine } from '@/interfaces/wine'

interface WineDeleteFormProps {
  id: string
  wine: Wine
}

const imageSrc = (item: Wine) =>
  typeof item.image === 'string' ? item.image : ''

export default function WineDeleteForm({ id, wine }: WineDeleteFormProps) {
  const save = async () => {
    await fetch(`/api/wines/${id}/`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wine),
    })
  }

  return (
    <div>
      <Card
        name={wine.name}
        year={wine.year}
        grape={wine.grape}
        image={imageSrc(wine)}
      />
      <Button variant="normal" color="rgba(200, 111, 111, 0.40)" onClick={save}>
        Save
      </Button>
      <Button variant="outlined" to="/">
        Cancel
      </Button>
    </div>
  )
}
