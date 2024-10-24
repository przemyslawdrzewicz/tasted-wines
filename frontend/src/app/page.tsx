"use client";

import { useState } from "react";
import styles from "./home.module.css";
import Tesseract from "tesseract.js";

export default function Home() {
  const [wineList, setWineList] = useState([]);
  const [file, setFile] = useState(null);

  const imageSrc = file ? URL.createObjectURL(file) : "";

  const changeFile = async (data) => {
    const newFile = data.target.files[0];
    setFile(newFile);
    console.log("test");

    const body = new FormData();
    body.append("image", newFile);

    const url = "https://demo.api4ai.cloud/wine-rec/v1/results";
    const config = {
      method: "POST",
      headers: { "A4A-CLIENT-APP-ID": "sample" },
      body,
    };

    const response = await fetch(url, config);
    const responseJson = await response.json();

    const predictedWines = responseJson.results[0].entities[0].classes;

    const sortPredictedWines = Object.keys(predictedWines).sort(
      (a, b) => predictedWines[b] - predictedWines[a]
    );

    setWineList(sortPredictedWines);

    // if (newFile) {
    //   const result = await Tesseract.recognize(newFile);
    //   console.log(result.data.text, "result.data.text");
    // }

    // const options = {
    //   method: "POST",
    //   headers: {
    //     Authorization: "Basic " + btoa("wineengine_user:wineengine_password"),
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   body,
    // };

    // const url = "https://wineengine.tineye.com/sandbox/rest/search/";

    // const response = await fetch(url, options);
    // console.log(response, "response");
  };

  let uploadTitle;
  if (!file) uploadTitle = <span>Upload wine</span>;

  return (
    <div>
      <div className={styles.file}>
        <input type="file" onChange={changeFile}></input>
        {/* <button>Select</button> */}
        {uploadTitle}
        <img src={imageSrc} />
      </div>
      <div className={styles.control}>
        <span>Title</span>
        <input className={styles.title} />
        <ul className={styles.list}>
          {wineList.map((wine, index) => (
            <li className={`${styles.hint}`} key={index}>
              {wine}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
