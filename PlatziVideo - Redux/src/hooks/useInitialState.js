import { useState, useEffect } from "react"

const initialState = (API)=>{
  const [videos, setVideos] = useState({
    myList: [],
    trends: [],
    originals: [],
  });
  
  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setVideos(data));
  }, []);
  return videos;
} 
export default initialState; 