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
// import NavbarProduksi from "@/components/NavbarProduksi";

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
//     <div className="mt-32">
//     <NavbarProduksi />
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
//     </div>
//   );
// };

// export default TransactionHistory;



"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, getDocs, updateDoc, doc, addDoc, query, where, serverTimestamp } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import NavbarAdmin from "@/components/NavbarAdmin";
import NavbarProduksi from "@/components/NavbarProduksi";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsCustome, setTransactionsCustome] = useState([]);
  const [transactionsCustomeGambar, setTransactionsCustomeGambar] = useState([]);


  const [currentUser, setCurrentUser] = useState(null);

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
  //             const userRef = doc (db, "users", transactionData.userId);
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

  // Fungsi untuk fetch data dari Firestore
  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "cartMutasi"));
  //       const data = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setTransactions(data);
  //     } catch (error) {
  //       console.error("Error fetching transactions:", error);
  //     }
  //   };

  //   fetchTransactions();
  // }, []);

  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     try {
  //       const transactionQuerySnapshot = await getDocs(collection(db, "transactiondesainacc"));
  //       const transactionPromises = transactionQuerySnapshot.docs.map(async (doc) => {
  //         const cartData = doc.data().cartData;

  //         // Skip jika data tidak valid
  //         if (!cartData || !cartData.userId) {
  //           console.warn("Skipping query due to missing userId:", cartData);
  //           return null;
  //         }

  //         const transactionData = {
  //           id: doc.id,
  //           ...cartData,
  //         };

  //         try {
  //           // Fetch companyName dari koleksi users berdasarkan userId
  //           const userDoc = await getDoc(doc(db, "users", cartData.userId));
  //           const userData = userDoc.exists() ? userDoc.data() : {};
  //           const companyName = userData.companyName || "Tidak Diketahui";

  //           // Tambahkan companyName ke transactionData
  //           return {
  //             ...transactionData,
  //             companyName,
  //           };
  //         } catch (error) {
  //           console.error("Error fetching user data:", error);
  //           return null;
  //         }
  //       });

  //       const transactionsWithCompanyName = await Promise.all(transactionPromises);
  //       setTransactionAcc(transactionsWithCompanyName.filter((item) => item !== null));
  //     } catch (error) {
  //       console.error("Error fetching transactions:", error);
  //     }
  //   };

  //   fetchTransactions();
  // }, []);


  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     try {
  //       const transactionQuerySnapshot = await getDocs(collection(db, "transactiondesainacc"));
  //       const transactionPromises = transactionQuerySnapshot.docs.map(async (doc) => {
  //         const cartData = doc.data().cartData;

  //         // Skip jika data tidak valid
  //         if (!cartData || !cartData.userId) {
  //           console.warn("Skipping query due to missing userId:", cartData);
  //           return null;
  //         }

  //         const transactionData = {
  //           id: doc.id,
  //           ...cartData,
  //         };

  //         try {
  //           // Fetch companyName dari koleksi users berdasarkan userId
  //           const userDoc = await getDoc(doc(db, "cart", cartData.userId));
  //           const userData = userDoc.exists() ? userDoc.data() : {};
  //           const companyName = userData.companyName || userData.userName || userData.user_id || "Tidak Diketahui";

  //           // Tambahkan companyName ke transactionData
  //           return {
  //             ...transactionData,
  //             companyName,
  //           };
  //         } catch (error) {
  //           console.error("Error fetching user data:", error);
  //           return null;
  //         }
  //       });

  //       const transactionsWithCompanyName = await Promise.all(transactionPromises);
  //       setTransactionAcc(transactionsWithCompanyName.filter((item) => item !== null));
  //     } catch (error) {
  //       console.error("Error fetching transactions:", error);
  //     }
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
  

  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     const transactionQuerySnapshot = await getDocs(collection(db, 'transactiondesainacc'));
  //     const transactionPromises = transactionQuerySnapshot.docs.map(async (doc) => {
  //       const cartData = doc.data().cartData;
  
  //       // Pastikan data tidak undefined
  //       if (!cartData || !cartData.category || !cartData.description || !cartData.title) {
  //         console.warn('Skipping query due to missing cartData fields:', cartData);
  //         return null; // Skip jika data tidak valid
  //       }
  
  //       const transactionData = {
  //         id: doc.id,
  //         ...cartData,
  //       };
  
  //       try {
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
  //       } catch (error) {
  //         console.error('Error fetching cart status:', error);
  //         return null;
  //       }
  //     });
  
  //     const transactionsWithStatus = await Promise.all(transactionPromises);
  //     // Filter data null yang mungkin terjadi
  //     setTransactionAcc(transactionsWithStatus.filter((item) => item !== null));
  //   };
  
  //   fetchTransactions();
  // }, []);

    const [transactionAcc, setTransactionAcc] = useState([]);
  

  // useEffect(() => {
  //   const fetchTransactionsCustomeGambar = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "cartMutasiCustome3"));
  //       const data = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setTransactionsCustomeGambar(data);
  //     } catch (error) {
  //       console.error("Error fetching transactions:", error);
  //     }
  //   };

  //   fetchTransactionsCustomeGambar();
  // }, []);

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
  const handleApproval = async (transactionId) => {
    try {
      // 1. Update the status in the 'cart' collection
      const transactionDoc = doc(db, "cart", transactionId);
      await updateDoc(transactionDoc, {
        status: "disetujui", // Update status to 'disetujui'
      });

      // 2. Fetch the transaction details from Firestore (for adding to 'transactions' collection)
      const transactionSnapshot = await getDoc(doc(db, "cart", transactionId));
      const transactionData = transactionSnapshot.data();

      // 3. Add the transaction to the 'transactions' collection
      if (transactionData) {
        await addDoc(collection(db, "transactions"), {
          order_id: transactionData.order_id,
          user_id: transactionData.user_id,
          userName: transactionData.userName,
          status: "disetujui", // Transaction is approved
          pesanan: transactionData.pesanan,
          gross_amount: transactionData.gross_amount,
          payment_type: transactionData.payment_type,
          timeStamp: transactionData.timeStamp,
          timestamp: new Date(), // Timestamp when added to transactions collection
        });
      }

      // 4. Perbarui status di state lokal
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === transactionId
            ? { ...transaction, status: "disetujui" }
            : transaction
        )
      );
    } catch (error) {
      console.error("Error updating status or adding to transactions:", error);
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


  // Fungsi untuk memasukkan transaksi ke 'cartMutasi'
  const handleSuccessTransaction = async (transactionId) => {
    try {
      // Ambil data transaksi menggunakan getDoc
      const transactionDoc = doc(db, "cart", transactionId);
      const transactionSnapshot = await getDoc(transactionDoc);

      // Periksa apakah dokumen ada
      if (transactionSnapshot.exists()) {
        const transactionData = transactionSnapshot.data();

        // Tambahkan transaksi ke koleksi 'cartMutasi'
        await addDoc(collection(db, "cartMutasi"), {
          userId: transactionData.userId,
          userName: transactionData.userName,
          statusMutasi: "Transaksi Sukses,Baleho Sudah Di Order", // Tandai transaksi sebagai sukses
          pesanan: transactionData.pesanan,
          timeStamp: transactionData.timeStamp,
          timestamp: new Date(), // Timestamp saat ditambahkan ke 'cartMutasi'
        });

        // Perbarui status di state lokal
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction.id === transactionId
              ? { ...transaction, statusMutasi: "Transaksi Sukses,Baleho Sudah Di Order" }
              : transaction
          )
        );
      } else {
        console.error("Transaksi tidak ditemukan!");
      }
    } catch (error) {
      console.error("Error memindahkan transaksi ke cartMutasi:", error);
    }
  };

    // Fungsi untuk memasukkan transaksi ke 'cartMutasi'
    // const handleSuccessTransactionCustome = async (transactionIdCustome) => {
    //   try {
    //     // Ambil data transaksi menggunakan getDoc
    //     const transactionDocCustome = doc(db, "jangkauanCustomSewa", transactionIdCustome);
    //     const transactionSnapshotCustome = await getDoc(transactionDocCustome);
  
    //     // Periksa apakah dokumen ada
    //     if (transactionSnapshotCustome.exists()) {
    //       const transactionDataCustome = transactionSnapshotCustome.data();
  
    //       // Tambahkan transaksi ke koleksi 'cartMutasi'
    //       await addDoc(collection(db, "cartMutasiCustome"), {
    //         userId: transactionDataCustome.userId,
    //         userName: transactionDataCustome.userName,
    //         // statusMutasi: "Transaksi Sukses,Baleho Sudah Di Order", // Tandai transaksi sebagai sukses
    //         statusCustome:"Di Acc Admin Silahkan Memasukkan ke Keranjang",
    //         pesananCustome: transactionDataCustome.pesananCustome,
    //         timeStamp: transactionDataCustome.timeStamp,
    //         timestamp: new Date(), // Timestamp saat ditambahkan ke 'cartMutasi'
    //       });
  
    //       // Perbarui status di state lokal
    //       setTransactionsCustome((prevTransactionsCustome) =>
    //         prevTransactionsCustome.map((transactionCustome) =>
    //           transactionCustome.id === transactionIdCustome
    //             ? { ...transactionCustome, statusCustome: "Di Acc Admin Silahkan Memasukkan ke Keranjang" }
    //             : transactionCustome
    //         )
    //       );
    //     } else {
    //       console.error("Transaksi tidak ditemukan!");
    //     }
    //   } catch (error) {
    //     console.error("Error memindahkan transaksi ke cartMutasi:", error);
    //   }
    // };

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
              deskripsi: transactionData.deskripsi,
              startDate: transactionData.startDate,
              endDate: transactionData.endDate,
              harga: transactionData.harga,
              hargaJangkauan: transactionData.hargaJangkauan,
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
    

      const [loading, setLoading] = useState(false);
  return (
    <>
      <NavbarProduksi />
      <div className="transaction-history" style={{ paddingTop: "150px", paddingLeft: "100px" }}>
        {/* <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
        {transactionAcc.length === 0 ? (
          <p>Belum ada transaksi.</p>
        ) : (
          transactionAcc.map((transaction) => (
            <div key={transaction.id} className="mb-6 border p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
              <p><strong>User Name:</strong> {transaction.userName || "Tidak Diketahui"}</p>
              <p><strong>Tanggal:</strong> {new Date(transaction.timeStamp?.toDate()).toLocaleString()}</p>
              <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
              {transaction.pesanan ? (
                <table className="table-auto w-full border">
                  <thead>
                    <tr>
                      <th>Judul</th>
                      <th>Kategori</th>
                      <th>Deskripsi</th>
                      <th>Harga</th>
                      <th>Status</th>
                      <th>Status Mutasi</th>
                      <th>Gambar Yang Udah Di Acc Admin</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.pesanan.map((item, index) => (
                      <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>{transaction.status || "Belum Disetujui"}</td>
                        <td>{transaction.statusCustome}</td>
                        <td>
        Check if status is "disetujui" and show the image
        {transaction.statusCustome === "Transaksi Sukses,Baleho Sudah Di Order" && transaction.image && (
          <img
            src={transaction.imageUrl}
            alt={`Design for ${transaction.title}`}
            style={{ width: "100px", height: "auto" }}
            className="w-16 h-16 object-cover cursor-pointer"
                              onClick={() => handleImageClick(transaction.imageUrl)}
          />
        )}
      </td>
                        <td>
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={() => handleApproval(transaction.id)}
                            disabled={transaction.status === "disetujui"} // Disable if already approved
                          >
                            {transaction.status === "disetujui"
                              ? "Sudah Disetujui"
                              : "Setujui"}
                          </button>
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded ml-2"
                            onClick={() => handleSuccessTransaction(transaction.id)}
                            disabled={transaction.statusCustome === "Transaksi Sukses,Baleho Sudah Di Order"} // Disable if already successful
                          >
                            {transaction.statusCustome === "Transaksi Sukses,Baleho Sudah Di Order"
                              ? "Transaksi Sukses"
                              : "Transaksi Sukses"}
                          </button>
                          <button
                            className="bg-yellow-500 text-white px-3 py-1 rounded ml-2"
                            onClick={() => handleRemoveBaleho(transaction.id)}
                            disabled={transaction.statusCustome === "Baleho Ready"} // Disable if already marked as ready
                          >
                            {transaction.statusCustome === "Baleho Ready"
                              ? "Baleho Ready"
                              : "Copot Baleho"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Pesanan tidak tersedia.</p>
              )}
            </div>
          ))
        )} */}

<h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
      {transactionAcc.length === 0 ? (
        <p>Belum ada transaksi.</p>
      ) : (
        transactionAcc.map((transaction) => (
          <div key={transaction.id} className="mb-6 border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
            <p><strong>Deskripsi:</strong> {transaction.description}</p>
            <p><strong>Harga:</strong> {transaction.price}</p>
            <p><strong>Status Custom:</strong> {transaction.statusCustome}</p>
            <p><strong>Client Name:</strong> {transaction.companyName||transaction.userName || transaction.namaPembeli || transaction.email ||"Tidak Diketahui"}</p>

            <h3 className="text-lg font-medium mt-4">Detail Pesanan:</h3>
            <table className="table-auto w-full border">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Nama Pengirim</th>
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
                  <td>{transaction.companyName||transaction.userName || transaction.namaPembeli || transaction.email ||"Tidak Diketahui"}</td>
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

            {/* <div className="mt-4">
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
            </div> */}
            <td>
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={() => handleApproval(transaction.id)}
                            disabled={transaction.status === "disetujui"} // Disable if already approved
                          >
                            {transaction.statusCustome === "disetujui"
                              ? "Sudah Disetujui"
                              : "Setujui"}
                          </button>
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded ml-2"
                            onClick={() => handleSuccessTransaction(transaction.id)}
                            disabled={transaction.statusCustome === "Transaksi Sukses,Baleho Sudah Di Order"} // Disable if already successful
                          >
                            {transaction.statusCustome === "Transaksi Sukses,Baleho Sudah Di Order"
                              ? "Transaksi Sukses"
                              : "Transaksi Sukses"}
                          </button>
                          <button
                            className="bg-yellow-500 text-white px-3 py-1 rounded ml-2"
                            onClick={() => handleRemoveBaleho(transaction.id)}
                            disabled={transaction.statusCustome === "Baleho Ready"} // Disable if already marked as ready
                          >
                            {transaction.statusCustome === "Baleho Ready"
                              ? "Baleho Ready"
                              : "Copot Baleho"}
                          </button>
                        </td>
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
        {/* <button
          className="bg-green-500 text-white px-3 py-1 rounded ml-2"
          onClick={() => handleSuccessTransactionCustome(transactionCustome.id)}
          disabled={transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"}
        >
          {transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"
            ? "Di Acc Admin Silahkan Memasukkan ke Keranjang"
            : "Di Acc Admin Silahkan Memasukkan ke Keranjang"}
        </button> */}
        <button
  className="bg-green-500 text-white px-3 py-1 rounded"
  onClick={handleSuccessTransactionCustome}
>
  Pindahkan Semua ke CartMutasiCustome
</button>

        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded ml-2"
          onClick={() => handleRemoveBalehoCustome(transactionCustome.id)}
          disabled={transactionCustome.statusMutasi === "Baleho Ready"}
        >
          {transactionCustome.statusMutasi === "Baleho Ready" ? "Baleho Ready" : "Copot Baleho"}
        </button>
      </div>
    ))
)}





<h1>Transaksi Sukses Dan Gambar Desain</h1>
{transactionsCustomeGambar.filter((transactionsCustomeGambar) => transactionsCustomeGambar.statusCustome === "Menunggu Kabar Acc Admin").length === 0 ? (
  <p>Belum ada transaksi Custome dengan status "Di Acc Admin Silahkan Memasukkan ke Keranjang".</p>
) : (
  transactionsCustomeGambar
    .filter((transactionsCustomeGambar) => transactionsCustomeGambar.statusCustome === "Menunggu Kabar Acc Admin")
    .map((transactionsCustomeGambar) => (
      <div key={transactionsCustomeGambar.id} className="mb-6 border p-4 rounded">
        <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
        <h2 className="text-xl font-semibold mb-2">Order ID: {transactionsCustomeGambar.judul}</h2>
        <h2 className="text-xl font-semibold mb-2">Pembeli: {transactionsCustomeGambar.namaPembeli}</h2>
        <p className="text-xl font-semibold mb-2">Deksripsi: {transactionsCustomeGambar.deskripsi}</p>
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
  // className="max-w-full h-auto" 
  className="w-16 h-16 object-cover cursor-pointer"
                              onClick={() => handleImageClick(transactionsCustomeGambar.imageUrl)}
/>
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
      </div>
    </>
  );
};

export default TransactionHistory;