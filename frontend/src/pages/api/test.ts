import type { NextApiRequest, NextApiResponse } from 'next'
import { db, storage } from '@/utils/firestore'
import { getDocs, collection, setDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { DocumentData } from 'firebase/firestore'
import { Wine } from '@/interfaces/wine'
import { base64ToFile } from '@/utils/base64/base64'

const DB_NAME = 'wines'

const prepareWine = async (doc: DocumentData): Promise<Wine> => {
  const id = doc.id
  const data = doc.data()
  const imageRef = ref(storage, data.image)
  const image = await getDownloadURL(imageRef)
  return { ...data, image, id } as Wine
}

const generateTimestampKey = () => {
  return Math.random().toString(36).substr(2, 9)
}

const getFileNameFromUrl = (url) => {
  const match = url.match(/\/o\/([^?]+)/); // Match everything after "/o/" and before the query string
  if (match) {
    return match[1]; // Return the matched file name (without the query parameters)
  }
  return null;
};

const wineRest = {
  get: async () => {
    const querySnapshot = await getDocs(collection(db, DB_NAME))
    const winePromises = querySnapshot.docs.map(prepareWine)
    return await Promise.all(winePromises)
  },
  post: async (body: Wine) => {
    const { image } = body

    let name, file
    if(typeof image === 'object') {
      name = image?.name
      file = image?.file
    }

    if(!name || !file) return

    const addImage = async () => {
      const storageRef = ref(storage, name);
      await uploadBytes(storageRef, file);
    }

    const addWine = async () => {
      const id = generateTimestampKey()
      const data = { ...body, image: name }
      await setDoc(doc(db, DB_NAME, id), data)
    }

    addImage()
    addWine()
  },
  patch: async (body: Wine) => {
    const { image, id } = body

    let name, file
    if(typeof image === 'object') {
      name = image?.name
      file = image?.file
    }

    const editWine = async () => {
      const data = { ...body, image: getFileNameFromUrl(image) }
      const washingtonRef = doc(db, DB_NAME, id);
      await updateDoc(washingtonRef, data);
    }

    if(!name || !file) {
      editWine()
      return
    }

    const editImage = async () => {
      const storageRef = ref(storage, name);
      await uploadBytes(storageRef, file);  
    }   

    editImage()
    editWine()
  }
  // delete: async ({ id }) => {}
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { body, method } = request

  switch(method) {
    case 'GET': {
      console.log(request, 'request?')
      const wines = await wineRest.get()
      response.status(200).json(wines)
      break
    }
    case 'POST': {
      const newBody = { ...body }
      delete newBody.id
      newBody.image.file = base64ToFile(body.image.file, body.image.name)
      await wineRest.post(newBody)
      response.status(200)
      break
    }
    case 'PATCH': {
      const newBody = { ...body }
      if(newBody.image.file) newBody.image.file = base64ToFile(body.image.file, body.image.name)
      await wineRest.patch(newBody)
      response.status(200)
      break
    }
  }
}

export default handler