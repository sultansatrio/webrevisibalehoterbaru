// "use client";

// import React, { useEffect, useState } from "react";
// import { db, storage } from "@/firebase/firebase"; // Pastikan storage diimpor
// import { collection, getDocs, query, where, addDoc, updateDoc, doc } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import NavbarProduksi from "@/components/NavbarProduksi";

// const Services = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [progressData, setProgressData] = useState({});
//   const [uploadImage, setUploadImage] = useState({});

//   // Fetch transaksi dengan status "disetujui"
//   useEffect(() => {
//     const fetchApprovedTransactions = async () => {
//       try {
//         const approvedQuery = query(
//           collection(db, "cart"),
//           where("status", "==", "disetujui")
//         );
//         const querySnapshot = await getDocs(approvedQuery);
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTransactions(data);
//       } catch (error) {
//         console.error("Error fetching approved transactions:", error);
//       }
//     };

//     fetchApprovedTransactions();
//   }, []);

//   // Fungsi upload gambar ke Firebase Storage
//   const uploadImageToStorage = async (file) => {
//     try {
//       const storageRef = ref(storage, `progress_images/${file.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       return new Promise((resolve, reject) => {
//         uploadTask.on(
//           "state_changed",
//           null,
//           (error) => reject(error),
//           async () => {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             resolve(downloadURL);
//           }
//         );
//       });
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       throw error;
//     }
//   };

//   // Submit progress baru ke database
//   const handleSubmitProgress = async (transactionId) => {
//     try {
//       const transaction = transactions.find((t) => t.id === transactionId);
//       const currentProgress = progressData[transactionId] || "";
//       const imageFile = uploadImage[transactionId] || null;

//       let imageURL = null;
//       if (imageFile) {
//         imageURL = await uploadImageToStorage(imageFile);
//       }

//       const progressStage = transaction.progress ? transaction.progress.length + 1 : 1;
//       const progressName = `progress ${progressStage}`;

//       const newProgressData = {
//         progress: progressName,
//         keterangan: currentProgress,
//         image: imageURL,
//         statusProgres: progressStage === 1 ? "terkirim" : `progress ${progressStage}`,
//         timestamp: new Date(),
//       };

//       await addDoc(collection(db, "progress"), { ...newProgressData, transactionId });

//       setTransactions((prevTransactions) =>
//         prevTransactions.map((t) =>
//           t.id === transactionId
//             ? {
//                 ...t,
//                 progress: [...(t.progress || []), newProgressData],
//               }
//             : t
//         )
//       );
//       alert("Progress berhasil dikirim!");
//     } catch (error) {
//       console.error("Error submitting progress:", error);
//     }
//   };

//   // Fungsi untuk menandai pemasangan selesai
//   const handleCompleteInstallation = async (transactionId) => {
//     try {
//       await updateDoc(doc(db, "progress", transactionId), {
//         statusProgres: "pemasangan selesai",
//       });

//       setTransactions((prevTransactions) =>
//         prevTransactions.map((t) =>
//           t.id === transactionId
//             ? {
//                 ...t,
//                 statusProgres: "pemasangan selesai",
//               }
//             : t
//         )
//       );
//       alert("Pemasangan selesai berhasil ditandai!");
//     } catch (error) {
//       console.error("Error marking installation complete:", error);
//     }
//   };

//   return (
//     <div className="mt-32">
//       <NavbarProduksi />
//       <div className="transaction-history">
//         <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
//         {transactions.length === 0 ? (
//           <p>Belum ada transaksi.</p>
//         ) : (
//           transactions.map((transaction) => (
//             <div key={transaction.id} className="mb-6 border p-4 rounded">
//               <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
//               <p><strong>User Name:</strong> {transaction.userName || "Tidak Diketahui"}</p>
//               <p><strong>Tanggal:</strong> {new Date(transaction.timeStamp?.toDate()).toLocaleString()}</p>
//               <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
//               {/* Form untuk upload progress */}
//               <div className="mt-4">
//                 <input
//                   type="file"
//                   onChange={(e) =>
//                     setUploadImage({
//                       ...uploadImage,
//                       [transaction.id]: e.target.files[0],
//                     })
//                   }
//                 />
//                 <textarea
//                   placeholder="Masukkan keterangan progress"
//                   value={progressData[transaction.id] || ""}
//                   onChange={(e) =>
//                     setProgressData({
//                       ...progressData,
//                       [transaction.id]: e.target.value,
//                     })
//                   }
//                   className="w-full border p-2 mt-2"
//                 ></textarea>
//                 <button
//                   className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
//                   onClick={() => handleSubmitProgress(transaction.id)}
//                 >
//                   Kirim Progress
//                 </button>
//               </div>

//               {/* Tombol Pemasangan Selesai */}
//               {transaction.statusProgres !== "pemasangan selesai" && (
//                 <button
//                   className="bg-blue-500 text-white px-3 py-1 mt-4 rounded"
//                   onClick={() => handleCompleteInstallation(transaction.id)}
//                 >
//                   Tandai Pemasangan Selesai
//                 </button>
//               )}

//               {/* Riwayat progress */}
//               {transaction.progress && (
//                 <div className="mt-4">
//                   <h3 className="text-lg font-medium">Riwayat Progress:</h3>
//                   {transaction.progress.map((prog, index) => (
//                     <div key={index} className="border p-2 mt-2">
//                       <p><strong>Progress:</strong> {prog.progress}</p>
//                       <p><strong>Keterangan:</strong> {prog.keterangan}</p>
//                       {prog.image && (
//                         <img src={prog.image} alt="Uploaded" className="mt-2 max-w-full" />
//                       )}
//                       <p><strong>Status:</strong> {prog.statusProgres}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Services;



// "use client";

// import React, { useEffect, useState } from "react";
// import { db, storage } from "@/firebase/firebase"; // Pastikan storage diimpor
// import { collection, getDocs, query, where, addDoc, updateDoc, doc } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import NavbarProduksi from "@/components/NavbarProduksi";

// const Services = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [progressData, setProgressData] = useState({});
//   const [uploadImage, setUploadImage] = useState({});

//   // Fetch transaksi dengan status "disetujui"
//   useEffect(() => {
//     const fetchApprovedTransactions = async () => {
//       try {
//         const approvedQuery = query(
//           collection(db, "cart"),
//           where("status", "==", "disetujui")
//         );
//         const querySnapshot = await getDocs(approvedQuery);
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTransactions(data);
//       } catch (error) {
//         console.error("Error fetching approved transactions:", error);
//       }
//     };

//     fetchApprovedTransactions();
//   }, []);

//   // Fungsi upload gambar ke Firebase Storage
//   const uploadImageToStorage = async (file) => {
//     try {
//       const storageRef = ref(storage, `progress_images/${file.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       return new Promise((resolve, reject) => {
//         uploadTask.on(
//           "state_changed",
//           null,
//           (error) => reject(error),
//           async () => {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             resolve(downloadURL);
//           }
//         );
//       });
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       throw error;
//     }
//   };

//   // Submit progress baru ke database
//   const handleSubmitProgress = async (transactionId) => {
//     try {
//       const transaction = transactions.find((t) => t.id === transactionId);
//       const currentProgress = progressData[transactionId] || "";
//       const imageFile = uploadImage[transactionId] || null;

//       let imageURL = null;
//       if (imageFile) {
//         imageURL = await uploadImageToStorage(imageFile);
//       }

//       const progressStage = transaction.progress ? transaction.progress.length + 1 : 1;
//       const progressName = `progress ${progressStage}`;

//       const newProgressData = {
//         progress: progressName,
//         keterangan: currentProgress,
//         image: imageURL,
//         statusProgres: progressStage === 1 ? "terkirim" : `progress ${progressStage}`,
//         timestamp: new Date(),
//       };

//       await addDoc(collection(db, "progress"), { ...newProgressData, transactionId });

//       setTransactions((prevTransactions) =>
//         prevTransactions.map((t) =>
//           t.id === transactionId
//             ? {
//                 ...t,
//                 progress: [...(t.progress || []), newProgressData],
//               }
//             : t
//         )
//       );
//       alert("Progress berhasil dikirim!");
//     } catch (error) {
//       console.error("Error submitting progress:", error);
//     }
//   };

//   // Fungsi untuk menandai pemasangan selesai
//   const handleCompleteInstallation = async (transactionId) => {
//     try {
//       // Cari dokumen progress berdasarkan transactionId
//       const progressQuery = query(
//         collection(db, "progress"),
//         where("transactionId", "==", transactionId)
//       );
//       const querySnapshot = await getDocs(progressQuery);

//       // Lakukan pembaruan untuk semua dokumen terkait transaksi ini
//       querySnapshot.forEach(async (docSnapshot) => {
//         const progressRef = doc(db, "progress", docSnapshot.id);
//         await updateDoc(progressRef, {
//           statusProgres: "pemasangan selesai",
//         });
//       });

//       // Perbarui status pada state transaksi di frontend
//       setTransactions((prevTransactions) =>
//         prevTransactions.map((t) =>
//           t.id === transactionId
//             ? {
//                 ...t,
//                 statusProgres: "pemasangan selesai",
//               }
//             : t
//         )
//       );

//       alert("Pemasangan selesai berhasil ditandai!");
//     } catch (error) {
//       console.error("Error marking installation complete:", error);
//     }
//   };

//   return (
//     <div className="mt-32">
//       <NavbarProduksi />
//       <div className="transaction-history">
//         <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
//         {transactions.length === 0 ? (
//           <p>Belum ada transaksi.</p>
//         ) : (
//           transactions.map((transaction) => (
//             <div key={transaction.id} className="mb-6 border p-4 rounded">
//               <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
//               <p><strong>User Name:</strong> {transaction.userName || "Tidak Diketahui"}</p>
//               <p><strong>Tanggal:</strong> {new Date(transaction.timeStamp?.toDate()).toLocaleString()}</p>
//               <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
//               {/* Form untuk upload progress */}
//               <div className="mt-4">
//                 <input
//                   type="file"
//                   onChange={(e) =>
//                     setUploadImage({
//                       ...uploadImage,
//                       [transaction.id]: e.target.files[0],
//                     })
//                   }
//                 />
//                 <textarea
//                   placeholder="Masukkan keterangan progress"
//                   value={progressData[transaction.id] || ""}
//                   onChange={(e) =>
//                     setProgressData({
//                       ...progressData,
//                       [transaction.id]: e.target.value,
//                     })
//                   }
//                   className="w-full border p-2 mt-2"
//                 ></textarea>
//                 <button
//                   className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
//                   onClick={() => handleSubmitProgress(transaction.id)}
//                 >
//                   Kirim Progress
//                 </button>
//               </div>

//               {/* Tombol Pemasangan Selesai */}
//               {transaction.statusProgres !== "pemasangan selesai" && (
//                 <button
//                   className="bg-blue-500 text-white px-3 py-1 mt-4 rounded"
//                   onClick={() => handleCompleteInstallation(transaction.id)}
//                 >
//                   Tandai Pemasangan Selesai
//                 </button>
//               )}

//               {/* Riwayat progress */}
//               {transaction.progress && (
//                 <div className="mt-4">
//                   <h3 className="text-lg font-medium">Riwayat Progress:</h3>
//                   {transaction.progress.map((prog, index) => (
//                     <div key={index} className="border p-2 mt-2">
//                       <p><strong>Progress:</strong> {prog.progress}</p>
//                       <p><strong>Keterangan:</strong> {prog.keterangan}</p>
//                       {prog.image && (
//                         <img src={prog.image} alt="Uploaded" className="mt-2 max-w-full" />
//                       )}
//                       <p><strong>Status:</strong> {prog.statusProgres}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Services;



// "use client";

// import React, { useEffect, useState } from "react";
// import { db, storage } from "@/firebase/firebase"; // Pastikan storage diimpor
// import { collection, getDocs, query, where, addDoc, updateDoc, doc } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import NavbarProduksi from "@/components/NavbarProduksi";

// const Services = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [progressData, setProgressData] = useState({});
//   const [uploadImage, setUploadImage] = useState({});

//   // Fetch transaksi dengan status "disetujui"
//   useEffect(() => {
//     const fetchApprovedTransactions = async () => {
//       try {
//         const approvedQuery = query(
//           collection(db, "cart"),
//           where("status", "==", "disetujui")
//         );
//         const querySnapshot = await getDocs(approvedQuery);
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTransactions(data);

//         // Fetch progress yang terkait dengan transaksi yang diambil
//         const progressQuery = query(
//           collection(db, "progress"),
//           where("transactionId", "in", data.map((t) => t.id))
//         );
//         const progressSnapshot = await getDocs(progressQuery);
//         const progress = progressSnapshot.docs.reduce((acc, doc) => {
//           const data = doc.data();
//           const transactionId = data.transactionId;
//           if (!acc[transactionId]) {
//             acc[transactionId] = [];
//           }
//           acc[transactionId].push(data);
//           return acc;
//         }, {});
//         setProgressData(progress);
//       } catch (error) {
//         console.error("Error fetching approved transactions:", error);
//       }
//     };

//     fetchApprovedTransactions();
//   }, []);

//   // Fungsi upload gambar ke Firebase Storage
//   const uploadImageToStorage = async (file) => {
//     try {
//       const storageRef = ref(storage, `progress_images/${file.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       return new Promise((resolve, reject) => {
//         uploadTask.on(
//           "state_changed",
//           null,
//           (error) => reject(error),
//           async () => {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             resolve(downloadURL);
//           }
//         );
//       });
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       throw error;
//     }
//   };

//   // Submit progress baru ke database
//   const handleSubmitProgress = async (transactionId) => {
//     try {
//       const transaction = transactions.find((t) => t.id === transactionId);
//       const currentProgress = progressData[transactionId] || "";
//       const imageFile = uploadImage[transactionId] || null;

//       let imageURL = null;
//       if (imageFile) {
//         imageURL = await uploadImageToStorage(imageFile);
//       }

//       const progressStage = transaction.progress ? transaction.progress.length + 1 : 1;
//       const progressName = `progress ${progressStage}`;

//       const newProgressData = {
//         progress: progressName,
//         keterangan: currentProgress,
//         image: imageURL,
//         statusProgres: progressStage === 1 ? "terkirim" : `progress ${progressStage}`,
//         timestamp: new Date(),
//         transactionId,
//       };

//       await addDoc(collection(db, "progress"), newProgressData);

//       // Update progress pada transaksi
//       setProgressData((prevData) => ({
//         ...prevData,
//         [transactionId]: [...(prevData[transactionId] || []), newProgressData],
//       }));

//       alert("Progress berhasil dikirim!");
//     } catch (error) {
//       console.error("Error submitting progress:", error);
//     }
//   };

//   // Fungsi untuk menandai pemasangan selesai
//   const handleCompleteInstallation = async (transactionId) => {
//     try {
//       // Cari dokumen progress berdasarkan transactionId
//       const progressQuery = query(
//         collection(db, "progress"),
//         where("transactionId", "==", transactionId)
//       );
//       const querySnapshot = await getDocs(progressQuery);

//       // Lakukan pembaruan untuk semua dokumen terkait transaksi ini
//       querySnapshot.forEach(async (docSnapshot) => {
//         const progressRef = doc(db, "progress", docSnapshot.id);
//         await updateDoc(progressRef, {
//           statusProgres: "pemasangan selesai",
//         });
//       });

//       // Perbarui status pada state transaksi di frontend
//       setTransactions((prevTransactions) =>
//         prevTransactions.map((t) =>
//           t.id === transactionId
//             ? {
//                 ...t,
//                 statusProgres: "pemasangan selesai",
//               }
//             : t
//         )
//       );

//       alert("Pemasangan selesai berhasil ditandai!");
//     } catch (error) {
//       console.error("Error marking installation complete:", error);
//     }
//   };

//   return (
//     <div className="mt-32">
//       <NavbarProduksi />
//       <div className="transaction-history">
//         <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
//         {transactions.length === 0 ? (
//           <p>Belum ada transaksi.</p>
//         ) : (
//           transactions.map((transaction) => (
//             <div key={transaction.id} className="mb-6 border p-4 rounded">
//               <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
//               <p><strong>User Name:</strong> {transaction.userName || "Tidak Diketahui"}</p>
//               <p><strong>Tanggal:</strong> {new Date(transaction.timeStamp?.toDate()).toLocaleString()}</p>
//               <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
//               {/* Form untuk upload progress */}
//               <div className="mt-4">
//                 <input
//                   type="file"
//                   onChange={(e) =>
//                     setUploadImage({
//                       ...uploadImage,
//                       [transaction.id]: e.target.files[0],
//                     })
//                   }
//                 />
//                 <textarea
//                   placeholder="Masukkan keterangan progress"
//                   value={progressData[transaction.id] || ""}
//                   onChange={(e) =>
//                     setProgressData({
//                       ...progressData,
//                       [transaction.id]: e.target.value,
//                     })
//                   }
//                   className="w-full border p-2 mt-2"
//                 ></textarea>
//                 <button
//                   className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
//                   onClick={() => handleSubmitProgress(transaction.id)}
//                 >
//                   Kirim Progress
//                 </button>
//               </div>

//               {/* Tombol Pemasangan Selesai */}
//               {transaction.statusProgres !== "pemasangan selesai" && (
//                 <button
//                   className="bg-blue-500 text-white px-3 py-1 mt-4 rounded"
//                   onClick={() => handleCompleteInstallation(transaction.id)}
//                 >
//                   Tandai Pemasangan Selesai
//                 </button>
//               )}

//               {/* Riwayat progress */}
//               {progressData[transaction.id] && (
//                 <div className="mt-4">
//                   <h3 className="text-lg font-medium">Riwayat Progress:</h3>
//                   {progressData[transaction.id].map((prog, index) => (
//                     <div key={index} className="border p-2 mt-2">
//                       <p><strong>Progress:</strong> {prog.progress}</p>
//                       <p><strong>Keterangan:</strong> {prog.keterangan}</p>
//                       {prog.image && (
//                         <img src={prog.image} alt="Uploaded" className="mt-2 max-w-full" />
//                       )}
//                       <p><strong>Status:</strong> {prog.statusProgres}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Services;


// "use client";

// import React, { useEffect, useState } from "react";
// import { db, storage } from "@/firebase/firebase"; // Ensure storage is imported
// import { collection, getDocs, query, where, addDoc, updateDoc, doc } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import NavbarProduksi from "@/components/NavbarProduksi";

// const Services = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [progressData, setProgressData] = useState({});
//   const [uploadImage, setUploadImage] = useState({});
//   const [progressText, setProgressText] = useState({});

//   // Fetch approved transactions
//   // useEffect(() => {
//   //   const fetchApprovedTransactions = async () => {
//   //     try {
//   //       const approvedQuery = query(
//   //         collection(db, "cart"),
//   //         where("status", "==", "disetujui")
//   //       );
//   //       const querySnapshot = await getDocs(approvedQuery);
//   //       const data = querySnapshot.docs.map((doc) => ({
//   //         id: doc.id,
//   //         ...doc.data(),
//   //       }));
//   //       setTransactions(data);

//   //       // Fetch progress related to transactions
//   //       const progressQuery = query(
//   //         collection(db, "progress"),
//   //         where("transactionId", "in", data.map((t) => t.id))
//   //       );
//   //       const progressSnapshot = await getDocs(progressQuery);
//   //       const progress = progressSnapshot.docs.reduce((acc, doc) => {
//   //         const data = doc.data();
//   //         const transactionId = data.transactionId;
//   //         if (!acc[transactionId]) {
//   //           acc[transactionId] = [];
//   //         }
//   //         acc[transactionId].push({
//   //           ...data,
//   //           keterangan: data.keterangan || "Tidak ada keterangan",
//   //         });
//   //         return acc;
//   //       }, {});
//   //       setProgressData(progress);
//   //     } catch (error) {
//   //       console.error("Error fetching approved transactions:", error);
//   //     }
//   //   };

//   //   fetchApprovedTransactions();
//   // }, []);


//   useEffect(() => {
//     const fetchApprovedTransactions = async () => {
//       try {
//         const approvedQuery = query(
//           collection(db, "transactions"),
//           where("status", "==", "settlement")
//         );
//         const querySnapshot = await getDocs(approvedQuery);
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTransactions(data);
  
//         // Check if there are any transaction IDs
//         const transactionIds = data.map((t) => t.id);
//         if (transactionIds.length === 0) {
//           setProgressData({});
//           return;
//         }
  
//         // Fetch progress related to transactions
//         const progressQuery = query(
//           collection(db, "progress"),
//           where("transactionId", "in", transactionIds)
//         );
//         const progressSnapshot = await getDocs(progressQuery);
//         const progress = progressSnapshot.docs.reduce((acc, doc) => {
//           const data = doc.data();
//           const transactionId = data.transactionId;
//           if (!acc[transactionId]) {
//             acc[transactionId] = [];
//           }
//           acc[transactionId].push({
//             ...data,
//             keterangan: data.keterangan || "Tidak ada keterangan",
//           });
//           return acc;
//         }, {});
//         setProgressData(progress);
//       } catch (error) {
//         console.error("Error fetching approved transactions:", error);
//       }
//     };
  
//     fetchApprovedTransactions();
//   }, []);
  
//   // Function to upload image to Firebase Storage
//   const uploadImageToStorage = async (file) => {
//     try {
//       const storageRef = ref(storage, `progress_images/${file.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       return new Promise((resolve, reject) => {
//         uploadTask.on(
//           "state_changed",
//           null,
//           (error) => reject(error),
//           async () => {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             resolve(downloadURL);
//           }
//         );
//       });
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       throw error;
//     }
//   };

//   const handleSubmitProgress = async (transactionId) => {
//     try {
//       const transaction = transactions.find((t) => t.id === transactionId);
//       const imageFile = uploadImage[transactionId] || null;
//       const keterangan = progressText[transactionId] || "Tidak ada keterangan";
  
//       let imageURL = null;
//       if (imageFile) {
//         imageURL = await uploadImageToStorage(imageFile);
//       }
  
//       const progressStage = progressData[transactionId]?.length + 1 || 1;
//       const progressName = `Progress ${progressStage}`;
  
//       const newProgressData = {
//         progress: progressName,
//         keterangan,
//         image: imageURL,
//         statusProgres: progressStage === 1 ? "terkirim" : `progress ${progressStage}`,
//         timestamp: new Date(),
//         transactionId,
//         userName: transaction.userName || "Tidak Diketahui", // Tambahkan username di sini
//       };
  
//       await addDoc(collection(db, "progress"), newProgressData);
  
//       // Update progress in frontend state
//       setProgressData((prevData) => ({
//         ...prevData,
//         [transactionId]: [...(prevData[transactionId] || []), newProgressData],
//       }));
  
//       alert("Progress berhasil dikirim!");
//     } catch (error) {
//       console.error("Error submitting progress:", error);
//     }
//   };
  

//   // // Function to mark installation as complete
//   // const handleCompleteInstallation = async (transactionId) => {
//   //   try {
//   //     const progressQuery = query(
//   //       collection(db, "progress"),
//   //       where("transactionId", "==", transactionId)
//   //     );
//   //     const querySnapshot = await getDocs(progressQuery);

//   //     querySnapshot.forEach(async (docSnapshot) => {
//   //       const progressRef = doc(db, "progress", docSnapshot.id);
//   //       await updateDoc(progressRef, {
//   //         statusProgres: "pemasangan selesai",
//   //       });
//   //     });

//   //     setTransactions((prevTransactions) =>
//   //       prevTransactions.map((t) =>
//   //         t.id === transactionId
//   //           ? {
//   //               ...t,
//   //               statusProgres: "pemasangan selesai",
//   //             }
//   //           : t
//   //       )
//   //     );

//   //     alert("Pemasangan selesai berhasil ditandai!");
//   //   } catch (error) {
//   //     console.error("Error marking installation complete:", error);
//   //   }
//   // };


//   // Function to mark installation as complete
// const handleCompleteInstallation = async (transactionId) => {
//   try {
//     const progressQuery = query(
//       collection(db, "progress"),
//       where("transactionId", "==", transactionId)
//     );
//     const querySnapshot = await getDocs(progressQuery);

//     querySnapshot.forEach(async (docSnapshot) => {
//       const progressRef = doc(db, "progress", docSnapshot.id);
//       await updateDoc(progressRef, {
//         statusProgres: "pemasangan selesai",
//         progress: "progress closed", // Add this line
//       });
//     });

//     setTransactions((prevTransactions) =>
//       prevTransactions.map((t) =>
//         t.id === transactionId
//           ? {
//               ...t,
//               statusProgres: "pemasangan selesai",
//               progress: "progress closed", // Update local state
//             }
//           : t
//       )
//     );

//     alert("Pemasangan selesai berhasil ditandai!");
//   } catch (error) {
//     console.error("Error marking installation complete:", error);
//   }
// };


//   return (
//     <div className="mt-32">
//       <NavbarProduksi />
//       <div className="transaction-history">
//         <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
//         {transactions.length === 0 ? (
//           <p>Belum ada transaksi.</p>
//         ) : (
//           transactions.map((transaction) => (
//             <div key={transaction.id} className="mb-6 border p-4 rounded">
//               <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
//               <strong>User Name:</strong> {transaction.userName || "Tidak Diketahui"}
//               <strong>Tanggal:</strong> 
// {transaction.timeStamp 
//   ? new Date(transaction.timeStamp).toLocaleString() 
//   : "Tanggal tidak tersedia"}

//               <h3 className="text-lg font-medium mt-4">Pesanan:</h3>

//               <div className="mt-4">
//                 <input
//                   type="file"
//                   onChange={(e) =>
//                     setUploadImage({
//                       ...uploadImage,
//                       [transaction.id]: e.target.files[0],
//                     })
//                   }
//                 />
//                 <textarea
//                   placeholder="Masukkan keterangan progress"
//                   value={progressText[transaction.id] || ""}
//                   onChange={(e) =>
//                     setProgressText({
//                       ...progressText,
//                       [transaction.id]: e.target.value,
//                     })
//                   }
//                   className="w-full border p-2 mt-2"
//                 ></textarea>
//                 <button
//                   className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
//                   onClick={() => handleSubmitProgress(transaction.id)}
//                 >
//                   Kirim Progress
//                 </button>
//               </div>

//               {transaction.statusProgres !== "pemasangan selesai" && (
//                 <button
//                   className="bg-blue-500 text-white px-3 py-1 mt-4 rounded"
//                   onClick={() => handleCompleteInstallation(transaction.id)}
//                 >
//                   Tandai Pemasangan Selesai
//                 </button>
//               )}

//               {progressData[transaction.id] && Array.isArray(progressData[transaction.id]) && progressData[transaction.id].length > 0 ? (
//                 <div className="mt-4">
//                   <h3 className="text-lg font-medium">Riwayat Progress:</h3>
//                   {progressData[transaction.id].map((prog, index) => (
//                     <div key={index} className="border p-2 mt-2">
//                       <strong>Progress:</strong> {" "}
//                       {prog.progress && typeof prog.progress === "string" ? prog.progress : "No progress info"}

//                       <strong>Keterangan:</strong> {" "}
//                       {prog.keterangan && typeof prog.keterangan === "string" ? prog.keterangan : "No description"}

//                       {prog.image && typeof prog.image === "string" ? (
//                         <img src={prog.image} alt="Uploaded" className="mt-2 max-w-full" />
//                       ) : (
//                         <p>No image available</p>
//                       )}

//                       <strong>Status:</strong> {" "} 
//                       {prog.statusProgres && typeof prog.statusProgres === "string" ? prog.statusProgres : "No status"}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>Tidak ada riwayat progress untuk transaksi ini.</p>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Services;








// "use client";

// import React, { useEffect, useState } from "react";
// import { db, storage } from "@/firebase/firebase"; // Ensure storage is imported
// import { collection, getDocs, query, where, addDoc, updateDoc, doc } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import NavbarProduksi from "@/components/NavbarProduksi";

// const Services = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [progressData, setProgressData] = useState({});
//   const [uploadImage, setUploadImage] = useState({});
//   const [progressText, setProgressText] = useState({});

//   useEffect(() => {
//     const fetchApprovedTransactions = async () => {
//       try {
//         const approvedQuery = query(
//           collection(db, "cartMutasiCustome3"),
//           where("status", "==", "Di Acc Admin Silahkan Memasukkan ke Keranjang")
//         );
//         const querySnapshot = await getDocs(approvedQuery);
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTransactions(data);
  
//         const transactionIds = data.map((t) => t.id);
//         if (transactionIds.length === 0) {
//           setProgressData({});
//           return;
//         }
  
//         const progressQuery = query(
//           collection(db, "progress"),
//           where("transactionId", "in", transactionIds)
//         );
//         const progressSnapshot = await getDocs(progressQuery);
//         const progress = progressSnapshot.docs.reduce((acc, doc) => {
//           const data = doc.data();
//           const transactionId = data.transactionId;
//           if (!acc[transactionId]) {
//             acc[transactionId] = [];
//           }
//           acc[transactionId].push({
//             ...data,
//             keterangan: data.keterangan || "Tidak ada keterangan",
//           });
//           return acc;
//         }, {});
//         setProgressData(progress);
//       } catch (error) {
//         console.error("Error fetching approved transactions:", error);
//       }
//     };
  
//     fetchApprovedTransactions();
//   }, []);
  
//   const uploadImageToStorage = async (file) => {
//     try {
//       const storageRef = ref(storage, `progress_images/${file.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       return new Promise((resolve, reject) => {
//         uploadTask.on(
//           "state_changed",
//           null,
//           (error) => reject(error),
//           async () => {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             resolve(downloadURL);
//           }
//         );
//       });
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       throw error;
//     }
//   };

//   const handleSubmitProgress = async (transactionId) => {
//     try {
//       const transaction = transactions.find((t) => t.id === transactionId);
//       const imageFile = uploadImage[transactionId] || null;
//       const keterangan = progressText[transactionId] || "Tidak ada keterangan";
  
//       let imageURL = null;
//       if (imageFile) {
//         imageURL = await uploadImageToStorage(imageFile);
//       }
  
//       const progressStage = progressData[transactionId]?.length + 1 || 1;
//       const progressName = `Progress ${progressStage}`;
  
//       const newProgressData = {
//         progress: progressName,
//         keterangan,
//         image: imageURL,
//         statusProgres: progressStage === 1 ? "terkirim" : `progress ${progressStage}`,
//         timestamp: new Date(),
//         transactionId,
//         userName: transaction.userName || "Tidak Diketahui",
//       };
  
//       await addDoc(collection(db, "progress"), newProgressData);
  
//       setProgressData((prevData) => ({
//         ...prevData,
//         [transactionId]: [...(prevData[transactionId] || []), newProgressData],
//       }));
  
//       alert("Progress berhasil dikirim!");
//     } catch (error) {
//       console.error("Error submitting progress:", error);
//     }
//   };

//   const handleCompleteInstallation = async (transactionId) => {
//     try {
//       const progressQuery = query(
//         collection(db, "progress"),
//         where("transactionId", "==", transactionId)
//       );
//       const querySnapshot = await getDocs(progressQuery);

//       querySnapshot.forEach(async (docSnapshot) => {
//         const progressRef = doc(db, "progress", docSnapshot.id);
//         await updateDoc(progressRef, {
//           statusProgres: "pemasangan selesai",
//           progress: "progress closed",
//         });
//       });

//       setTransactions((prevTransactions) =>
//         prevTransactions.map((t) =>
//           t.id === transactionId
//             ? {
//                 ...t,
//                 statusProgres: "pemasangan selesai",
//                 progress: "progress closed",
//               }
//             : t
//         )
//       );

//       alert("Pemasangan selesai berhasil ditandai!");
//     } catch (error) {
//       console.error("Error marking installation complete:", error);
//     }
//   };

//   return (
//     <div className="mt-32">
//       <NavbarProduksi />
//       <div className="transaction-history">
//         <h1 className="text-2xl font-bold mb-4">Riwayat Progress</h1>
//         {transactions.length === 0 ? (
//           <p>Belum ada transaksi.</p>
//         ) : (
//           transactions.map((transaction) => (
//             <div key={transaction.id} className="mb-6 border p-4 rounded">
//               <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
//               <strong>User Name:</strong> {transaction.namaPembeli || "Tidak Diketahui"}<br />
//               <strong>Tanggal:</strong> 
//               {transaction.startDate 
//                 ? new Date(transaction.startDate).toLocaleString() 
//                 : "Tanggal tidak tersedia"}<br />

//               <h3 className="text-lg font-medium mt-4">Pesanan:</h3>

//               <div className="mt-4">
//                 <input
//                   type="file"
//                   onChange={(e) =>
//                     setUploadImage({
//                       ...uploadImage,
//                       [transaction.id]: e.target.files[0],
//                     })
//                   }
//                 />
//                 <textarea
//                   placeholder="Masukkan keterangan progress"
//                   value={progressText[transaction.id] || ""}
//                   onChange={(e) =>
//                     setProgressText({
//                       ...progressText,
//                       [transaction.id]: e.target.value,
//                     })
//                   }
//                   className="w-full border p-2 mt-2"
//                 ></textarea>
//                 <button
//                   className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
//                   onClick={() => handleSubmitProgress(transaction.id)}
//                 >
//                   Kirim Progress
//                 </button>
//               </div>

//               {transaction.statusProgres !== "pemasangan selesai" && (
//                 <button
//                   className="bg-blue-500 text-white px-3 py-1 mt-4 rounded"
//                   onClick={() => handleCompleteInstallation(transaction.id)}
//                 >
//                   Tandai Pemasangan Selesai
//                 </button>
//               )}

//               {progressData[transaction.id] && Array.isArray(progressData[transaction.id]) && progressData[transaction.id].length > 0 ? (
//                 <div className="mt-4">
//                   <h3 className="text-lg font-medium">Riwayat Progress:</h3>
//                   {progressData[transaction.id].map((prog, index) => (
//                     <div key={index} className="border p-2 mt-2">
//                       <strong>Progress:</strong> {prog.progress || "No progress info"}<br />
//                       <strong>Keterangan:</strong> {prog.keterangan || "No description"}<br />
//                       {prog.image ? (
//                         <img src={prog.image} alt="Uploaded" className="mt-2 max-w-full" />
//                       ) : (
//                         <p>No image available</p>
//                       )}
//                       <strong>Status:</strong> {prog.statusProgres || "No status"}<br />
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>Tidak ada riwayat progress untuk transaksi ini.</p>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Services;




"use client";

import React, { useEffect, useState } from "react";
import { db, storage } from "@/firebase/firebase"; // Ensure storage is imported
import { collection, getDocs, getDoc, query, where, addDoc, updateDoc, onSnapshot, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import NavbarProduksi from "@/components/NavbarProduksi";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth

const Services = ({ transaction }) => {
  const [cartMutasiTransactions, setCartMutasiTransactions] = useState([]);
  const [cartMutasiCustome3Transactions, setCartMutasiCustome3Transactions] = useState([]);
  const [transactionsCustome, setTransactionsCustome] = useState([]);
  const [progressData, setProgressData] = useState({});
    const [loading, setLoading] = useState(true);
  const [uploadImage, setUploadImage] = useState({});
    const [currentUser, setCurrentUser] = useState(null); // State for logged-in user
  const [progressText, setProgressText] = useState({});

  const [cartMutasiTransactionCustomeGambar, setTransactionsCustomeGambar] = useState([]);

  useEffect(() => {
      const fetchTransactionsCustomeGambar = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "jangkauanCustomSewa"));
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTransactionsCustomeGambar(data);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      };
  
      fetchTransactionsCustomeGambar();
    }, []);
  
    useEffect(() => {
      const fetchTransactionsCustome = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "cartMutasiCustome"));
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTransactionsCustome(data);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      };
  
      fetchTransactionsCustome();
    }, []);

  // useEffect(() => {
  //   const fetchApprovedTransactions = async () => {
  //     try {
  //       // Fetch data from cartMutasi
  //       const approvedQuery1 = query(
  //         collection(db, "cartMutasi"),
  //         where("statusMutasi", "==", "Transaksi Sukses,Baleho Sudah Di Order")
  //       );
  //       const querySnapshot1 = await getDocs(approvedQuery1);
  //       const data1 = querySnapshot1.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setCartMutasiTransactions(data1);

  //       // Fetch data from cartMutasiCustome3
  //       const approvedQuery2 = query(
  //         collection(db, "cartMutasiCustome3"),
  //         where("status", "==", "Di Acc Admin Silahkan Memasukkan ke Keranjang")
  //       );
  //       const querySnapshot2 = await getDocs(approvedQuery2);
  //       const data2 = querySnapshot2.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setCartMutasiCustome3Transactions(data2);

  //       const transactionIds = [...data1, ...data2].map((t) => t.id);
  //       if (transactionIds.length === 0) {
  //         setProgressData({});
  //         return;
  //       }

  //       const progressQuery = query(
  //         collection(db, "progress"),
  //         where("transactionId", "in", transactionIds)
  //       );
  //       const progressSnapshot = await getDocs(progressQuery);
  //       const progress = progressSnapshot.docs.reduce((acc, doc) => {
  //         const data = doc.data();
  //         const transactionId = data.transactionId;
  //         if (!acc[transactionId]) {
  //           acc[transactionId] = [];
  //         }
  //         acc[transactionId].push({
  //           ...data,
  //           keterangan: data.keterangan || "Tidak ada keterangan",
  //         });
  //         return acc;
  //       }, {});
  //       setProgressData(progress);
  //     } catch (error) {
  //       console.error("Error fetching approved transactions:", error);
  //     }
  //   };

  //   fetchApprovedTransactions();
  // }, []);

//update tgl 10 februari 2025
  useEffect(() => {
      const fetchTransactions = async () => {
        const transactionQuerySnapshot = await getDocs(collection(db, 'transactiondesainacc'));
        const transactionPromises = transactionQuerySnapshot.docs.map(async (doc) => {
          const cartData = doc.data().cartData;
    
          // Pastikan data tidak undefined
          if (!cartData || !cartData.category || !cartData.description || !cartData.title) {
            console.warn('Skipping query due to missing cartData fields:', cartData);
            return null; // Skip jika data tidak valid
          }
    
          const transactionData = {
            id: doc.id,
            ...cartData,
          };
    
          try {
            // Query ke koleksi cart untuk mencocokkan data
            const cartQuery = query(
              collection(db, 'cart'),
              where('category', '==', transactionData.category),
              where('description', '==', transactionData.description),
              where('title', '==', transactionData.title)
            );
    
            const cartSnapshot = await getDocs(cartQuery);
    
            // Ambil status dari data cart jika cocok
            const cartStatus = cartSnapshot.empty
              ? 'Status tidak ditemukan'
              : cartSnapshot.docs[0].data().statusCustome;
    
            return {
              ...transactionData,
              statusCustome: cartStatus, // Tambahkan status ke transaksi
            };
          } catch (error) {
            console.error('Error fetching cart status:', error);
            return null;
          }
        });
    
        const transactionsWithStatus = await Promise.all(transactionPromises);
        // Filter data null yang mungkin terjadi
        setTransactionAcc(transactionsWithStatus.filter((item) => item !== null));
      };
    
      fetchTransactions();
    }, []);
  
      const [transactionAcc, setTransactionAcc] = useState([]);





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
      
        useEffect(() => {
          const fetchTransactionsWithCompanyName = async () => {
            try {
              const transactionSnapshot = await getDocs(collection(db, "transactiondesainacc"));
              
              // Loop setiap transaksi dan fetch companyName dari tabel users
              const transactionsWithCompany = await Promise.all(
                transactionSnapshot.docs.map(async (transactionDoc) => {
                  const transactionData = {
                    id: transactionDoc.id,
                    ...transactionDoc.data().cartData,
                  };
      
                  // Default jika companyName tidak ditemukan
                  let companyName = "Tidak Diketahui";
      
                  // Ambil userId atau field terkait jika ada
                  if (transactionData.userId) {
                    const userRef = doc(db, "users", transactionData.userId);
                    const userSnap = await getDoc(userRef);
      
                    if (userSnap.exists()) {
                      companyName = userSnap.data().companyName || "Tidak Diketahui";
                    }
                  }
      
                  return {
                    ...transactionData,
                    companyName,  // Tambahkan ke data transaksi
                  };
                })
              );
      
              setTransactionAcc(transactionsWithCompany);
            } catch (error) {
              console.error("Error fetching transactions with company name:", error);
            }
          };
      
          fetchTransactionsWithCompanyName();
        }, [currentUser]);
      useEffect(() => {
        const fetchTransactionsCustome = async () => {
          const transactionQuerySnapshot = await getDocs(collection(db, 'jangkauanCustomSewa'));
          const transactionPromises = transactionQuerySnapshot.docs.map(async (doc) => {
            const cartData = doc.data().cartData;
      
            // Pastikan data tidak undefined
            if (!cartData || !cartData.category || !cartData.description || !cartData.title) {
              console.warn('Skipping query due to missing cartData fields:', cartData);
              return null; // Skip jika data tidak valid
            }
      
            const transactionData = {
              id: doc.id,
              ...cartData,
            };
      
            try {
              // Query ke koleksi cart untuk mencocokkan data
              const cartQuery = query(
                collection(db, 'cartMutasiCustome2'),
                where('category', '==', transactionData.category),
                where('description', '==', transactionData.description),
                where('title', '==', transactionData.title)
              );
      
              const cartSnapshot = await getDocs(cartQuery);
      
              // Ambil status dari data cart jika cocok
              const cartStatus = cartSnapshot.empty
                ? 'Status tidak ditemukan'
                : cartSnapshot.docs[0].data().statusCustome;
      
              return {
                ...transactionData,
                statusCustome: cartStatus, // Tambahkan status ke transaksi
              };
            } catch (error) {
              console.error('Error fetching cart status:', error);
              return null;
            }
          });
      
          const transactionsWithStatus = await Promise.all(transactionPromises);
          // Filter data null yang mungkin terjadi
          setCartMutasiCustomeTransactions(transactionsWithStatus.filter((item) => item !== null));
        };
      
        fetchTransactionsCustome();
      }, []);


      const [cartMutasiCustomeTransactions, setCartMutasiCustomeTransactions] = useState([]);
  const uploadImageToStorage = async (file) => {
    try {
      const storageRef = ref(storage, `progress_images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (transactionAcc.length > 0) {
      const transactionIds = transactionAcc.map((t) => t.id);
  
      // Fungsi untuk membagi array ke dalam batch kecil
      const chunkArray = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
          result.push(arr.slice(i, i + chunkSize));
        }
        return result;
      };
  
      const chunks = chunkArray(transactionIds, 30); // Bagi dalam batch 30
  
      // Listener untuk setiap batch
      const unsubscribes = chunks.map((chunk) => {
        const q = query(collection(db, "progress"), where("transactionId", "in", chunk));
        return onSnapshot(q, (snapshot) => {
          const newProgressData = snapshot.docs.reduce((acc, doc) => {
            const data = doc.data();
            const transactionId = data.transactionId;
            if (!acc[transactionId]) {
              acc[transactionId] = [];
            }
            acc[transactionId].push({
              ...data,
              keterangan: data.keterangan || "Tidak ada keterangan",
            });
            return acc;
          }, {});
  
          setProgressData((prevData) => ({
            ...prevData,
            ...newProgressData,
          }));
        });
      });
  
      // Bersihkan semua listener
      return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
    }
  }, [transactionAcc]);

  // const handleSubmitProgress = async (transactionId) => {
  //   try {
  //     const transaction = [...cartMutasiTransactions, ...cartMutasiCustome3Transactions].find((t) => t.id === transactionId);
  //     const imageFile = uploadImage[transactionId] || null;
  //     const keterangan = progressText[transactionId] || "Tidak ada keterangan";

  //     let imageURL = null;
  //     if (imageFile) {
  //       imageURL = await uploadImageToStorage(imageFile);
  //     }

  //     const progressStage = progressData[transactionId]?.length + 1 || 1;
  //     const progressName = `Progress ${progressStage}`;

  //     const newProgressData = {
  //       progress: progressName,
  //       namaPembeli: transaction.namaPembeli || "Tidak Diketahui",
  //       keterangan,
  //       image: imageURL,
  //       statusProgres: progressStage === 1 ? "terkirim" : `progress ${progressStage}`,
  //       timestamp: new Date(),
  //       transactionId,
  //       userName: transaction.userName || "Tidak Diketahui",
  //     };

  //     await addDoc(collection(db, "progress"), newProgressData);

  //     setProgressData((prevData) => ({
  //       ...prevData,
  //       [transactionId]: [...(prevData[transactionId] || []), newProgressData],
  //     }));

  //     alert("Progress berhasil dikirim!");
  //   } catch (error) {
  //     console.error("Error submitting progress:", error);
  //   }
  // };



  const handleSubmitProgress = async (transactionId) => {
    try {
      const transaction = [...transactionAcc, ...cartMutasiTransactionCustomeGambar].find((t) => t.id === transactionId);
      const imageFile = uploadImage[transactionId] || null;
      const keterangan = progressText[transactionId] || "Tidak ada keterangan";

      let imageURL = null;
      if (imageFile) {
        imageURL = await uploadImageToStorage(imageFile);
      }

      const progressStage = progressData[transactionId]?.length + 1 || 1;
      const progressName = `Progress ${progressStage}`;

      const newProgressData = {
        progress: progressName,
        namaPembeli: transaction.namaPembeli || "Tidak Diketahui",
        keterangan,
        image: imageURL,
        statusProgres: progressStage === 1 ? "terkirim" : `progress ${progressStage}`,
        timestamp: new Date(),
        transactionId,
        userName: transaction.userName || "Tidak Diketahui",
      };

      await addDoc(collection(db, "progress"), newProgressData);

      setProgressData((prevData) => ({
        ...prevData,
        [transactionId]: [...(prevData[transactionId] || []), newProgressData],
      }));

      alert("Progress berhasil dikirim!");
    } catch (error) {
      console.error("Error submitting progress:", error);
    }
  };

  const handleCompleteInstallation = async (transactionId) => {
    try {
      const progressQuery = query(
        collection(db, "progress"),
        where("transactionId", "==", transactionId)
      );
      const querySnapshot = await getDocs(progressQuery);

      querySnapshot.forEach(async (docSnapshot) => {
        const progressRef = doc(db, "progress", docSnapshot.id);
        await updateDoc(progressRef, {
          statusProgres: "pemasangan selesai",
          progress: "progress closed",
        });
      });

      setCartMutasiTransactions((prevTransactions) =>
        prevTransactions.map((t) =>
          t.id === transactionId
            ? {
                ...t,
                statusProgres: "pemasangan selesai",
                progress: "progress closed",
              }
            : t
        )
      );

      setCartMutasiCustome3Transactions((prevTransactions) =>
        prevTransactions.map((t) =>
          t.id === transactionId
            ? {
                ...t,
                statusProgres: "pemasangan selesai",
                progress: "progress closed",
              }
            : t
        )
      );

      alert("Pemasangan selesai berhasil ditandai!");
    } catch (error) {
      console.error("Error marking installation complete:", error);
    }
  };

  useEffect(() => {
    if (transactionAcc.length > 0) {
      const transactionIds = transactionAcc.map((t) => t.id);
      const q = query(collection(db, "progress"), where("transactionId", "in", transactionIds));
  
      // Mendengarkan perubahan real-time di Firestore
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newProgressData = snapshot.docs.reduce((acc, doc) => {
          const data = doc.data();
          const transactionId = data.transactionId;
          if (!acc[transactionId]) {
            acc[transactionId] = [];
          }
          acc[transactionId].push({
            ...data,
            keterangan: data.keterangan || "Tidak ada keterangan",
          });
          return acc;
        }, {});
  
        setProgressData(newProgressData);
      });
  
      // Bersihkan listener saat komponen di-unmount
      return () => unsubscribe();
    }
  }, [transactionAcc]);

  // const [progressData, setProgressData] = useState({});

  useEffect(() => {
    if (cartMutasiTransactionCustomeGambar.length > 0) {
      const transactionIds = cartMutasiTransactionCustomeGambar.map((t) => t.id);
  
      // Fungsi untuk membagi array ke dalam batch kecil
      const chunkArray = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
          result.push(arr.slice(i, i + chunkSize));
        }
        return result;
      };
  
      const chunks = chunkArray(transactionIds, 30); // Bagi dalam batch 30
  
      // Listener untuk setiap batch
      const unsubscribes = chunks.map((chunk) => {
        const q = query(collection(db, "progress"), where("transactionId", "in", chunk));
        return onSnapshot(q, (snapshot) => {
          const newProgressData = snapshot.docs.reduce((acc, doc) => {
            const data = doc.data();
            const transactionId = data.transactionId;
            if (!acc[transactionId]) {
              acc[transactionId] = [];
            }
            acc[transactionId].push({
              ...data,
              keterangan: data.keterangan || "Tidak ada keterangan",
            });
            return acc;
          }, {});
  
          setProgressData((prevData) => ({
            ...prevData,
            ...newProgressData,
          }));
        });
      });
  
      // Bersihkan semua listener
      return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
    }
  }, [cartMutasiTransactionCustomeGambar]);

  return (
    <div className="mt-32">
      <NavbarProduksi />
      <div className="transaction-history">
        <h1 className="text-3xl font-bold mb-6 text-center">Riwayat Progress Transaksi</h1>

        {/* Cart Mutasi Transactions */}
        <div className="cart-mutasi-section">
          <h2 className="text-2xl font-semibold mb-4 text-center">Riwayat Progress - Cart Mutasi</h2>
          {transactionAcc.length === 0 ? (
            <p className="text-center text-gray-600">Belum ada transaksi di Cart Mutasi.</p>
          ) : (
            transactionAcc.map((transaction, index) => (
              <div key={`progress-cart-${transaction.id || index}-${index}`} className="mb-6 p-6 border-2 border-gray-200 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">Order ID: {transaction.id}</h3>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <strong className="block">User Name:</strong> {transaction.name||transaction.userName || transaction.companyName  || transaction.email || transaction.namaPembeli || "Tidak Diketahui"}
                    <strong className="block">Tanggal:</strong>
                    {transaction.startDate
                      ? new Date(transaction.startDate).toLocaleString()
                      : "Tanggal tidak tersedia"}
                  </div>
                  <div>
                    <strong>Status:</strong> {transaction.statusProgres || "Belum ada status"}
                  </div>
                </div>

                <div className="mt-4">
                  <input
                    type="file"
                    onChange={(e) =>
                      setUploadImage({
                        ...uploadImage,
                        [transaction.id]: e.target.files[0],
                      })
                    }
                    className="mb-4 p-2 border border-gray-300 rounded-md"
                  />
                  <textarea
                    placeholder="Masukkan keterangan progress"
                    value={progressText[transaction.id] || ""}
                    onChange={(e) =>
                      setProgressText({
                        ...progressText,
                        [transaction.id]: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                  ></textarea>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    onClick={() => handleSubmitProgress(transaction.id)}
                  >
                    Kirim Progress
                  </button>
                </div>

                {transaction.statusProgres !== "pemasangan selesai" && (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 transition"
                    onClick={() => handleCompleteInstallation(transaction.id)}
                  >
                    Tandai Pemasangan Selesai
                  </button>
                )}

                {progressData[transaction.id] && Array.isArray(progressData[transaction.id]) && progressData[transaction.id].length > 0 ? (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Riwayat Progress:</h3>
                    {progressData[transaction.id].map((prog, index) => (
                      <div key={index} className="border p-4 mb-4 rounded-lg shadow-md">
                        <strong className="block">Progress:</strong> {prog.progress || "No progress info"}
                        <strong className="block mt-2">Keterangan:</strong> {prog.keterangan || "No description"}
                        {prog.image ? (
                          <img src={prog.image} alt="Uploaded" className="mt-4 max-w-full rounded-md shadow-md" />
                        ) : (
                          <p className="text-gray-500">No image available</p>
                        )}
                        <strong className="block mt-2">Status:</strong> {prog.statusProgres || "No status"}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Tidak ada riwayat progress untuk transaksi ini.</p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Cart Mutasi Custome3 Transactions */}
        <div className="cart-mutasi-custome3-section mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">Riwayat Progress - Cart Mutasi Custome3</h2>
          {cartMutasiTransactionCustomeGambar.length === 0 ? (
            <p className="text-center text-gray-600">Belum ada transaksi di Cart Mutasi Custome3.</p>
          ) : (
            cartMutasiTransactionCustomeGambar.map((transaction, index) => (
              <div key={`progress-custom-${transaction.id || index}-${index}`} className="mb-6 p-6 border-2 border-gray-200 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">Order ID: {transaction.id}</h3>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <strong className="block">User Name:</strong> {transaction.namaPembeli || "Tidak Diketahui"}
                    <strong className="block">Tanggal:</strong>
                    {transaction.startDate
                      ? new Date(transaction.startDate).toLocaleString()
                      : "Tanggal tidak tersedia"}
                  </div>
                  <div>
                    <strong>Status:</strong> {transaction.statusProgres || "Belum ada status"}
                  </div>
                </div>

                <div className="mt-4">
                  <input
                    type="file"
                    onChange={(e) =>
                      setUploadImage({
                        ...uploadImage,
                        [transaction.id]: e.target.files[0],
                      })
                    }
                    className="mb-4 p-2 border border-gray-300 rounded-md"
                  />
                  <textarea
                    placeholder="Masukkan keterangan progress"
                    value={progressText[transaction.id] || ""}
                    onChange={(e) =>
                      setProgressText({
                        ...progressText,
                        [transaction.id]: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                  ></textarea>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    onClick={() => handleSubmitProgress(transaction.id)}
                  >
                    Kirim Progress
                  </button>
                </div>

                {transaction.statusProgres !== "pemasangan selesai" && (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 transition"
                    onClick={() => handleCompleteInstallation(transaction.id)}
                  >
                    Tandai Pemasangan Selesai
                  </button>
                )}

                {progressData[transaction.id] && Array.isArray(progressData[transaction.id]) && progressData[transaction.id].length > 0 ? (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Riwayat Progress:</h3>
                    {progressData[transaction.id].map((prog, index) => (
                      <div key={index} className="border p-4 mb-4 rounded-lg shadow-md">
                        <strong className="block">Progress:</strong> {prog.progress || "No progress info"}
                        <strong className="block mt-2">Keterangan:</strong> {prog.keterangan || "No description"}
                        {prog.image ? (
                          <img src={prog.image} alt="Uploaded" className="mt-4 max-w-full rounded-md shadow-md" />
                        ) : (
                          <p className="text-gray-500">No image available</p>
                          
                        )}
                        <strong className="block mt-2">Status:</strong> {prog.statusProgres || "No status"}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Tidak ada riwayat progress untuk transaksi ini.</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;





// "use client";

// import React, { useEffect, useState } from "react";
// import { db, storage } from "@/firebase/firebase"; // Ensure storage is imported
// import { collection, getDocs, query, where, addDoc, updateDoc, doc } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import NavbarProduksi from "@/components/NavbarProduksi";

// const Services = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [progressData, setProgressData] = useState({});
//   const [uploadImage, setUploadImage] = useState({});
//   const [progressText, setProgressText] = useState({});

// // Fetch approved transactions
// useEffect(() => {
//   const fetchApprovedTransactions = async () => {
//     try {
//       // Query to fetch data with specific status from cartMutasiCustome3
//       const approvedQuery = query(
//         collection(db, "cartMutasiCustome3"),
//         where("status", "==", "DI Acc Admin Silahkan Memasukkan ke Keranjang")
//       );
      
//       const querySnapshot = await getDocs(approvedQuery);
//       const data = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setTransactions(data);

//       // Check if there are any transactions to query progress for
//       if (data.length > 0) {
//         const progressQuery = query(
//           collection(db, "progress"),
//           where("transactionId", "in", data.map((t) => t.id))
//         );

//         const progressSnapshot = await getDocs(progressQuery);
//         const progress = progressSnapshot.docs.reduce((acc, doc) => {
//           const data = doc.data();
//           const transactionId = data.transactionId;
//           if (!acc[transactionId]) {
//             acc[transactionId] = [];
//           }
//           acc[transactionId].push({
//             ...data,
//             keterangan: data.keterangan || "Tidak ada keterangan",
//           });
//           return acc;
//         }, {});

//         setProgressData(progress);
//       } else {
//         // If no transactions, set progressData to an empty object
//         setProgressData({});
//       }
//     } catch (error) {
//       console.error("Error fetching approved transactions:", error);
//     }
//   };

//   fetchApprovedTransactions();
// }, []);


//   // Function to upload image to Firebase Storage
//   const uploadImageToStorage = async (file) => {
//     try {
//       const storageRef = ref(storage, `progress_images/${file.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       return new Promise((resolve, reject) => {
//         uploadTask.on(
//           "state_changed",
//           null,
//           (error) => reject(error),
//           async () => {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             resolve(downloadURL);
//           }
//         );
//       });
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       throw error;
//     }
//   };

//   const handleSubmitProgress = async (transactionId) => {
//     try {
//       const transaction = transactions.find((t) => t.id === transactionId);
//       const imageFile = uploadImage[transactionId] || null;
//       const keterangan = progressText[transactionId] || "Tidak ada keterangan";
  
//       let imageURL = null;
//       if (imageFile) {
//         imageURL = await uploadImageToStorage(imageFile);
//       }
  
//       const progressStage = progressData[transactionId]?.length + 1 || 1;
//       const progressName = `Progress ${progressStage}`;
  
//       const newProgressData = {
//         progress: progressName,
//         keterangan,
//         image: imageURL,
//         statusProgres: progressStage === 1 ? "terkirim" : `progress ${progressStage}`,
//         timestamp: new Date(),
//         transactionId,
//         userName: transaction.userName || "Tidak Diketahui", // Tambahkan username di sini
//       };
  
//       await addDoc(collection(db, "progress"), newProgressData);
  
//       // Update progress in frontend state
//       setProgressData((prevData) => ({
//         ...prevData,
//         [transactionId]: [...(prevData[transactionId] || []), newProgressData],
//       }));
  
//       alert("Progress berhasil dikirim!");
//     } catch (error) {
//       console.error("Error submitting progress:", error);
//     }
//   };

//   // Function to mark installation as complete
//   const handleCompleteInstallation = async (transactionId) => {
//     try {
//       const progressQuery = query(
//         collection(db, "progress"),
//         where("transactionId", "==", transactionId)
//       );
//       const querySnapshot = await getDocs(progressQuery);

//       querySnapshot.forEach(async (docSnapshot) => {
//         const progressRef = doc(db, "progress", docSnapshot.id);
//         await updateDoc(progressRef, {
//           statusProgres: "pemasangan selesai",
//           progress: "progress closed", // Add this line
//         });
//       });

//       setTransactions((prevTransactions) =>
//         prevTransactions.map((t) =>
//           t.id === transactionId
//             ? {
//                 ...t,
//                 statusProgres: "pemasangan selesai",
//                 progress: "progress closed", // Update local state
//               }
//             : t
//         )
//       );

//       alert("Pemasangan selesai berhasil ditandai!");
//     } catch (error) {
//       console.error("Error marking installation complete:", error);
//     }
//   };

//   return (
//     <div className="mt-32">
//       <NavbarProduksi />
//       <div className="transaction-history">
//         <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
//         {transactions.length === 0 ? (
//           <p>Belum ada transaksi.</p>
//         ) : (
//           transactions.map((transaction) => (
//             <div key={transaction.id} className="mb-6 border p-4 rounded">
//               <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
//               <strong>User Name:</strong> {transaction.userName || "Tidak Diketahui"}
//               <strong>Tanggal:</strong> {new Date(transaction.timeStamp?.toDate()).toLocaleString()}
//               <h3 className="text-lg font-medium mt-4">Pesanan:</h3>

//               <div className="mt-4">
//                 <input
//                   type="file"
//                   onChange={(e) =>
//                     setUploadImage({
//                       ...uploadImage,
//                       [transaction.id]: e.target.files[0],
//                     })
//                   }
//                 />
//                 <textarea
//                   placeholder="Masukkan keterangan progress"
//                   value={progressText[transaction.id] || ""}
//                   onChange={(e) =>
//                     setProgressText({
//                       ...progressText,
//                       [transaction.id]: e.target.value,
//                     })
//                   }
//                   className="w-full border p-2 mt-2"
//                 ></textarea>
//                 <button
//                   className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
//                   onClick={() => handleSubmitProgress(transaction.id)}
//                 >
//                   Kirim Progress
//                 </button>
//               </div>

//               {transaction.statusProgres !== "pemasangan selesai" && (
//                 <button
//                   className="bg-blue-500 text-white px-3 py-1 mt-4 rounded"
//                   onClick={() => handleCompleteInstallation(transaction.id)}
//                 >
//                   Tandai Pemasangan Selesai
//                 </button>
//               )}

//               {progressData[transaction.id] && Array.isArray(progressData[transaction.id]) && progressData[transaction.id].length > 0 ? (
//                 <div className="mt-4">
//                   <h3 className="text-lg font-medium">Riwayat Progress:</h3>
//                   {progressData[transaction.id].map((prog, index) => (
//                     <div key={index} className="border p-2 mt-2">
//                       <strong>Progress:</strong> {" "}
//                       {prog.progress && typeof prog.progress === "string" ? prog.progress : "No progress info"}

//                       <strong>Keterangan:</strong> {" "}
//                       {prog.keterangan && typeof prog.keterangan === "string" ? prog.keterangan : "No description"}

//                       {prog.image && typeof prog.image === "string" ? (
//                         <img src={prog.image} alt="Uploaded" className="mt-2 max-w-full" />
//                       ) : (
//                         <p>No image available</p>
//                       )}

//                       <strong>Status:</strong> {" "} 
//                       {prog.statusProgres && typeof prog.statusProgres === "string" ? prog.statusProgres : "No status"}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>Tidak ada riwayat progress untuk transaksi ini.</p>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Services;
