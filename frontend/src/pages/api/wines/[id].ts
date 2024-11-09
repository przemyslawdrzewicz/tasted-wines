import type { NextApiRequest, NextApiResponse } from 'next'
import { db, storage } from '@/utils/firestore'
import { doc, getDoc } from 'firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'
import { DocumentData } from 'firebase/firestore'
import { Wine } from '@/interfaces/wine'

const DB_NAME = 'wines'

const prepareWine = async (doc: DocumentData): Promise<Wine> => {
  const id = doc.id
  const data = doc.data()
  const imageRef = ref(storage, data.image)
  const image = await getDownloadURL(imageRef)
  return { ...data, image, id } as Wine
}

const wineRest = {
  get: async (id: string) => {
    const docRef = doc(db, DB_NAME, id)
    const querySnapshot = await getDoc(docRef);
    const winePromise = await prepareWine(querySnapshot)
    return winePromise
  },
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query
  const { method } = request

  if(typeof id !== 'string') return

  switch(method) {
    case 'GET': {
      const wine = await wineRest.get(id)
      response.status(200).json(wine)
      break
    }
  }
}

export default handler