import {React, useState} from 'react';
import {storage} from '../../../firebase/index'
import methods from '../../../services'


function CardInputBar (props) {

  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [cards, setCards] = useState([]);
  const [progress, setProgress] = useState(0);

  const addCard = async (wipId, img_url, upload_date, seen_by_state) => {
    const newCards = props.wip.wip_cards.slice();
    const response = await methods.addCard(wipId, img_url, upload_date, seen_by_state)
    console.log(upload_date)
    newCards.push(response)
    setCards(newCards);
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    } 
  };

  const handleSubmit = (evt) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
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
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(imgUrl => {
            setImgUrl(imgUrl)
          })
      }
    )
    console.log("imgUrl", imgUrl)
    console.log()
    evt.preventDefault();
    addCard(props.wip._id, imgUrl, uploadDate, "false");
    setImgUrl(imgUrl => imgUrl = '');
    //for some reason this isn't making it be empty after uplaod is pressed
    setUploadDate(uploadDate => uploadDate = '');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <progress value={progress} max="100"/>
        <br />
        <input type="file" onChange={handleChange} />
        <br />
        <input type="date" name="uploadDate" value={uploadDate} onChange={(evt) => setUploadDate(evt.target.value)} required></input>
        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}

export default CardInputBar;
