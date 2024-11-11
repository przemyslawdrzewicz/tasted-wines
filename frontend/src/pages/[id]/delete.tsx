import Layout from '@/components/layouts/Layout'
import Header from '@/components/ui/header/Header'
import SubHeader from '@/components/ui/subheader/SubHeader'
import WineDeleteForm from '@/components/wines/forms/WineDeleteForm'
import { Wine } from '@/interfaces/wine'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Delete = () => {
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

  const isLoading = typeof id !== 'string' || !wine

  if (isLoading) return <div>Loading ...</div>

  return (
    <Layout>
      <Header title="Delete wine" />
      <SubHeader title="Are you sure you want to delete this wine?" />
      <WineDeleteForm id={id} wine={wine} />
    </Layout>
  )
}

export default Delete
