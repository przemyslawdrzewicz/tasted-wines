import Layout from '@/components/layouts/Layout'
import Header from '@/components/ui/header/Header'
import SubHeader from '@/components/ui/subheader/SubHeader'
import WineForm from '@/components/wines/forms/WineForm'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Wine } from '@/interfaces/wine'

const Edit = () => {
  const router = useRouter()
  const { id } = router.query

  const [wine, setWine] = useState<Wine | null>(null)

  const fetchWine = async (id: string) => {
    const wineResponse = await fetch(`/api/wines/${id}/`)
    const wine = await wineResponse.json()
    setWine(wine)
  }

  useEffect(() => {
    if (id && typeof id === 'string') fetchWine(id)
  }, [id])

  if (!wine) return <div>Loading ...</div>

  return (
    <Layout>
      <Header title="Edit wine" />
      <SubHeader title="Modify properties" />
      <WineForm edit={wine} />
    </Layout>
  )
}

export default Edit
