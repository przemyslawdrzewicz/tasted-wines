import type { NextApiRequest, NextApiResponse } from 'next'
import { db, storage } from '@/utils/firestone'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { ref, getDownloadURL, deleteObject } from 'firebase/storage'
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
  delete: async (id: string, body: Wine) => {
    if(typeof body.image !== 'string') return

    await deleteDoc(doc(db, DB_NAME, id))

    const imageRef = ref(storage, body.image)
    await deleteObject(imageRef)
  }
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query
  const { method, body } = request

  if(typeof id !== 'string') return

  switch(method) {
    case 'GET': {
      const wine = await wineRest.get(id)
      response.status(200).json(wine)
      break
    }
    case 'DELETE': {
      await wineRest.delete(id, body)
      response.status(200)
      break
    }
  }
}

export default handler