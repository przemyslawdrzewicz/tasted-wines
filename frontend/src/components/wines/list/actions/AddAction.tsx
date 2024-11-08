import Button from '@/components/ui/button/Button'
import PlusIcon from '@/components/icons/PlusIcon'

export default function AddAction() {
  return (
    <Button variant="fab" to="/add/">
      <PlusIcon />
    </Button>
  )
}
