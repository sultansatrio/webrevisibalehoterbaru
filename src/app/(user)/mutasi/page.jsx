// "use client"
// import React, { useEffect, useState } from "react";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import { numberToRupiah } from "@/utils/rupiah"; // Utility to format prices in Rupiah
// import useAuth from "@/app/hooks/useAuth"; // Custom hook to get user info
// import Navbar from "@/components/Navbar";

// const Mutasi = () => {
//   const { user } = useAuth();
//   const [cartItems, setCartItems] = useState([]);
//   const [totalMutasi, setTotalMutasi] = useState(0);

//   // Fetch cart data in real-time from Firestore
//   useEffect(() => {
//     if (user) {
//       const cartDocRef = doc(db, "cart", user.uid);

//       // Listen to cart changes in Firestore
//       const unsubscribe = onSnapshot(cartDocRef, (docSnapshot) => {
//         if (docSnapshot.exists()) {
//           const cartData = docSnapshot.data().pesanan || [];
//           setCartItems(cartData);

//           // Calculate total, using 0 as a fallback for missing or invalid `price`
//           const total = cartData.reduce((sum, item) => {
//             const itemPrice = parseInt(item.price) || 0;
//             return sum + itemPrice;
//           }, 0);
//           setTotalMutasi(total);
//         } else {
//           setCartItems([]);
//           setTotalMutasi(0);
//         }
//       });

//       // Clean up the listener on unmount
//       return () => unsubscribe();
//     }
//   }, [user]);

//   return (
//     <>
//     <Navbar/>
//     <div className="mb-30" style={{ paddingTop: '150px', paddingLeft: '100px' }}>
//       <h2>Detail Pembayaran</h2>
//       {cartItems.length === 0 ? (
//         <p>Tidak ada item dalam mutasi.</p>
//       ) : (
//         <ul>
//           {cartItems.map((item) => (
//             <li key={item.id}>
//               <p>
//                 {item.title}: {numberToRupiah(parseInt(item.price) || 0)}
//               </p>
//               <p>Kategori: {item.category}</p>
//               <p>Deskripsi: {item.description}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//       <p>Total: {numberToRupiah(totalMutasi)}</p>
//     </div>
//     </>
//   );
// };

// export default Mutasi;



// "use client";
// import React, { useEffect, useState } from "react";
// import { collection, query, where, onSnapshot } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import { numberToRupiah } from "@/utils/rupiah"; // Utility to format prices in Rupiah
// import useAuth from "@/app/hooks/useAuth"; // Custom hook to get user info
// import Navbar from "@/components/Navbar";

// const Mutasi = () => {
//   const { user } = useAuth(); // Ambil data user yang sedang login
//   const [cartItems, setCartItems] = useState([]);
//   const [totalMutasi, setTotalMutasi] = useState(0);

//   // Fetch cart data in real-time from Firestore
//   useEffect(() => {
//     if (user) {
//       // Query the 'cart' collection for the user's items
//       const cartQuery = query(
//         collection(db, "cart"),
//         where("user_id", "==", user.uid) // Filter by user_id
//       );

//       // Listen to cart changes in Firestore
//       const unsubscribe = onSnapshot(cartQuery, (querySnapshot) => {
//         if (!querySnapshot.empty) {
//           const cartData = querySnapshot.docs.map(doc => doc.data()); // Get data from each document

//           setCartItems(cartData);

//           // Calculate total, using 0 as a fallback for missing or invalid `price`
//           const total = cartData.reduce((sum, item) => {
//             const itemPrice = parseInt(item.price) || 0;
//             return sum + itemPrice;
//           }, 0);
//           setTotalMutasi(total);
//         } else {
//           setCartItems([]);
//           setTotalMutasi(0);
//         }
//       });

//       // Clean up the listener on unmount
//       return () => unsubscribe();
//     }
//   }, [user]);

//   return (
//     <>
//       <Navbar />
//       <div className="transaction-history" style={{ paddingTop: '150px', paddingLeft: '100px' }}>
//         <h1 className="text-2xl font-bold mb-4">Detail Pembayaran untuk {user ? user.displayName : "Pengguna Tidak Diketahui"}</h1>
//         {cartItems.length === 0 ? (
//           <p>Tidak ada item dalam mutasi.</p>
//         ) : (
//           <div className="mb-6 border p-4 rounded">
//             <h2 className="text-xl font-semibold mb-2">Pesanan Anda:</h2>
//             <table className="table-auto w-full border">
//               <thead>
//                 <tr>
//                   <th>Judul</th>
//                   <th>Kategori</th>
//                   <th>Deskripsi</th>
//                   <th>Harga</th>
//                   <th>Status</th>
//                   <th>Username</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item, index) => (
//                   <tr key={index}>
//                     <td>{item.title}</td>
//                     <td>{item.category}</td>
//                     <td>{item.description}</td>
//                     <td>{numberToRupiah(parseInt(item.price) || 0)}</td>
//                     <td>{item.status || "Status Tidak Diketahui"}</td>
//                     <td>{item.userName || "Tidak Diketahui"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//         <p className="mt-4">Total: {numberToRupiah(totalMutasi)}</p>
//       </div>
//     </>
//   );
// };

// export default Mutasi;



// "use client";

// import React, { useEffect, useState } from "react";
// import { db } from "@/firebase/firebase";
// import { collection, getDocs } from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth
// import Navbar from "@/components/Navbar";

// const Mutasi = () => {
//   const [approvedTransactions, setApprovedTransactions] = useState([]);
//   const [approvedTransactionsCustome, setApprovedTransactionsCustome] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null); // State for logged-in user
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const auth = getAuth(); // Initialize Firebase Auth
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user); // Set the logged-in user
//       } else {
//         setCurrentUser(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe(); // Cleanup listener
//   }, []);

//   useEffect(() => {
//     const fetchApprovedTransactions = async () => {
//       if (!currentUser) return; // Wait until the user is logged in

//       try {
//         const querySnapshot = await getDocs(collection(db, "cartMutasi"));
//         const data = querySnapshot.docs
//           .map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//           .filter(
//             (transaction) =>
//               transaction.statusMutasi === "Transaksi Sukses,Baleho Sudah Di Order" &&
//               transaction.userId === currentUser.uid // Match userId with logged-in user
//           );
//         setApprovedTransactions(data);
//       } catch (error) {
//         console.error("Error fetching approved transactions:", error);
//       }
//     };

//     fetchApprovedTransactions();
//   }, [currentUser]); // Refetch transactions when currentUser changes

//   useEffect(() => {
//     const fetchApprovedTransactionsCustome = async () => {
//       if (!currentUser) return; // Wait until the user is logged in

//       try {
//         const querySnapshot = await getDocs(collection(db, "cartMutasiCustome"));
//         const data = querySnapshot.docs
//           .map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//           .filter(
//             (transaction) =>
//               transaction.statusCustome === 
// "Di Acc Admin Silahkan Memasukkan ke Keranjang"
//           );
//         setApprovedTransactionsCustome(data);
//       } catch (error) {
//         console.error("Error fetching approved transactions:", error);
//       }
//     };

//     fetchApprovedTransactionsCustome();
//   }, [currentUser]); // Refetch transactions when currentUser changes

//   if (loading) {
//     return <p>Loading...</p>; // Show loading state until user info is available
//   }

//   return (
//     <>
//       <Navbar />
//       <div
//         className="approved-transactions"
//         style={{ paddingTop: "150px", paddingLeft: "100px" }}
//       >
//         <h1 className="text-2xl font-bold mb-4">Mutasi Transaksi Disetujui</h1>
//         {approvedTransactions.length === 0 ? (
//           <p>Tidak ada transaksi yang disetujui.</p>
//         ) : (
//           approvedTransactions.map((transaction) => (
//             <div key={transaction.id} className="mb-6 border p-4 rounded">
//               <h2 className="text-xl font-semibold mb-2">
//                 Order ID: {transaction.id}
//               </h2>
//               <p>
//                 <strong>User Name:</strong>{" "}
//                 {transaction.userName || "Tidak Diketahui"}
//               </p>
//               <p>
//                 <strong>Status:</strong>{" "}
//                 {transaction.statusMutasi || "Tidak Diketahui"}
//               </p>
//               <p>
//                 <strong>Tanggal:</strong>{" "}
//                 {transaction.timeStamp
//                   ? transaction.timeStamp.toDate
//                     ? new Date(
//                         transaction.timeStamp.toDate()
//                       ).toLocaleString()
//                     : "Format tanggal tidak valid"
//                   : "Tanggal tidak tersedia"}
//               </p>
//               <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
//               {transaction.pesanan ? (
//                 <table className="table-auto w-full border">
//                   <thead>
//                     <tr>
//                       <th>Judul</th>
//                       <th>Kategori</th>
//                       <th>Deskripsi</th>
//                       <th>Harga</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {transaction.pesanan.map((item, index) => (
//                       <tr key={index}>
//                         <td>{item.title}</td>
//                         <td>{item.category}</td>
//                         <td>{item.description}</td>
//                         <td>{item.price}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <p>Pesanan tidak tersedia.</p>
//               )}
//             </div>
//           ))
//         )}
//         <h1 className="text-2xl font-bold mb-4">Mutasi Transaksi Custome Disetujui</h1>
//         {approvedTransactionsCustome.length === 0 ? (
//           <p>Tidak ada transaksi yang disetujui.</p>
//         ) : (
//           approvedTransactionsCustome.map((transaction) => (
//             <div key={transaction.id} className="mb-6 border p-4 rounded">
//               <h2 className="text-xl font-semibold mb-2">
//                 Order ID: {transaction.judul}
//               </h2>
//               {/* <p>
//                 <strong>User Name:</strong>{" "}
//                 {transaction.userName || "Tidak Diketahui"}
//               </p> */}
//               <p>
//                 <strong>Status:</strong>{" "}
//                 {transaction.statusCustome || "Tidak Diketahui"}
//               </p>
//               {/* <p>
//                 <strong>Tanggal:</strong>{" "}
//                 {transaction.timeStamp
//                   ? transaction.timeStamp.toDate
//                     ? new Date(
//                         transaction.timeStamp.toDate()
//                       ).toLocaleString()
//                     : "Format tanggal tidak valid"
//                   : "Tanggal tidak tersedia"}
//               </p> */}
//               <p>
//                 <strong>Awal Pemasangan:</strong>
//                 {transaction.startDate}
//               </p>
//               <p>
//                 <strong>Akhir Pemasangan:</strong>
//                 {transaction.endDate}
//               </p>
//               <p>
//                 <strong>Deskripsi:</strong>
//                 {transaction.deskripsi}
//               </p>
//               <p>
//                 <strong>Jangkauan:</strong>
//                 {transaction.jangkauanCustome}
//               </p>
//               <p>
//                 <strong>Harga:</strong>
//                 {transaction.harga}
//               </p>
//               <p>
//                 <strong>Harga Jangkauan:</strong>
//                 {transaction.hargaJangkauan}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default Mutasi;



// "use client";

// import React, { useEffect, useState } from "react";
// import { db } from "@/firebase/firebase";
// import { collection, getDocs, getDoc, addDoc, updateDoc, doc } from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth
// import Navbar from "@/components/Navbar";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const Mutasi = () => {
//   const [approvedTransactions, setApprovedTransactions] = useState([]);
//   const [approvedTransactionsCustome, setApprovedTransactionsCustome] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null); // State for logged-in user
//   const [loading, setLoading] = useState(true);
//   const [image, setImage] = useState(null); // State for image input
//   const [imageUploadProgress, setImageUploadProgress] = useState(0);


// const storage = getStorage(); // Initialize Firebase Storage

//   useEffect(() => {
//     const auth = getAuth(); // Initialize Firebase Auth
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user); // Set the logged-in user
//       } else {
//         setCurrentUser(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe(); // Cleanup listener
//   }, []);

//   // const [imageCustome, setImageCustome] = useState(null);
//   // // const [selectedImage, setSelectedImage] = useState(null);

//   // const handleImageChangeCustome = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     setImageCustome(file);
//   //   }
//   // };

//   // const handleImageUploadCustome = async (transactionId) => {
//   //   if (!imageCustome) {
//   //     alert("Pilih gambar terlebih dahulu.");
//   //     return;
//   //   }
  
//   //   const storage = getStorage();
//   //   const storageRef = ref(storage, `images/${transactionId}/${imageCustome.name}`);
  
//   //   try {
//   //     // Upload image to Firebase Storage
//   //     const uploadTask = await uploadBytes(storageRef, imageCustome);
//   //     const downloadURL = await getDownloadURL(uploadTask.ref);
  
//   //     // Check if the transaction document exists before updating
//   //     const transactionRef = doc(db, "cartMutasi", transactionId);
//   //     const transactionSnap = await getDoc(transactionRef);
  
//   //     if (!transactionSnap.exists()) {
//   //       console.error("Dokumen transaksi tidak ditemukan:", transactionId);
//   //       alert("Dokumen transaksi tidak ditemukan.");
//   //       return;
//   //     }
  
//   //     const transactionData = transactionSnap.data();
  
//   //     // Add data to the cart collection
//   //     const cartRef = collection(db, "cart");
//   //     await addDoc(cartRef, {
//   //       ...transactionData, // Copy all data from cartMutasi
//   //       imageUrl: downloadURL, // Include the image URL
//   //       timestamp: new Date(), // Add a timestamp or any other custom field
//   //     });
  
//   //     alert("Gambar berhasil diunggah dan data disimpan ke keranjang!");
//   //   } catch (error) {
//   //     console.error("Terjadi kesalahan saat mengunggah gambar:", error);
//   //     alert("Terjadi kesalahan saat mengunggah gambar.");
//   //   }
//   // };


//   const [imageCustome, setImageCustome] = useState(null);

// const handleImageChangeCustome = (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     setImageCustome(file);
//   }
// };

// const handleImageUploadCustome = async (transaction) => {
//   if (imageCustome) {
//     try {
//       // Create a storage reference
//       const imageRef = ref(storage, `images/${imageCustome.name}`);
      
//       // Upload the image
//       await uploadBytes(imageRef, imageCustome);
      
//       // Get the image URL
//       const imageUrl = await getDownloadURL(imageRef);

//       // Add transaction data to Firestore
//       await addDoc(collection(db, "cartMutasiCustome3"), {
//         orderId: transaction.judul,
//         namaPembeli: transaction.namaPembeli || "Tidak Diketahui",
//         status: transaction.statusCustome,
//         startDate: transaction.startDate,
//         endDate: transaction.endDate,
//         deskripsi: transaction.deskripsi,
//         jangkauanCustome: transaction.jangkauanCustome,
//         harga: transaction.harga,
//         hargaJangkauan: transaction.hargaJangkauan,
//         imageUrl: imageUrl, // Store the image URL here
//         timestamp: new Date(), // Store timestamp
//       });

//       // Clear the image input
//       setImageCustome(null);

//       alert("Transaction data and image uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       alert("Error uploading the image. Please try again.");
//     }
//   } else {
//     alert("Please select an image before uploading.");
//   }
// };
  
//   useEffect(() => {
//     const fetchApprovedTransactions = async () => {
//       if (!currentUser) return; // Wait until the user is logged in

//       try {
//         const querySnapshot = await getDocs(collection(db, "cartMutasi"));
//         const data = querySnapshot.docs
//           .map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//           .filter(
//             (transaction) =>
//               transaction.statusMutasi === "Transaksi Sukses,Baleho Sudah Di Order" &&
//               transaction.userId === currentUser.uid // Match userId with logged-in user
//           );
//         setApprovedTransactions(data);
//       } catch (error) {
//         console.error("Error fetching approved transactions:", error);
//       }
//     };

//     fetchApprovedTransactions();
//   }, [currentUser]); // Refetch transactions when currentUser changes

//   useEffect(() => {
//     const fetchApprovedTransactionsCustome = async () => {
//       if (!currentUser) return; // Wait until the user is logged in

//       try {
//         const querySnapshot = await getDocs(collection(db, "cartMutasiCustome"));
//         const data = querySnapshot.docs
//           .map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//           .filter(
//             (transaction) =>
//               transaction.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"
//           );
//         setApprovedTransactionsCustome(data);
//       } catch (error) {
//         console.error("Error fetching approved transactions:", error);
//       }
//     };

//     fetchApprovedTransactionsCustome();
//   }, [currentUser]); // Refetch transactions when currentUser changes

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };

//   // const handleImageUpload = async (transactionId) => {
//   //   if (!image) {
//   //     alert("Please select an image to upload.");
//   //     return;
//   //   }

//   //   const storage = getStorage();
//   //   const storageRef = ref(storage, `images/${transactionId}/${image.name}`);
    
//   //   try {
//   //     const uploadTask = await uploadBytes(storageRef, image);
//   //     const downloadURL = await getDownloadURL(uploadTask.ref);
      
//   //     // Now update the Firestore document with the image URL
//   //     const transactionRef = doc(db, "cartMutasi", transactionId);
//   //     await updateDoc(transactionRef, {
//   //       imageUrl: downloadURL,
//   //     });
      
//   //     alert("Image uploaded successfully!");
//   //   } catch (error) {
//   //     console.error("Error uploading image:", error);
//   //   }
//   // };


//   // const handleImageUpload = async (transactionId) => {
//   //   if (!image) {
//   //     alert("Please select an image to upload.");
//   //     return;
//   //   }
  
//   //   const storage = getStorage();
//   //   const storageRef = ref(storage, `images/${transactionId}/${image.name}`);
  
//   //   try {
//   //     // Upload image to Firebase Storage
//   //     const uploadTask = await uploadBytes(storageRef, image);
//   //     const downloadURL = await getDownloadURL(uploadTask.ref);
  
//   //     // Update the Firestore document in cartMutasi with the image URL
//   //     const transactionRef = doc(db, "transactions", transactionId);
//   //     await updateDoc(transactionRef, {
//   //       imageUrl: downloadURL,
//   //     });
  
//   //     // Retrieve the updated transaction data
//   //     const transactionSnap = await getDoc(transactionRef);
//   //     if (!transactionSnap.exists()) {
//   //       throw new Error("Transaction document not found.");
//   //     }
  
//   //     const transactionData = transactionSnap.data();
  
//   //     // Add data to the cart collection
//   //     const cartRef = collection(db, "cart");
//   //     await addDoc(cartRef, {
//   //       ...transactionData, // Copy all data from cartMutasi
//   //       imageUrl: downloadURL, // Include the image URL
//   //       timestamp: new Date(), // Add a timestamp or any other custom field
//   //     });
  
//   //     alert("Image uploaded successfully and data saved to cart!");
//   //   } catch (error) {
//   //     console.error("Error uploading image and saving data:", error);
//   //   }
//   // };


// //   const handleImageUpload = async (transactionId) => {
// //     if (!image) {
// //       alert("Please select an image to upload.");
// //       return;
// //     }
  
// //     const storage = getStorage();
// //     const storageRef = ref(storage, `images/${transactionId}/${image.name}`);
  
// //     try {
// //       // Upload image to Firebase Storage
// //       const uploadTask = await uploadBytes(storageRef, image);
// //       const downloadURL = await getDownloadURL(uploadTask.ref);
  
// //       // Retrieve the transaction document from the transactions collection
// //       const transactionRef = doc(db, "cartMutasi", transactionId);
// //       const transactionSnap = await getDoc(transactionRef);

// //       // Check if the transaction document exists
// //       if (!transactionSnap.exists()) {
// //         throw new Error("Transaction document not found.");
// //       }

// //       const transactionData = transactionSnap.data();

// //       // Update the Firestore document with the image URL
// //       await updateDoc(transactionRef, {
// //         imageUrl: downloadURL,
// //       });
  
// //       // Add data to the cartMutasiCustome3 collection
// //       const cartMutasiCustome3Ref = collection(db, "cartMutasi");
// //       await addDoc(cartMutasiCustome3Ref, {
// //         ...transactionData, // Copy all data from the transaction
// //         imageUrl: downloadURL, // Include the image URL
// //         timestamp: new Date(), // Add a timestamp or any other custom field
// //       });
  
// //       alert("Image uploaded successfully and data saved to cartMutasi!");
// //     } catch (error) {
// //       console.error("Error uploading image and saving data:", error);
// //       alert(error.message);  // Show the error message to the user
// //     }
// // };

// const handleImageUpload = async (transactionId) => {
//   if (!image) {
//     alert("Please select an image to upload.");
//     return;
//   }

//   const storage = getStorage();
//   const storageRef = ref(storage, `images/${transactionId}/${image.name}`);

//   try {
//     // Upload image to Firebase Storage
//     const uploadTask = await uploadBytes(storageRef, image);
//     const downloadURL = await getDownloadURL(uploadTask.ref);

//     // Retrieve the transaction document from the transactions collection
//     const transactionRef = doc(db, "cartMutasi", transactionId);
//     const transactionSnap = await getDoc(transactionRef);

//     // Check if the transaction document exists
//     if (!transactionSnap.exists()) {
//       throw new Error("Transaction document not found.");
//     }

//     const transactionData = transactionSnap.data();

//     // Update the Firestore document with the image URL
//     await updateDoc(transactionRef, {
//       imageUrl: downloadURL,
//     });

//     // // Add data to the cartMutasiCustome3 collection
//     // const cartMutasiCustome3Ref = collection(db, "cartMutasi");
//     // await addDoc(cartMutasiCustome3Ref, {
//     //   ...transactionData, // Copy all data from the transaction
//     //   imageUrl: downloadURL, // Include the image URL
//     //   timestamp: new Date(), // Add a timestamp or any other custom field
//     // });

//     // Add data to the cart collection as well
//     const cartRef = collection(db, "cart");
//     await addDoc(cartRef, {
//       ...transactionData, // Copy all data from the transaction
//       imageUrl: downloadURL, // Include the image URL
//       timestamp: new Date(), // Add a timestamp or any other custom field
//     });

//     alert("Image uploaded successfully and data saved to cartMutasi and cart!");
//   } catch (error) {
//     console.error("Error uploading image and saving data:", error);
//     alert(error.message);  // Show the error message to the user
//   }
// };


//   const handleUploadToDatabase = async () => {
//     if (!selectedImage) {
//       alert("Pilih gambar terlebih dahulu!");
//       return;
//     }

//     try {
//       // Upload image to Firebase (example)
//       const storageRef = firebase.storage().ref(); // Assuming you use Firebase storage
//       const fileRef = storageRef.child(`images/${selectedImage.name}`);
//       await fileRef.put(selectedImage);

//       const downloadURL = await fileRef.getDownloadURL();

//       // Update transaction data in Firestore (example)
//       const transactionRef = firebase.firestore().collection("transactions").doc(transaction.id);
//       await transactionRef.update({
//         imageUrl: downloadURL,
//       });

//       alert("Gambar berhasil diunggah!");
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       alert("Terjadi kesalahan saat mengunggah gambar.");
//     }
//   };
  
//   if (loading) {
//     return <p>Loading...</p>; // Show loading state until user info is available
//   }

//   return (
//     <>
//       <Navbar />
//       <div
//         className="approved-transactions"
//         style={{ paddingTop: "150px", paddingLeft: "100px" }}
//       >
//         <h1 className="text-2xl font-bold mb-4">Mutasi Transaksi Disetujui</h1>
//         {approvedTransactions.length === 0 ? (
//           <p>Tidak ada transaksi yang disetujui.</p>
//         ) : (
//           approvedTransactions.map((transaction) => (
//             <div key={transaction.id} className="mb-6 border p-4 rounded">
//               <h2 className="text-xl font-semibold mb-2">
//                 Order ID: {transaction.id}
//               </h2>
//               <p>
//                 <strong>User Name:</strong>{" "}
//                 {transaction.userName || "Tidak Diketahui"}
//               </p>
//               <p>
//                 <strong>Status:</strong>{" "}
//                 {transaction.statusMutasi || "Tidak Diketahui"}
//               </p>
//               <p>
//                 <strong>Tanggal:</strong>{" "}
//                 {transaction.timeStamp
//                   ? transaction.timeStamp.toDate
//                     ? new Date(
//                         transaction.timeStamp.toDate()
//                       ).toLocaleString()
//                     : "Format tanggal tidak valid"
//                   : "Tanggal tidak tersedia"}
//               </p>
//               {transaction.statusMutasi === "Transaksi Sukses,Baleho Sudah Di Order" && (
//                 <div>
//                   <label className="block text-sm font-medium">Upload Gambar:</label>
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     className="mb-4"
//                   />
//                   <button
//                     onClick={() => handleImageUpload(transaction.id)}
//                     className="btn btn-primary"
//                   >
//                     Upload Image
//                   </button>
//                 </div>
//               )}
//               <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
//               {transaction.pesanan ? (
//                 <table className="table-auto w-full border">
//                   <thead>
//                     <tr>
//                       <th>Judul</th>
//                       <th>Kategori</th>
//                       <th>Deskripsi</th>
//                       <th>Harga</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {transaction.pesanan.map((item, index) => (
//                       <tr key={index}>
//                         <td>{item.title}</td>
//                         <td>{item.category}</td>
//                         <td>{item.description}</td>
//                         <td>{item.price}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <p>Pesanan tidak tersedia.</p>
//               )}
//             </div>
//           ))
//         )}
//         <h1 className="text-2xl font-bold mb-4">Mutasi Transaksi Custome Disetujui</h1>
//         {approvedTransactionsCustome.length === 0 ? (
//           <p>Tidak ada transaksi yang disetujui.</p>
//         ) : (
//           approvedTransactionsCustome.map((transaction) => (
//             <div key={transaction.id} className="mb-6 border p-4 rounded">
//               <h2 className="text-xl font-semibold mb-2">
//                 Order ID: {transaction.judul}
//               </h2>
//               <p>
//                 <strong>Nama:</strong>{" "}
//                 {transaction.namaPembeli || "Tidak Diketahui"}
//               </p>
//               {/* <p>
//                 <strong>Status:</strong>{" "}
//                 {transaction.statusCustome || "Tidak Diketahui"}
//               </p> */}
// <p>
//         <strong>Status:</strong> {transaction.statusCustome || "Tidak Diketahui"}
//       </p>

//       {transaction.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang" && (
//         <div>
//           <label className="block text-sm font-medium">Upload Gambar:</label>
//           <input type="file" onChange={handleImageChangeCustome} className="mb-4" />
//           <button
//             onClick={() => handleImageUploadCustome(transaction)}
//             className="btn btn-primary"
//           >
//             Upload Image
//           </button>
//         </div>
//       )}
//               <p>
//                 <strong>Awal Pemasangan:</strong>
//                 {transaction.startDate}
//               </p>
//               <p>
//                 <strong>Akhir Pemasangan:</strong>
//                 {transaction.endDate}
//               </p>
//               <p>
//                 <strong>Deskripsi:</strong>
//                 {transaction.deskripsi}
//               </p>
//               <p>
//                 <strong>Jangkauan:</strong>
//                 {transaction.jangkauanCustome}
//               </p>
//               <p>
//                 <strong>Harga:</strong>
//                 {transaction.harga}
//               </p>
//               <p>
//                 <strong>Harga Jangkauan:</strong>
//                 {transaction.hargaJangkauan}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default Mutasi;





"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth
import Navbar from "@/components/Navbar";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Mutasi = () => {
  const [approvedTransactions, setApprovedTransactions] = useState([]);
  const [approvedTransactionsCustome, setApprovedTransactionsCustome] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // State for logged-in user
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null); // State for image input
  const [imageUploadProgress, setImageUploadProgress] = useState(0);


const storage = getStorage(); // Initialize Firebase Storage
const [transactions, setTransactions] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleDownloadImage = () => {
    if (selectedImage) {
      const link = document.createElement("a");
      link.href = selectedImage;
      link.download = "image.jpg";
      link.click();
    }
  };



  const [selectedImage, setSelectedImage] = useState(null);


  // useEffect(() => {
  //   const unsub = onSnapshot(collection(db, "cartMutasiCustome2"), (snapshot) => {
  //     let transactionsList = [];
  //     snapshot.docs.forEach((doc) => {
  //       transactionsList.push({ id: doc.id, ...doc.data() });
  //     });
  
  //     console.log("Data transaksi:", transactionsList); // Debug data
  
  //     setApprovedTransactionsCustome(transactionsList);
  //   });
  //   return () => unsub();
  // }, []);
  

  useEffect(() => {
    const fetchApprovedTransactionsCustome = async () => {
      if (!currentUser) return; // Wait until the user is logged in

      try {
        const querySnapshot = await getDocs(collection(db, "cartMutasiCustome2"));
        const data = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (transaction) =>
              transaction.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"
          );
        setApprovedTransactionsCustome(data);
      } catch (error) {
        console.error("Error fetching approved transactions:", error);
      }
    };

    fetchApprovedTransactionsCustome();
  }, [currentUser]); // Refetch transactions when currentUser changes


// useEffect(() => {
//   const fetchTransactions = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "transactiondesainacc"));
//       const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setTransactions(data);
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     }
//   };

//   fetchTransactions();
// }, []);

  useEffect(() => {
    const auth = getAuth(); // Initialize Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // Set the logged-in user
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const [imageCustome, setImageCustome] = useState(null);

const handleImageChangeCustome = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImageCustome(file);
  }
};

const handleImageUploadCustome = async (transaction) => {
  if (imageCustome) {
    try {
      // Create a storage reference
      const imageRef = ref(storage, `images/${imageCustome.name}`);
      
      // Upload the image
      await uploadBytes(imageRef, imageCustome);
      
      // Get the image URL
      const imageUrl = await getDownloadURL(imageRef);

      // Add transaction data to Firestore
      await addDoc(collection(db, "cartMutasiCustome3"), {
        orderId: transaction.judul,
        namaPembeli: transaction.namaPembeli || "Tidak Diketahui",
        status: transaction.statusCustome,
        startDate: transaction.startDate,
        endDate: transaction.endDate,
        deskripsi: transaction.deskripsi,
        jangkauanCustome: transaction.jangkauanCustome,
        harga: transaction.harga,
        hargaJangkauan: transaction.hargaJangkauan,
        imageUrl: imageUrl, // Store the image URL here
        timestamp: new Date(), // Store timestamp
      });

      // Clear the image input
      setImageCustome(null);

      alert("Transaction data and image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading the image. Please try again.");
    }
  } else {
    alert("Please select an image before uploading.");
  }
};
  
//tgl 9 februari 2025
  // useEffect(() => {
  //   const fetchApprovedTransactions = async () => {
  //     if (!currentUser) return; // Wait until the user is logged in

  //     try {
  //       const querySnapshot = await getDocs(collection(db, "cartMutasi"));
  //       const data = querySnapshot.docs
  //         .map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }))
  //         .filter(
  //           (transaction) =>
  //             transaction.statusMutasi === "Transaksi Sukses,Baleho Sudah Di Order" &&
  //             transaction.userId === currentUser.uid // Match userId with logged-in user
  //         );
  //       setApprovedTransactions(data);
  //     } catch (error) {
  //       console.error("Error fetching approved transactions:", error);
  //     }
  //   };

  //   fetchApprovedTransactions();
  // }, [currentUser]); // Refetch transactions when currentUser changes



  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     const transactionQuerySnapshot = await getDocs(collection(db, 'transactiondesainacc'));
  //     const transactionPromises = transactionQuerySnapshot.docs.map(async (doc) => {
  //       const transactionData = {
  //         id: doc.id,
  //         ...doc.data().cartData,
  //       };
  
  //       // Cek apakah semua field yang diperlukan tidak undefined
  //       if (!transactionData.category || !transactionData.description || !transactionData.title) {
  //         console.warn(`Data transaksi dengan ID ${doc.id} memiliki field undefined. Data dilewati.`);
  //         return null; // Lewati transaksi yang tidak valid
  //       }
  
  //       // Query ke koleksi cart untuk mencocokkan data
  //       const cartQuery = query(
  //         collection(db, 'cart'),
  //         where('category', '==', transactionData.category),
  //         where('description', '==', transactionData.description),
  //         where('title', '==', transactionData.title)
  //       );
  
  //       const cartSnapshot = await getDocs(cartQuery);
  
  //       // Ambil status dari data cart jika cocok
  //       const cartStatus = cartSnapshot.empty
  //         ? 'Status tidak ditemukan'
  //         : cartSnapshot.docs[0].data().statusCustome;
  
  //       return {
  //         ...transactionData,
  //         statusCustome: cartStatus, // Tambahkan status ke transaksi
  //       };
  //     });

      
  
  //     // Filter transaksi yang valid sebelum meng-update state
  //     const transactionsWithStatus = (await Promise.all(transactionPromises)).filter((t) => t !== null);
  //     setTransactionAcc(transactionsWithStatus);
  //   };
  
  //   fetchTransactions();
  // }, []);



  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionSnapshot = await getDocs(collection(db, "transactiondesainacc"));
  
        // Loop setiap transaksi dan fetch data tambahan
        const transactionsWithDetails = await Promise.all(
          transactionSnapshot.docs.map(async (transactionDoc) => {
            const transactionData = {
              id: transactionDoc.id,
              ...transactionDoc.data().cartData,
            };
  
            // Validasi field transaksi
            if (!transactionData.category || !transactionData.description || !transactionData.title) {
              console.warn(`Data transaksi dengan ID ${transactionDoc.id} memiliki field undefined. Data dilewati.`);
              return null;
            }
  
            // Fetch statusCustome dari koleksi cart
            const cartQuery = query(
              collection(db, "cart"),
              where("category", "==", transactionData.category),
              where("description", "==", transactionData.description),
              where("title", "==", transactionData.title)
            );
            const cartSnapshot = await getDocs(cartQuery);
            const cartStatus = cartSnapshot.empty
              ? "Status tidak ditemukan"
              : cartSnapshot.docs[0].data().statusCustome;
  
            // Fetch companyName dari koleksi users
            let companyName = "Tidak Diketahui";
            if (transactionData.userId) {
              const userRef = doc(db, "users", transactionData.userId);
              const userSnap = await getDoc(userRef);
              if (userSnap.exists()) {
                companyName = userSnap.data().companyName || "Tidak Diketahui";
              }
            }
  
            return {
              ...transactionData,
              statusCustome: cartStatus,
              companyName,
            };
          })
        );
  
        // Filter transaksi yang valid dan update state
        const validTransactions = transactionsWithDetails.filter((t) => t !== null);
        setTransactionAcc(validTransactions);
      } catch (error) {
        console.error("Error fetching transactions with details:", error);
      }
    };
  
    fetchTransactions();
  }, [currentUser]);
  
  const [transactionAcc, setTransactionAcc] = useState([]); // Tambahkan state ini






  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const fetchTransactionsWithCompanyName = async () => {
  //     try {
  //       const transactionSnapshot = await getDocs(collection(db, "transactiondesainacc"));
        
  //       // Loop setiap transaksi dan fetch companyName dari tabel users
  //       const transactionsWithCompany = await Promise.all(
  //         transactionSnapshot.docs.map(async (transactionDoc) => {
  //           const transactionData = {
  //             id: transactionDoc.id,
  //             ...transactionDoc.data().cartData,
  //           };

  //           // Default jika companyName tidak ditemukan
  //           let companyName = "Tidak Diketahui";

  //           // Ambil userId atau field terkait jika ada
  //           if (transactionData.userId) {
  //             const userRef = doc(db, "users", transactionData.userId);
  //             const userSnap = await getDoc(userRef);

  //             if (userSnap.exists()) {
  //               companyName = userSnap.data().companyName || "Tidak Diketahui";
  //             }
  //           }

  //           return {
  //             ...transactionData,
  //             companyName,  // Tambahkan ke data transaksi
  //           };
  //         })
  //       );

  //       setTransactionAcc(transactionsWithCompany);
  //     } catch (error) {
  //       console.error("Error fetching transactions with company name:", error);
  //     }
  //   };

  //   fetchTransactionsWithCompanyName();
  // }, [currentUser]);
  

  useEffect(() => {
    const fetchApprovedTransactionsCustome = async () => {
      if (!currentUser) return; // Wait until the user is logged in

      try {
        const querySnapshot = await getDocs(collection(db, "jangkauanCustomSewa"));
        const data = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (transaction) =>
              transaction.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"
          );
        setApprovedTransactionsCustome(data);
      } catch (error) {
        console.error("Error fetching approved transactions:", error);
      }
    };

    fetchApprovedTransactionsCustome();
  }, [currentUser]); // Refetch transactions when currentUser changes

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

const handleImageUpload = async (transactionId) => {
  if (!image) {
    alert("Please select an image to upload.");
    return;
  }

  const storage = getStorage();
  const storageRef = ref(storage, `images/${transactionId}/${image.name}`);

  try {
    // Upload image to Firebase Storage
    const uploadTask = await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(uploadTask.ref);

    // Retrieve the transaction document from the transactions collection
    const transactionRef = doc(db, "cartMutasi", transactionId);
    const transactionSnap = await getDoc(transactionRef);

    // Check if the transaction document exists
    if (!transactionSnap.exists()) {
      throw new Error("Transaction document not found.");
    }

    const transactionData = transactionSnap.data();

    // Update the Firestore document with the image URL
    await updateDoc(transactionRef, {
      imageUrl: downloadURL,
    });

    // Add data to the cart collection as well
    const cartRef = collection(db, "cart");
    await addDoc(cartRef, {
      ...transactionData, // Copy all data from the transaction
      imageUrl: downloadURL, // Include the image URL
      timestamp: new Date(), // Add a timestamp or any other custom field
    });

    alert("Image uploaded successfully and data saved to cartMutasi and cart!");
  } catch (error) {
    console.error("Error uploading image and saving data:", error);
    alert(error.message);  // Show the error message to the user
  }
};


  const handleUploadToDatabase = async () => {
    if (!selectedImage) {
      alert("Pilih gambar terlebih dahulu!");
      return;
    }

    try {
      // Upload image to Firebase (example)
      const storageRef = firebase.storage().ref(); // Assuming you use Firebase storage
      const fileRef = storageRef.child(`images/${selectedImage.name}`);
      await fileRef.put(selectedImage);

      const downloadURL = await fileRef.getDownloadURL();

      // Update transaction data in Firestore (example)
      const transactionRef = firebase.firestore().collection("transactions").doc(transaction.id);
      await transactionRef.update({
        imageUrl: downloadURL,
      });

      alert("Gambar berhasil diunggah!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Terjadi kesalahan saat mengunggah gambar.");
    }
  };
  
  if (loading) {
    return <p>Loading...</p>; // Show loading state until user info is available
  }

  return (
    <>
      <Navbar />
      <div
        className="approved-transactions"
        style={{ paddingTop: "150px", paddingLeft: "100px" }}
      >
        {/* <h1 className="text-2xl font-bold mb-4">Mutasi Transaksi Disetujui</h1>
        {approvedTransactions.length === 0 ? (
          <p>Tidak ada transaksi yang disetujui.</p>
        ) : (
          approvedTransactions.map((transaction) => (
            <div key={transaction.id} className="mb-6 border p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">
                Order ID: {transaction.id}
              </h2>
              <p>
                <strong>Client Name:</strong>{" "}
                {transaction.userName || "Tidak Diketahui"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {transaction.statusMutasi || "Tidak Diketahui"}
              </p>
              <p>
                <strong>Tanggal:</strong>{" "}
                {transaction.timeStamp
                  ? transaction.timeStamp.toDate
                    ? new Date(
                        transaction.timeStamp.toDate()
                      ).toLocaleString()
                    : "Format tanggal tidak valid"
                  : "Tanggal tidak tersedia"}
              </p>
              {transaction.statusMutasi === "Transaksi Sukses,Baleho Sudah Di Order" && (
                <div>
                  <label className="block text-sm font-medium">Upload Gambar:</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="mb-4"
                  />
                  <button
                    onClick={() => handleImageUpload(transaction.id)}
                    className="btn btn-primary"
                  >
                    Upload Image
                  </button>
                </div>
              )}
              <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
              <h1 className="text-2xl font-bold mb-4">Data Transaksi Desain dan Pembayaran</h1>
        {transactions.length === 0 ? (
          <p>Tidak ada data transaksi.</p>
        ) : (
          <table className="table-auto w-full border">
            <thead>
              <tr>
                <th>ID Transaksi</th>
                <th>Judul Produk</th>
                <th>Status Transaksi</th>
                <th>Jumlah</th>
                <th>Tipe Pembayaran</th>
                <th>Gambar</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.transactionData?.order_id || "Tidak tersedia"}</td>
                  <td>{transaction.title || "Tidak tersedia"}</td>
                  <td>{transaction.transactionData?.status || "Tidak tersedia"}</td>
                  <td>{transaction.transactionData?.gross_amount || "-"}</td>
                  <td>{transaction.transactionData?.payment_type || "-"}</td>
                  <td>
                    {transaction.image ? (
                      <img src={`/desain/${transaction.image[transaction.id]}`} alt="Desain" className="w-32 h-32 object-cover" />
                    ) : (
                      "Gambar tidak tersedia"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
            </div>
          )) */}
          <h1 className="text-2xl font-bold mb-4">Mutasi Transaksi Disetujui</h1>
      {transactionAcc.length === 0 ? (
        <p>Tidak ada transaksi yang disetujui.</p>
      ) : (
        transactionAcc.map((transaction) => (
          <div key={transaction.id} className="mb-6 border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
            <p><strong>Client Name:</strong> {transaction.name||transaction.companyName||transaction.userName || transaction.namaPembeli || transaction.email ||"Tidak Diketahui"}</p>
            <p><strong>Status:</strong> {transaction.statusCustome || "Tidak Diketahui"}</p>
            <p><strong>Tanggal:</strong> 
              {transaction.timeStamp
                ? transaction.timeStamp.toDate
                  ? new Date(transaction.timeStamp.toDate()).toLocaleString()
                  : "Format tanggal tidak valid"
                : "Tanggal tidak tersedia"}
            </p>
            {transaction.statusMutasi === "Transaksi Sukses,Baleho Sudah Di Order" && (
              <div>
                <label className="block text-sm font-medium">Upload Gambar:</label>
                <input type="file" onChange={handleImageChange} className="mb-4" />
                <button onClick={() => handleImageUpload(transaction.id)} className="btn btn-primary">
                  Upload Image
                </button>
              </div>
            )}

            <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
            <table className="table-auto w-full border">
              <thead>
                <tr>
                  <th>ID Transaksi</th>
                  <th>Judul Produk</th>
                  <th>Status Transaksi</th>
                  <th>Jumlah</th>
                  <th>Tipe Pembayaran</th>
                  <th>Gambar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{transaction.transactionData?.order_id || "Tidak tersedia"}</td>
                  <td>{transaction.title || "Tidak tersedia"}</td>
                  <td>{transaction.statusCustome || "Tidak tersedia"}</td>
                  {/* <td>{transaction.transactionData?.gross_amount || "-"}</td> */}
                  <td>{transaction.price || "Tidak Diketahui"}</td>
                  <td>{transaction.transactionData?.payment_type || "-"}</td>
                  <td>
                    {transaction.image && (
                      <img
                        src={transaction.imageUrl}
                        alt={transaction.title}
                        className="w-48 h-48 object-cover rounded"
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
    
        )}
        <h1 className="text-2xl font-bold mb-4">Mutasi Transaksi Custome Disetujui</h1>
        {approvedTransactionsCustome.length === 0 ? (
          <p>Tidak ada transaksi yang disetujui.</p>
        ) : (
          approvedTransactionsCustome.map((transaction) => (
            <div key={transaction.id} className="mb-6 border p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">
                Order ID: {transaction.judul}
              </h2>
              <p>
                <strong>Nama:</strong>{" "}
                {transaction.namaPembeli || transaction.userName || transaction.namaPembeli ||"Tidak Diketahui"}
              </p>
              {/* <p>
                <strong>Status:</strong>{" "}
                {transaction.statusCustome || "Tidak Diketahui"}
              </p> */}
<p>
        <strong>Status:</strong> {transaction.statusCustome || "Tidak Diketahui"}
      </p>

      {transaction.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang" && (
        <div>
          <label className="block text-sm font-medium">Upload Gambar:</label>
          <input type="file" onChange={handleImageChangeCustome} className="mb-4" />
          <button
            onClick={() => handleImageUploadCustome(transaction)}
            className="btn btn-primary"
          >
            Upload Image
          </button>
        </div>
      )}
              <p>
                <strong>Awal Pemasangan:</strong>
                {transaction.startDate}
              </p>
              <p>
                <strong>Akhir Pemasangan:</strong>
                {transaction.endDate}
              </p>
              <p>
                <strong>Deskripsi:</strong>
                {transaction.deskripsi}
              </p>
              <p>
                <strong>Jangkauan:</strong>
                {transaction.jangkauanCustome}
              </p>
              <p>
                <strong>Harga:</strong>
                {transaction.harga}
              </p>
              <p className="text-xl font-semibold mb-2">Gambar Desain:</p>
{transaction.imageUrl ? (
  <img 
    src={transaction.imageUrl} 
    alt="Desain" 
    className="w-32 h-32 object-cover border rounded cursor-pointer"
    onClick={() => handleImageClick(transaction.imageUrl)}
  />
) : (
  <p className="text-red-500">Gambar tidak tersedia.</p>
)}



              <p>
                <strong>Harga Jangkauan:</strong>
                {transaction.hargaJangkauan}
              </p>
            </div>
          ))
        )}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-md max-w-2xl w-full relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-xl text-red-600"
              >
                X
              </button>
              <img
                src={selectedImage}
                alt="Zoomed Image"
                className="w-full h-auto object-contain mb-4"
              />
              <button
                onClick={handleDownloadImage}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Download Image
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Mutasi;