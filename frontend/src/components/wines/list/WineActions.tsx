import AddAction from '@/components/wines/list/actions/AddAction'
import FilterAction from '@/components/wines/list/actions/FilterAction'
import SortAction from '@/components/wines/list/actions/SortAction'

export default function WineActions() {
  return (
    <div className="flex justify-center gap-5 my-10">
      <AddAction />
      <FilterAction />
      <SortAction />
    </div>
  )
}
