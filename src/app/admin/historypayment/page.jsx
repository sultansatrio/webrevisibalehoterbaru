// "use client";

// import React, { useEffect, useState } from "react";
// import { db } from "@/firebase/firebase";
// import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

// const TransactionHistory = () => {
//   const [transactions, setTransactions] = useState([]);

//   // Fungsi untuk fetch data dari Firestore
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "cart"));
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTransactions(data);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   // Fungsi untuk memperbarui status di Firestore
//   const handleApproval = async (transactionId) => {
//     try {
//       const transactionDoc = doc(db, "cart", transactionId);
//       await updateDoc(transactionDoc, {
//         status: "disetujui", // Menambahkan atau memperbarui field "status"
//       });

//       // Perbarui status di state lokal
//       setTransactions((prevTransactions) =>
//         prevTransactions.map((transaction) =>
//           transaction.id === transactionId
//             ? { ...transaction, status: "disetujui" }
//             : transaction
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   return (
//     <div className="transaction-history">
//       <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
//       {transactions.length === 0 ? (
//         <p>Belum ada transaksi.</p>
//       ) : (
//         transactions.map((transaction) => (
//           <div key={transaction.id} className="mb-6 border p-4 rounded">
//             <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
//             <p><strong>User Name:</strong> {transaction.userName || "Tidak Diketahui"}</p>
//             <p><strong>Tanggal:</strong> {new Date(transaction.timeStamp?.toDate()).toLocaleString()}</p>
//             <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
//             {transaction.pesanan ? (
//               <table className="table-auto w-full border">
//                 <thead>
//                   <tr>
//                     <th>Judul</th>
//                     <th>Kategori</th>
//                     <th>Deskripsi</th>
//                     <th>Harga</th>
//                     <th>Status</th>
//                     <th>Aksi</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {transaction.pesanan.map((item, index) => (
//                     <tr key={index}>
//                       <td>{item.title}</td>
//                       <td>{item.category}</td>
//                       <td>{item.description}</td>
//                       <td>{item.price}</td>
//                       <td>{transaction.status || "Belum Disetujui"}</td>
//                       <td>
//                         <button
//                           className="bg-blue-500 text-white px-3 py-1 rounded"
//                           onClick={() => handleApproval(transaction.id)}
//                           disabled={transaction.status === "disetujui"} // Disable jika sudah disetujui
//                         >
//                           {transaction.status === "disetujui"
//                             ? "Sudah Disetujui"
//                             : "Setujui"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p>Pesanan tidak tersedia.</p>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default TransactionHistory;



// "use client";

// import React, { useEffect, useState } from "react";
// import { db } from "@/firebase/firebase";
// import { collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
// import NavbarAdmin from "@/components/NavbarAdmin";

// const TransactionHistory = () => {
//   const [transactions, setTransactions] = useState([]);

//   // Fungsi untuk fetch data dari Firestore
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "cart"));
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTransactions(data);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   // Fungsi untuk memperbarui status di Firestore dan menambah transaksi
//   const handleApproval = async (transactionId) => {
//     try {
//       // 1. Update the status in the 'cart' collection
//       const transactionDoc = doc(db, "cart", transactionId);
//       await updateDoc(transactionDoc, {
//         status: "disetujui", // Update status to 'disetujui'
//       });

//       // 2. Fetch the transaction details from Firestore (for adding to 'transactions' collection)
//       const transactionSnapshot = await getDocs(doc(db, "cart", transactionId));
//       const transactionData = transactionSnapshot.data();

//       // 3. Add the transaction to the 'transactions' collection
//       if (transactionData) {
//         await addDoc(collection(db, "transactions"), {
//           order_id: transactionData.order_id,
//           user_id: transactionData.user_id,
//           userName: transactionData.userName,
//           status: "disetujui", // Transaction is approved
//           pesanan: transactionData.pesanan,
//           gross_amount: transactionData.gross_amount,
//           payment_type: transactionData.payment_type,
//           timeStamp: transactionData.timeStamp,
//           timestamp: new Date(), // Timestamp when added to transactions collection
//         });
//       }

//       // 4. Perbarui status di state lokal
//       setTransactions((prevTransactions) =>
//         prevTransactions.map((transaction) =>
//           transaction.id === transactionId
//             ? { ...transaction, status: "disetujui" }
//             : transaction
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status or adding to transactions:", error);
//     }
//   };

//   return (
//     <>
//     <NavbarAdmin/>
//     <div className="transaction-history"         style={{ paddingTop: "150px", paddingLeft: "100px" }}>
//       <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
//       {transactions.length === 0 ? (
//         <p>Belum ada transaksi.</p>
//       ) : (
//         transactions.map((transaction) => (
//           <div key={transaction.id} className="mb-6 border p-4 rounded">
//             <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
//             <p><strong>User Name:</strong> {transaction.userName || "Tidak Diketahui"}</p>
//             <p><strong>Tanggal:</strong> {new Date(transaction.timeStamp?.toDate()).toLocaleString()}</p>
//             <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
//             {transaction.pesanan ? (
//               <table className="table-auto w-full border">
//                 <thead>
//                   <tr>
//                     <th>Judul</th>
//                     <th>Kategori</th>
//                     <th>Deskripsi</th>
//                     <th>Harga</th>
//                     <th>Status</th>
//                     <th>Aksi</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {transaction.pesanan.map((item, index) => (
//                     <tr key={index}>
//                       <td>{item.title}</td>
//                       <td>{item.category}</td>
//                       <td>{item.description}</td>
//                       <td>{item.price}</td>
//                       <td>{transaction.status || "Belum Disetujui"}</td>
//                       <td>
//                         <button
//                           className="bg-blue-500 text-white px-3 py-1 rounded"
//                           onClick={() => handleApproval(transaction.id)}
//                           disabled={transaction.status === "disetujui"} // Disable if already approved
//                         >
//                           {transaction.status === "disetujui"
//                             ? "Sudah Disetujui"
//                             : "Setujui"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p>Pesanan tidak tersedia.</p>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//     </>
//   );
// };

// export default TransactionHistory;


//update tgl 9 februari 2025
// "use client";

// import React, { useEffect, useState } from "react";
// import { db } from "@/firebase/firebase";
// import { collection, onSnapshot, getDocs, updateDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
// import { getDoc } from "firebase/firestore";
// import NavbarAdmin from "@/components/NavbarAdmin";
// import { ref, getDownloadURL } from "firebase/storage";
// import { storage } from "@/firebase/firebase";

// const TransactionHistory = ({ initialTransactions, updateTransactionStatus }) => {
//   const [transactions, setTransactions] = useState([]);
//   const [transactionsCustome, setTransactionsCustome] = useState([]);
//   const [transactionsCustomeGambar, setTransactionsCustomeGambar] = useState([]);
//     const [data, setData] = useState([]);
//       const [newAssetNotification, setNewAssetNotification] = useState(false);

//         const [AssetNotification, setAssetNotification] = useState(false);
//    const [file, setFile] = useState(null);


//    const [imageUrls, setImageUrls] = useState({});

//   useEffect(() => {
//     const fetchImageUrls = async () => {
//       let urls = {};

//       // Iterasi melalui transaksi untuk mengambil URL gambar
//       await Promise.all(
//         transactionsCustome.map(async (transaction) => {
//           if (transaction.image) {
//             const imageRef = ref(storage, `desain/${transaction.image}`);
//             try {
//               const url = await getDownloadURL(imageRef);
//               urls[transaction.id] = url; // Simpan URL dengan id transaksi sebagai kunci
//             } catch (error) {
//               console.error(`Error fetching image for ${transaction.id}:`, error);
//               urls[transaction.id] = "/path-to-default-placeholder.png"; // Placeholder jika gagal mengambil gambar
//             }
//           }
//         })
//       );

//       setImageUrls(urls);
//     };

//     fetchImageUrls();
//   }, [transactionsCustome]);
//   // // Fungsi untuk fetch data dari Firestore
//   // useEffect(() => {
//   //   const fetchTransactions = async () => {
//   //     try {
//   //       const querySnapshot = await getDocs(collection(db, "cart"));
//   //       const data = querySnapshot.docs.map((doc) => ({
//   //         id: doc.id,
//   //         ...doc.data(),
//   //       }));
//   //       setTransactions(data);
//   //     } catch (error) {
//   //       console.error("Error fetching transactions:", error);
//   //     }
//   //   };

//   //   fetchTransactions();
//   // }, []);

//     useEffect(() => {
//       const unsub = onSnapshot(
//         collection(db, "desain"),
//         (snapshot) => {
//           let list = [];
//           snapshot.docs.forEach((doc) => {
//             list.push({ id: doc.id, ...doc.data() });
//           });
//           setData(list);
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//       const uploadFile = async () => {
//         const storageRef = ref(
//           storage,
//           "desain/" +
//             new Date().getTime() +
//             file.name.replace(" ", "%20") +
//             "UEU"
//         );
//         const uploadTask = uploadBytesResumable(storageRef, file);
  
//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {
//             const progress =
//               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             setPercentage(progress);
//             switch (snapshot.state) {
//               case "paused":
//                 console.log("Upload is paused");
//                 break;
//               case "running":
//                 console.log("Upload is running");
//                 break;
//             }
//           },
//           (error) => {
//             console.log(error);
//           },
//           () => {
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//               setDownloadUrl(downloadURL);
//             });
//           }
//         );
//       };
//       file && uploadFile();
//       return () => {
//         unsub();
//       };
//     }, [file]);

//       useEffect(() => {
//         const unsubProduct = onSnapshot(
//           collection(db, "desain"),
//           (snapshot) => {
//             let list = [];
//             snapshot.docs.forEach((doc) => {
//               list.push({ id: doc.id, ...doc.data() });
//             });
    
//             const isNewAssetAdded = list.length === data.length;
//             if (isNewAssetAdded) {
//               setNewAssetNotification(true);
//               setAssetNotification(false);
//             } else {
//               setNewAssetNotification(false);
//               setAssetNotification(true);
//             }
    
//             setData(list);
//           },
//           (error) => {
//             console.log(error);
//           }
//         );
//         return () => {
//           unsubProduct();
//         };
//       }, []);

//   useEffect(() => {
//     const fetchTransactionsCustome = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "jangkauanCustomSewa"));
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTransactionsCustome(data);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       }
//     };

//     fetchTransactionsCustome();
//   }, []);

//   useEffect(() => {
//     const fetchTransactionsCustomeGambar = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "cartMutasiCustome2"));
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTransactionsCustomeGambar(data);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       }
//     };

//     fetchTransactionsCustomeGambar();
//   }, []);

//   // Fungsi untuk mencopot Baleho
//   const handleRemoveBaleho = async (transactionId) => {
//     try {
//       // Ambil data transaksi menggunakan getDoc
//       const transactionDoc = doc(db, "cart", transactionId);
//       const transactionSnapshot = await getDoc(transactionDoc);

//       // Periksa apakah dokumen ada
//       if (transactionSnapshot.exists()) {
//         // Perbarui statusMutasi di Firestore
//         await updateDoc(transactionDoc, {
//           statusMutasi: "Baleho Ready", // Update statusMutasi
//         });

//         // Perbarui status di state lokal
//         setTransactions((prevTransactions) =>
//           prevTransactions.map((transaction) =>
//             transaction.id === transactionId
//               ? { ...transaction, statusMutasi: "Baleho Ready" }
//               : transaction
//           )
//         );
//       } else {
//         console.error("Transaksi tidak ditemukan!");
//       }
//     } catch (error) {
//       console.error("Error memperbarui statusMutasi:", error);
//     }
//   };

//   const handleRemoveBalehoCustome = async (transactionIdCustome) => {
//     try {
//       // Ambil data transaksi menggunakan getDoc
//       const transactionDocCustome = doc(db, "jangkauanCustomSewa", transactionIdCustome);
//       const transactionSnapshotCustome = await getDoc(transactionDocCustome);

//       // Periksa apakah dokumen ada
//       if (transactionSnapshotCustome.exists()) {
//         // Perbarui statusMutasi di Firestore
//         await updateDoc(transactionDocCustome, {
//           statusMutasi: "Baleho Ready", // Update statusMutasi
//         });

//         // Perbarui status di state lokal
//         setTransactionsCustome((prevTransactionsCustome) =>
//           prevTransactionsCustome.map((transactionCustome) =>
//             transactionCustome.id === transactionId
//               ? { ...transactionCustome, statusMutasi: "Baleho Ready" }
//               : transactionCustome
//           )
//         );
//       } else {
//         console.error("Transaksi tidak ditemukan!");
//       }
//     } catch (error) {
//       console.error("Error memperbarui statusMutasi:", error);
//     }
//   };



//   // // Fungsi untuk menyetujui transaksi
//   // const handleApproval = async (transactionId) => {
//   //   try {
//   //     // 1. Update the status in the 'cart' collection
//   //     const transactionDoc = doc(db, "cart", transactionId);
//   //     await updateDoc(transactionDoc, {
//   //       status: "disetujui", // Update status to 'disetujui'
//   //     });

//   //     // 2. Fetch the transaction details from Firestore (for adding to 'transactions' collection)
//   //     const transactionSnapshot = await getDoc(doc(db, "cart", transactionId));
//   //     const transactionData = transactionSnapshot.data();

//   //     // 3. Add the transaction to the 'transactions' collection
//   //     if (transactionData) {
//   //       await addDoc(collection(db, "transactions"), {
//   //         order_id: transactionData.order_id,
//   //         user_id: transactionData.user_id,
//   //         userName: transactionData.userName,
//   //         status: "disetujui", // Transaction is approved
//   //         pesanan: transactionData.pesanan,
//   //         gross_amount: transactionData.gross_amount,
//   //         payment_type: transactionData.payment_type,
//   //         timeStamp: transactionData.timeStamp,
//   //         timestamp: new Date(), // Timestamp when added to transactions collection
//   //       });
//   //     }

//   //     // 4. Perbarui status di state lokal
//   //     setTransactions((prevTransactions) =>
//   //       prevTransactions.map((transaction) =>
//   //         transaction.id === transactionId
//   //           ? { ...transaction, status: "disetujui" }
//   //           : transaction
//   //       )
//   //     );
//   //   } catch (error) {
//   //     console.error("Error updating status or adding to transactions:", error);
//   //   }
//   // };



//   // // Fungsi untuk menyetujui transaksi
//   // const handleApproval = async (transactionId) => {
//   //   try {
//   //     // 1. Update the status in the 'cart' collection
//   //     const transactionDoc = doc(db, "transactiondesainacc", transactionId);
//   //     await updateDoc(transactionDoc, {
//   //       // statusCustome: "disetujui", // Update status to 'disetujui'
//   //       statusCustome: "Menunggu Kabar Acc Admin", // Update status to 'disetujui'
//   //     });

//   //     // 2. Fetch the transaction details from Firestore (for adding to 'transactions' collection)
//   //     const transactionSnapshot = await getDoc(doc(db, "transactiondesainacc", transactionId));
//   //     const transactionData = transactionSnapshot.data();

//   //     // 3. Add the transaction to the 'transactions' collection
//   //     if (transactionData) {
//   //       await addDoc(collection(db, "transactions"), {
//   //         order_id: transactionData.order_id,
//   //         user_id: transactionData.user_id,
//   //         userName: transactionData.userName,
//   //         status: "disetujui", // Transaction is approved
//   //         pesanan: transactionData.pesanan,
//   //         gross_amount: transactionData.gross_amount,
//   //         payment_type: transactionData.payment_type,
//   //         timeStamp: transactionData.timeStamp,
//   //         timestamp: new Date(), // Timestamp when added to transactions collection
//   //       });
//   //     }

//   //     // 4. Perbarui status di state lokal
//   //     setTransactions((prevTransactions) =>
//   //       prevTransactions.map((transaction) =>
//   //         transaction.id === transactionId
//   //           ? { ...transaction, status: "disetujui" }
//   //           : transaction
//   //       )
//   //     );
//   //   } catch (error) {
//   //     console.error("Error updating status or adding to transactions:", error);
//   //   }
//   // };

//     // Fungsi untuk menyetujui transaksi
//     const handleApprovalCustome = async (transactionIdCustome) => {
//       try {
//         // 1. Update the status in the 'cart' collection
//         const transactionDocCustome = doc(db, "jangkauanCustomSewa", transactionIdCustome);
//         await updateDoc(transactionDocCustome, {
//           statusCustome: "Di Acc Admin Silahkan Memasukkan ke Keranjang", // Update status to 'disetujui'
//         });
  
//         // 2. Fetch the transaction details from Firestore (for adding to 'transactions' collection)
//         const transactionSnapshotCustome = await getDoc(doc(db, "jangkauanCustomeSewa", transactionIdCustome));
//         const transactionDataCustome = transactionSnapshotCustome.data();
  
//         // 3. Add the transaction to the 'transactions' collection
//         if (transactionDataCustome) {
//           await addDoc(collection(db, "jangkauanCustomSewa"), {
//             judul: transactionDataCustome.judul,
//             deskripsi: transactionDataCustome.deskripsi,
//             userName: transactionDataCustome.userName,
//             namaPembeli:transactionDataCustome.namaPembeli,
//             statusCustome: "Di Acc Admin Silahkan Memasukkan ke Keranjang", // Transaction is approved
//             startDate: transactionDataCustome.startDate,
//             endDate: transactionDataCustome.endDate,
//             harga: transactionDataCustome.harga,
//             hargaJangkauan: transactionDataCustome.hargaJangkauan,
//             jangkauanCustome: transactionDataCustome.jangkauanCustome,
//             timeStamp: transactionDataCustome.timeStamp,
//             timestamp: new Date(), // Timestamp when added to transactions collection
//           });
//         }
  
//         // 4. Perbarui status di state lokal
//         setTransactionsCustome((prevTransactionsCustome) =>
//           prevTransactionsCustome.map((transactionCustome) =>
//             transactionCustome.id === transactionIdCustome
//               ? { ...transactionCustome, statusCustome: "Di Acc Admin Silahkan Memasukkan ke Keranjang" }
//               : transactionCustome
//           )
//         );
//       } catch (error) {
//         console.error("Error updating status or adding to transactions:", error);
//       }
//     };


//   // // Fungsi untuk memasukkan transaksi ke 'cartMutasi'
//   // const handleSuccessTransaction = async (transactionId) => {
//   //   try {
//   //     // Ambil data transaksi menggunakan getDoc
//   //     const transactionDoc = doc(db, "cart", transactionId);
//   //     const transactionSnapshot = await getDoc(transactionDoc);

//   //     // Periksa apakah dokumen ada
//   //     if (transactionSnapshot.exists()) {
//   //       const transactionData = transactionSnapshot.data();

//   //       // Tambahkan transaksi ke koleksi 'cartMutasi'
//   //       await addDoc(collection(db, "cartMutasi"), {
//   //         userId: transactionData.userId,
//   //         userName: transactionData.userName,
//   //         statusMutasi: "Transaksi Sukses,Baleho Sudah Di Order", // Tandai transaksi sebagai sukses
//   //         pesanan: transactionData.pesanan,
//   //         timeStamp: transactionData.timeStamp,
//   //         timestamp: new Date(), // Timestamp saat ditambahkan ke 'cartMutasi'
//   //       });

//   //       // Perbarui status di state lokal
//   //       setTransactions((prevTransactions) =>
//   //         prevTransactions.map((transaction) =>
//   //           transaction.id === transactionId
//   //             ? { ...transaction, statusMutasi: "Transaksi Sukses,Baleho Sudah Di Order" }
//   //             : transaction
//   //         )
//   //       );
//   //     } else {
//   //       console.error("Transaksi tidak ditemukan!");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error memindahkan transaksi ke cartMutasi:", error);
//   //   }
//   // };


// // // Fungsi untuk memasukkan transaksi ke 'cartMutasi'
// // const handleSuccessTransaction = async (transactionId) => {
// //   try {
// //     // Ambil data transaksi menggunakan getDoc
// //     const transactionDoc = doc(db, "cart", transactionId);
// //     const transactionSnapshot = await getDoc(transactionDoc);

// //     // Periksa apakah dokumen ada
// //     if (transactionSnapshot.exists()) {
// //       const transactionData = transactionSnapshot.data();

// //       // Tambahkan transaksi ke koleksi 'cartMutasi'
// //       await addDoc(collection(db, "cartMutasi"), {
// //         userId: transactionData.userId,
// //         userName: transactionData.userName,
// //         statusMutasi: "Transaksi Sukses,Baleho Sudah Di Order", // Tandai transaksi sebagai sukses
// //         pesanan: transactionData.pesanan,
// //         timeStamp: transactionData.timeStamp,
// //         timestamp: new Date(), // Timestamp saat ditambahkan ke 'cartMutasi'
// //       });

// //       // Perbarui status di state lokal
// //       setTransactions((prevTransactions) =>
// //         prevTransactions.map((transaction) =>
// //           transaction.id === transactionId
// //             ? { ...transaction, statusMutasi: "Transaksi Sukses,Baleho Sudah Di Order" }
// //             : transaction
// //         )
// //       );
// //     } else {
// //       console.error("Transaksi tidak ditemukan!");
// //     }
// //   } catch (error) {
// //     console.error("Error memindahkan transaksi ke cartMutasi:", error);
// //   }
// // };




//   // Fungsi untuk memasukkan transaksi ke 'cartMutasi'
//     // const handleSuccessTransactionCustome = async (transactionIdCustome) => {
//     //   try {
//     //     // Ambil data transaksi menggunakan getDoc
//     //     const transactionDocCustome = doc(db, "jangkauanCustomSewa", transactionIdCustome);
//     //     const transactionSnapshotCustome = await getDoc(transactionDocCustome);
  
//     //     // Periksa apakah dokumen ada
//     //     if (transactionSnapshotCustome.exists()) {
//     //       const transactionDataCustome = transactionSnapshotCustome.data();
  
//     //       // Tambahkan transaksi ke koleksi 'cartMutasi'
//     //       await addDoc(collection(db, "cartMutasiCustome"), {
//     //         userId: transactionDataCustome.userId,
//     //         userName: transactionDataCustome.userName,
//     //         // statusMutasi: "Transaksi Sukses,Baleho Sudah Di Order", // Tandai transaksi sebagai sukses
//     //         statusCustome:"Di Acc Admin Silahkan Memasukkan ke Keranjang",
//     //         pesananCustome: transactionDataCustome.pesananCustome,
//     //         timeStamp: transactionDataCustome.timeStamp,
//     //         timestamp: new Date(), // Timestamp saat ditambahkan ke 'cartMutasi'
//     //       });
  
//     //       // Perbarui status di state lokal
//     //       setTransactionsCustome((prevTransactionsCustome) =>
//     //         prevTransactionsCustome.map((transactionCustome) =>
//     //           transactionCustome.id === transactionIdCustome
//     //             ? { ...transactionCustome, statusCustome: "Di Acc Admin Silahkan Memasukkan ke Keranjang" }
//     //             : transactionCustome
//     //         )
//     //       );
//     //     } else {
//     //       console.error("Transaksi tidak ditemukan!");
//     //     }
//     //   } catch (error) {
//     //     console.error("Error memindahkan transaksi ke cartMutasi:", error);
//     //   }
//     // };

//     const handleSuccessTransactionCustome = async () => {
//       try {
//         // Filter transactions dengan status tertentu
//         const transactionsToMove = transactionsCustome.filter(
//           (transactionCustome) =>
//             transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"
//         );
    
//         for (const transaction of transactionsToMove) {
//           // Ambil dokumen dari Firestore
//           const transactionDoc = doc(db, "jangkauanCustomSewa", transaction.id);
//           const transactionSnapshot = await getDoc(transactionDoc);
    
//           if (transactionSnapshot.exists()) {
//             const transactionData = transactionSnapshot.data();
    
//             // Tambahkan transaksi ke koleksi 'cartMutasiCustome'
//             await addDoc(collection(db, "cartMutasiCustome"), {
//               // userId: transactionData.userId,
//               // userName: transactionData.userName,
//               statusCustome: transactionData.statusCustome,
//               judul: transactionData.judul,
//               namaPembeli:transactionData.namaPembeli,
//               deskripsi: transactionData.deskripsi,
//               startDate: transactionData.startDate,
//               endDate: transactionData.endDate,
//               harga: transactionData.harga,
//               hargaJangkauan: transactionData.hargaJangkauan,
//               imageUrl: transactionData.imageUrl,
//               jangkauanCustome: transactionData.jangkauanCustome,
//               timeStamp:serverTimestamp(),
//               // timeStamp: transactionData.timeStamp,
//               // timestamp: new Date(), // Waktu pemindahan
//             });
    
//             // Update state lokal
//             setTransactionsCustome((prevTransactionsCustome) =>
//               prevTransactionsCustome.map((transactionCustome) =>
//                 transactionCustome.id === transaction.id
//                   ? { ...transactionCustome, statusCustome: "Dipindahkan ke CartMutasiCustome" }
//                   : transactionCustome
//               )
//             );
//           } else {
//             console.error("Transaksi tidak ditemukan untuk ID:", transaction.id);
//           }
//         }
    
//         console.log("Semua transaksi yang sesuai berhasil dipindahkan.");
//       } catch (error) {
//         console.error("Error memindahkan transaksi:", error);
//       }
//     };
    
//     const [selectedImage, setSelectedImage] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedImage(null);
//   };

//   const handleDownloadImage = () => {
//     if (selectedImage) {
//       const link = document.createElement("a");
//       link.href = selectedImage;
//       link.download = "image.jpg";
//       link.click();
//     }
//   };
    
//   const [desainFiles, setDesainFiles] = useState({});

//   // Fungsi untuk fetch data dari Firestore
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "cart"));
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTransactions(data);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   // Ambil desain berdasarkan ID pesanan (desain diunggah melalui addDesain)
//   useEffect(() => {
//     const fetchDesainFiles = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "desain"));
//         const desainMap = {};

//         querySnapshot.docs.forEach((doc) => {
//           const desainData = doc.data();
//           if (desainData.orderId) {
//             // Kelompokkan desain berdasarkan orderId
//             if (!desainMap[desainData.orderId]) {
//               desainMap[desainData.orderId] = [];
//             }
//             desainMap[desainData.orderId].push({
//               id: doc.id,
//               ...desainData,
//             });
//           }
//         });

//         setDesainFiles(desainMap);
//       } catch (error) {
//         console.error("Error fetching desain files:", error);
//       }
//     };

//     fetchDesainFiles();
//   }, []);


//   const [transactionAcc, setTransactionAcc] = useState([]);

//   useEffect(() => {
//     const fetchTransactionAcc = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "transactiondesainacc"));
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTransactionAcc(data);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       }
//     };

//     fetchTransactionAcc();
//   }, []);

//   // Fetch desain files from the "desain" collection and group by orderId
//   useEffect(() => {
//     const fetchDesainFiles = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "desain"));
//         const desainMap = {};

//         for (const doc of querySnapshot.docs) {
//           const desainData = doc.data();
//           const orderId = desainData.orderId;

//           if (orderId) {
//             if (!desainMap[orderId]) {
//               desainMap[orderId] = [];
//             }

//             // Fetch image URL from Firebase Storage
//             if (desainData.image) {
//               const imageRef = ref(storage, `desain/${desainData.image}`);
//               try {
//                 const imageUrl = await getDownloadURL(imageRef);
//                 desainData.imageUrl = imageUrl;
//               } catch (error) {
//                 console.error("Error fetching desain image:", error);
//               }
//             }

//             desainMap[orderId].push({
//               id: doc.id,
//               ...desainData,
//             });
//           }
//         }

//         setDesainFiles(desainMap);
//       } catch (error) {
//         console.error("Error fetching desain files:", error);
//       }
//     };

//     fetchDesainFiles();
//   }, []);


//   //update tgl 9 februari 2025
//   // useEffect(() => {
//   //   const fetchTransactions = async () => {
//   //     const querySnapshot = await getDocs(collection(db, 'transactiondesainacc'));
//   //     const transactions = querySnapshot.docs.map((doc) => ({
//   //       id: doc.id,
//   //       ...doc.data().cartData,  // Menyesuaikan agar data cartData terambil
//   //     }));
//   //     setTransactionAcc(transactions);
//   //   };
//   //   fetchTransactions();
//   // }, []);


//   useEffect(() => {
//     const fetchTransactions = async () => {
//       const transactionQuerySnapshot = await getDocs(collection(db, 'transactiondesainacc'));
//       const transactionPromises = transactionQuerySnapshot.docs.map(async (doc) => {
//         const transactionData = {
//           id: doc.id,
//           ...doc.data().cartData,
//         };

//         // Query ke koleksi cart untuk mencocokkan data
//         const cartQuery = query(
//           collection(db, 'cart'),
//           where('category', '==', transactionData.category),
//           where('description', '==', transactionData.description),
//           where('title', '==', transactionData.title)
//         );
        
//         const cartSnapshot = await getDocs(cartQuery);

//         // Ambil status dari data cart jika cocok
//         const cartStatus = cartSnapshot.empty
//           ? 'Status tidak ditemukan'
//           : cartSnapshot.docs[0].data().statusCustome;

//         return {
//           ...transactionData,
//           statusCustome: cartStatus, // Tambahkan status ke transaksi
//         };
//       });

//       const transactionsWithStatus = await Promise.all(transactionPromises);
//       setTransactionAcc(transactionsWithStatus);
//     };

//     fetchTransactions();
//   }, []);

//   // // Fungsi untuk menyetujui transaksi
//   // const handleApproval = async (transactionId) => {
//   //   setLoading(true);
//   //   try {
//   //     const transactionRef = doc(db, 'cart', transactionId);
//   //     const transactionDoc = await getDoc(transactionRef);

//   //     if (transactionDoc.exists()) {
//   //       const status = transactionDoc.data().statusCustome;

//   //       if (status !== 'Sudah Disetujui') {
//   //         await updateDoc(transactionRef, {
//   //           statusCustome: 'Sudah Disetujui',
//   //         });
//   //         alert('Status transaksi berhasil diperbarui ke "Sudah Disetujui".');
//   //       } else {
//   //         alert('Transaksi sudah dalam status "Sudah Disetujui".');
//   //       }
//   //     } else {
//   //       alert('Data transaksi tidak ditemukan.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Gagal memperbarui status transaksi:', error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // // Fungsi untuk mengatur status sukses transaksi
//   // const handleSuccessTransaction = async (transactionId) => {
//   //   setLoading(true);
//   //   try {
//   //     const transactionRef = doc(db, 'cart', transactionId);
//   //     const transactionDoc = await getDoc(transactionRef);

//   //     if (transactionDoc.exists()) {
//   //       const status = transactionDoc.data().statusCustome;

//   //       if (status !== 'Transaksi Sukses, Baleho Sudah Di Order') {
//   //         await updateDoc(transactionRef, {
//   //           statusCustome: 'Transaksi Sukses, Baleho Sudah Di Order',
//   //         });
//   //         alert('Status transaksi berhasil diperbarui ke "Transaksi Sukses, Baleho Sudah Di Order".');
//   //       } else {
//   //         alert('Transaksi sudah dalam status sukses.');
//   //       }
//   //     } else {
//   //       alert('Data transaksi tidak ditemukan.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Gagal memperbarui status transaksi:', error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };



//   // Fungsi untuk menyetujui transaksi
// const handleApproval = async (transactionId) => {
//   setLoading(true);
//   try {
//     const transactionRef = doc(db, 'cart', transactionId);
//     const transactionDoc = await getDoc(transactionRef);

//     if (transactionDoc.exists()) {
//       const status = transactionDoc.data().statusCustome;

//       if (status !== 'Sudah Disetujui') {
//         await updateDoc(transactionRef, {
//           statusCustome: 'Sudah Disetujui',
//         });

//         // Perbarui state lokal
//         setTransactionAcc((prev) =>
//           prev.map((transaction) =>
//             transaction.id === transactionId
//               ? { ...transaction, statusCustome: 'Sudah Disetujui' }
//               : transaction
//           )
//         );

//         alert('Status transaksi berhasil diperbarui ke "Sudah Disetujui".');
//       } else {
//         alert('Transaksi sudah dalam status "Sudah Disetujui".');
//       }
//     } else {
//       alert('Data transaksi tidak ditemukan.');
//     }
//   } catch (error) {
//     console.error('Gagal memperbarui status transaksi:', error);
//   } finally {
//     setLoading(false);
//   }
// };

// // Fungsi untuk mengatur status sukses transaksi
// const handleSuccessTransaction = async (transactionId) => {
//   setLoading(true);
//   try {
//     const transactionRef = doc(db, 'cart', transactionId);
//     const transactionDoc = await getDoc(transactionRef);

//     if (transactionDoc.exists()) {
//       const status = transactionDoc.data().statusCustome;

//       if (status !== 'Transaksi Sukses, Baleho Sudah Di Order') {
//         await updateDoc(transactionRef, {
//           statusCustome: 'Transaksi Sukses, Baleho Sudah Di Order',
//         });

//         // Perbarui state lokal
//         setTransactionAcc((prev) =>
//           prev.map((transaction) =>
//             transaction.id === transactionId
//               ? { ...transaction, statusCustome: 'Transaksi Sukses, Baleho Sudah Di Order' }
//               : transaction
//           )
//         );

//         alert('Status transaksi berhasil diperbarui ke "Transaksi Sukses, Baleho Sudah Di Order".');
//       } else {
//         alert('Transaksi sudah dalam status sukses.');
//       }
//     } else {
//       alert('Data transaksi tidak ditemukan.');
//     }
//   } catch (error) {
//     console.error('Gagal memperbarui status transaksi:', error);
//   } finally {
//     setLoading(false);
//   }
// };

  
//   const [cartTransaction, setCartTransaction] = useState({ pesanan: [] });

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       const querySnapshot = await getDocs(collection(db, 'cart'));
//       const transactions = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data().cartData, // Menyesuaikan agar data cartData terambil
//       }));
//       setCartTransaction({ pesanan: transactions });
//     };
//     fetchTransactions();
//   }, []);


//   //update tgl 9 februari 2025
//   // const handleApproval = async (transactionId) => {
//   //   setLoading(true);
//   //   try {
//   //     const transactionRef = doc(db, "cart", transactionId);
//   //     const transactionDoc = await getDoc(transactionRef);

//   //     if (transactionDoc.exists()) {
//   //       const status = transactionDoc.data().statusCustome;

//   //       if (status !== "Sudah Disetujui") {
//   //         await updateDoc(transactionRef, {
//   //           statusCustome: "Sudah Disetujui",
//   //         });
//   //         alert("Status transaksi berhasil diperbarui ke 'Sudah Disetujui'.");
//   //       } else {
//   //         alert("Transaksi sudah dalam status 'Sudah Disetujui'.");
//   //       }
//   //     } else {
//   //       alert("Data transaksi tidak ditemukan.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Gagal memperbarui status transaksi:", error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };



//   //update tgl 25 februari 2025
//   // const handleSuccessTransaction = async (transactionId) => {
//   //   setLoading(true);
//   //   try {
//   //     const transactionRef = doc(db, "cart", transactionId);
//   //     const transactionDoc = await getDoc(transactionRef);

//   //     if (transactionDoc.exists()) {
//   //       const status = transactionDoc.data().statusCustome;

//   //       if (status !== "Transaksi Sukses, Baleho Sudah Di Order") {
//   //         await updateDoc(transactionRef, {
//   //           statusCustome: "Transaksi Sukses, Baleho Sudah Di Order",
//   //         });
//   //         alert("Status transaksi berhasil diperbarui ke 'Transaksi Sukses, Baleho Sudah Di Order'.");
//   //       } else {
//   //         alert("Transaksi sudah dalam status sukses.");
//   //       }
//   //     } else {
//   //       alert("Data transaksi tidak ditemukan.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Gagal memperbarui status transaksi:", error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };



//   const [loading, setLoading] = useState(false);

//   return (
//     <>
//       <NavbarAdmin />
//       <div className="transaction-history" style={{ paddingTop: "150px", paddingLeft: "100px" }}>
//         {/* <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
//         {transactionAcc.length === 0 ? (
//           <p>Belum ada transaksi.</p>
//         ) : (
//           transactionAcc.map((transaction) => (
//             <div key={transaction.id} className="mb-6 border p-4 rounded">
//               <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
//               <p><strong>User Name:</strong> {transaction.userName || "Tidak Diketahui"}</p>
//               <p><strong>Tanggal:</strong> {new Date(transaction.timeStamp?.toDate()).toLocaleString()}</p>
//               <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
//               {transaction.pesanan ? (
//                 <table className="table-auto w-full border">
//                   <thead>
//   <tr>
//     <th>Judul</th>
//     <th>Kategori</th>
//     <th>Deskripsi</th>
//     <th>Harga</th>
//     <th>Status</th>
//     <th>Status Mutasi</th>
//     <th>Gambar Desain Yang Udah Di Acc</th>
//     <th>Aksi</th>
//   </tr>
// </thead>
// <tbody>
//   {transaction.pesanan.map((item, index) => (
//     <tr key={index}>
//       <td>{item.title}</td>
//       <td>{item.category}</td>
//       <td>{item.description}</td>
//       <td>{item.price}</td>
//       <td>{transaction.status || "Belum Disetujui"}</td>
//       <td>{transaction.statusCustome}</td>
//       <td>
//         Check if status is "disetujui" and show the image
//         {transaction.status === "Transaksi Sukses,Baleho Sudah Di Order" && transaction.imageUrl && (
//           <img
//             src={transaction.imageUrls}
//             alt={`Design for ${transaction.title}`}
//             style={{ width: "100px", height: "auto" }}

//             className="w-16 h-16 object-cover cursor-pointer"
//             onClick={() => handleImageClick(transaction.imageUrls)}
//           />
//           <img
//                   src={image[transaction.id] || "/path-to-default-placeholder.png"}
//                   src={transaction.imageUrl} 
//                   alt={transaction.judul}
//                   className="w-48 h-48 object-cover rounded"
//                 />
//         )}
//       </td>
//       <td>
//         <button
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//           onClick={() => handleApproval(transaction.id)}
//           disabled={transaction.status === "disetujui"}
//         >
//           {transaction.status === "disetujui"
//             ? "Sudah Disetujui"
//             : "Setujui"}
//         </button>
//         <button
//           className="bg-green-500 text-white px-3 py-1 rounded ml-2"
//           onClick={() => handleSuccessTransaction(transaction.id)}
//           disabled={transaction.statusMutasi === "Transaksi Sukses,Baleho Sudah Di Order"}
//         >
//           {transaction.statusMutasi === "Transaksi Sukses,Baleho Sudah Di Order"
//             ? "Transaksi Sukses"
//             : "Transaksi Sukses"}
//         </button>
//         <button
//           className="bg-yellow-500 text-white px-3 py-1 rounded ml-2"
//           onClick={() => handleRemoveBaleho(transaction.id)}
//           disabled={transaction.statusMutasi === "Baleho Ready"}
//         >
//           {transaction.statusMutasi === "Baleho Ready"
//             ? "Baleho Ready"
//             : "Copot Baleho"}
//         </button>
//       </td>
//     </tr>
//   ))}
// </tbody>

//                 </table>
//               ) : (
//                 <p>Pesanan tidak tersedia.</p>
//               )}
//             </div>
//           ))
//         )} */}


// {/* <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
//       {transactionAcc.length === 0 ? (
//         <p>Belum ada transaksi.</p>
//       ) : (
//         transactionAcc.map((transaction) => (
//           <div key={transaction.id} className="mb-6 border p-4 rounded">
//             <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
//             <p><strong>Deskripsi:</strong> {transaction.description}</p>
//             <p><strong>Harga:</strong> {transaction.price}</p>
//             <p><strong>Status Custom:</strong> {transaction.statusCustome}</p>

//             <h3 className="text-lg font-medium mt-4">Detail Pesanan:</h3>
//             <table className="table-auto w-full border">
//               <thead>
//                 <tr>
//                   <th>Judul</th>
//                   <th>Kategori</th>
//                   <th>Deskripsi</th>
//                   <th>Harga</th>
//                   <th>Status</th>
//                   <th>Gambar Desain</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{transaction.title}</td>
//                   <td>{transaction.category}</td>
//                   <td>{transaction.description}</td>
//                   <td>{transaction.price}</td>
//                   <td>{transaction.status || "Menunggu Kabar Acc Admin"}</td>
//                   {cartTransaction.pesanan.map((item, index) => (
//               <td key={index}>
//                                 {item.status || "Belum Disetujui"}
//               </td>
//             ))}
//                   <td>
//                     {transaction.image && (
//                       <img
//                         src={transaction.imageUrl}
//                         alt={transaction.title}
//                         className="w-48 h-48 object-cover rounded"
//                       />
//                     )}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             <div className="mt-4">
//               <button
//                 className="bg-blue-500 text-white px-3 py-1 rounded"
//                 onClick={() => handleApproval(transaction.id)}
//                 disabled={loading || transaction.statusCustome === "Sudah Disetujui"}
//               >
//                 {transaction.statusCustome === "Sudah Disetujui" ? "Sudah Disetujui" : "Setujui"}
//               </button>
//               <button
//                 className="bg-green-500 text-white px-3 py-1 rounded ml-2"
//                 onClick={() => handleSuccessTransaction(transaction.id)}
//                 disabled={loading || transaction.statusCustome === "Transaksi Sukses, Baleho Sudah Di Order"}
//               >
//                 {transaction.statusCustome === "Transaksi Sukses, Baleho Sudah Di Order" ? "Transaksi Sukses" : "Transaksi Sukses"}
//               </button>
//             </div>
//           </div>
//         ))
//       )} */}



// <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
//       {transactionAcc.length === 0 ? (
//         <p>Belum ada transaksi.</p>
//       ) : (
//         transactionAcc.map((transaction) => (
//           <div key={transaction.id} className="mb-6 border p-4 rounded">
//             <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
//             <p><strong>Deskripsi:</strong> {transaction.description}</p>
//             <p><strong>Harga:</strong> {transaction.price}</p>
//             <p><strong>Status Custom:</strong> {transaction.statusCustome}</p>

//             <h3 className="text-lg font-medium mt-4">Detail Pesanan:</h3>
//             <table className="table-auto w-full border">
//               <thead>
//                 <tr>
//                   <th>Judul</th>
//                   <th>Kategori</th>
//                   <th>Deskripsi</th>
//                   <th>Harga</th>
//                   <th>Status</th>
//                   <th>Gambar Desain</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{transaction.title}</td>
//                   <td>{transaction.category}</td>
//                   <td>{transaction.description}</td>
//                   <td>{transaction.price}</td>
//                   <td>{transaction.statusCustome || 'Menunggu Kabar Acc Admin'}</td>
//                   <td>
//                     {transaction.image && (
//                       <img
//                         src={transaction.imageUrl}
//                         alt={transaction.title}
//                         className="w-48 h-48 object-cover rounded"
//                       />
//                     )}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             <div className="mt-4">
//               <button
//                 className="bg-blue-500 text-white px-3 py-1 rounded"
//                 onClick={() => handleApproval(transaction.id)}
//                 disabled={loading || transaction.status === 'Sudah Disetujui'}
//               >
//                 {transaction.statusCustome === 'Sudah Disetujui' ? 'Sudah Disetujui' : 'Setujui'}
//               </button>
//               <button
//                 className="bg-green-500 text-white px-3 py-1 rounded ml-2"
//                 onClick={() => handleSuccessTransaction(transaction.id)}
//                 disabled={loading || transaction.statusCustome === 'Transaksi Sukses, Baleho Sudah Di Order'}
//               >
//                 {transaction.statusCustome === 'Transaksi Sukses, Baleho Sudah Di Order' ? 'Transaksi Sukses' : 'Transaksi Sukses'}
//               </button>
//             </div>
//           </div>
//         ))
//       )}
// {/* {cartTransaction.pesanan.length > 0 ? (
//         <table className="table-auto w-full border">
//           <thead>
//             <tr>
//               <th>Judul</th>
//               <th>Kategori</th>
//               <th>Deskripsi</th>
//               <th>Harga</th>
//               <th>Status</th>
//               <th>Status Mutasi</th>
//               <th>Gambar Desain Yang Udah Di Acc</th>
//               <th>Aksi</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartTransaction.pesanan.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.title}</td>
//                 <td>{item.category}</td>
//                 <td>{item.description}</td>
//                 <td>{item.price}</td>
//                 <td>{item.status || "Belum Disetujui"}</td>
//                 <td>{item.statusMutasi}</td>
//                 <td>
//                   Check if status is "disetujui" and show the image
//                   {item.statusMutasi === "Transaksi Sukses,Baleho Sudah Di Order" && item.imageUrl && (
//                     <img
//                       src={item.imageUrl}
//                       alt={`Design for ${item.title}`}
//                       style={{ width: "100px", height: "auto" }}
//                       className="w-16 h-16 object-cover cursor-pointer"
//                       onClick={() => handleImageClick(item.imageUrl)}
//                     />
//                   )}
//                 </td>
//                 <td>
//                   Aksi bisa diisi sesuai kebutuhan
//                   <button className="p-2 bg-blue-500 text-white rounded">Detail</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>Loading atau tidak ada transaksi.</p>
//       )} */}

      
// <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi Custome</h1>
// {transactionsCustome.filter((transactionCustome) => transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang").length === 0 ? (
//   <p>Belum ada transaksi Custome dengan status "Di Acc Admin Silahkan Memasukkan ke Keranjang".</p>
// ) : (
//   transactionsCustome
//     .filter((transactionCustome) => transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang")
//     .map((transactionCustome) => (
//       <div key={transactionCustome.id} className="mb-6 border p-4 rounded">
//         <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
//         <h2 className="text-xl font-semibold mb-2">Order ID: {transactionCustome.judul}</h2>
//         <h2 className="text-xl font-semibold mb-2">Pembeli: {transactionCustome.namaPembeli}</h2>
//         <p className="text-xl font-semibold mb-2">Deksripsi: {transactionCustome.deskripsi}</p>
//         <p className="text-xl font-semibold mb-2">Status: {transactionCustome.statusCustome}</p>
//         <p className="text-xl font-semibold mb-2">Awal Pemasangan: {transactionCustome.startDate}</p>
//         <p className="text-xl font-semibold mb-2">Akhir Pemasangan: {transactionCustome.endDate}</p>
//         <p className="text-xl font-semibold mb-2">Jangkauan: {transactionCustome.jangkauanCustome}</p>
//         <p className="text-xl font-semibold mb-2">Harga Total: {transactionCustome.harga}</p>
//         <p className="text-xl font-semibold mb-2">Harga Sebulan: {transactionCustome.hargaJangkauan}</p>
//         <button
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//           onClick={() => handleApprovalCustome(transactionCustome.id)}
//           disabled={transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"}
//         >
//           {transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"
//             ? "Sudah Disetujui"
//             : "Setujui"}
//         </button>
//         {/* <button
//           className="bg-green-500 text-white px-3 py-1 rounded ml-2"
//           onClick={() => handleSuccessTransactionCustome(transactionCustome.id)}
//           disabled={transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"}
//         >
//           {transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"
//             ? "Di Acc Admin Silahkan Memasukkan ke Keranjang"
//             : "Di Acc Admin Silahkan Memasukkan ke Keranjang"}
//         </button> */}
//         <button
//   className="bg-green-500 text-white px-3 py-1 rounded"
//   onClick={handleSuccessTransactionCustome}
// >
//   Pindahkan Semua ke CartMutasiCustome
// </button>

//         {/* <button
//           className="bg-yellow-500 text-white px-3 py-1 rounded ml-2"
//           onClick={() => handleRemoveBalehoCustome(transactionCustome.id)}
//           disabled={transactionCustome.statusMutasi === "Baleho Ready"}
//         >
//           {transactionCustome.statusMutasi === "Baleho Ready" ? "Baleho Ready" : "Copot Baleho"}
//         </button> */}
//       </div>
//     ))
// )}

// {transactionsCustomeGambar.filter(
//   (item) => item.statusCustome === "Menunggu Kabar Acc Admin"
// ).length === 0 ? (
//   <p>Belum ada transaksi Custome dengan status "Menunggu Kabar Acc Admin".</p>
// ) : (
//   transactionsCustomeGambar
//     .filter((item) => item.statusCustome === "Menunggu Kabar Acc Admin")
//     .map((transactionsCustomeGambar) => (
//       <div key={transactionsCustomeGambar.id} className="mb-6 border p-4 rounded">
//         <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
//         <h2 className="text-xl font-semibold mb-2">Order ID: {transactionsCustomeGambar.judul}</h2>
//         <h2 className="text-xl font-semibold mb-2">Pembeli: {transactionsCustomeGambar.namaPembeli}</h2>
//         <p className="text-xl font-semibold mb-2">Deskripsi: {transactionsCustomeGambar.deskripsi}</p>
//         <p className="text-xl font-semibold mb-2">Status: {transactionsCustomeGambar.statusCustome}</p>
//         <p className="text-xl font-semibold mb-2">Awal Pemasangan: {transactionsCustomeGambar.startDate}</p>
//         <p className="text-xl font-semibold mb-2">Akhir Pemasangan: {transactionsCustomeGambar.endDate}</p>
//         <p className="text-xl font-semibold mb-2">Jangkauan: {transactionsCustomeGambar.jangkauanCustome}</p>
//         <p className="text-xl font-semibold mb-2">Harga Total: {transactionsCustomeGambar.harga}</p>
//         <p className="text-xl font-semibold mb-2">Harga Sebulan: {transactionsCustomeGambar.hargaJangkauan}</p>
//         <p className="text-xl font-semibold mb-2">Gambar Desain:</p>
//         <img 
//           src={transactionsCustomeGambar.imageUrl} 
//           alt="Desain" 
//           className="w-32 h-32 object-cover border rounded cursor-pointer"
//           onClick={() => handleImageClick(transactionsCustomeGambar.imageUrl)}
//         />

//         <button
//           className="bg-blue-500 text-white px-3 py-1 rounded mt-3"
//           onClick={() => handleApprovalCustome(transactionsCustomeGambar.id)}
//           disabled={transactionsCustomeGambar.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"}
//         >
//           {transactionsCustomeGambar.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"
//             ? "Sudah Disetujui"
//             : "Setujui"}
//         </button>

//         <button
//           className="bg-green-500 text-white px-3 py-1 rounded mt-3"
//           onClick={handleSuccessTransactionCustome}
//         >
//           Pindahkan Semua ke CartMutasiCustome
//         </button>
//       </div>
//     ))
// )}

// {/* Modal for image zoom and download */}
// {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//             <div className="bg-white p-4 rounded-md max-w-2xl w-full relative">
//               <button
//                 onClick={handleCloseModal}
//                 className="absolute top-2 right-2 text-xl text-red-600"
//               >
//                 X
//               </button>
//               <img
//                 src={selectedImage}
//                 alt="Zoomed Image"
//                 className="w-full h-auto object-contain mb-4"
//               />
//               <button
//                 onClick={handleDownloadImage}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Download Image
//               </button>
//             </div>
//           </div>
//         )}

//       </div>
//     </>
//   );
// };

// export default TransactionHistory;









"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, onSnapshot, getDocs, updateDoc, doc, addDoc, query, where,serverTimestamp } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import NavbarAdmin from "@/components/NavbarAdmin";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth

import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, Table, TableCell, TableRow } from "docx";

const TransactionHistory = ({ initialTransactions, updateTransactionStatus }) => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsCustome, setTransactionsCustome] = useState([]);
  const [transactionsCustomeGambar, setTransactionsCustomeGambar] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); // State for logged-in user
    const [data, setData] = useState([]);
      const [newAssetNotification, setNewAssetNotification] = useState(false);

        const [AssetNotification, setAssetNotification] = useState(false);
   const [file, setFile] = useState(null);


   const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const fetchImageUrls = async () => {
      let urls = {};

      // Iterasi melalui transaksi untuk mengambil URL gambar
      await Promise.all(
        transactionsCustome.map(async (transaction) => {
          if (transaction.image) {
            const imageRef = ref(storage, `desain/${transaction.image}`);
            try {
              const url = await getDownloadURL(imageRef);
              urls[transaction.id] = url; // Simpan URL dengan id transaksi sebagai kunci
            } catch (error) {
              console.error(`Error fetching image for ${transaction.id}:`, error);
              urls[transaction.id] = "/path-to-default-placeholder.png"; // Placeholder jika gagal mengambil gambar
            }
          }
        })
      );

      setImageUrls(urls);
    };

    fetchImageUrls();
  }, [transactionsCustome]);

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
            "UEU"
        );
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPercentage(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setDownloadUrl(downloadURL);
            });
          }
        );
      };
      file && uploadFile();
      return () => {
        unsub();
      };
    }, [file]);

      useEffect(() => {
        const unsubProduct = onSnapshot(
          collection(db, "desain"),
          (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
    
            const isNewAssetAdded = list.length === data.length;
            if (isNewAssetAdded) {
              setNewAssetNotification(true);
              setAssetNotification(false);
            } else {
              setNewAssetNotification(false);
              setAssetNotification(true);
            }
    
            setData(list);
          },
          (error) => {
            console.log(error);
          }
        );
        return () => {
          unsubProduct();
        };
      }, []);

  useEffect(() => {
    const fetchTransactionsCustome = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jangkauanCustomSewa"));
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

  useEffect(() => {
    const fetchTransactionsCustomeGambar = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cartMutasiCustome2"));
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

  // Fungsi untuk mencopot Baleho
  const handleRemoveBaleho = async (transactionId) => {
    try {
      // Ambil data transaksi menggunakan getDoc
      const transactionDoc = doc(db, "cart", transactionId);
      const transactionSnapshot = await getDoc(transactionDoc);

      // Periksa apakah dokumen ada
      if (transactionSnapshot.exists()) {
        // Perbarui statusMutasi di Firestore
        await updateDoc(transactionDoc, {
          statusMutasi: "Baleho Ready", // Update statusMutasi
        });

        // Perbarui status di state lokal
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction.id === transactionId
              ? { ...transaction, statusMutasi: "Baleho Ready" }
              : transaction
          )
        );
      } else {
        console.error("Transaksi tidak ditemukan!");
      }
    } catch (error) {
      console.error("Error memperbarui statusMutasi:", error);
    }
  };

  const handleRemoveBalehoCustome = async (transactionIdCustome) => {
    try {
      // Ambil data transaksi menggunakan getDoc
      const transactionDocCustome = doc(db, "jangkauanCustomSewa", transactionIdCustome);
      const transactionSnapshotCustome = await getDoc(transactionDocCustome);

      // Periksa apakah dokumen ada
      if (transactionSnapshotCustome.exists()) {
        // Perbarui statusMutasi di Firestore
        await updateDoc(transactionDocCustome, {
          statusMutasi: "Baleho Ready", // Update statusMutasi
        });

        // Perbarui status di state lokal
        setTransactionsCustome((prevTransactionsCustome) =>
          prevTransactionsCustome.map((transactionCustome) =>
            transactionCustome.id === transactionId
              ? { ...transactionCustome, statusMutasi: "Baleho Ready" }
              : transactionCustome
          )
        );
      } else {
        console.error("Transaksi tidak ditemukan!");
      }
    } catch (error) {
      console.error("Error memperbarui statusMutasi:", error);
    }
  };

    // Fungsi untuk menyetujui transaksi
    const handleApprovalCustome = async (transactionIdCustome) => {
      try {
        // 1. Update the status in the 'cart' collection
        const transactionDocCustome = doc(db, "jangkauanCustomSewa", transactionIdCustome);
        await updateDoc(transactionDocCustome, {
          statusCustome: "Di Acc Admin Silahkan Memasukkan ke Keranjang", // Update status to 'disetujui'
        });
  
        // 2. Fetch the transaction details from Firestore (for adding to 'transactions' collection)
        const transactionSnapshotCustome = await getDoc(doc(db, "jangkauanCustomeSewa", transactionIdCustome));
        const transactionDataCustome = transactionSnapshotCustome.data();
  
        // 3. Add the transaction to the 'transactions' collection
        if (transactionDataCustome) {
          await addDoc(collection(db, "jangkauanCustomSewa"), {
            judul: transactionDataCustome.judul,
            deskripsi: transactionDataCustome.deskripsi,
            userName: transactionDataCustome.userName,
            namaPembeli:transactionDataCustome.namaPembeli,
            statusCustome: "Di Acc Admin Silahkan Memasukkan ke Keranjang", // Transaction is approved
            startDate: transactionDataCustome.startDate,
            endDate: transactionDataCustome.endDate,
            harga: transactionDataCustome.harga,
            hargaJangkauan: transactionDataCustome.hargaJangkauan,
            jangkauanCustome: transactionDataCustome.jangkauanCustome,
            timeStamp: transactionDataCustome.timeStamp,
            timestamp: new Date(), // Timestamp when added to transactions collection
          });
        }
  
        // 4. Perbarui status di state lokal
        setTransactionsCustome((prevTransactionsCustome) =>
          prevTransactionsCustome.map((transactionCustome) =>
            transactionCustome.id === transactionIdCustome
              ? { ...transactionCustome, statusCustome: "Di Acc Admin Silahkan Memasukkan ke Keranjang" }
              : transactionCustome
          )
        );
      } catch (error) {
        console.error("Error updating status or adding to transactions:", error);
      }
    };

    const handleSuccessTransactionCustome = async () => {
      try {
        // Filter transactions dengan status tertentu
        const transactionsToMove = transactionsCustome.filter(
          (transactionCustome) =>
            transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"
        );
    
        for (const transaction of transactionsToMove) {
          // Ambil dokumen dari Firestore
          const transactionDoc = doc(db, "jangkauanCustomSewa", transaction.id);
          const transactionSnapshot = await getDoc(transactionDoc);
    
          if (transactionSnapshot.exists()) {
            const transactionData = transactionSnapshot.data();
    
            // Tambahkan transaksi ke koleksi 'cartMutasiCustome'
            await addDoc(collection(db, "cartMutasiCustome"), {
              // userId: transactionData.userId,
              // userName: transactionData.userName,
              statusCustome: transactionData.statusCustome,
              judul: transactionData.judul,
              namaPembeli:transactionData.namaPembeli,
              deskripsi: transactionData.deskripsi,
              startDate: transactionData.startDate,
              endDate: transactionData.endDate,
              harga: transactionData.harga,
              hargaJangkauan: transactionData.hargaJangkauan,
              imageUrl: transactionData.imageUrl,
              jangkauanCustome: transactionData.jangkauanCustome,
              timeStamp:serverTimestamp(),
              // timeStamp: transactionData.timeStamp,
              // timestamp: new Date(), // Waktu pemindahan
            });
    
            // Update state lokal
            setTransactionsCustome((prevTransactionsCustome) =>
              prevTransactionsCustome.map((transactionCustome) =>
                transactionCustome.id === transaction.id
                  ? { ...transactionCustome, statusCustome: "Dipindahkan ke CartMutasiCustome" }
                  : transactionCustome
              )
            );
          } else {
            console.error("Transaksi tidak ditemukan untuk ID:", transaction.id);
          }
        }
    
        console.log("Semua transaksi yang sesuai berhasil dipindahkan.");
      } catch (error) {
        console.error("Error memindahkan transaksi:", error);
      }
    };
    
    const [selectedImage, setSelectedImage] = useState(null);
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
    
  const [desainFiles, setDesainFiles] = useState({});

  // Fungsi untuk fetch data dari Firestore
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cart"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Ambil desain berdasarkan ID pesanan (desain diunggah melalui addDesain)
  useEffect(() => {
    const fetchDesainFiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "desain"));
        const desainMap = {};

        querySnapshot.docs.forEach((doc) => {
          const desainData = doc.data();
          if (desainData.orderId) {
            // Kelompokkan desain berdasarkan orderId
            if (!desainMap[desainData.orderId]) {
              desainMap[desainData.orderId] = [];
            }
            desainMap[desainData.orderId].push({
              id: doc.id,
              ...desainData,
            });
          }
        });

        setDesainFiles(desainMap);
      } catch (error) {
        console.error("Error fetching desain files:", error);
      }
    };

    fetchDesainFiles();
  }, []);


  const [transactionAcc, setTransactionAcc] = useState([]);
//JANGAN DIHAPUS
  // useEffect(() => {
  //   const fetchTransactionAcc = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "transactiondesainacc"));
  //       const data = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setTransactionAcc(data);
  //     } catch (error) {
  //       console.error("Error fetching transactions:", error);
  //     }
  //   };

  //   fetchTransactionAcc();
  // }, []);

  // Fetch desain files from the "desain" collection and group by orderId
  useEffect(() => {
    const fetchDesainFiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "desain"));
        const desainMap = {};

        for (const doc of querySnapshot.docs) {
          const desainData = doc.data();
          const orderId = desainData.orderId;

          if (orderId) {
            if (!desainMap[orderId]) {
              desainMap[orderId] = [];
            }

            // Fetch image URL from Firebase Storage
            if (desainData.image) {
              const imageRef = ref(storage, `desain/${desainData.image}`);
              try {
                const imageUrl = await getDownloadURL(imageRef);
                desainData.imageUrl = imageUrl;
              } catch (error) {
                console.error("Error fetching desain image:", error);
              }
            }

            desainMap[orderId].push({
              id: doc.id,
              ...desainData,
            });
          }
        }

        setDesainFiles(desainMap);
      } catch (error) {
        console.error("Error fetching desain files:", error);
      }
    };

    fetchDesainFiles();
  }, []);


  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     const transactionQuerySnapshot = await getDocs(collection(db, 'transactiondesainacc'));
  //     const transactionPromises = transactionQuerySnapshot.docs.map(async (doc) => {
  //       const transactionData = {
  //         id: doc.id,
  //         ...doc.data().cartData,
  //       };

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

  //     const transactionsWithStatus = await Promise.all(transactionPromises);
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

  // Fungsi untuk menyetujui transaksi
const handleApproval = async (transactionId) => {
  setLoading(true);
  try {
    const transactionRef = doc(db, 'cart', transactionId);
    const transactionDoc = await getDoc(transactionRef);

    if (transactionDoc.exists()) {
      const status = transactionDoc.data().statusCustome;

      if (status !== 'Sudah Disetujui') {
        await updateDoc(transactionRef, {
          statusCustome: 'Sudah Disetujui',
        });

        // Perbarui state lokal
        setTransactionAcc((prev) =>
          prev.map((transaction) =>
            transaction.id === transactionId
              ? { ...transaction, statusCustome: 'Sudah Disetujui' }
              : transaction
          )
        );

        alert('Status transaksi berhasil diperbarui ke "Sudah Disetujui".');
      } else {
        alert('Transaksi sudah dalam status "Sudah Disetujui".');
      }
    } else {
      alert('Data transaksi tidak ditemukan.');
    }
  } catch (error) {
    console.error('Gagal memperbarui status transaksi:', error);
  } finally {
    setLoading(false);
  }
};

// Fungsi untuk mengatur status sukses transaksi
const handleSuccessTransaction = async (transactionId) => {
  setLoading(true);
  try {
    const transactionRef = doc(db, 'cart', transactionId);
    const transactionDoc = await getDoc(transactionRef);

    if (transactionDoc.exists()) {
      const status = transactionDoc.data().statusCustome;

      if (status !== 'Transaksi Sukses, Baleho Sudah Di Order') {
        await updateDoc(transactionRef, {
          statusCustome: 'Transaksi Sukses, Baleho Sudah Di Order',
        });

        // Perbarui state lokal
        setTransactionAcc((prev) =>
          prev.map((transaction) =>
            transaction.id === transactionId
              ? { ...transaction, statusCustome: 'Transaksi Sukses, Baleho Sudah Di Order' }
              : transaction
          )
        );

        alert('Status transaksi berhasil diperbarui ke "Transaksi Sukses, Baleho Sudah Di Order".');
      } else {
        alert('Transaksi sudah dalam status sukses.');
      }
    } else {
      alert('Data transaksi tidak ditemukan.');
    }
  } catch (error) {
    console.error('Gagal memperbarui status transaksi:', error);
  } finally {
    setLoading(false);
  }
};

  
  const [cartTransaction, setCartTransaction] = useState({ pesanan: [] });

  useEffect(() => {
    const fetchTransactions = async () => {
      const querySnapshot = await getDocs(collection(db, 'cart'));
      const transactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data().cartData, // Menyesuaikan agar data cartData terambil
      }));
      setCartTransaction({ pesanan: transactions });
    };
    fetchTransactions();
  }, []);

  const [loading, setLoading] = useState(false);



// const generatePDF = (transactions) => {
//   const doc = new jsPDF();
//   doc.setFontSize(12);
//   doc.text("Riwayat Transaksi", 10, 10);
//   let yPos = 20;

//   transactions.forEach((transaction, index) => {
//     doc.text(
//       `${index + 1}. Order ID: ${transaction.id}, Deskripsi: ${transaction.description}, Harga: ${transaction.price}`,
//       10,
//       yPos
//     );
//     yPos += 10;
//   });

//   doc.save("RiwayatTransaksi.pdf");
// };

const generatePDF = (transactions) => {
  const doc = new jsPDF();
  const marginLeft = 15;
  const marginTop = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Riwayat Transaksi", pageWidth / 2, marginTop, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  const date = new Date().toLocaleDateString();
  doc.text(`Tanggal: ${date}`, marginLeft, marginTop + 10);

  let yPos = marginTop + 20;
  const columnWidths = [10, 50, 80, 50];
  const headers = ["No", "Order ID", "Deskripsi", "Harga"];
  
  // Tabel Header
  doc.setFont("helvetica", "bold");
  let xPos = marginLeft;
  headers.forEach((header, i) => {
    doc.rect(xPos, yPos - 5, columnWidths[i], 10); // Kotak header
    doc.text(header, xPos + 3, yPos);
    xPos += columnWidths[i];
  });
  yPos += 12;

  doc.setFont("helvetica", "normal");
  transactions.forEach((transaction, index) => {
    xPos = marginLeft;
    const lineHeight = 6;
    const orderIDLines = doc.splitTextToSize(transaction.id, columnWidths[1] - 5);
    const descriptionLines = doc.splitTextToSize(transaction.description, columnWidths[2] - 5);
    const maxLines = Math.max(orderIDLines.length, descriptionLines.length);
    const rowHeight = maxLines * lineHeight;
    
    doc.rect(marginLeft, yPos - 5, columnWidths[0], rowHeight);
    doc.text(`${index + 1}`, xPos + 3, yPos);
    xPos += columnWidths[0];
    
    doc.rect(xPos, yPos - 5, columnWidths[1], rowHeight);
    doc.text(orderIDLines, xPos + 3, yPos);
    xPos += columnWidths[1];
    
    doc.rect(xPos, yPos - 5, columnWidths[2], rowHeight);
    doc.text(descriptionLines, xPos + 3, yPos);
    xPos += columnWidths[2];
    
    doc.rect(xPos, yPos - 5, columnWidths[3], rowHeight);
    doc.text(`Rp ${transaction.price.toLocaleString()}`, xPos + columnWidths[3] - 5, yPos, { align: "right" });
    
    yPos += rowHeight + 2;
    if (yPos > pageHeight - 20) {
      doc.addPage();
      yPos = marginTop;
    }
  });

  doc.save("RiwayatTransaksi.pdf");
};



const generateWord = (transactions) => {
  const tableRows = transactions.map((transaction) => {
    return new TableRow({
      children: [
        new TableCell({ children: [new Paragraph(transaction.id)] }),
        new TableCell({ children: [new Paragraph(transaction.description)] }),
        new TableCell({ children: [new Paragraph(transaction.price)] }),
      ],
    });
  });

  const table = new Table({
    rows: [new TableRow({ children: ["Order ID", "Deskripsi", "Harga"].map((text) => new TableCell({ children: [new Paragraph(text)] })) }), ...tableRows],
  });

  const doc = new Document({
    sections: [{ children: [new Paragraph("Riwayat Transaksi"), table] }],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "RiwayatTransaksi.docx");
  });
};

const generateExcel = (transactions) => {
  const worksheet = XLSX.utils.json_to_sheet(transactions);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Riwayat Transaksi");
  XLSX.writeFile(workbook, "RiwayatTransaksi.xlsx");
};

  return (
    <>
      <NavbarAdmin />
      <div className="transaction-history" style={{ paddingTop: "150px", paddingLeft: "100px" }}>

<h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
<h1 className="text-2xl font-bold mb-4">Cetak Riwayat Transaksi</h1>
<div className="mb-4">
      <button
        onClick={() => {
          generatePDF(transactionAcc);
        }}
        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
      >
        Cetak Riwayat Transaksi (PDF)
      </button>
      <button
        onClick={() => {
          generateWord(transactionAcc);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Cetak Riwayat Transaksi (Word)
      </button>
      <button
        onClick={() => {
          generateExcel(transactionAcc);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Cetak Riwayat Transaksi (Excel)
      </button>
    </div>

    Similar buttons for Custom Transactions
    <h1 className="text-2xl font-bold mb-4"> Cetak Riwayat Transaksi Custome</h1>
    <div className="mb-4">
      <button
        onClick={() => {
          generatePDF(transactionsCustome);
        }}
        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
      >
        Cetak Riwayat Custome (PDF)
      </button>
      <button
        onClick={() => {
          generateWord(transactionsCustome);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Cetak Riwayat Custome (Word)
      </button>
      <button
        onClick={() => {
          generateExcel(transactionsCustome);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Cetak Riwayat Custome (Excel)
      </button>
    </div>
      {transactionAcc.length === 0 ? (
        <p>Belum ada transaksi.</p>
      ) : (
        transactionAcc.map((transaction) => (
          <div key={transaction.id} className="mb-6 border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
            <p><strong>Deskripsi:</strong> {transaction.description}</p>
            <p><strong>Client Name:</strong> {transaction.companyName||transaction.userName || transaction.namaPembeli || transaction.email ||"Tidak Diketahui"}</p>
            <p><strong>Harga:</strong> {transaction.price}</p>
            <p><strong>Status Custom:</strong> {transaction.statusCustome || "Menunggu Kabar Acc Admin"}</p>

            <h3 className="text-lg font-medium mt-4">Detail Pesanan:</h3>
            <table className="table-auto w-full border">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Location</th>
                  <th>Deskripsi</th>
                  <th>Harga</th>
                  <th>Status</th>
                  <th>Gambar Desain</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{transaction.title}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.price}</td>
                  <td>{transaction.statusCustome || 'Menunggu Kabar Acc Admin'}</td>
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

            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => handleApproval(transaction.id)}
                disabled={loading || transaction.status === 'Sudah Disetujui'}
              >
                {transaction.statusCustome === 'Sudah Disetujui' ? 'Sudah Disetujui' : 'Setujui'}
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded ml-2"
                onClick={() => handleSuccessTransaction(transaction.id)}
                disabled={loading || transaction.statusCustome === 'Transaksi Sukses, Baleho Sudah Di Order'}
              >
                {transaction.statusCustome === 'Transaksi Sukses, Baleho Sudah Di Order' ? 'Transaksi Sukses' : 'Transaksi Sukses'}
              </button>
            </div>
          </div>
        ))
      )}

      
<h1 className="text-2xl font-bold mb-4">Riwayat Transaksi Custome</h1>
{transactionsCustome.filter((transactionCustome) => transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang").length === 0 ? (
  <p>Belum ada transaksi Custome dengan status "Di Acc Admin Silahkan Memasukkan ke Keranjang".</p>
) : (
  transactionsCustome
    .filter((transactionCustome) => transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang")
    .map((transactionCustome) => (
      <div key={transactionCustome.id} className="mb-6 border p-4 rounded">
        <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
        <h2 className="text-xl font-semibold mb-2">Order ID: {transactionCustome.judul}</h2>
        <h2 className="text-xl font-semibold mb-2">Pembeli: {transactionCustome.namaPembeli}</h2>
        <p className="text-xl font-semibold mb-2">Deksripsi: {transactionCustome.deskripsi}</p>
        <p className="text-xl font-semibold mb-2">Status: {transactionCustome.statusCustome}</p>
        <p className="text-xl font-semibold mb-2">Awal Pemasangan: {transactionCustome.startDate}</p>
        <p className="text-xl font-semibold mb-2">Akhir Pemasangan: {transactionCustome.endDate}</p>
        <p className="text-xl font-semibold mb-2">Jangkauan: {transactionCustome.jangkauanCustome}</p>
        <p className="text-xl font-semibold mb-2">Harga Total: {transactionCustome.harga}</p>
        <p className="text-xl font-semibold mb-2">Harga Sebulan: {transactionCustome.hargaJangkauan}</p>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => handleApprovalCustome(transactionCustome.id)}
          disabled={transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"}
        >
          {transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"
            ? "Sudah Disetujui"
            : "Setujui"}
        </button>

        <button
  className="bg-green-500 text-white px-3 py-1 rounded"
  onClick={handleSuccessTransactionCustome}
>
  Pindahkan Semua ke CartMutasiCustome
</button>

      </div>
    ))
)}

{transactionsCustomeGambar.filter(
  (item) => item.statusCustome === "Menunggu Kabar Acc Admin"
).length === 0 ? (
  <p>Belum ada transaksi Custome dengan status "Menunggu Kabar Acc Admin".</p>
) : (
  transactionsCustomeGambar
    .filter((item) => item.statusCustome === "Menunggu Kabar Acc Admin")
    .map((transactionsCustomeGambar) => (
      <div key={transactionsCustomeGambar.id} className="mb-6 border p-4 rounded">
        <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
        <h2 className="text-xl font-semibold mb-2">Order ID: {transactionsCustomeGambar.judul}</h2>
        <h2 className="text-xl font-semibold mb-2">Pembeli: {transactionsCustomeGambar.namaPembeli}</h2>
        <p className="text-xl font-semibold mb-2">Deskripsi: {transactionsCustomeGambar.deskripsi}</p>
        <p className="text-xl font-semibold mb-2">Status: {transactionsCustomeGambar.statusCustome}</p>
        <p className="text-xl font-semibold mb-2">Awal Pemasangan: {transactionsCustomeGambar.startDate}</p>
        <p className="text-xl font-semibold mb-2">Akhir Pemasangan: {transactionsCustomeGambar.endDate}</p>
        <p className="text-xl font-semibold mb-2">Jangkauan: {transactionsCustomeGambar.jangkauanCustome}</p>
        <p className="text-xl font-semibold mb-2">Harga Total: {transactionsCustomeGambar.harga}</p>
        <p className="text-xl font-semibold mb-2">Harga Sebulan: {transactionsCustomeGambar.hargaJangkauan}</p>
        <p className="text-xl font-semibold mb-2">Gambar Desain:</p>
        <img 
          src={transactionsCustomeGambar.imageUrl} 
          alt="Desain" 
          className="w-32 h-32 object-cover border rounded cursor-pointer"
          onClick={() => handleImageClick(transactionsCustomeGambar.imageUrl)}
        />

        <button
          className="bg-blue-500 text-white px-3 py-1 rounded mt-3"
          onClick={() => handleApprovalCustome(transactionsCustomeGambar.id)}
          disabled={transactionsCustomeGambar.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"}
        >
          {transactionsCustomeGambar.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"
            ? "Sudah Disetujui"
            : "Setujui"}
        </button>

        <button
          className="bg-green-500 text-white px-3 py-1 rounded mt-3"
          onClick={handleSuccessTransactionCustome}
        >
          Pindahkan Semua ke CartMutasiCustome
        </button>
      </div>
    ))
)}

{/* Modal for image zoom and download */}
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
{/* <h1 className="text-2xl font-bold mb-4">Cetak Riwayat Transaksi</h1>
<div className="mb-4">
      <button
        onClick={() => {
          generatePDF(transactionAcc);
        }}
        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
      >
        Cetak Riwayat Transaksi (PDF)
      </button>
      <button
        onClick={() => {
          generateWord(transactionAcc);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Cetak Riwayat Transaksi (Word)
      </button>
      <button
        onClick={() => {
          generateExcel(transactionAcc);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Cetak Riwayat Transaksi (Excel)
      </button>
    </div>

    Similar buttons for Custom Transactions
    <h1 className="text-2xl font-bold mb-4"> Cetak Riwayat Transaksi Custome</h1>
    <div className="mb-4">
      <button
        onClick={() => {
          generatePDF(transactionsCustome);
        }}
        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
      >
        Cetak Riwayat Custome (PDF)
      </button>
      <button
        onClick={() => {
          generateWord(transactionsCustome);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Cetak Riwayat Custome (Word)
      </button>
      <button
        onClick={() => {
          generateExcel(transactionsCustome);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Cetak Riwayat Custome (Excel)
      </button>
    </div> */}

      </div>
    </>
  );
};

export default TransactionHistory;