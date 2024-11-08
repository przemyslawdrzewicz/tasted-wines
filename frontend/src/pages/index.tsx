import { useEffect, useState } from 'react'
import Layout from '@/components/layouts/Layout'
import Header from '@/components/ui/header/Header'
import SubHeader from '@/components/ui/subheader/SubHeader'
import WineList from '@/components/wines/list/WineList'
import WineActions from '@/components/wines/list/WineActions'
import { Wine } from '@/interfaces/wine'

const Home = () => {
  const [wineList, setWineList] = useState<Wine[]>([])

  const fetchWines = async () => {
    const wineResponse = await fetch('/api/wines/')
    const wines = await wineResponse.json()
    setWineList(wines)
  }

  useEffect(() => {
    fetchWines()
  }, [])

  return (
    <Layout>
      <div className="mb-10 mt-2">
        <Header title="Your wines" />
        <SubHeader title={`Found ${wineList.length} results`} />
        <WineActions />
        <WineList wineList={wineList} />
      </div>
    </Layout>
  )
}

export default Home
