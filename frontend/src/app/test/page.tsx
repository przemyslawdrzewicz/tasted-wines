"use client";

import { useEffect, useState } from "react";
import { db, storage } from '../utils/firestore'
import {  getDocs, collection } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export default function Test() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "wines"));

    querySnapshot.forEach(async (doc) => {
      const starsRef = ref(storage, "/syr.jpg");
      const wineImage = await getDownloadURL(starsRef);

      const data = doc.data();
      data.image = wineImage;

      setList([...list, data]);
    });
  };

  return (
    <div>
      {list.map((item, index) => (
        <div key={index}>
          <div>{item.name}</div>
          <div>
            <img width="400" src={item.image} />
          </div>
        </div>
      ))}
    </div>
  );
}
