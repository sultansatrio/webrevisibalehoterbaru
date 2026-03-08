// import { numberToRupiah } from "@/utils/rupiah";
// import React from "react";

// const CardItem = ({
//   imageUrl,
//   judul,
//   deskripsi,
//   harga,
//   fakultas,
//   addToCart,
//   removeFromCart,
//   isInCart,
// }) => {
//   return (
//     <div className="w-full rounded overflow-hidden shadow-lg">
//       <img className="w-full h-44 object-cover" src={imageUrl} alt={judul} />
//       <div className="px-6 py-3">
//         {fakultas && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {fakultas}
//           </p>
//         )}
//         <div className=" text-xl mb-2">{judul}</div>
//         <p className="text-gray-700 text-base">{deskripsi}</p>
//         {harga && (
//           <p className="text-red-600 text-base mt-2">{numberToRupiah(harga)}</p>
//         )}
//       </div>
//       <div className="px-6 py-3">
//         {isInCart ? ( // ubah teks tombol berdasarkan properti inCart
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded"
//             onClick={removeFromCart} // tambahkan event onClick removeFromCart
//           >
//             Remove From Cart
//           </button>
//         ) : (
//           <button
//             className="bg-gray-200 hover:bg-teal-500 text-gray-900 hover:text-white font-bold py-2 px-4 rounded"
//             onClick={addToCart}
//           >
//             Add To Cart
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CardItem;


//update tgl 26 desember 2024
// import { numberToRupiah } from "@/utils/rupiah";
// import React, { useState, useEffect } from "react";
// import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore"; // Import Firestore functions

// const CardItem = ({
//   imageUrl,
//   judul,
//   deskripsi,
//   harga,
//   hargaJangkauan,
//   jangkauan,
//   statusCustome,
//   fakultas,
//   addToCart,
//   addToCartCustome,
//   removeFromCart,
//   removeFromCartCustome,
//   isInCart,
//   isInCartCustome,
// }) => {
//   const [showInput, setShowInput] = useState(false); // State untuk mengontrol tampilan input
//   const [jangkauanCustome, setJangkauanCustome] = useState(""); // State untuk menyimpan jangkauan sewa
//   const [statusPermintaan, setStatusPermintaan] = useState(statusCustome); // State untuk menyimpan statusCustome yang terupdate

//   const db = getFirestore(); // Initialize Firestore

//   useEffect(() => {
//     // Listen for changes on the Firestore document
//     const docRef = doc(db, "jangkauanCustomSewa", judul); // Use judul as document ID
//     const unsubscribe = onSnapshot(docRef, (docSnap) => {
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         setStatusPermintaan(data.statusCustome); // Update status from Firestore data
//       }
//     });

//     // Cleanup listener when the component is unmounted or judul changes
//     return () => unsubscribe();
//   }, [db, judul]);

//   const handleToggleInput = () => {
//     setShowInput(!showInput);
//   };

//   const handleInputChange = (e) => {
//     setJangkauanCustome(e.target.value);
//   };

//   // const handleSaveJangkauan = async () => {
//   //   try {
//   //     const docRef = doc(db, "jangkauanCustomSewa", judul); // Use judul as document ID
//   //     await setDoc(docRef, {
//   //       jangkauan,
//   //       imageUrl,
//   //       judul,
//   //       deskripsi,
//   //       harga,
//   //       hargaJangkauan,
//   //       fakultas,
//   //     });
//   //     console.log("Deskripsi Jangkauan Sewa berhasil disimpan:", {
//   //       jangkauan,
//   //       imageUrl,
//   //       judul,
//   //       deskripsi,
//   //       harga,
//   //       hargaJangkauan,
//   //       fakultas,
//   //     });
//   //   } catch (error) {
//   //     console.error("Gagal menyimpan deskripsi jangkauan sewa:", error);
//   //   }
//   //   setShowInput(false); // Sembunyikan input setelah menyimpan
//   // };


//   const handleSaveJangkauan = async () => {
//     try {
//       // Pastikan jangkauan dan hargaJangkauan adalah angka
//       const parsedJangkauan = parseFloat(jangkauanCustome);
//       const parsedHargaJangkauan = parseFloat(hargaJangkauan);
  
//       // Periksa apakah parsing berhasil
//       if (isNaN(parsedJangkauan) || isNaN(parsedHargaJangkauan)) {
//         throw new Error("jangkauan atau hargaJangkauan bukan angka yang valid.");
//       }
  
//       // Hitung harga
//       const harga = parsedJangkauan * parsedHargaJangkauan;
  
//       const docRef = doc(db, "jangkauanCustomSewa", judul); // Use judul as document ID
//       await setDoc(docRef, {
//         jangkauanCustome: parsedJangkauan,
//         imageUrl,
//         judul,
//         deskripsi,
//         statusCustome,
//         harga,
//         hargaJangkauan: parsedHargaJangkauan,
//         fakultas,
//       });
//       console.log("Deskripsi Jangkauan Sewa berhasil disimpan:", {
//         jangkauanCustome: parsedJangkauan,
//         imageUrl,
//         judul,
//         deskripsi,
//         statusCustome,
//         harga,
//         hargaJangkauan: parsedHargaJangkauan,
//         fakultas,
//       });
//     } catch (error) {
//       console.error("Gagal menyimpan deskripsi jangkauan sewa:", error);
//     }
//     setShowInput(false); // Sembunyikan input setelah menyimpan
//   };
  
//   return (
//     <div className="w-full rounded overflow-hidden shadow-lg">
//       <img className="w-full h-44 object-cover" src={imageUrl} alt={judul} />
//       <div className="px-6 py-3">
//         {fakultas && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {fakultas}
//           </p>
//         )}
//         <div className=" text-xl mb-2">{judul}</div>
//         <p className="text-gray-700 text-base">{deskripsi}</p>
//         {harga && (
//           <p className="text-red-600 text-base mt-2">{numberToRupiah(harga)}</p>
//         )}
//         <br/>
//         <p>Harga Sebulan</p>
//         {hargaJangkauan && (
//           <p className="text-red-600 text-base mt-2">{numberToRupiah(hargaJangkauan)}</p>
//         )}
//         <br/>
//         <p>Massa Sewa</p>
//         {jangkauan && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {jangkauan}
//           </p>
//         )}
//         <br/>
//         <p>Status Custome</p>
//         {statusPermintaan && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {statusPermintaan}
//           </p>
//         )}
//       </div>
//       <div className="px-6 py-3">
//         {isInCart ? (
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded"
//             onClick={removeFromCart}
//           >
//             Remove From Cart
//           </button>
//         ) : (
//           <button
//             className="bg-gray-200 hover:bg-teal-500 text-gray-900 hover:text-white font-bold py-2 px-4 rounded"
//             onClick={addToCart}
//           >
//             Add To Cart
//           </button>
//         ) }
//         {/* <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
//           onClick={handleToggleInput}
//         >
//           {showInput ? "Cancel" : "Add Jangkauan"}
//         </button> */}
//       </div>
//       <div className="px-6 py-3">
//         {isInCartCustome ? (
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded"
//             onClick={removeFromCartCustome}
//           >
//             Remove From Cart Custome
//           </button>
//         ) : (
//           <button
//             className="bg-gray-200 hover:bg-teal-500 text-gray-900 hover:text-white font-bold py-2 px-4 rounded"
//             onClick={addToCartCustome}
//           >
//             Add To Cart Cutome
//           </button>
//         ) }
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
//           onClick={handleToggleInput}
//         >
//           {showInput ? "Cancel" : "Add Jangkauan"}
//         </button>
//       </div>
//       {showInput && (
//         <div className="px-6 py-3">
//           <input
//             type="text"
//             className="border rounded w-full py-2 px-3 text-gray-700"
//             placeholder="Masukkan deskripsi jangkauan sewa"
//             value={jangkauanCustome}
//             onChange={handleInputChange}
//           />
//           <button
//             className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
//             onClick={handleSaveJangkauan}
//           >
//             Save
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardItem;






// import { numberToRupiah } from "@/utils/rupiah";
// import React, { useState, useEffect } from "react";
// import { getFirestore, getDocs, doc, setDoc, onSnapshot } from "firebase/firestore"; // Import Firestore functions
// // import {db} from "@/firebase";

// const CardItem = ({
//   imageUrl,
//   judul,
//   deskripsi,
//   harga,
//   hargaJangkauan,
//   jangkauan,
//   statusCustome,
//   fakultas,
//   addToCart,
//   addToCartCustome,
//   removeFromCart,
//   removeFromCartCustome,
//   isInCart,
//   isInCartCustome,
//   statusProduct,
// }) => {
//   const [showInput, setShowInput] = useState(false); // State untuk mengontrol tampilan input
//   const [jangkauanCustome, setJangkauanCustome] = useState(""); // State untuk menyimpan jangkauan sewa
//   const [statusPermintaan, setStatusPermintaan] = useState(statusCustome); // State untuk menyimpan statusCustome yang terupdate
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState("");

//   // const [tampilanstartDate, setTampilanStartDate] = useState(null);
//   const db = getFirestore(); // Initialize Firestore

//   // useEffect(() => {
//   //   // Listen for changes on the Firestore document
//   //   const docRef = doc(db, "jangkauanCustomSewa", judul); // Use judul as document ID
//   //   const unsubscribe = onSnapshot(docRef, (docSnap) => {
//   //     if (docSnap.exists()) {
//   //       const data = docSnap.data();
//   //       setStatusPermintaan(data.statusCustome); // Update status from Firestore data
//   //     }
//   //   });

//   //   // Cleanup listener when the component is unmounted or judul changes
//   //   return () => unsubscribe();
//   // }, [db, judul]);



//   const fetchData = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "jangkauanCustomSewa"));
//       querySnapshot.forEach((doc) => {
//         console.log(doc.id, " => ", doc.data());
//         // Pilih dokumen yang sesuai
//         if (doc.id === "desiredDocumentId") {
//           setStartDate(doc.data().startDate);
//         }
//       });
//     } catch (error) {
//       console.error("Error fetching collection:", error);
//     }
//   };

//   useEffect(() => {
//     // Listen for changes on the Firestore document
//     const docRef = doc(db, "jangkauanCustomSewa", judul);
//     const unsubscribe = onSnapshot(docRef, (docSnap) => {
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         setStatusPermintaan(data.statusCustome); // Update status from Firestore data
  
//         // Tambahkan item ke keranjang jika status di-ACC admin
//         if (
//           data.statusCustome ===
//           "Di Acc Admin Silahkan Memasukkan ke Keranjang"
//         ) {
//           if (!isInCart) {
//             addToCart(); // Panggil fungsi untuk menambahkan ke keranjang
//             console.log(`${judul} telah ditambahkan ke keranjang.`);
//           }
//         }
//       }
//     });
  
//     return () => unsubscribe();
//   }, [db, judul, isInCart, addToCart]);
  

//   const handleToggleInput = () => {
//     setShowInput(!showInput);
//   };

//   const handleInputChange = (e) => {
//     setJangkauanCustome(e.target.value);
//   };

// const handleStartDateChange = (e) => {
//   setStartDate(e.target.value);
// };

// const handleEndDateChange = (e) => {
//   setEndDate(e.target.value);
// };

//   const handleSaveJangkauan = async () => {
//     try {
//       // Pastikan jangkauan dan hargaJangkauan adalah angka
//       const parsedJangkauan = parseFloat(jangkauanCustome);
//       const parsedHargaJangkauan = parseFloat(hargaJangkauan);
  
//       // Periksa apakah parsing berhasil
//       if (isNaN(parsedJangkauan) || isNaN(parsedHargaJangkauan)) {
//         throw new Error("jangkauan atau hargaJangkauan bukan angka yang valid.");
//       }
  
//       // Hitung harga
//       const harga = parsedJangkauan * parsedHargaJangkauan;
  
//       const docRef = doc(db, "jangkauanCustomSewa", judul); // Use judul as document ID
//       await setDoc(docRef, {
//         jangkauanCustome: parsedJangkauan,
//         startDate,
//         endDate,
//         imageUrl,
//         judul,
//         deskripsi,
//         statusCustome,
//         harga,
//         hargaJangkauan: parsedHargaJangkauan,
//         fakultas,
//       });
//       console.log("Deskripsi Jangkauan Sewa berhasil disimpan:", {
//         jangkauanCustome: parsedJangkauan,
//         startDate,
//         endDate,
//         imageUrl,
//         judul,
//         deskripsi,
//         statusCustome,
//         harga,
//         hargaJangkauan: parsedHargaJangkauan,
//         fakultas,
//       });
//     } catch (error) {
//       console.error("Gagal menyimpan deskripsi jangkauan sewa:", error);
//     }
//     setShowInput(false); // Sembunyikan input setelah menyimpan
//   };
  
//   return (
//     <div className="w-full rounded overflow-hidden shadow-lg">
//       <img className="w-full h-44 object-cover" src={imageUrl} alt={judul} />
//       <div className="px-6 py-3">
//         {fakultas && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {fakultas}
//           </p>
//         )}
//         <div className=" text-xl mb-2">{judul}</div>
//         <p className="text-gray-700 text-base">{deskripsi}</p>
//         <br/>
//         <p>Harga Sebulan</p>
//         {hargaJangkauan && (
//           <p className="text-red-600 text-base mt-2">{numberToRupiah(hargaJangkauan)}</p>
//         )}
//         <br/>
//         <p>Massa Sewa</p>
//         {jangkauan && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {jangkauan}
//           </p>
//         )}
//         <br/>
//         {harga && (
//           <p className="text-red-600 text-base mt-2">{numberToRupiah(harga)}</p>
//         )}
//         <br/>
//         {/* <p>Status Custome</p>
//         {statusPermintaan && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {statusPermintaan}
//           </p>
//         )}
//                 <p>Stock Custome</p>
//         {statusCustome && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {statusCustome}
//           </p>
//         )}
//                 <p>Stock</p>
//         {statusProduct && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {statusProduct}
//           </p>
//         )} */}
//         <p>Status Custome</p>
// {statusPermintaan && (
//   <p
//     className={`font-semibold text-base mt-2 uppercase ${
//       statusPermintaan === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
//     }`}
//   >
//     {statusPermintaan}
//   </p>
// )}

// <p>Stock Custome</p>
// {statusCustome && (
//   <p
//     className={`font-semibold text-base mt-2 uppercase ${
//       statusCustome === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
//     }`}
//   >
//     {statusCustome}
//   </p>
// )}

// <p>Stock</p>
// {statusProduct && (
//   <p
//     className={`font-semibold text-base mt-2 uppercase ${
//       statusProduct === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
//     }`}
//   >
//     {statusProduct}
//   </p>
// )}
// <p>Start Date Custome Pemasangan</p>
//       {startDate ? (
//         <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//           {startDate ?? "Tanggal tidak tersedia"}
//         </p>
//       ) : (
//         <p>Loading...</p>
//       )}
//       </div>
//       <br/>
//       <div className="px-6 py-3">
//         {isInCart ? (
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded"
//             onClick={removeFromCart}
//           >
//             Remove From Cart
//           </button>
//         ) : (
//           <button
//             className="bg-gray-200 hover:bg-teal-500 text-gray-900 hover:text-white font-bold py-2 px-4 rounded"
//             onClick={addToCart}
//           >
//             Add To Cart
//           </button>
//         ) }
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
//           onClick={handleToggleInput}
//         >
//           {showInput ? "Cancel" : "Add Jangkauan"}
//         </button>
//       </div>
//       {showInput && (
//         <div className="px-6 py-3">
//           <input
//             type="text"
//             className="border rounded w-full py-2 px-3 text-gray-700"
//             placeholder="Masukkan deskripsi jangkauan sewa"
//             value={jangkauanCustome}
//             onChange={handleInputChange}
//           />
//           <input
//   type="date"
//   className="border rounded w-full py-2 px-3 text-gray-700"
//   placeholder="Masukkan tanggal mulai"
//   value={startDate}
//   onChange={handleStartDateChange}
// />

// <input
//   type="date"
//   className="border rounded w-full py-2 px-3 text-gray-700"
//   placeholder="Masukkan tanggal akhir"
//   value={endDate}
//   onChange={handleEndDateChange}
// />

//           <button
//             className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
//             onClick={handleSaveJangkauan}
//           >
//             Save
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardItem;

//update tgl 19 januari 2025
// import { numberToRupiah } from "@/utils/rupiah";
// import React, { useState, useEffect } from "react";
// import useAuth from "../app/hooks/useAuth";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getFirestore, doc, getDoc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore functions

// const CardItem = ({
//   imageUrl,
//   judul,
//   deskripsi,
//   harga,
//   hargaJangkauan,
//   jangkauan,
//   statusCustome,
//   fakultas,
//   addToCart,
//   timestamp,
//   addToCartCustome,
//   removeFromCart,
//   removeFromCartCustome,
//   isInCart,
//   documentID,
//   isInCartCustome,
//   statusProduct,
// }) => {
//   const [showInput, setShowInput] = useState(false); // State untuk mengontrol tampilan input
//   const [jangkauanCustome, setJangkauanCustome] = useState(""); // State untuk menyimpan jangkauan sewa
//   const [namaPembeli, setNamaPembeli] = useState('');
//   const [statusPermintaan, setStatusPermintaan] = useState(statusCustome); // State untuk menyimpan statusCustome yang terupdate
//   const [startDate, setStartDate] = useState('');
//   const [customTimestamp, setCustomTimestamp] = useState(null); // Ganti nama state menjadi customTimestamp
//   const [cartTimestamp, setCartTimestamp] = useState(null); // Ganti nama state menjadi customTimestamp
 
//   const auth = getAuth();

//   const [endDate, setEndDate] = useState("");

//   const db = getFirestore(); // Initialize Firestore


//   // useEffect(() => {
//   //   const auth = getAuth();
//   //   const unsubscribe = onAuthStateChanged(auth, (userName) => {
//   //     if (userName) {
//   //       // Periksa apakah user memiliki displayName
//   //       setNamaPembeli(user.userName || "Pengguna Tanpa Nama");
//   //     } else {
//   //       setNamaPembeli(""); // Tidak ada user yang login
//   //     }
//   //   });
  
//   //   // Cleanup listener saat komponen di-unmount
//   //   return () => unsubscribe();
//   // }, []);

//   // Fungsi untuk mengambil data dari Firestore
//   const fetchData = async () => {
//     try {
//       const docRef = doc(db, "cartMutasiCustome2", judul); // Gunakan documentID yang dinamis
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         console.log("Document data:", data); // Debug data
//         setStartDate(data.startDate); // Set startDate dari Firestore
//         setEndDate(data.endDate); // Set endDate dari Firestore
//         setCustomTimestamp(data.timestamp?.toDate().toLocaleString());


//       } else {
//         console.error("No such document!");
//       }
//     } catch (error) {
//       console.error("Error fetching document:", error);
//     }
//   };

//   useEffect(() => {
//     if (judul) {  // Pastikan documentID tersedia sebelum memanggil fetchData
//       fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
//     }
//   }, [judul]);  // Efek ini akan dipanggil setiap kali `documentID` berubah

  
//   // useEffect(() => {
//   //   if (judul && typeof judul === "string" && judul.trim() !== "") {
//   //     fetchData();  // Panggil fetchData jika judul valid
//   //   } else {
//   //     console.log("ID dokumen (judul) tidak valid.");
//   //   }
//   // }, [judul]);
  

//   // useEffect(() => {
//   //   fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
//   // }, []);

//   const handleToggleInput = () => {
//     setShowInput(!showInput);
//   };

//   const handleInputChange = (e) => {
//     setJangkauanCustome(e.target.value);
//   };

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   // const handleSaveJangkauan = async () => {
//   //   try {
//   //     const parsedJangkauan = parseFloat(jangkauanCustome);
//   //     const parsedHargaJangkauan = parseFloat(hargaJangkauan);

//   //     if (isNaN(parsedJangkauan) || isNaN(parsedHargaJangkauan)) {
//   //       throw new Error("jangkauan atau hargaJangkauan bukan angka yang valid.");
//   //     }

//   //     const harga = parsedJangkauan * parsedHargaJangkauan;

//   //     const docRef = doc(db, "jangkauanCustomSewa", judul);
//   //     await setDoc(docRef, {
//   //       jangkauanCustome: parsedJangkauan,
//   //       startDate,
//   //       endDate,
//   //       imageUrl,
//   //       judul,
//   //       deskripsi,
//   //       statusCustome,
//   //       harga,
//   //       hargaJangkauan: parsedHargaJangkauan,
//   //       fakultas,
//   //       timestamp: serverTimestamp(), // Menambahkan timestamp
//   //     });
//   //     console.log("Deskripsi Jangkauan Sewa berhasil disimpan:", {
//   //       jangkauanCustome: parsedJangkauan,
//   //       startDate,
//   //       endDate,
//   //       imageUrl,
//   //       judul,
//   //       deskripsi,
//   //       statusCustome,
//   //       harga,
//   //       hargaJangkauan: parsedHargaJangkauan,
//   //       fakultas,
//   //     });
//   //   } catch (error) {
//   //     console.error("Gagal menyimpan deskripsi jangkauan sewa:", error);
//   //   }
//   //   setShowInput(false); // Sembunyikan input setelah menyimpan
//   // };


// //   const handleSaveJangkauan = async () => {
// //     try {
// //       const parsedJangkauan = parseFloat(jangkauanCustome);
// //       const parsedHargaJangkauan = parseFloat(hargaJangkauan);

// //       if (isNaN(parsedJangkauan) || isNaN(parsedHargaJangkauan)) {
// //         throw new Error("jangkauan atau hargaJangkauan bukan angka yang valid.");
// //       }

// //       const harga = parsedJangkauan * parsedHargaJangkauan;

// //       // Save data to jangkauanCustomSewa collection
// //       const docRef = doc(db, "jangkauanCustomSewa", judul);
// //       await setDoc(docRef, {
// //         jangkauanCustome: parsedJangkauan,
// //         namaPembeli,
// //         startDate,
// //         endDate,
// //         imageUrl,
// //         judul,
// //         deskripsi,
// //         statusCustome,
// //         harga,
// //         hargaJangkauan: parsedHargaJangkauan,
// //         fakultas,
// //         timestamp: serverTimestamp(), // Menambahkan timestamp
// //       });
// //       console.log("Deskripsi Jangkauan Sewa berhasil disimpan:", {
// //         jangkauanCustome: parsedJangkauan,
// //         namaPembeli,
// //         startDate,
// //         endDate,
// //         imageUrl,
// //         judul,
// //         deskripsi,
// //         statusCustome,
// //         harga,
// //         hargaJangkauan: parsedHargaJangkauan,
// //         fakultas,
// //       });

// //       // Save data to cartMutasiCustome2 collection
// //       const cartDocRef = doc(db, "cartMutasiCustome2", judul);
// //       await setDoc(cartDocRef, {
// //         jangkauanCustome: parsedJangkauan,
// //         namaPembeli,
// //         startDate,
// //         endDate,
// //         imageUrl,
// //         judul,
// //         deskripsi,
// //         statusCustome,
// //         harga,
// //         hargaJangkauan: parsedHargaJangkauan,
// //         fakultas,
// //         timestamp: serverTimestamp(), // Menambahkan timestamp
// //       });
// //       console.log("Data berhasil disimpan di cartMutasiCustome2");

// //     } catch (error) {
// //       console.error("Gagal menyimpan deskripsi jangkauan sewa:", error);
// //     }
// //     setShowInput(false); // Sembunyikan input setelah menyimpan
// // };


// const handleSaveJangkauan = async () => {
//   try {
//     // Mendapatkan data pengguna yang sedang login
//     const userProfile = auth.currentUser; // auth adalah instance dari Firebase Authentication
//     // const { user, userProfile } = useAuth();
//     if (!userProfile) {
//       throw new Error("Pengguna belum login.");
//     }

//     const namaPembeli = userProfile.email || "Nama Tidak Diketahui"; // Menggunakan displayName atau email, atau default jika tidak tersedia

//     const parsedJangkauan = parseFloat(jangkauanCustome);
//     const parsedHargaJangkauan = parseFloat(hargaJangkauan);

//     if (isNaN(parsedJangkauan) || isNaN(parsedHargaJangkauan)) {
//       throw new Error("jangkauan atau hargaJangkauan bukan angka yang valid.");
//     }

//     const harga = parsedJangkauan * parsedHargaJangkauan;

//     // Save data to jangkauanCustomSewa collection
//     const docRef = doc(db, "jangkauanCustomSewa", judul);
//     await setDoc(docRef, {
//       jangkauanCustome: parsedJangkauan,
//       namaPembeli,
//       startDate,
//       endDate,
//       imageUrl,
//       judul,
//       deskripsi,
//       statusCustome,
//       harga,
//       hargaJangkauan: parsedHargaJangkauan,
//       fakultas,
//       timestamp: serverTimestamp(), // Menambahkan timestamp
//     });
//     console.log("Deskripsi Jangkauan Sewa berhasil disimpan:", {
//       jangkauanCustome: parsedJangkauan,
//       namaPembeli,
//       startDate,
//       endDate,
//       imageUrl,
//       judul,
//       deskripsi,
//       statusCustome,
//       harga,
//       hargaJangkauan: parsedHargaJangkauan,
//       fakultas,
//     });

//     // Save data to cartMutasiCustome2 collection
//     const cartDocRef = doc(db, "cartMutasiCustome2", judul);
//     await setDoc(cartDocRef, {
//       jangkauanCustome: parsedJangkauan,
//       namaPembeli,
//       startDate,
//       endDate,
//       imageUrl,
//       judul,
//       deskripsi,
//       statusCustome,
//       harga,
//       hargaJangkauan: parsedHargaJangkauan,
//       fakultas,
//       timestamp: serverTimestamp(), // Menambahkan timestamp
//     });
//     console.log("Data berhasil disimpan di cartMutasiCustome2");
//   } catch (error) {
//     console.error("Gagal menyimpan deskripsi jangkauan sewa:", error);
//   }
//   setShowInput(false); // Sembunyikan input setelah menyimpan
// };

//   return (
//     <div className="w-full rounded overflow-hidden shadow-lg">
//       <img className="w-full h-44 object-cover" src={imageUrl} alt={judul} />
//       <div className="px-6 py-3">
//         {fakultas && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {fakultas}
//           </p>
//         )}
//         <div className=" text-xl mb-2">{judul}</div>
//         <p className="text-gray-700 text-base">{deskripsi}</p>
//         <br />
//         <p>Harga Sebulan</p>
//         {hargaJangkauan && (
//           <p className="text-red-600 text-base mt-2">{numberToRupiah(hargaJangkauan)}</p>
//         )}
//         <br />
//         <p>Massa Sewa</p>
//         {jangkauan && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {jangkauan}
//           </p>
//         )}
//         <br />
//         {harga && (
//           <p className="text-red-600 text-base mt-2">{numberToRupiah(harga)}</p>
//         )}
//         <br />
//         {/* Tampilkan Status dengan Condisional Class */}
//         <p>Status Custome</p>
//         {statusPermintaan && (
//           <p
//             className={`font-semibold text-base mt-2 uppercase ${
//               statusPermintaan === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
//             }`}
//           >
//             {statusPermintaan}
//           </p>
//         )}

//         <p>Stock Custome</p>
//         {statusCustome && (
//           <p
//             className={`font-semibold text-base mt-2 uppercase ${
//               statusCustome === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
//             }`}
//           >
//             {statusCustome}
//           </p>
//         )}

//         <p>Stock</p>
//         {statusProduct && (
//           <p
//             className={`font-semibold text-base mt-2 uppercase ${
//               statusProduct === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
//             }`}
//           >
//             {statusProduct}
//           </p>
//         )}

//         <p>Start Date Custome Pemesanan</p>
//         {startDate ? (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {new Date(startDate).toLocaleDateString() ?? "Tanggal tidak tersedia"}
//           </p>
//         ) : (
//           <p></p>
//         )}
//         <br/>
//                 <p>End Date Custome Pemesanan</p>
//         {endDate ? (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {new Date(endDate).toLocaleDateString() ?? "Tanggal tidak tersedia"}
//           </p>
//         ) : (
//           <p></p>
//         )}
//         <br/>
//                         <p>Sedang Dalam Proses Pemasangan Custome</p>
//         {customTimestamp ? (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {new Date(customTimestamp).toLocaleDateString() ?? "Tanggal tidak tersedia"}
//           </p>
//         ) : (
//           <p></p>
//         )}
//         <br/>
//                                 <p>Sedang Dalam Proses Pemasangan</p>
//         {customTimestamp ? (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {new Date(customTimestamp).toLocaleDateString() ?? "Tanggal tidak tersedia"}
//           </p>
//         ) : (
//           <p></p>
//         )}
//         <br/>
//       </div>
//       <br />
//       <div className="px-6 py-3">
//         {isInCart ? (
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded"
//             onClick={removeFromCart}
//           >
//             Remove From Cart
//           </button>
//         ) : (
//           <button
//             className="bg-gray-200 hover:bg-teal-500 text-gray-900 hover:text-white font-bold py-2 px-4 rounded"
//             onClick={addToCart}
//           >
//             Add To Cart
//           </button>
//         )}
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
//           onClick={handleToggleInput}
//         >
//           {showInput ? "Cancel" : "Add Jangkauan"}
//         </button>
//       </div>


//       {showInput && (
//         <div className="px-6 py-3" >
//           <input
//             type="text"
//             className="border rounded w-full py-2 px-3 text-gray-700"
//             placeholder="Masukkan deskripsi jangkauan sewa"
//             value={jangkauanCustome}
//             onChange={handleInputChange}
//           />
//           <input
//             type="date"
//             className="border rounded w-full py-2 px-3 text-gray-700"
//             placeholder="Masukkan tanggal mulai"
//             value={startDate}
//             onChange={handleStartDateChange}
//           />
//           <input
//             type="date"
//             className="border rounded w-full py-2 px-3 text-gray-700"
//             placeholder="Masukkan tanggal akhir"
//             value={endDate}
//             onChange={handleEndDateChange}
//           />

//           <button
//             className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
//             onClick={handleSaveJangkauan}
//           >
//             Save
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardItem;



// import { numberToRupiah } from "@/utils/rupiah";
// import React, { useState, useEffect } from "react";
// import useAuth from "../app/hooks/useAuth";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getFirestore, doc, getDoc, getDocs, onSnapshot, collection,setDoc, query, serverTimestamp } from "firebase/firestore"; // Import Firestore functions
// import { useRouter } from "next/navigation";
// // import { numberToRupiah } from "@/utils/rupiah";
// // import React, { useState, useEffect } from "react";
// // import { getFirestore, collection, getDocs, query } from "firebase/firestore";
// // import { db, storage } from "@/firebase/firebase";
// // import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// import {
//   deleteObject,
//   getDownloadURL,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { db, storage } from "@/firebase/firebase";

// const CardItem = ({
//   imageUrl,
//   judul,
//   deskripsi,
//   harga,
//   hargaJangkauan,
//   jangkauan,
//   statusCustome,
//   fakultas,
//   addToCart,
//   timestamp,
//   addToCartCustome,
//   removeFromCart,
//   removeFromCartCustome,
//   isInCart,
//   documentID,
//   isInCartCustome,
//   statusProduct,
// }) => {
//   const [showInput, setShowInput] = useState(false); // State untuk mengontrol tampilan input
//   const [jangkauanCustome, setJangkauanCustome] = useState(""); // State untuk menyimpan jangkauan sewa
//   const [namaPembeli, setNamaPembeli] = useState('');
//   const [statusPermintaan, setStatusPermintaan] = useState(statusCustome); // State untuk menyimpan statusCustome yang terupdate
//   const [startDate, setStartDate] = useState('');
//   const [customTimestamp, setCustomTimestamp] = useState(null); // Ganti nama state menjadi customTimestamp
//   const [cartTimestamp, setCartTimestamp] = useState(null); // Ganti nama state menjadi customTimestamp
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("jakarta");
//   const [price, setPrice] = useState("");
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [downloadUrl, setDownloadUrl] = useState("");
//   const [percentage, setPercentage] = useState(null);
//   const [data, setData] = useState([]);
//   const { user, userProfile } = useAuth();
//   const auth = getAuth();
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [endDate, setEndDate] = useState("");

//   const db = getFirestore(); // Initialize Firestore

//   useEffect(() => {
//     if (user && userProfile.role === "admin") {
//       router.push("/admin");
//     }
//   }, [user, userProfile, router]);
//   useEffect(() => {
//     const unsub = onSnapshot(
//       collection(db, "desain"),
//       (snapshot) => {
//         let list = [];
//         snapshot.docs.forEach((doc) => {
//           list.push({ id: doc.id, ...doc.data() });
//         });
//         setData(list);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//     const uploadFile = async () => {
//       const storageRef = ref(
//         storage,
//         "desain/" +
//           new Date().getTime() +
//           file.name.replace(" ", "%20") +
//           "UEU"
//       );
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setPercentage(progress);
//           switch (snapshot.state) {
//             case "paused":
//               console.log("Upload is paused");
//               break;
//             case "running":
//               console.log("Upload is running");
//               break;
//           }
//         },
//         (error) => {
//           console.log(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setDownloadUrl(downloadURL);
//           });
//         }
//       );
//     };
//     file && uploadFile();
//     return () => {
//       unsub();
//     };
//   }, [file]);
//   // Fungsi untuk mengambil data dari Firestore
//   const fetchData = async () => {
//     try {
//       const docRef = doc(db, "cartMutasiCustome2", judul); // Gunakan documentID yang dinamis
//       const docSnap = await getDoc(docRef);
//       const q = query(collection(db, "products"), where("category", "==", category));
//       const querySnapshot = await getDocs(q);
//       const productsList = querySnapshot.docs.map(doc => doc.data());
//       setProducts(productsList);

//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         console.log("Document data:", data); // Debug data
//         setStartDate(data.startDate); // Set startDate dari Firestore
//         setEndDate(data.endDate); // Set endDate dari Firestore
//         setCustomTimestamp(data.timestamp?.toDate().toLocaleString());


//       } else {
//         console.error("No such document!");
//       }
//     } catch (error) {
//       console.error("Error fetching document:", error);
//     }
//   };

//   useEffect(() => {
//     if (judul) {  // Pastikan documentID tersedia sebelum memanggil fetchData
//       fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
//     }
//   }, [judul]);  // Efek ini akan dipanggil setiap kali `documentID` berubah

  
  
//   const handleToggleInput = () => {
//     setShowInput(!showInput);
//   };

//     const [categoryFilter, setCategoryFilter] = useState("all");
//   const filteredData =
//     data && categoryFilter === ""
//       ? data
//       : data.filter(
//           (product) => product.category.toLowerCase() === categoryFilter
//         );

//   const handleInputChange = (e) => {
//     setJangkauanCustome(e.target.value);
//   };

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleAddProduct = async (e) => {
//     e.preventDefault();
  
//     // Extracting the user's name from userProfile
//     const userName = userProfile?.name || userProfile?.email; // Use name or email if name is not available
  
//     const productData = {
//       id: new Date().getTime() + title + "UEU",
//       image: downloadUrl,
//       title: title,
//       description: description,
//       category: category,
//       price: price,
//       userName: userName,  // Add the userName to the productData
//       statusDesain: "Menunggu Acc Admin", // Add statusDesain to the productData
//     };
  
//     try {
//       // Adding the product data to Firestore, including userName and statusDesain
//       await setDoc(
//         doc(db, "desain", new Date().getTime() + productData.title + "UEU"),
//         {
//           ...productData,
//           timeStamp: serverTimestamp(),
//         }
//       );
  
//       // Reset form fields after successful submission
//       setFile(null);
//       setTitle("");
//       setDescription("");
//       setCategory("");
//       setPrice("");
//       document.getElementById("addProductModal").close();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (selectedProductId) {
//       const fetchProductData = async () => {
//         console.log("Fetching product data for ID:", selectedProductId); // Debug log
//         try {
//           const docRef = doc(db, "products", selectedProductId);
//           const docSnap = await getDoc(docRef);

//           if (docSnap.exists()) {
//             const data = docSnap.data();
//             console.log("Product data:", data); // Debug log
//             setTitle(data.title || "");
//             setDescription(data.description || "");
//             setCategory(data.category || "");
//             setDownloadUrl(data.image || "");
//             const modal = document.getElementById("addProductModal");
//             if (modal) modal.showModal(); // This will open the modal
//           } else {
//             console.log("Produk tidak ditemukan");
//           }
//         } catch (error) {
//           console.error("Gagal mengambil data produk:", error);
//         }
//       };
//       fetchProductData();
//     }
//   }, [selectedProductId]);

//   const handleProductClick = (productId) => {
//     setSelectedProductId(productId);
//   };
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // Fungsi untuk menampilkan modal dengan data produk yang diklik
//   const handleOpenModal = (product) => {
//     setSelectedProduct(product);
//     document.getElementById("addProductModal").showModal();
//   };

//   // Fungsi untuk menyimpan data ke koleksi "desain"
//   const handleSubmit = async () => {
//     if (!selectedProduct) return;

//     const productData = {
//       id: selectedProduct.id,
//       image: downloadUrl || selectedProduct.image,
//       title: selectedProduct.title,
//       description: selectedProduct.description,
//       category: selectedProduct.category,
//       price: selectedProduct.price,
//       jangkauan: selectedProduct.jangkauan,
//       statusCustome: selectedProduct.statusCustome,
//       statusProduct: selectedProduct.statusProduct,
//       timestamp: new Date(),  // Tambahkan waktu penyimpanan
//     };

//     try {
//       await setDoc(doc(db, "desain", selectedProduct.id), productData);
//       alert("Data berhasil disimpan ke koleksi desain");
//       document.getElementById("addProductModal").close(); // Tutup modal
//     } catch (error) {
//       console.error("Gagal menyimpan data:", error);
//     }
//   };

//   // useEffect(() => {
//   //   const fetchProducts = async () => {
//   //     try {
//   //       const querySnapshot = await getDocs(collection(db, "products"));
//   //       const productsList = querySnapshot.docs.map(doc => doc.data());
//   //       setProducts(productsList);
//   //     } catch (error) {
//   //       console.error("Error fetching products: ", error);
//   //     }
//   //   };

//   //   fetchProducts();
//   // }, []);



//     // Fungsi untuk mengambil data produk dari Firestore
//     const fetchProducts = async () => {
//       try {
//         const q = query(collection(db, "products"));
//         const querySnapshot = await getDocs(q);
//         const productsList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setProducts(productsList);
//       } catch (error) {
//         console.error("Error fetching products: ", error);
//       }
//     };
  
//     // Ambil data produk saat komponen pertama kali dimuat
//     useEffect(() => {
//       fetchProducts();
//     }, []);
  
//     // Ambil data produk lagi setelah upload selesai
//     useEffect(() => {
//       if (percentage === 100) {
//         fetchProducts();
//       }
//     }, [percentage]);
  
//     // Fungsi untuk mengunggah gambar ke Firebase Storage
    // const uploadFile = async () => {
    //   if (!file) return;
  
    //   const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    //   const uploadTask = uploadBytesResumable(storageRef, file);
  
    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       setPercentage(progress);
    //     },
    //     (error) => {
    //       console.log(error);
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //         setDownloadUrl(url);
    //         setPercentage(100);
    //       });
    //     }
    //   );
    // };

//   // Ambil data produk saat komponen pertama kali dimuat
//   useEffect(() => {
//     fetchProducts();
//   }, []);
//   useEffect(() => {
//     const fetchFilteredProducts = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "products"));
//         const productsList = querySnapshot.docs.map(doc => doc.data());
  
//         // Filter produk berdasarkan kategori yang dipilih
//         const filteredProducts = productsList.filter(product => product.category === category);
//         setProducts(filteredProducts);
//       } catch (error) {
//         console.error("Error fetching products: ", error);
//       }
//     };
  
//     fetchFilteredProducts();
//   }, [category]); // Efek ini dipicu ketika kategori berubah
  
//   // Fungsi untuk mengambil data dari Firestore berdasarkan kategori
 
//   useEffect(() => {
//     fetchData(); // Memanggil fetchData saat kategori berubah
//   }, [category]); // Efek ini dipicu saat kategori berubah


// const handleSaveJangkauan = async () => {
//   try {
//     // Mendapatkan data pengguna yang sedang login
//     const userProfile = auth.currentUser; // auth adalah instance dari Firebase Authentication
//     // const { user, userProfile } = useAuth();
//     if (!userProfile) {
//       throw new Error("Pengguna belum login.");
//     }

//     const namaPembeli = userProfile.email || "Nama Tidak Diketahui"; // Menggunakan displayName atau email, atau default jika tidak tersedia

//     const parsedJangkauan = parseFloat(jangkauanCustome);
//     const parsedHargaJangkauan = parseFloat(hargaJangkauan);

//     if (isNaN(parsedJangkauan) || isNaN(parsedHargaJangkauan)) {
//       throw new Error("jangkauan atau hargaJangkauan bukan angka yang valid.");
//     }

//     const harga = parsedJangkauan * parsedHargaJangkauan;

//     // Save data to jangkauanCustomSewa collection
//     const docRef = doc(db, "jangkauanCustomSewa", judul);
//     await setDoc(docRef, {
//       jangkauanCustome: parsedJangkauan,
//       namaPembeli,
//       startDate,
//       endDate,
//       imageUrl,
//       judul,
//       deskripsi,
//       statusCustome,
//       harga,
//       hargaJangkauan: parsedHargaJangkauan,
//       fakultas,
//       timestamp: serverTimestamp(), // Menambahkan timestamp
//     });
//     console.log("Deskripsi Jangkauan Sewa berhasil disimpan:", {
//       jangkauanCustome: parsedJangkauan,
//       namaPembeli,
//       startDate,
//       endDate,
//       imageUrl,
//       judul,
//       deskripsi,
//       statusCustome,
//       harga,
//       hargaJangkauan: parsedHargaJangkauan,
//       fakultas,
//     });

//     // Save data to cartMutasiCustome2 collection
//     const cartDocRef = doc(db, "cartMutasiCustome2", judul);
//     await setDoc(cartDocRef, {
//       jangkauanCustome: parsedJangkauan,
//       namaPembeli,
//       startDate,
//       endDate,
//       imageUrl,
//       judul,
//       deskripsi,
//       statusCustome,
//       harga,
//       hargaJangkauan: parsedHargaJangkauan,
//       fakultas,
//       timestamp: serverTimestamp(), // Menambahkan timestamp
//     });
//     console.log("Data berhasil disimpan di cartMutasiCustome2");
//   } catch (error) {
//     console.error("Gagal menyimpan deskripsi jangkauan sewa:", error);
//   }
//   setShowInput(false); // Sembunyikan input setelah menyimpan
// };

//   return (
//     <div className="w-full rounded overflow-hidden shadow-lg">
//       <img className="w-full h-44 object-cover" src={imageUrl} alt={judul} />
//       <div className="px-6 py-3">
//         {fakultas && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {fakultas}
//           </p>
//         )}
//         <div className=" text-xl mb-2">{judul}</div>
//         <p className="text-gray-700 text-base">{deskripsi}</p>
//         <br />
//         <p>Harga Sebulan</p>
//         {hargaJangkauan && (
//           <p className="text-red-600 text-base mt-2">{numberToRupiah(hargaJangkauan)}</p>
//         )}
//         <br />
//         <p>Massa Sewa</p>
//         {jangkauan && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {jangkauan}
//           </p>
//         )}
//         <br />
//         {harga && (
//           <p className="text-red-600 text-base mt-2">{numberToRupiah(harga)}</p>
//         )}
//         <br />
//         {/* Tampilkan Status dengan Condisional Class */}
//         <p>Status Custome</p>
//         {statusPermintaan && (
//           <p
//             className={`font-semibold text-base mt-2 uppercase ${
//               statusPermintaan === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
//             }`}
//           >
//             {statusPermintaan}
//           </p>
//         )}

//         <p>Stock Custome</p>
//         {statusCustome && (
//           <p
//             className={`font-semibold text-base mt-2 uppercase ${
//               statusCustome === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
//             }`}
//           >
//             {statusCustome}
//           </p>
//         )}

//         <p>Stock</p>
//         {statusProduct && (
//           <p
//             className={`font-semibold text-base mt-2 uppercase ${
//               statusProduct === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
//             }`}
//           >
//             {statusProduct}
//           </p>
//         )}

//         <p>Start Date Custome Pemesanan</p>
//         {startDate ? (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {new Date(startDate).toLocaleDateString() ?? "Tanggal tidak tersedia"}
//           </p>
//         ) : (
//           <p></p>
//         )}
//         <br/>
//                 <p>End Date Custome Pemesanan</p>
//         {endDate ? (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {new Date(endDate).toLocaleDateString() ?? "Tanggal tidak tersedia"}
//           </p>
//         ) : (
//           <p></p>
//         )}
//         <br/>
//                         <p>Sedang Dalam Proses Pemasangan Custome</p>
//         {customTimestamp ? (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {new Date(customTimestamp).toLocaleDateString() ?? "Tanggal tidak tersedia"}
//           </p>
//         ) : (
//           <p></p>
//         )}
//         <br/>
//                                 <p>Sedang Dalam Proses Pemasangan</p>
//         {customTimestamp ? (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {new Date(customTimestamp).toLocaleDateString() ?? "Tanggal tidak tersedia"}
//           </p>
//         ) : (
//           <p></p>
//         )}
//         <br/>
//       </div>
//       <br />
//       <div className="px-6 py-3">
//         {isInCart ? (
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded"
//             onClick={removeFromCart}
//           >
//             Remove From Cart
//           </button>
//         ) : (
//           // <button
//           //   className="bg-gray-200 hover:bg-teal-500 text-gray-900 hover:text-white font-bold py-2 px-4 rounded"
//           //   onClick={addToCart}
//           // >
//           //   Add To Cart
//           // </button>
//           <button
//   className="bg-gray-200 hover:bg-teal-500 text-gray-900 hover:text-white font-bold py-2 px-4 rounded"
//   onClick={() => {
//     addToCart(); // Fungsi untuk menambahkan produk ke keranjang
//     handleProductClick(isInCart); // Fungsi untuk menangani klik produk
//   }}
// >
//   Add To Cart
// </button>

//         )}
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
//           onClick={handleToggleInput}
//         >
//           {showInput ? "Cancel" : "Add Jangkauan"}
//         </button>
//         <button
//           className="btn bg-teal-600 hover:bg-teal-500 text-white"
//           onClick={() => document.getElementById("addProductModal").showModal()}
//         >
//           Add Desain
//         </button>
//         {/* Modal add user */}
//         <dialog id="addProductModal" className="modal">
//       <div className="modal-box">
//         <h3 className="font-semibold text-xl">Add Product</h3>
//         <form onSubmit={(e) => e.preventDefault()}>
//           <div className="py-4">
//             {/* Upload Image */}
//             <div className="flex flex-col gap-3 mb-3">
//               <label htmlFor="image">Image</label>
//               <input
//                 type="file"
//                 name="image"
//                 id="image"
//                 required
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//               {percentage !== null && percentage < 100 ? (
//                 <progress
//                   className="progress progress-accent w-56"
//                   value={percentage}
//                   max="100"
//                 ></progress>
//               ) : (
//                 percentage === 100 && (
//                   <div className="text-green-500 font-semibold">
//                     Upload Completed
//                   </div>
//                 )
//               )}
//               <button
//                 onClick={uploadFile}
//                 className="bg-blue-500 text-white p-2 rounded mt-2"
//               >
//                 Upload
//               </button>
//             </div>

//             {/* Menampilkan Produk dari Firestore */}
//             <h2 className="text-xl font-bold mt-6">Product List</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6 mt-4">
//               {products.length > 0 ? (
//                 products.map((product) => (
//                   <div key={product.id} className="border p-4 rounded shadow">
//                     <img src={product.image} alt={product.judul} className="w-full h-40 object-cover mb-2" />
//                     <h3 className="font-bold text-lg">{product.judul}</h3>
//                     <p className="text-gray-600">{product.deskripsi}</p>
//                     <p className="text-sm text-gray-400 mt-1">{product.fakultas}</p>
//                     <p className="text-red-500 font-bold mt-2">{numberToRupiah(product.harga)}</p>
//                     <p className="text-gray-700 text-sm">Jangkauan: {product.jangkauan}</p>
//                     <p className={`font-semibold mt-1 ${product.statusCustome === "Billboard Sedang Disewa" ? "text-red-500" : "text-gray-500"}`}>
//                       {product.statusCustome}
//                     </p>
//                     <p className={`font-semibold mt-1 ${product.statusProduct === "Billboard Sedang Disewa" ? "text-red-500" : "text-gray-500"}`}>
//                       {product.statusProduct}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-600">Tidak ada produk yang tersedia.</p>
//               )}
//             </div>

//             {/* Tombol Submit */}
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               className={`w-full btn ${
//                 percentage !== null && percentage < 100
//                   ? "btn-disabled"
//                   : "bg-teal-500"
//               }`}
//             >
//               Submit
//             </button>
//           </div>
//         </form>

//         <div className="modal-action">
//           <form method="dialog" className="flex gap-1">
//             <button
//               type="button"
//               className="btn"
//               onClick={() => document.getElementById("addProductModal").close()}
//             >
//               Close
//             </button>
//           </form>
//         </div>
//       </div>
//     </dialog>
//       </div>


//       {showInput && (
//         <div className="px-6 py-3" >
//           <input
//             type="text"
//             className="border rounded w-full py-2 px-3 text-gray-700"
//             placeholder="Masukkan deskripsi jangkauan sewa"
//             value={jangkauanCustome}
//             onChange={handleInputChange}
//           />
//           <input
//             type="date"
//             className="border rounded w-full py-2 px-3 text-gray-700"
//             placeholder="Masukkan tanggal mulai"
//             value={startDate}
//             onChange={handleStartDateChange}
//           />
//           <input
//             type="date"
//             className="border rounded w-full py-2 px-3 text-gray-700"
//             placeholder="Masukkan tanggal akhir"
//             value={endDate}
//             onChange={handleEndDateChange}
//           />

//           <button
//             className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
//             onClick={handleSaveJangkauan}
//           >
//             Save
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardItem;




// import { numberToRupiah } from "@/utils/rupiah";
// import React, { useState, useEffect } from "react";
// import useAuth from "../app/hooks/useAuth";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getFirestore, doc, getStorage,  getDoc, getDocs, onSnapshot, collection,setDoc, query, where, serverTimestamp } from "firebase/firestore"; // Import Firestore functions
// import { useRouter } from "next/navigation";

// import {
//   deleteObject,
//   getDownloadURL,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";

// import { db, storage } from "@/firebase/firebase";

// const CardItem = ({
//   imageUrl,
//   judul,
//   deskripsi,
//   harga,
//   hargaJangkauan,
//   jangkauan,
//   statusCustome,
//   fakultas,
//   addToCart,
//   timestamp,
//   addToCartCustome,
//   removeFromCart,
//   removeFromCartCustome,
//   isInCart,
//   documentID,
//   isInCartCustome,
//   statusProduct,
//   addDesain, // Prop tambahan
// }) => {
//   const [showInput, setShowInput] = useState(false); // State untuk mengontrol tampilan input
//   const [jangkauanCustome, setJangkauanCustome] = useState(""); // State untuk menyimpan jangkauan sewa
//   const [namaPembeli, setNamaPembeli] = useState('');
//   const [statusPermintaan, setStatusPermintaan] = useState(statusCustome); // State untuk menyimpan statusCustome yang terupdate
//   const [startDate, setStartDate] = useState('');
//   const [customTimestamp, setCustomTimestamp] = useState(null); // Ganti nama state menjadi customTimestamp
//   const [cartTimestamp, setCartTimestamp] = useState(null); // Ganti nama state menjadi customTimestamp
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("jakarta");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [price, setPrice] = useState("");
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [downloadUrl, setDownloadUrl] = useState("");
//   const [percentage, setPercentage] = useState(null);
//   const [data, setData] = useState([]);
//   const { user, userProfile } = useAuth();
//   const auth = getAuth();
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [endDate, setEndDate] = useState("");

//   const db = getFirestore(); // Initialize Firestore

//   useEffect(() => {
//     if (user && userProfile.role === "admin") {
//       router.push("/admin");
//     }
//   }, [user, userProfile, router]);
//   useEffect(() => {
//     const unsub = onSnapshot(
//       collection(db, "desain"),
//       (snapshot) => {
//         let list = [];
//         snapshot.docs.forEach((doc) => {
//           list.push({ id: doc.id, ...doc.data() });
//         });
//         setData(list);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//     const uploadFile = async () => {
//       const storageRef = ref(
//         storage,
//         "desain/" +
//           new Date().getTime() +
//           file.name.replace(" ", "%20") +
//           "UEU"
//       );
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setPercentage(progress);
//         },
//         (error) => {
//           console.log(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//             setDownloadUrl(url);  // Simpan URL yang benar
//           });
//         }
//       );
      
//     };
//     file && uploadFile();
//     return () => {
//       unsub();
//     };
//   }, [file]);
//   // Fungsi untuk mengambil data dari Firestore
//   const fetchData = async () => {
//     try {
//       const docRef = doc(db, "cartMutasiCustome2", judul); // Gunakan documentID yang dinamis
//       const docSnap = await getDoc(docRef);
//       const q = query(collection(db, "products"), where("category", "==", category));
//       const querySnapshot = await getDocs(q);
//       const productsList = querySnapshot.docs.map(doc => doc.data());
//       setProducts(productsList);

//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         console.log("Document data:", data); // Debug data
//         setStartDate(data.startDate); // Set startDate dari Firestore
//         setEndDate(data.endDate); // Set endDate dari Firestore
//         setCustomTimestamp(data.timestamp?.toDate().toLocaleString());


//       } else {
//         console.error("No such document!");
//       }
//     } catch (error) {
//       console.error("Error fetching document:", error);
//     }
//   };

//   useEffect(() => {
//     if (judul) {  // Pastikan documentID tersedia sebelum memanggil fetchData
//       fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
//     }
//   }, [judul]);  // Efek ini akan dipanggil setiap kali `documentID` berubah

  
  
//   const handleToggleInput = () => {
//     setShowInput(!showInput);
//   };

//     const [categoryFilter, setCategoryFilter] = useState("all");
//   const filteredData =
//     data && categoryFilter === ""
//       ? data
//       : data.filter(
//           (product) => product.category.toLowerCase() === categoryFilter
//         );

//   const handleInputChange = (e) => {
//     setJangkauanCustome(e.target.value);
//   };
//   const handleFileUpload = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleAddProduct = async (e) => {
//     e.preventDefault();
  
//     // Extracting the user's name from userProfile
//     const userName = userProfile?.name || userProfile?.email; // Use name or email if name is not available
  
//     const productData = {
//       id: new Date().getTime() + title + "UEU",
//       image: downloadUrl,
//       title: title,
//       description: description,
//       category: category,
//       price: price,
//       userName: userName,  // Add the userName to the productData
//       statusDesain: "Menunggu Acc Admin", // Add statusDesain to the productData
//     };
  
//     try {
//       // Adding the product data to Firestore, including userName and statusDesain
//       await setDoc(
//         doc(db, "desain", new Date().getTime() + productData.title + "UEU"),
//         {
//           ...productData,
//           timeStamp: serverTimestamp(),
//         }
//       );
  
//       // Reset form fields after successful submission
//       setFile(null);
//       setTitle("");
//       setDescription("");
//       setCategory("");
//       setPrice("");
//       document.getElementById("addProductModal").close();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (selectedProductId) {
//       const fetchProductData = async () => {
//         console.log("Fetching product data for ID:", selectedProductId); // Debug log
//         try {
//           const docRef = doc(db, "products", selectedProductId);
//           const docSnap = await getDoc(docRef);

//           if (docSnap.exists()) {
//             const data = docSnap.data();
//             console.log("Product data:", data); // Debug log
//             setTitle(data.title || "");
//             setDescription(data.description || "");
//             setCategory(data.category || "");
//             setDownloadUrl(data.image || "");
//             const modal = document.getElementById("addProductModal");
//             if (modal) modal.showModal(); // This will open the modal
//           } else {
//             console.log("Produk tidak ditemukan");
//           }
//         } catch (error) {
//           console.error("Gagal mengambil data produk:", error);
//         }
//       };
//       fetchProductData();
//     }
//   }, [selectedProductId]);

//   const handleProductClick = (productId) => {
//     setSelectedProductId(productId);
//   };
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // Fungsi untuk menampilkan modal dengan data produk yang diklik
//   const handleOpenModal = (product) => {
//     setSelectedProduct(product);
//     document.getElementById("addProductModal").showModal();
//   };

//   // Fungsi untuk menyimpan data ke koleksi "desain"
//   const [notificationMessage, setNotificationMessage] = useState("");
//   const [notificationType, setNotificationType] = useState("success"); // success atau error

//   const handleSubmit = async () => {
//     if (!selectedProduct) return;

//     const productData = {
//       id: selectedProduct.id,
//       image: selectedProduct.image,
//       title: selectedProduct.title,
//       description: selectedProduct.description,
//       category: selectedProduct.category,
//       price: selectedProduct.price,
//       timestamp: new Date(),
//     };

//     try {
//       await setDoc(doc(db, "desain", selectedProduct.id), productData);

//       // Tampilkan notifikasi keberhasilan
//       setNotificationType("success");
//       setNotificationMessage("Data berhasil disimpan ke koleksi desain!");

//       // Reset form setelah submit berhasil
//       setSelectedProduct(null);

//       // Tutup modal
//       document.getElementById("addProductModal").close();
//     } catch (error) {
//       console.error("Gagal menyimpan data:", error);

//       // Tampilkan notifikasi error
//       setNotificationType("error");
//       setNotificationMessage("Gagal menyimpan data ke koleksi desain. Silakan coba lagi.");
//     }

//     // Reset notifikasi setelah 3 detik
//     setTimeout(() => {
//       setNotificationMessage("");
//     }, 3000);
//   };
  

//     // Fungsi untuk mengambil data produk dari Firestore
//     const fetchProducts = async () => {
//       try {
//         const q = query(collection(db, "products"));
//         const querySnapshot = await getDocs(q);
//         const productsList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setProducts(productsList);
//       } catch (error) {
//         console.error("Error fetching products: ", error);
//       }
//     };
  
//     // Ambil data produk saat komponen pertama kali dimuat
//     useEffect(() => {
//       fetchProducts();
//     }, []);
  
//     // Ambil data produk lagi setelah upload selesai
//     useEffect(() => {
//       if (percentage === 100) {
//         fetchProducts();
//       }
//     }, [percentage]);
  
//     // Fungsi untuk mengunggah gambar ke Firebase Storage
//     const uploadFile = async () => {
//       if (!file) return;
  
//       const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);
  
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setPercentage(progress);
//         },
//         (error) => {
//           console.log(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//             setDownloadUrl(url);
//             setPercentage(100);
//           });
//         }
//       );
//     };

//   // Ambil data produk saat komponen pertama kali dimuat
//   useEffect(() => {
//     fetchProducts();
//   }, []);
//   useEffect(() => {
//     const fetchFilteredProducts = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "products"));
//         const productsList = querySnapshot.docs.map(doc => doc.data());
  
//         // Filter produk berdasarkan kategori yang dipilih
//         const filteredProducts = productsList.filter(product => product.category === category);
//         setProducts(filteredProducts);
//       } catch (error) {
//         console.error("Error fetching products: ", error);
//       }
//     };
  
//     fetchFilteredProducts();
//   }, [category]); // Efek ini dipicu ketika kategori berubah
  
//   // Fungsi untuk mengambil data dari Firestore berdasarkan kategori
 
//   useEffect(() => {
//     fetchData(); // Memanggil fetchData saat kategori berubah
//   }, [category]); // Efek ini dipicu saat kategori berubah


// // const handleSaveJangkauan = async () => {
// //   try {
// //     // Mendapatkan data pengguna yang sedang login
// //     const userProfile = auth.currentUser; // auth adalah instance dari Firebase Authentication
// //     // const { user, userProfile } = useAuth();
// //     if (!userProfile) {
// //       throw new Error("Pengguna belum login.");
// //     }

// //     const namaPembeli = userProfile.email || "Nama Tidak Diketahui"; // Menggunakan displayName atau email, atau default jika tidak tersedia

// //     const parsedJangkauan = parseFloat(jangkauanCustome);
// //     const parsedHargaJangkauan = parseFloat(hargaJangkauan);

// //     if (isNaN(parsedJangkauan) || isNaN(parsedHargaJangkauan)) {
// //       throw new Error("jangkauan atau hargaJangkauan bukan angka yang valid.");
// //     }

// //     const harga = parsedJangkauan * parsedHargaJangkauan;

// //     // Save data to jangkauanCustomSewa collection
// //     const docRef = doc(db, "jangkauanCustomSewa", judul);
// //     await setDoc(docRef, {
// //       jangkauanCustome: parsedJangkauan,
// //       namaPembeli,
// //       startDate,
// //       endDate,
// //       imageUrl,
// //       judul,
// //       deskripsi,
// //       statusCustome,
// //       harga,
// //       hargaJangkauan: parsedHargaJangkauan,
// //       fakultas,
// //       timestamp: serverTimestamp(), // Menambahkan timestamp
// //     });
// //     console.log("Deskripsi Jangkauan Sewa berhasil disimpan:", {
// //       jangkauanCustome: parsedJangkauan,
// //       namaPembeli,
// //       startDate,
// //       endDate,
// //       imageUrl,
// //       judul,
// //       deskripsi,
// //       statusCustome,
// //       harga,
// //       hargaJangkauan: parsedHargaJangkauan,
// //       fakultas,
// //     });

// //     // Save data to cartMutasiCustome2 collection
// //     const cartDocRef = doc(db, "cartMutasiCustome2", judul);
// //     await setDoc(cartDocRef, {
// //       jangkauanCustome: parsedJangkauan,
// //       namaPembeli,
// //       startDate,
// //       endDate,
// //       imageUrl,
// //       judul,
// //       deskripsi,
// //       statusCustome,
// //       harga,
// //       hargaJangkauan: parsedHargaJangkauan,
// //       fakultas,
// //       timestamp: serverTimestamp(), // Menambahkan timestamp
// //     });
// //     console.log("Data berhasil disimpan di cartMutasiCustome2");
// //   } catch (error) {
// //     console.error("Gagal menyimpan deskripsi jangkauan sewa:", error);
// //   }
// //   setShowInput(false); // Sembunyikan input setelah menyimpan
// // };


// const handleSaveJangkauan = async () => {
//   try {
//     // Mendapatkan data pengguna yang sedang login
//     const userProfile = auth.currentUser; 
//     if (!userProfile) {
//       throw new Error("Pengguna belum login.");
//     }

//     const namaPembeli = userProfile.email || "Nama Tidak Diketahui"; 

//     const parsedJangkauan = parseFloat(jangkauanCustome);
//     const parsedHargaJangkauan = parseFloat(hargaJangkauan);

//     if (isNaN(parsedJangkauan) || isNaN(parsedHargaJangkauan)) {
//       throw new Error("jangkauan atau hargaJangkauan bukan angka yang valid.");
//     }

//     const harga = parsedJangkauan * parsedHargaJangkauan;
//     let uploadedImageUrl = imageUrl; 

//     // Jika ada file yang dipilih, unggah gambar ke Storage
//     if (selectedFile) {
//       const storageRef = ref(storage, `images/${Date.now()}_${selectedFile.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, selectedFile);

//       // Menunggu upload selesai dan mendapatkan URL
//       await new Promise((resolve, reject) => {
//         uploadTask.on(
//           "state_changed",
//           null,
//           (error) => reject(error),
//           async () => {
//             uploadedImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
//             resolve();
//           }
//         );
//       });
//     }

//     // Simpan data ke koleksi "jangkauanCustomSewa"
//     const docRef = doc(db, "jangkauanCustomSewa", judul);
//     await setDoc(docRef, {
//       jangkauanCustome: parsedJangkauan,
//       namaPembeli,
//       startDate,
//       endDate,
//       imageUrl: uploadedImageUrl,
//       judul,
//       deskripsi,
//       statusCustome,
//       harga,
//       hargaJangkauan: parsedHargaJangkauan,
//       fakultas,
//       timestamp: serverTimestamp(),
//     });

//     console.log("Deskripsi Jangkauan Sewa berhasil disimpan:", {
//       jangkauanCustome: parsedJangkauan,
//       namaPembeli,
//       startDate,
//       endDate,
//       imageUrl: uploadedImageUrl,
//       judul,
//       deskripsi,
//       statusCustome,
//       harga,
//       hargaJangkauan: parsedHargaJangkauan,
//       fakultas,
//     });

//     // Simpan data ke koleksi "cartMutasiCustome2"
//     const cartDocRef = doc(db, "cartMutasiCustome2", judul);
//     await setDoc(cartDocRef, {
//       jangkauanCustome: parsedJangkauan,
//       namaPembeli,
//       startDate,
//       endDate,
//       imageUrl: uploadedImageUrl,
//       judul,
//       deskripsi,
//       statusCustome,
//       harga,
//       hargaJangkauan: parsedHargaJangkauan,
//       fakultas,
//       timestamp: serverTimestamp(),
//     });

//     console.log("Data berhasil disimpan di cartMutasiCustome2");
//   } catch (error) {
//     console.error("Gagal menyimpan deskripsi jangkauan sewa:", error);
//   }
//   setShowInput(false); 
// };


// const handleFileChange = (e) => {
//   setSelectedFile(e.target.files[0]);
// };
//   return (
//     <div className="w-full rounded overflow-hidden shadow-lg">
//       <img className="w-full h-44 object-cover" src={imageUrl} alt={judul} />
//       <div className="px-6 py-3">
//         {fakultas && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {fakultas}
//           </p>
//         )}
//         <div className=" text-xl mb-2">{judul}</div>
//         <p className="text-gray-700 text-base">{deskripsi}</p>
//         <br />
//         <p>Harga Sebulan</p>
//         {hargaJangkauan && (
//           <p className="text-red-600 text-base mt-2">{numberToRupiah(hargaJangkauan)}</p>
//         )}
//         <br />
//         <p>Massa Sewa</p>
//         {jangkauan && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {jangkauan}
//           </p>
//         )}
//         <br />
//         {harga && (
//           <p className="text-red-600 text-base mt-2">{numberToRupiah(harga)}</p>
//         )}
//         <br />
//         {/* Tampilkan Status dengan Condisional Class */}
//         <p>Status Custome</p>
//         {statusPermintaan && (
//           <p
//             className={`font-semibold text-base mt-2 uppercase ${
//               statusPermintaan === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
//             }`}
//           >
//             {statusPermintaan}
//           </p>
//         )}

//         <p>Stock Custome</p>
//         {statusCustome && (
//           <p
//             className={`font-semibold text-base mt-2 uppercase ${
//               statusCustome === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
//             }`}
//           >
//             {statusCustome}
//           </p>
//         )}

//         <p>Stock</p>
//         {statusProduct && (
//           <p
//             className={`font-semibold text-base mt-2 uppercase ${
//               statusProduct === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
//             }`}
//           >
//             {statusProduct}
//           </p>
//         )}

//         <p>Start Date Custome Pemesanan</p>
//         {startDate ? (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {new Date(startDate).toLocaleDateString() ?? "Tanggal tidak tersedia"}
//           </p>
//         ) : (
//           <p></p>
//         )}
//         <br/>
//                 <p>End Date Custome Pemesanan</p>
//         {endDate ? (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {new Date(endDate).toLocaleDateString() ?? "Tanggal tidak tersedia"}
//           </p>
//         ) : (
//           <p></p>
//         )}
//         <br/>
//                         <p>Sedang Dalam Proses Pemasangan Custome</p>
//         {customTimestamp ? (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {new Date(customTimestamp).toLocaleDateString() ?? "Tanggal tidak tersedia"}
//           </p>
//         ) : (
//           <p></p>
//         )}
//         <br/>
//                                 <p>Sedang Dalam Proses Pemasangan</p>
//         {customTimestamp ? (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {new Date(customTimestamp).toLocaleDateString() ?? "Tanggal tidak tersedia"}
//           </p>
//         ) : (
//           <p></p>
//         )}
//         <br/>
//       </div>
//       <br />
//       <div className="px-6 py-3">
//         {isInCart ? (
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded"
//             onClick={removeFromCart}
//           >
//             Remove From Cart
//           </button>
//         ) : (
//           <button
//   className="bg-gray-200 hover:bg-teal-500 text-gray-900 hover:text-white font-bold py-2 px-4 rounded"
//   onClick={() => {
//     addToCart(); // Fungsi untuk menambahkan produk ke keranjang
//     handleProductClick(isInCart); // Fungsi untuk menangani klik produk
//   }}
// >
//   Add To Cart
// </button>

//         )}
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
//           onClick={handleToggleInput}
//         >
//           {showInput ? "Cancel" : "Add Jangkauan"}
//         </button>
        
//       </div>

//       {/* Input File dan Button Submit */}
//       <div className="mt-4">
//           <input
//             type="file"
//             onChange={handleFileUpload}
//             className="mb-2"
//           />
//           <button
//             onClick={() => addDesain(file)}
//             className="bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Submit Desain
//           </button>
//         </div>


//       {/* {showInput && (
//         <div className="px-6 py-3" >
//           <input
//             type="text"
//             className="border rounded w-full py-2 px-3 text-gray-700"
//             placeholder="Masukkan deskripsi jangkauan sewa"
//             value={jangkauanCustome}
//             onChange={handleInputChange}
//           />
//           <input
//             type="date"
//             className="border rounded w-full py-2 px-3 text-gray-700"
//             placeholder="Masukkan tanggal mulai"
//             value={startDate}
//             onChange={handleStartDateChange}
//           />
//           <input
//             type="date"
//             className="border rounded w-full py-2 px-3 text-gray-700"
//             placeholder="Masukkan tanggal akhir"
//             value={endDate}
//             onChange={handleEndDateChange}
//           />

//           <button
//             className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
//             onClick={handleSaveJangkauan}
//           >
//             Save
//           </button>
//         </div>
//       )} */}
//       {showInput && (
//   <div className="px-6 py-3">
//     <input
//       type="text"
//       className="border rounded w-full py-2 px-3 text-gray-700"
//       placeholder="Masukkan deskripsi jangkauan sewa"
//       value={jangkauanCustome}
//       onChange={handleInputChange}
//     />
//     <input
//       type="date"
//       className="border rounded w-full py-2 px-3 text-gray-700"
//       placeholder="Masukkan tanggal mulai"
//       value={startDate}
//       onChange={handleStartDateChange}
//     />
//     <input
//       type="date"
//       className="border rounded w-full py-2 px-3 text-gray-700"
//       placeholder="Masukkan tanggal akhir"
//       value={endDate}
//       onChange={handleEndDateChange}
//     />
//     <input
//       type="file"
//       className="border rounded w-full py-2 px-3 text-gray-700 mt-2"
//       onChange={handleFileChange}
//     />
//     <button
//       className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
//       onClick={handleSaveJangkauan}
//     >
//       Save
//     </button>
//   </div>
// )}
//     </div>
//   );
// };

// export default CardItem;






















import { numberToRupiah } from "@/utils/rupiah";
import React, { useState, useEffect } from "react";
import useAuth from "../app/hooks/useAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getStorage,  getDoc, getDocs, onSnapshot, collection,setDoc, query, where, serverTimestamp } from "firebase/firestore"; // Import Firestore functions
import { useRouter } from "next/navigation";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { db, storage } from "@/firebase/firebase";

const CardItem = ({
  imageUrl,
  judul,
  deskripsi,
  harga,
  hargaJangkauan,
  jangkauan,
  statusCustome,
  fakultas,
  addToCart,
  timestamp,
  addToCartCustome,
  removeFromCart,
  removeFromCartCustome,
  isInCart,
  documentID,
  isInCartCustome,
  statusProduct,
  addDesain, // Prop tambahan
}) => {
  const [showInput, setShowInput] = useState(false); // State untuk mengontrol tampilan input
  const [jangkauanCustome, setJangkauanCustome] = useState(""); // State untuk menyimpan jangkauan sewa
  const [namaPembeli, setNamaPembeli] = useState('');
  const [statusPermintaan, setStatusPermintaan] = useState(statusCustome); // State untuk menyimpan statusCustome yang terupdate
  const [startDate, setStartDate] = useState('');
  const [customTimestamp, setCustomTimestamp] = useState(null); // Ganti nama state menjadi customTimestamp
  const [cartTimestamp, setCartTimestamp] = useState(null); // Ganti nama state menjadi customTimestamp
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("jakarta");
  const [selectedFile, setSelectedFile] = useState(null);
  const [price, setPrice] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [data, setData] = useState([]);
  const { user, userProfile } = useAuth();
  const auth = getAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [endDate, setEndDate] = useState("");

  const db = getFirestore(); // Initialize Firestore

  useEffect(() => {
    if (user && userProfile.role === "admin") {
      router.push("/admin");
    }
  }, [user, userProfile, router]);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "desain"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );
    const uploadFile = async () => {
      const storageRef = ref(
        storage,
        "desain/" +
          new Date().getTime() +
          file.name.replace(" ", "%20") +
          "PT TECMA MIRATAMA ADVERTINDO"
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentage(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDownloadUrl(url);  // Simpan URL yang benar
          });
        }
      );
      
    };
    file && uploadFile();
    return () => {
      unsub();
    };
  }, [file]);
  // Fungsi untuk mengambil data dari Firestore
  const fetchData = async () => {
    try {
      const docRef = doc(db, "cartMutasiCustome2", judul); // Gunakan documentID yang dinamis
      const docSnap = await getDoc(docRef);
      const q = query(collection(db, "products"), where("category", "==", category));
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map(doc => doc.data());
      setProducts(productsList);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Document data:", data); // Debug data
        setStartDate(data.startDate); // Set startDate dari Firestore
        setEndDate(data.endDate); // Set endDate dari Firestore
        setCustomTimestamp(data.timestamp?.toDate().toLocaleString());


      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  useEffect(() => {
    if (judul) {  // Pastikan documentID tersedia sebelum memanggil fetchData
      fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
    }
  }, [judul]);  // Efek ini akan dipanggil setiap kali `documentID` berubah

  
  
  const handleToggleInput = () => {
    setShowInput(!showInput);
  };

    const [categoryFilter, setCategoryFilter] = useState("all");
  const filteredData =
    data && categoryFilter === ""
      ? data
      : data.filter(
          (product) => product.category.toLowerCase() === categoryFilter
        );

  const handleInputChange = (e) => {
    setJangkauanCustome(e.target.value);
  };
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
  
    // Extracting the user's name from userProfile
    const userName = userProfile?.name || userProfile?.email; // Use name or email if name is not available
  
    const productData = {
      id: new Date().getTime() + title + "PT TECMA MIRATAMA ADVERTINDO",
      image: downloadUrl,
      title: title,
      description: description,
      category: category,
      price: price,
      userName: userName,  // Add the userName to the productData
      statusDesain: "Menunggu Acc Admin", // Add statusDesain to the productData
    };
  
    try {
      // Adding the product data to Firestore, including userName and statusDesain
      await setDoc(
        doc(db, "desain", new Date().getTime() + productData.title + "PT TECMA MIRATAMA ADVERTINDO"),
        {
          ...productData,
          timeStamp: serverTimestamp(),
        }
      );
  
      // Reset form fields after successful submission
      setFile(null);
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      document.getElementById("addProductModal").close();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedProductId) {
      const fetchProductData = async () => {
        console.log("Fetching product data for ID:", selectedProductId); // Debug log
        try {
          const docRef = doc(db, "products", selectedProductId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Product data:", data); // Debug log
            setTitle(data.title || "");
            setDescription(data.description || "");
            setCategory(data.category || "");
            setDownloadUrl(data.image || "");
            const modal = document.getElementById("addProductModal");
            if (modal) modal.showModal(); // This will open the modal
          } else {
            console.log("Produk tidak ditemukan");
          }
        } catch (error) {
          console.error("Gagal mengambil data produk:", error);
        }
      };
      fetchProductData();
    }
  }, [selectedProductId]);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  };
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fungsi untuk menampilkan modal dengan data produk yang diklik
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    document.getElementById("addProductModal").showModal();
  };

  // Fungsi untuk menyimpan data ke koleksi "desain"
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success"); // success atau error

  const handleSubmit = async () => {
    if (!selectedProduct) return;

    const productData = {
      id: selectedProduct.id,
      image: selectedProduct.image,
      title: selectedProduct.title,
      description: selectedProduct.description,
      category: selectedProduct.category,
      price: selectedProduct.price,
      timestamp: new Date(),
    };

    try {
      await setDoc(doc(db, "desain", selectedProduct.id), productData);

      // Tampilkan notifikasi keberhasilan
      setNotificationType("success");
      setNotificationMessage("Data berhasil disimpan ke koleksi desain!");

      // Reset form setelah submit berhasil
      setSelectedProduct(null);

      // Tutup modal
      document.getElementById("addProductModal").close();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);

      // Tampilkan notifikasi error
      setNotificationType("error");
      setNotificationMessage("Gagal menyimpan data ke koleksi desain. Silakan coba lagi.");
    }

    // Reset notifikasi setelah 3 detik
    setTimeout(() => {
      setNotificationMessage("");
    }, 3000);
  };
  

    // Fungsi untuk mengambil data produk dari Firestore
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
  
    // Ambil data produk saat komponen pertama kali dimuat
    useEffect(() => {
      fetchProducts();
    }, []);
  
    // Ambil data produk lagi setelah upload selesai
    useEffect(() => {
      if (percentage === 100) {
        fetchProducts();
      }
    }, [percentage]);
  
    // Fungsi untuk mengunggah gambar ke Firebase Storage
    const uploadFile = async () => {
      if (!file) return;
  
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentage(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDownloadUrl(url);
            setPercentage(100);
          });
        }
      );
    };

  // Ambil data produk saat komponen pertama kali dimuat
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map(doc => doc.data());
  
        // Filter produk berdasarkan kategori yang dipilih
        const filteredProducts = productsList.filter(product => product.category === category);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
  
    fetchFilteredProducts();
  }, [category]); // Efek ini dipicu ketika kategori berubah
  
  // Fungsi untuk mengambil data dari Firestore berdasarkan kategori
 
  useEffect(() => {
    fetchData(); // Memanggil fetchData saat kategori berubah
  }, [category]); // Efek ini dipicu saat kategori berubah


const handleSaveJangkauan = async () => {
  try {
    // Mendapatkan data pengguna yang sedang login
    const userProfile = auth.currentUser; 
    if (!userProfile) {
      throw new Error("Pengguna belum login.");
    }

    const namaPembeli = userProfile.email || "Nama Tidak Diketahui"; 

    const parsedJangkauan = parseFloat(jangkauanCustome);
    const parsedHargaJangkauan = parseFloat(hargaJangkauan);

    if (isNaN(parsedJangkauan) || isNaN(parsedHargaJangkauan)) {
      throw new Error("jangkauan atau hargaJangkauan bukan angka yang valid.");
    }

    const harga = parsedJangkauan * parsedHargaJangkauan;
    let uploadedImageUrl = imageUrl; 

    // Jika ada file yang dipilih, unggah gambar ke Storage
    if (selectedFile) {
      const storageRef = ref(storage, `images/${Date.now()}_${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      // Menunggu upload selesai dan mendapatkan URL
      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          async () => {
            uploadedImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    }

    // Simpan data ke koleksi "jangkauanCustomSewa"
    const docRef = doc(db, "jangkauanCustomSewa", judul);
    await setDoc(docRef, {
      jangkauanCustome: parsedJangkauan,
      namaPembeli,
      startDate,
      endDate,
      imageUrl: uploadedImageUrl,
      judul,
      deskripsi,
      statusCustome,
      harga,
      hargaJangkauan: parsedHargaJangkauan,
      fakultas,
      timestamp: serverTimestamp(),
    });

    console.log("Deskripsi Jangkauan Sewa berhasil disimpan:", {
      jangkauanCustome: parsedJangkauan,
      namaPembeli,
      startDate,
      endDate,
      imageUrl: uploadedImageUrl,
      judul,
      deskripsi,
      statusCustome,
      harga,
      hargaJangkauan: parsedHargaJangkauan,
      fakultas,
    });

    // Simpan data ke koleksi "cartMutasiCustome2"
    const cartDocRef = doc(db, "cartMutasiCustome2", judul);
    await setDoc(cartDocRef, {
      jangkauanCustome: parsedJangkauan,
      namaPembeli,
      startDate,
      endDate,
      imageUrl: uploadedImageUrl,
      judul,
      deskripsi,
      statusCustome,
      harga,
      hargaJangkauan: parsedHargaJangkauan,
      fakultas,
      timestamp: serverTimestamp(),
    });

    console.log("Data berhasil disimpan di cartMutasiCustome2");
  } catch (error) {
    console.error("Gagal menyimpan deskripsi jangkauan sewa:", error);
  }
  setShowInput(false); 
};


const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};

// const [showDetails, setShowDetails] = useState(false);

//   const handleImageClick = () => {
//     setShowDetails(!showDetails);
//   };

const details = [
  fakultas,
  judul,
  deskripsi,
  hargaJangkauan,
  harga,
  jangkauan,
  statusPermintaan,
  statusCustome,
  statusProduct,
  startDate,
  endDate,
  customTimestamp
];
const [currentIndex, setCurrentIndex] = useState(0);
const [showDetails, setShowDetails] = useState(false);

useEffect(() => {
  let interval;
  if (showDetails) {
    interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % details.length);
    }, 5000);
  }
  return () => clearInterval(interval);
}, [showDetails]);

const handleImageClick = () => {
  setShowDetails((prev) => !prev);
};
  return (
    <div className="w-full rounded overflow-hidden shadow-lg">
      {/* <img className="w-full h-44 object-cover" src={imageUrl} alt={judul} onClick={handleImageClick} /> */}
      <div className="relative w-full h-30">
  <img
    className="w-full h-full object-cover brightness-75"
    src={imageUrl}
    alt={judul}
    onClick={handleImageClick}
  />
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="text-white text-lg font-semibold"     onClick={handleImageClick}>{judul}</span>
  </div>
</div>
      {showDetails && (
      <div className="px-6 py-3">
        { currentIndex === 0 && fakultas && (
          <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
            {fakultas}
          </p>
        )}
        {currentIndex === 1 &&<div className=" text-xl mb-2">{judul}</div>}
        {currentIndex === 2 &&<p className="text-gray-700 text-base">{deskripsi}</p>}
        <br />
        {currentIndex === 3 &&<p>Harga Sebulan</p>}
        {currentIndex === 3 && hargaJangkauan && (
          <p className="text-red-600 text-base mt-2">{numberToRupiah(hargaJangkauan)}</p>
        )}
        <br />
        {currentIndex === 4 &&<p>Massa Sewa</p>}
        {currentIndex === 4 && jangkauan && (
          <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
            {jangkauan}
          </p>
        )}
        <br />
        {currentIndex === 4 && harga && (
          <p className="text-red-600 text-base mt-2">{numberToRupiah(harga)}</p>
        )}
        <br />
        {/* Tampilkan Status dengan Condisional Class */}
        {currentIndex === 5 && <p>Status Custome</p>}
        {currentIndex === 5 && statusPermintaan && (
          <p
            className={`font-semibold text-base mt-2 uppercase ${
              statusPermintaan === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
            }`}
          >
            {statusPermintaan}
          </p>
        )}

       {currentIndex === 6 && <p>Stock Custome</p>}
        {currentIndex === 6 && statusCustome && (
          <p
            className={`font-semibold text-base mt-2 uppercase ${
              statusCustome === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
            }`}
          >
            {statusCustome}
          </p>
        )}

        {currentIndex === 7 &&<p>Stock</p>}
        {currentIndex === 7 && statusProduct && (
          <p
            className={`font-semibold text-base mt-2 uppercase ${
              statusProduct === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
            }`}
          >
            {statusProduct}
          </p>
        )}

        {currentIndex === 8 &&<p>Start Date Custome Pemesanan</p>}
        {currentIndex === 8 && startDate ? (
          <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
            {new Date(startDate).toLocaleDateString() ?? "Tanggal tidak tersedia"}
          </p>
        ) : (
          <p></p>
        )}
        <br/>
                {currentIndex === 9 &&<p>End Date Custome Pemesanan</p>}
        {currentIndex === 9 && endDate ? (
          <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
            {new Date(endDate).toLocaleDateString() ?? "Tanggal tidak tersedia"}
          </p>
        ) : (
          <p></p>
        )}
        <br/>
                        {currentIndex === 10 &&<p>Sedang Dalam Proses Pemasangan Custome</p>}
        {currentIndex === 10 && customTimestamp ? (
          <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
            {new Date(customTimestamp).toLocaleDateString() ?? "Tanggal tidak tersedia"}
          </p>
        ) : (
          <p></p>
        )}
        <br/>
                                {currentIndex === 11 &&<p>Sedang Dalam Proses Pemasangan</p>}
        {currentIndex === 11 && customTimestamp ? (
          <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
            {new Date(customTimestamp).toLocaleDateString() ?? "Tanggal tidak tersedia"}
          </p>
        ) : (
          <p></p>
        )}
        <br/>
      </div>
    )}
      <br />
      <div className="px-6 py-3">
        {isInCart ? (
          <button
            className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded"
            onClick={removeFromCart}
          >
            Remove From Cart
          </button>
        ) : (
          <button
  className="bg-gray-200 hover:bg-teal-500 text-gray-900 hover:text-white font-bold py-2 px-4 rounded"
  onClick={() => {
    addToCart(); // Fungsi untuk menambahkan produk ke keranjang
    handleProductClick(isInCart); // Fungsi untuk menangani klik produk
  }}
>
  Add To Cart
</button>

        )}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={handleToggleInput}
        >
          {showInput ? "Cancel" : "Add Jangkauan"}
        </button>
        
      </div>

      {/* Input File dan Button Submit */}
      <div className="mt-4">
          <input
            type="file"
            onChange={handleFileUpload}
            className="mb-2"
          />
          <button
            onClick={() => addDesain(file)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit Desain
          </button>
        </div>

      {showInput && (
  <div className="px-6 py-3">
    <input
      type="text"
      className="border rounded w-full py-2 px-3 text-gray-700"
      placeholder="Masukkan deskripsi jangkauan sewa"
      value={jangkauanCustome}
      onChange={handleInputChange}
    />
    <input
      type="date"
      className="border rounded w-full py-2 px-3 text-gray-700"
      placeholder="Masukkan tanggal mulai"
      value={startDate}
      onChange={handleStartDateChange}
    />
    <input
      type="date"
      className="border rounded w-full py-2 px-3 text-gray-700"
      placeholder="Masukkan tanggal akhir"
      value={endDate}
      onChange={handleEndDateChange}
    />
    <input
      type="file"
      className="border rounded w-full py-2 px-3 text-gray-700 mt-2"
      onChange={handleFileChange}
    />
    <button
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
      onClick={handleSaveJangkauan}
    >
      Save
    </button>
  </div>
)}
    </div>
  );
};

export default CardItem;