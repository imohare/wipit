import {React, useState} from 'react';
import {storage} from '../../../firebase/index'


function CardInputBar (props) {

  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [seenState, setSeenState] = useState('');
  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    } 
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress)
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(imgUrl => {
            setImgUrl(imgUrl)
          })
      }
    )
  };

  //here you have a url for the image saved in firebase

  return (
    <div>
      <progress value={progress} max="100"/>
      <br />
      <input type="file" onChange={handleChange} />
      <br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default CardInputBar;
