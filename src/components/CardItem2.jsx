// import { getDownloadURL, ref } from "firebase/storage";
// import { storage } from "@/firebase/firebase";

// const CardItem2 = ({ imageUrl, fakultas, judul, deskripsi, harga, statusDesain, userName }) => {
//   const handleDownload = async () => {
//     try {
//       // Mendapatkan URL unduhan gambar dari Firebase Storage
//       const imageRef = ref(storage, imageUrl);
//       const downloadURL = await getDownloadURL(imageRef);

//       // Mendapatkan nama file dari URL unduhan
//       const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

//       // Melakukan pengunduhan gambar dengan nama file dari URL
//       const link = document.createElement('a');
//       link.href = downloadURL;
//       link.setAttribute('download', fileName); // Gunakan nama file dari URL
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error('Error downloading image:', error);
//     }
//   };

//   const [imageSrc, setImageSrc] = useState(null);

// useEffect(() => {
//   const fetchImage = async () => {
//     if (imageUrl) {
//       try {
//         const imageRef = ref(storage, imageUrl);
//         const url = await getDownloadURL(imageRef);
//         setImageSrc(url); // Simpan URL untuk ditampilkan
//       } catch (error) {
//         console.error('Error fetching image URL:', error);
//       }
//     }
//   };
//   fetchImage();
// }, [imageUrl]);


//   return (
//     <div>
//       <h1>{userName}</h1>
//       {/* <img src={imageUrl} alt="Desain" /> */}
//       <img 
//   src={imageUrl || "/path-to-default-placeholder.png" } 
//   alt={judul || "Desain"} 
//   className="w-full h-auto"
// />
//       <div>
//         <h3>{judul}</h3>
//         <p>{deskripsi}</p>
//         <p>{fakultas}</p>
//         <p>{harga}</p>
//         <p>{statusDesain}</p>
//       </div>
//       <button onClick={handleDownload} style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 20px', border: 'none', fontSize: '16px', cursor: 'pointer' }}>Download</button>
//     </div>
//   );
// };

// export default CardItem2;




import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/firebase/firebase";

const CardItem2 = ({ imageUrl, fakultas, judul, deskripsi, harga, statusDesain, userName }) => {
  const handleDownload = async () => {
    try {
      // Mendapatkan URL unduhan gambar dari Firebase Storage
      const imageRef = ref(storage, imageUrl);
      const downloadURL = await getDownloadURL(imageRef);

      // Mendapatkan nama file dari URL unduhan
      const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

      // Melakukan pengunduhan gambar dengan nama file dari URL
      const link = document.createElement('a');
      link.href = downloadURL;
      link.setAttribute('download', fileName); // Gunakan nama file dari URL
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div>
      <h1>{userName}</h1>
      {/* <img src={imageUrl} alt="Desain" /> */}
      <img 
  src={imageUrl || "/path-to-default-placeholder.png"} 
  alt={judul || "Desain"} 
  className="w-full h-auto"
/>
      <div>
        <h3>{judul}</h3>
        <p>{deskripsi}</p>
        <p>{fakultas}</p>
        <p>{harga}</p>
        <p>{statusDesain}</p>
      </div>
      <button onClick={handleDownload} style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 20px', border: 'none', fontSize: '16px', cursor: 'pointer' }}>Download</button>
    </div>
  );
};

export default CardItem2;

