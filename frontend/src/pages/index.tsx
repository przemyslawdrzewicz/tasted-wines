import { useEffect, useState } from 'react'

import Layout from '@/components/layouts/Layout'
import Header from '@/components/ui/header/Header'
import SubHeader from '@/components/ui/subheader/SubHeader'
import Button from '@/components/ui/button/Button'
import PlusIcon from '@/components/icons/PlusIcon'
import FilterIcon from '@/components/icons/FilterIcon'
import SortIcon from '@/components/icons/SortIcon'
import Card from '@/components/ui/card/Card'

import { db, storage } from '../utils/firestore'
import { getDocs, collection } from 'firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'
import { DocumentData } from 'firebase/firestore'

import { Wine } from '@/interfaces/wine'

export default function Home() {
  const [wineList, setWineList] = useState<Wine[]>([])

  useEffect(() => {
    fetchWines()
  }, [])

  const fetchWineDetails = async (doc: DocumentData): Promise<Wine> => {
    const data = doc.data()
    const imageRef = ref(storage, data.image)
    const image = await getDownloadURL(imageRef)
    return { ...data, image } as Wine
  }

  const fetchWines = async () => {
    const querySnapshot = await getDocs(collection(db, 'wines'))
    const winePromises = querySnapshot.docs.map(fetchWineDetails)
    const wines = await Promise.all(winePromises)
    setWineList(wines)
  }

  return (
    <Layout>
      <div className="mb-10 mt-2">
        <div className="grid grid-cols-12">
          <div className="col-span-12 text-center my-3">
            <Header title="Your wines" />
          </div>
          <div className="col-span-12 text-center my-1">
            <SubHeader title="Found 14 results" />
          </div>
        </div>
        <div className="flex justify-center gap-5 my-10">
          <Button variant="fab">
            <PlusIcon />
          </Button>
          <Button variant="fab">
            <FilterIcon />
          </Button>
          <Button variant="fab">
            <SortIcon />
          </Button>
        </div>
        <div className="grid grid-cols-12">
          {wineList.map((item, index) => (
            <div key={index} className="col-span-12 mb-10">
              <Card
                name={item.name}
                year={item.year}
                grape={item.grape}
                image={item.image}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
