// "use client";
// import useAuth from "@/app/hooks/useAuth";
// import useProduct from "@/app/hooks/useProduct";
// import useProductCustome from "@/app/hooks/useProductCustome";
// import CardItem from "@/components/CardItem";
// import CardItemTampilan2 from "@/components/CardItemTampilan2";
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { db } from "@/firebase/firebase";
// import { collection, onSnapshot,getFirestore, doc, getDoc, setDoc, serverTimestamp  } from "firebase/firestore";
// import { useRouter } from "next/navigation";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import React, { useEffect, useState } from "react";
// // import { getFirestore, doc, getDoc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore functions

// // const Product = () => {
// //   const { user, userProfile } = useAuth();
// //   const router = useRouter();

// //   useEffect(() => {
// //     if (user && userProfile.role === "admin") {
// //       router.push("/admin");
// //     }
// //   }, [user, userProfile, router]);

// //   useEffect(() => {
// //     const unsubProduct = onSnapshot(
// //       collection(db, "products"),
// //       (snapshot) => {
// //         let list = [];
// //         snapshot.docs.forEach((doc) => {
// //           list.push({ id: doc.id, ...doc.data() });
// //         });
// //         setData(list);
// //       },
// //       (error) => {
// //         console.log(error);
// //       }
// //     );
// //     return () => {
// //       unsubProduct();
// //     };
// //   }, []);

// //   const { isInCart, removeFromCart, addToCart, data, setData } = useProduct();
// //   return (
// //     <div>
// //       <Navbar />
// //       <div className="p-8 md:p-24 mt-10">
// //         <div className="flex justify-between mb-10">
// //           <h2 className="text-3xl mb-3">All Products</h2>
// //           <input type="text" className="input input-bordered" />
// //           <select className="select select-bordered w-full max-w-xs">
// //             <option value={"all"}>All</option>
// //             <option value={"fikom"}>Fikom</option>
// //             <option value={"dkv"}>DKV</option>
// //             <option value={"Fasilkom"}>Fasilkom</option>
// //           </select>
// //         </div>
// //         <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
// //           {data.map((product) => (
// //             <CardItem
// //               key={product.id}
// //               imageUrl={product.image}
// //               fakultas={product.category}
// //               judul={product.title}
// //               deskripsi={product.description}
// //               harga={product.price}
// //               addToCart={() => addToCart(product)}
// //               removeFromCart={() => removeFromCart(product)}
// //               isInCart={isInCart(product.id)}
// //             />
// //           ))}
// //         </div>
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default Product;

// //PEMBARUAN DENGAN MENAMBAHKAN FUNGSI SELECT OPTION
// // const Product = () => {
// //   const { user, userProfile } = useAuth();
// //   const router = useRouter();
// //   const [categoryFilter, setCategoryFilter] = useState("all"); // State untuk menyimpan kategori filter
// //   const { isInCart, removeFromCart, addToCart, data, setData } = useProduct();

// //   useEffect(() => {
// //     if (user && userProfile.role === "admin") {
// //       router.push("/admin");
// //     }
// //   }, [user, userProfile, router]);

// //   useEffect(() => {
// //     const unsubProduct = onSnapshot(
// //       collection(db, "products"),
// //       (snapshot) => {
// //         let list = [];
// //         snapshot.docs.forEach((doc) => {
// //           list.push({ id: doc.id, ...doc.data() });
// //         });
// //         setData(list);
// //       },
// //       (error) => {
// //         console.log(error);
// //       }
// //     );
// //     return () => {
// //       unsubProduct();
// //     };
// //   }, [setData]);

// //   // Menyaring produk berdasarkan kategori yang dipilih
// //   const filteredData =
// //     data && categoryFilter === "all"
// //       ? data
// //       : data.filter(
// //           (product) => product.category.toLowerCase() === categoryFilter
// //         );

// //   return (
// //     <div>
// //       <Navbar />
// //       <div className="p-8 md:p-24 mt-10">
// //         <div className="flex justify-between mb-10">
// //           <h2 className="text-3xl mb-3">All Products</h2>
// //           {/* <input type="text" className="input input-bordered" /> */}
// //           <input
// //             type="text"
// //             className="input input-bordered"
// //             onChange={(e) => {
// //               const inputValue = e.target.value.toLowerCase();
// //               const selectElement = document.querySelector(".select");

// //               // Melakukan perulangan pada setiap opsi dropdown
// //               selectElement.childNodes.forEach((option) => {
// //                 if (option.value.toLowerCase().includes(inputValue)) {
// //                   // Jika nilai opsi cocok dengan input pengguna, opsi tersebut akan dipilih
// //                   option.selected = true;
// //                 }
// //               });

// //               // Memperbarui state kategori filter sesuai dengan input pengguna
// //               setCategoryFilter(inputValue);
// //             }}
// //           />

// //           <select
// //             className="select select-bordered w-full max-w-xs"
// //             onChange={(e) => setCategoryFilter(e.target.value.toLowerCase())} // Mengubah state kategori filter berdasarkan pilihan
// //           >
// //             <option value={"all"}>All</option>
// //             <option value={"fikom"}>Fikom</option>
// //             <option value={"dkv"}>DKV</option>
// //             <option value={"fasilkom"}>Fasilkom</option>
// //           </select>
// //         </div>
// //         <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
// //           {filteredData.map((product) => (
// //             <CardItem
// //               key={product.id}
// //               imageUrl={product.image}
// //               fakultas={product.category}
// //               judul={product.title}
// //               deskripsi={product.description}
// //               harga={product.price}
// //               addToCart={() => addToCart(product)}
// //               removeFromCart={() => removeFromCart(product)}
// //               isInCart={isInCart(product.id)}
// //             />
// //           ))}
// //         </div>
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default Product;

// //MENAMBAHKAN CODE UNTUK INPUT SETSEACRH SESUAI DENGAN OPTION APABILA USER MENGETIK
// // const Product = () => {
// //   const { user, userProfile } = useAuth();
// //   const router = useRouter();
// //   const [categoryFilter, setCategoryFilter] = useState("all"); // State untuk menyimpan kategori filter
// //   const [searchInput, setSearchInput] = useState(""); // State untuk menyimpan input pencarian
// //   const { isInCart, removeFromCart, addToCart, data, setData } = useProduct();

// //   useEffect(() => {
// //     if (user && userProfile.role === "admin") {
// //       router.push("/admin");
// //     }
// //   }, [user, userProfile, router]);

// //   useEffect(() => {
// //     const unsubProduct = onSnapshot(
// //       collection(db, "products"),
// //       (snapshot) => {
// //         let list = [];
// //         snapshot.docs.forEach((doc) => {
// //           list.push({ id: doc.id, ...doc.data() });
// //         });
// //         setData(list);
// //       },
// //       (error) => {
// //         console.log(error);
// //       }
// //     );
// //     return () => {
// //       unsubProduct();
// //     };
// //   }, [setData]);

// //   // Menyaring produk berdasarkan kategori yang dipilih
// //   const filteredData =
// //     data && categoryFilter === "all"
// //       ? data
// //       : data.filter(
// //           (product) => product.category.toLowerCase() === categoryFilter
// //         );

// //   // Fungsi untuk memperbarui state pencarian ketika nilai input berubah
// //   const handleSearchInputChange = (e) => {
// //     setSearchInput(e.target.value.toLowerCase());
// //   };

// //   // Fungsi untuk memilih opsi dropdown sesuai dengan input pencarian
// //   useEffect(() => {
// //     const selectElement = document.querySelector('.select');

// //     // Melakukan perulangan pada setiap opsi dropdown
// //     selectElement.childNodes.forEach((option) => {
// //       if (option.value.toLowerCase().includes(searchInput)) {
// //         // Jika nilai opsi cocok dengan input pengguna, opsi tersebut akan dipilih
// //         option.selected = true;
// //       }
// //     });

// //     // Memperbarui state kategori filter sesuai dengan input pencarian
// //     setCategoryFilter(searchInput);
// //   }, [searchInput]);

// //   return (
// //     <div>
// //       <Navbar />
// //       <div className="p-8 md:p-24 mt-10">
// //         <div className="flex justify-between mb-10">
// //           <h2 className="text-3xl mb-3">All Products</h2>
// //           <input
// //             type="text"
// //             className="input input-bordered"
// //             value={searchInput}
// //             onChange={handleSearchInputChange}
// //           />
// //           <select
// //             className="select select-bordered w-full max-w-xs"
// //             onChange={(e) =>
// //               setCategoryFilter(e.target.value.toLowerCase())
// //             } // Mengubah state kategori filter berdasarkan pilihan
// //           >
// //             <option value={"all"}>All</option>
// //             <option value={"fikom"}>Fikom</option>
// //             <option value={"dkv"}>DKV</option>
// //             <option value={"fasilkom"}>Fasilkom</option>
// //           </select>
// //         </div>
// //         <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
// //           {filteredData.map((product) => (
// //             <CardItem
// //               key={product.id}
// //               imageUrl={product.image}
// //               fakultas={product.category}
// //               judul={product.title}
// //               deskripsi={product.description}
// //               harga={product.price}
// //               addToCart={() => addToCart(product)}
// //               removeFromCart={() => removeFromCart(product)}
// //               isInCart={isInCart(product.id)}
// //             />
// //           ))}
// //         </div>
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default Product;

// // import { useRouter } from "next/router";
// // import { db } from "@/firebase/firebase";

// const Product = (
//   {
//     imageUrl,
//     judul,
//     deskripsi,
//     hargaJangkauan,
//     statusCustome,
//     fakultas,
//   }
// ) => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [searchInput, setSearchInput] = useState("");
//   const [data, setData] = useState([]);
//   const [newAssetNotification, setNewAssetNotification] = useState(false);
//   const [AssetNotification, setAssetNotification] = useState(false);
//   const { isInCart, removeFromCart, addToCart } = useProduct();
//   const { isInCartCustome, removeFromCartCustome, addToCartCustome } = useProductCustome();
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [showInput, setShowInput] = useState(false); // State untuk mengontrol tampilan input
//   const [jangkauanCustome, setJangkauanCustome] = useState(""); // State untuk menyimpan jangkauan sewa
//   const [startDate, setStartDate] = useState('');
//   const [customTimestamp, setCustomTimestamp] = useState(null); // Ganti nama state menjadi customTimestamp
//   // const [judul, setJudul] = useState(""); // Example initialization
//   // const parsedHargaJangkauan = parseFloat(hargaJangkauan || 0);



//   const handleCardClick = (productId) => {
//     // Jika produk sudah dipilih, klik ulang akan menyembunyikannya
//     setSelectedProductId((prev) => (prev === productId ? null : productId));
//   };

//   useEffect(() => {
//     if (user && userProfile.role === "admin") {
//       router.push("/admin");
//     }
//   }, [user, userProfile, router]);

//   const auth = getAuth();

//   const [endDate, setEndDate] = useState("");

//   const db = getFirestore(); // Initialize Firestore

//   // useEffect(() => {
//   //   const unsubProduct = onSnapshot(collection(db, "products"), (snapshot) => {
//   //     let list = [];
//   //     snapshot.docs.forEach((doc) => {
//   //       list.push({ id: doc.id, ...doc.data() });
//   //     });
//   //     setData(list);
//   //     setNewAssetNotification(true); // Setelah perubahan data, atur notifikasi untuk menampilkan pesan bahwa ada aset baru
//   //     alert("New Asset Add");
//   //   }, (error) => {
//   //     console.log(error);
//   //   });
//   //   return () => {
//   //     unsubProduct();
//   //   };
//   // }, []);
//   // useEffect(() => {
//   //   const unsubProduct = onSnapshot(collection(db, "products"), (snapshot) => {
//   //     let list = [];
//   //     snapshot.docs.forEach((doc) => {
//   //       list.push({ id: doc.id, ...doc.data() });
//   //     });

//   //     // Memeriksa apakah ada aset baru yang ditambahkan
//   //     if (list.length > data.length) {
//   //       setNewAssetNotification(true); // Jika ada aset baru, atur notifikasi untuk ditampilkan
//   //       alert("New Asset Added");
//   //     } else if (list.length === data.length) {
//   //       setAssetNotification(true); // Jika tidak ada aset baru, atur notifikasi untuk ditampilkan
//   //       alert("Happy Shopping");
//   //     }

//   //     setData(list);
//   //   }, (error) => {
//   //     console.log(error);
//   //   });
//   //   return () => {
//   //     unsubProduct();
//   //   };
//   // }, []);

//   //USE EFFECT YANG FIX BUAT ALERT
//   useEffect(() => {
//     const unsubProduct = onSnapshot(
//       collection(db, "products"),
//       (snapshot) => {
//         let list = [];
//         snapshot.docs.forEach((doc) => {
//           list.push({ id: doc.id, ...doc.data() });
//         });

//         // Memeriksa apakah ada aset baru yang ditambahkan
//         const isNewAssetAdded = list.length === data.length;
//         // const isAsset = list.length > data.length;
//         if (isNewAssetAdded) {
//           setNewAssetNotification(true); // Jika ada aset baru, atur notifikasi untuk ditampilkan
//           setAssetNotification(false); // Jika ada aset baru, atur notifikasi "Happy Shopping" menjadi false
//           // alert("New Asset Added");
//         } else {
//           setNewAssetNotification(false); // Jika tidak ada aset baru, atur notifikasi "New Asset Added" menjadi false
//           setAssetNotification(true); // Jika tidak ada aset baru, atur notifikasi untuk "Happy Shopping"
//           // alert("Happy Shopping");
//         }

//         setData(list);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//     return () => {
//       unsubProduct();
//     };
//   }, []);

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
//   // Menyaring produk berdasarkan kategori yang dipilih
//   const filteredData =
//     data && categoryFilter === ""
//       ? data
//       : data.filter(
//           (product) => product.category.toLowerCase() === categoryFilter
//         );

//   // Fungsi untuk memperbarui state pencarian ketika nilai input berubah
//   const handleSearchInputChange = (e) => {
//     setSearchInput(e.target.value.toLowerCase());
//   };

//   // Fungsi untuk memilih opsi dropdown sesuai dengan input pencarian
//   useEffect(() => {
//     const selectElement = document.querySelector(".select");
//     // Melakukan perulangan pada setiap opsi dropdown
//     selectElement.childNodes.forEach((option) => {
//       if (option.value.toLowerCase().includes(searchInput)) {
//         // Jika nilai opsi cocok dengan input pengguna, opsi tersebut akan dipilih
//         option.selected = true;
//       }
//     });
//     // Memperbarui state kategori filter sesuai dengan input pencarian
//     setCategoryFilter(searchInput);
//   }, [searchInput]);

//   // // Fungsi untuk menyembunyikan notifikasi asset baru telah ditambahkan setelah beberapa waktu
//   useEffect(() => {
//     const notificationTimeout = setTimeout(() => {
//       setNewAssetNotification(false);
//     }, 5000); // Menampilkan notifikasi selama 5 detik
//     return () => clearTimeout(notificationTimeout);
//   }, [newAssetNotification]);

//   // Fungsi untuk menyembunyikan notifikasi asset yang bukan baru setelah beberapa waktu
//   useEffect(() => {
//     const notificationTimeout = setTimeout(() => {
//       setAssetNotification(false);
//     }, 5000); // Menampilkan notifikasi selama 5 detik
//     return () => clearTimeout(notificationTimeout);
//   }, [AssetNotification]);

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

//   const handleSaveJangkauan = async () => {
//     try {
//       // Mendapatkan data pengguna yang sedang login
//       const userProfile = auth.currentUser; // auth adalah instance dari Firebase Authentication
//       // const { user, userProfile } = useAuth();
//       if (!userProfile) {
//         throw new Error("Pengguna belum login.");
//       }
  
//       const namaPembeli = userProfile.email || "Nama Tidak Diketahui"; // Menggunakan displayName atau email, atau default jika tidak tersedia
  
//       const parsedJangkauan = parseFloat(jangkauanCustome);
//       const parsedHargaJangkauan = parseFloat(hargaJangkauan);
  
//       if (isNaN(parsedJangkauan) || isNaN(parsedHargaJangkauan)) {
//         throw new Error("jangkauan atau hargaJangkauan bukan angka yang valid.");
//       }
  
//       const harga = parsedJangkauan * parsedHargaJangkauan;
  
//       // Save data to jangkauanCustomSewa collection
//       const docRef = doc(db, "jangkauanCustomSewa", judul);
//       await setDoc(docRef, {
//         jangkauanCustome: parsedJangkauan,
//         namaPembeli,
//         startDate,
//         endDate,
//         imageUrl,
//         judul,
//         deskripsi,
//         statusCustome,
//         harga,
//         hargaJangkauan: parsedHargaJangkauan,
//         fakultas,
//         timestamp: serverTimestamp(), // Menambahkan timestamp
//       });
//       console.log("Deskripsi Jangkauan Sewa berhasil disimpan:", {
//         jangkauanCustome: parsedJangkauan,
//         namaPembeli,
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
  
//       // Save data to cartMutasiCustome2 collection
//       const cartDocRef = doc(db, "cartMutasiCustome2", judul);
//       await setDoc(cartDocRef, {
//         jangkauanCustome: parsedJangkauan,
//         namaPembeli,
//         startDate,
//         endDate,
//         imageUrl,
//         judul,
//         deskripsi,
//         statusCustome,
//         harga,
//         hargaJangkauan: parsedHargaJangkauan,
//         fakultas,
//         timestamp: serverTimestamp(), // Menambahkan timestamp
//       });
//       console.log("Data berhasil disimpan di cartMutasiCustome2");
//     } catch (error) {
//       console.error("Gagal menyimpan deskripsi jangkauan sewa:", error);
//     }
//     setShowInput(false); // Sembunyikan input setelah menyimpan
//   };
//   // {newAssetNotification && (
//   //   <div className="notification p-8 md:p-24 mt-10">New asset added!</div>
//   // )}
//   // {AssetNotification && (
//   //   <div className="notification flex flex-col p-8 md:p-24 mt-10">
//   //     <span>Happy Hunting</span>
//   //   </div>
//   // )}
  
//   return (
//     <div>
//       <Navbar />
//       <div className="p-8 md:p-24 mt-10">
//         <div className="flex justify-between mb-10">
//           <h2 className="text-3xl mb-3">All Products</h2>
//           {AssetNotification && (
//             <div className="notification-3xl mb-3">
//               Happy Hunting
//             </div>
//           )}
//           <input
//             type="text"
//             className="input input-bordered"
//             value={searchInput}
//             onChange={handleSearchInputChange}
//           />
//           <select
//             className="select select-bordered w-full max-w-xs"
//             onChange={(e) => setCategoryFilter(e.target.value.toLowerCase())}
//           >
//             <option value={"all"}>All</option>
//             <option value={"jakarta"}>Jakarta</option>
//             <option value={"yogyakarta"}>Yogyakarta</option>
//             <option value={"lampung"}>Lampung</option>
//             <option value={"solo"}>Solo</option>
//             <option value={"baleho 2"}>Baleho</option>
//             <option value={"baleho 3"}>Baleho</option>
//             <option value={"baleho 4"}>Baleho</option>
//             <option value={"baleho 5"}>Baleho</option>
//             <option value={"baleho 6"}>Baleho</option>
//             <option value={"baleho 7"}>Baleho</option>
//             <option value={"baleho 8"}>Baleho</option>
//             <option value={"baleho 9"}>Baleho</option>
//             <option value={"baleho 10"}>Baleho</option>
//           </select>
//         </div>
//         {/* <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
//           {filteredData.map((product) => (
//             <CardItem
//               key={product.id}
//               imageUrl={product.image}
//               fakultas={product.category}
//               judul={product.title}
//               deskripsi={product.description}
//               harga={product.price}
//               hargaJangkauan={product.priceJangkauan}
//               jangkauan={product.jangkauan}
//               statusCustome={product.statusCustome}
//               statusProduct={product.statusProduct}
//               // tampilanstartDate={product.tampilanstartDate}
//               // startDate={product.startDate}
//               addToCart={() => addToCart(product)}
//               addToCartCustome={()=> addToCartCustome(product)}
//               addToMutasi={() => addToMutasi(product)}
//               removeFromCart={() => removeFromCart(product)}
//               removeFromCartCustome={()=>removeFromCartCustome(product)}
//               isInCart={isInCart(product.id)}
//               isInCartCustome={isInCartCustome(product.id)}
//             />
//           ))}
//         </div> */}
//         <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
//       {filteredData.map((product) => (
//         <div
//           key={product.id}
//           className="relative w-full"
//           alt={judul}
//           onClick={() => handleCardClick(product.id)}
//         >
//           {/* CardItem tetap dirender, klik akan memicu perubahan state */}
//           <CardItemTampilan2
//             imageUrl={product.image}
//             // fakultas={product.category}
//             judul={product.title}
//             // deskripsi={product.description}
//             // harga={product.price}
//             // hargaJangkauan={product.priceJangkauan}
//             // jangkauan={product.jangkauan}
//             // statusCustome={product.statusCustome}
//             // statusProduct={product.statusProduct}
//             // addToCart={() => addToCart(product)}
//             addToCartCustome={() => addToCartCustome(product)}
//             addToMutasi={() => addToMutasi(product)}
//             removeFromCart={() => removeFromCart(product)}
//             removeFromCartCustome={() => removeFromCartCustome(product)}
//             isInCart={isInCart(product.id)}
//             isInCartCustome={isInCartCustome(product.id)}
//           />

//           {/* Detail produk hanya ditampilkan jika produk dipilih */}
//           {selectedProductId === product.id && (
//             <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 flex flex-col justify-center items-center p-4 shadow-lg">
//               <h2 className="text-2xl font-bold">{product.title}</h2>
//               <h2 className="text-2xl font-bold">{product.category}</h2>
//               <p className="text-gray-700 mb-2">{product.description}</p>
//               <p className="text-orange-500 font-bold">Harga Sebulan: <p>Rp{product.priceJangkauan}</p></p>
//               <p className="text-gray-700 mb-2">{product.jangkauan}</p>
//               <p className="text-orange-500 font-bold">Harga Total: Rp<p>{product.price}</p></p>
//               <p className="text-gray-600">
//                 Status Product: <p>{product.statusProduct}</p>
//               </p>
//               <p className="text-gray-600">
//                 Status Custome Product: <p>{product.statusCustome}</p>
//               </p>
//               <p>Start Date Custome Pemesanan</p>
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
//               {/* Tombol interaktif */}
//     <div className="mt-6 flex flex-col gap-4">
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//         onClick={() => addToCart(product)}
//       >
//         Add to Cart
//       </button>
//       {/* <button
//         className="bg-green-500 text-white px-4 py-2 rounded-lg"
//         onClick={() => addToCartCustome(product)}
//       >
//         Add to Custom Cart
//       </button> */}
//       {/* <button
//         className="bg-orange-500 text-white px-4 py-2 rounded-lg"
//         onClick={() => addToMutasi(product)}
//       >
//         Add to Mutasi
//       </button> */}
//       <button
//         className="bg-red-500 text-white px-4 py-2 rounded-lg"
//         onClick={() => removeFromCart(product)}
//       >
//         Remove from Cart
//       </button>
//       <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
//           onClick={handleToggleInput}
//         >
//           {showInput ? "Cancel" : "Add Jangkauan"}
//         </button>
//         {showInput && (
//         <div className="px-6 py-3" onClick={(e) => e.stopPropagation()} // Stop klik dari menutup showInput
// >
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
//       {/* <button
//         className="bg-red-700 text-white px-4 py-2 rounded-lg"
//         onClick={() => removeFromCartCustome(product)}
//       >
//         Remove from Custom Cart
//       </button> */}
//     </div>

//     {/* Indikator apakah item ada di cart */}
//     <p className="mt-4 text-gray-600">
//       Is in Cart: {isInCart(product.id) ? "Yes" : "No"}
//     </p>
//     {/* <p className="text-gray-600">
//       Is in Custom Cart: {isInCartCustome(product.id) ? "Yes" : "No"}
//     </p> */}
              
//               {/* <button
//                 className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
//                 onClick={() => setSelectedProductId(null)}
//               >
//                 Close
//               </button> */}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Product;



// "use client";
// import useAuth from "@/app/hooks/useAuth";
// import useProduct from "@/app/hooks/useProduct";
// import CardItem from "@/components/CardItem";
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { db } from "@/firebase/firebase";
// import { collection, onSnapshot } from "firebase/firestore";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const Product = () => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [searchInput, setSearchInput] = useState("");
//   const [data, setData] = useState([]);
//   const [orderLocations, setOrderLocations] = useState([]);
//   const [newAssetNotification, setNewAssetNotification] = useState(false);
//   const [assetNotification, setAssetNotification] = useState(false);
//   const { isInCart, removeFromCart, addToCart } = useProduct();

//   useEffect(() => {
//     if (user && userProfile.role === "admin") {
//       router.push("/admin");
//     }
//   }, [user, userProfile, router]);

//   // Fetch products from Firestore
//   useEffect(() => {
//     const unsubProduct = onSnapshot(
//       collection(db, "products"),
//       (snapshot) => {
//         let productList = [];
//         snapshot.docs.forEach((doc) => {
//           productList.push({ id: doc.id, ...doc.data() });
//         });
//         setData(productList);
//       },
//       (error) => console.log(error)
//     );
//     return () => unsubProduct();
//   }, []);

//   // Fetch order locations from Firestore
//   useEffect(() => {
//     const unsubOrders = onSnapshot(
//       collection(db, "users"),
//       (snapshot) => {
//         let locations = [];
//         snapshot.docs.forEach((doc) => {
//           const location = doc.data().companyAddress;
//           if (location) locations.push(location);
//         });
//         setOrderLocations(locations);
//       },
//       (error) => console.log(error)
//     );
//     return () => unsubOrders();
//   }, []);

//   // Filter products based on category and order locations
//   const filteredData = data.filter((product) => {
//     const productCategory = product.category.toLowerCase().trim();
//     const locationMatch = orderLocations.some(
//       (location) => location.toLowerCase().trim() === productCategory
//     );

//     if (categoryFilter === "all") {
//       return locationMatch; // Show products that match any order location
//     }
    
//     return productCategory === categoryFilter;
//   });

//   // Debug filtered results
//   console.log("Filtered Products:", filteredData);

//   const handleSearchInputChange = (e) => {
//     setSearchInput(e.target.value.toLowerCase());
//   };

//   useEffect(() => {
//     const selectElement = document.querySelector(".select");
//     selectElement.childNodes.forEach((option) => {
//       if (option.value.toLowerCase().includes(searchInput)) {
//         option.selected = true;
//       }
//     });
//     setCategoryFilter(searchInput);
//   }, [searchInput]);

//   useEffect(() => {
//     const notificationTimeout = setTimeout(() => {
//       setNewAssetNotification(false);
//     }, 5000);
//     return () => clearTimeout(notificationTimeout);
//   }, [newAssetNotification]);

//   useEffect(() => {
//     const notificationTimeout = setTimeout(() => {
//       setAssetNotification(false);
//     }, 5000);
//     return () => clearTimeout(notificationTimeout);
//   }, [assetNotification]);

//   return (
//     <div>
//       <Navbar />
//       <div className="p-8 md:p-24 mt-10">
//         <div className="flex justify-between mb-10">
//           <h2 className="text-3xl mb-3">All Products</h2>
//           {assetNotification && (
//             <div className="notification-3xl mb-3">
//               Happy Hunting
//             </div>
//           )}
//           <input
//             type="text"
//             className="input input-bordered"
//             value={searchInput}
//             onChange={handleSearchInputChange}
//           />
//           <select
//             className="select select-bordered w-full max-w-xs"
//             onChange={(e) => setCategoryFilter(e.target.value.toLowerCase())}
//           >
//             <option value={"all"}>All</option>
//             <option value={"fikom"}>Fikom</option>
//             <option value={"dkv"}>DKV</option>
//             <option value={"fasilkom"}>Fasilkom</option>
//             <option value={"baleho 1"}>Baleho</option>
//             <option value={"baleho 2"}>Baleho</option>
//             <option value={"baleho 3"}>Baleho</option>
//             <option value={"baleho 4"}>Baleho</option>
//             <option value={"baleho 5"}>Baleho</option>
//             <option value={"baleho 6"}>Baleho</option>
//             <option value={"baleho 7"}>Baleho</option>
//             <option value={"baleho 8"}>Baleho</option>
//             <option value={"baleho 9"}>Baleho</option>
//             <option value={"baleho 10"}>Baleho</option>
//           </select>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
//           {filteredData.map((product) => (
//             <CardItem
//               key={product.id}
//               imageUrl={product.image}
//               fakultas={product.category}
//               judul={product.title}
//               deskripsi={product.description}
//               harga={product.price}
//               addToCart={() => addToCart(product)}
//               addToMutasi={() => addToMutasi(product)}
//               removeFromCart={() => removeFromCart(product)}
//               isInCart={isInCart(product.id)}
//             />
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Product;




// "use client";
// import useAuth from "@/app/hooks/useAuth";
// import useProduct from "@/app/hooks/useProduct";
// import useProductCustome from "@/app/hooks/useProductCustome";
// import CardItem from "@/components/CardItem";
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { db } from "@/firebase/firebase";
// import { collection, onSnapshot } from "firebase/firestore";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const Product = () => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [searchInput, setSearchInput] = useState("");
//   const [data, setData] = useState([]);
//   const [newAssetNotification, setNewAssetNotification] = useState(false);
//   const [AssetNotification, setAssetNotification] = useState(false);
//   const { isInCart, removeFromCart, addToCart } = useProduct();
//   const { isInCartCustome, removeFromCartCustome, addToCartCustome } = useProductCustome();

//   useEffect(() => {
//     if (user && userProfile.role === "admin") {
//       router.push("/admin");
//     }
//   }, [user, userProfile, router]);

//   //USE EFFECT YANG FIX BUAT ALERT
//   useEffect(() => {
//     const unsubProduct = onSnapshot(
//       collection(db, "products"),
//       (snapshot) => {
//         let list = [];
//         snapshot.docs.forEach((doc) => {
//           list.push({ id: doc.id, ...doc.data() });
//         });

//         // Memeriksa apakah ada aset baru yang ditambahkan
//         const isNewAssetAdded = list.length === data.length;
//         // const isAsset = list.length > data.length;
//         if (isNewAssetAdded) {
//           setNewAssetNotification(true); // Jika ada aset baru, atur notifikasi untuk ditampilkan
//           setAssetNotification(false); // Jika ada aset baru, atur notifikasi "Happy Shopping" menjadi false
//           // alert("New Asset Added");
//         } else {
//           setNewAssetNotification(false); // Jika tidak ada aset baru, atur notifikasi "New Asset Added" menjadi false
//           setAssetNotification(true); // Jika tidak ada aset baru, atur notifikasi untuk "Happy Shopping"
//           // alert("Happy Shopping");
//         }

//         setData(list);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//     return () => {
//       unsubProduct();
//     };
//   }, []);

//   // Menyaring produk berdasarkan kategori yang dipilih
//   const filteredData =
//     data && categoryFilter === ""
//       ? data
//       : data.filter(
//           (product) => product.category.toLowerCase() === categoryFilter
//         );

//   // Fungsi untuk memperbarui state pencarian ketika nilai input berubah
//   const handleSearchInputChange = (e) => {
//     setSearchInput(e.target.value.toLowerCase());
//   };

//   // Fungsi untuk memilih opsi dropdown sesuai dengan input pencarian
//   useEffect(() => {
//     const selectElement = document.querySelector(".select");
//     // Melakukan perulangan pada setiap opsi dropdown
//     selectElement.childNodes.forEach((option) => {
//       if (option.value.toLowerCase().includes(searchInput)) {
//         // Jika nilai opsi cocok dengan input pengguna, opsi tersebut akan dipilih
//         option.selected = true;
//       }
//     });
//     // Memperbarui state kategori filter sesuai dengan input pencarian
//     setCategoryFilter(searchInput);
//   }, [searchInput]);

//   // // Fungsi untuk menyembunyikan notifikasi asset baru telah ditambahkan setelah beberapa waktu
//   useEffect(() => {
//     const notificationTimeout = setTimeout(() => {
//       setNewAssetNotification(false);
//     }, 5000); // Menampilkan notifikasi selama 5 detik
//     return () => clearTimeout(notificationTimeout);
//   }, [newAssetNotification]);

//   // Fungsi untuk menyembunyikan notifikasi asset yang bukan baru setelah beberapa waktu
//   useEffect(() => {
//     const notificationTimeout = setTimeout(() => {
//       setAssetNotification(false);
//     }, 5000); // Menampilkan notifikasi selama 5 detik
//     return () => clearTimeout(notificationTimeout);
//   }, [AssetNotification]);

//   // {newAssetNotification && (
//   //   <div className="notification p-8 md:p-24 mt-10">New asset added!</div>
//   // )}
//   // {AssetNotification && (
//   //   <div className="notification flex flex-col p-8 md:p-24 mt-10">
//   //     <span>Happy Hunting</span>
//   //   </div>
//   // )}
  
//   return (
//     <div>
//       <Navbar />
//       <div className="p-8 md:p-24 mt-10">
//         <div className="flex justify-between mb-10">
//           <h2 className="text-3xl mb-3">All Products</h2>
//           {AssetNotification && (
//             <div className="notification-3xl mb-3">
//               Happy Hunting
//             </div>
//           )}
//           <input
//             type="text"
//             className="input input-bordered"
//             value={searchInput}
//             onChange={handleSearchInputChange}
//           />
//           <select
//             className="select select-bordered w-full max-w-xs"
//             onChange={(e) => setCategoryFilter(e.target.value.toLowerCase())}
//           >
//             <option value={"all"}>All</option>
//             <option value={"jakarta"}>Jakarta</option>
//             <option value={"yogyakarta"}>Yogyakarta</option>
//             <option value={"lampung"}>Lampung</option>
//             <option value={"solo"}>Solo</option>
//             <option value={"baleho 2"}>Baleho</option>
//             <option value={"baleho 3"}>Baleho</option>
//             <option value={"baleho 4"}>Baleho</option>
//             <option value={"baleho 5"}>Baleho</option>
//             <option value={"baleho 6"}>Baleho</option>
//             <option value={"baleho 7"}>Baleho</option>
//             <option value={"baleho 8"}>Baleho</option>
//             <option value={"baleho 9"}>Baleho</option>
//             <option value={"baleho 10"}>Baleho</option>
//           </select>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
//           {filteredData.map((product) => (
//             <CardItem
//               key={product.id}
//               imageUrl={product.image}
//               fakultas={product.category}
//               judul={product.title}
//               deskripsi={product.description}
//               harga={product.price}
//               hargaJangkauan={product.priceJangkauan}
//               jangkauan={product.jangkauan}
//               statusCustome={product.statusCustome}
//               statusProduct={product.statusProduct}
//               addToCart={() => addToCart(product)}
//               addToCartCustome={()=> addToCartCustome(product)}
//               addToMutasi={() => addToMutasi(product)}
//               removeFromCart={() => removeFromCart(product)}
//               removeFromCartCustome={()=>removeFromCartCustome(product)}
//               isInCart={isInCart(product.id)}
//               isInCartCustome={isInCartCustome(product.id)}
//             />
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Product;













// "use client";
// import useAuth from "@/app/hooks/useAuth";
// import useProduct from "@/app/hooks/useProduct";
// import useProductCustome from "@/app/hooks/useProductCustome";
// import CardItem from "@/components/CardItem";
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { db } from "@/firebase/firebase";
// import { collection, onSnapshot, addDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const Product = () => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [searchInput, setSearchInput] = useState("");
//   const [data, setData] = useState([]);
//   const [newAssetNotification, setNewAssetNotification] = useState(false);
//   const [AssetNotification, setAssetNotification] = useState(false);
//   const { isInCart, removeFromCart, addToCart } = useProduct();
//   const { isInCartCustome, removeFromCartCustome, addToCartCustome } = useProductCustome();
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [file, setFile] = useState(null);
//   const [percentage, setPercentage] = useState(null);

//   useEffect(() => {
//     if (user && userProfile.role === "admin") {
//       router.push("/admin");
//     }
//   }, [user, userProfile, router]);

//   useEffect(() => {
//     const unsubProduct = onSnapshot(
//       collection(db, "products"),
//       (snapshot) => {
//         let list = [];
//         snapshot.docs.forEach((doc) => {
//           list.push({ id: doc.id, ...doc.data() });
//         });

//         const isNewAssetAdded = list.length === data.length;
//         if (isNewAssetAdded) {
//           setNewAssetNotification(true);
//           setAssetNotification(false);
//         } else {
//           setNewAssetNotification(false);
//           setAssetNotification(true);
//         }
//         setData(list);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//     return () => {
//       unsubProduct();
//     };
//   }, [data]);

//   const filteredData =
//     data && categoryFilter === ""
//       ? data
//       : data.filter(
//           (product) => product.category.toLowerCase() === categoryFilter
//         );

//   const handleSearchInputChange = (e) => {
//     setSearchInput(e.target.value.toLowerCase());
//   };

//   useEffect(() => {
//     const selectElement = document.querySelector(".select");
//     selectElement.childNodes.forEach((option) => {
//       if (option.value.toLowerCase().includes(searchInput)) {
//         option.selected = true;
//       }
//     });
//     setCategoryFilter(searchInput);
//   }, [searchInput]);

//   useEffect(() => {
//     const notificationTimeout = setTimeout(() => {
//       setNewAssetNotification(false);
//     }, 5000);
//     return () => clearTimeout(notificationTimeout);
//   }, [newAssetNotification]);

//   useEffect(() => {
//     const notificationTimeout = setTimeout(() => {
//       setAssetNotification(false);
//     }, 5000);
//     return () => clearTimeout(notificationTimeout);
//   }, [AssetNotification]);

//   // const handleAddDesain = async (product, file) => {
//   //   if (!file) {
//   //     alert("Please upload a file first.");
//   //     return;
//   //   }

//   //   const productData = {
//   //     ...product,
//   //     image: file.name,
//   //     timestamp: serverTimestamp(),
//   //   };

//   //   try {
//   //     // Simpan ke koleksi desain
//   //     await setDoc(doc(db, "desain", product.id), productData);
      
//   //     // Tambahkan ke keranjang
//   //     addToCart(product);

//   //     // Simpan ke database (koleksi cart)
//   //     await setDoc(doc(db, "cart", product.id), {
//   //       ...product,
//   //       image: file.name,
//   //       timestamp: serverTimestamp(),
//   //     });

//   //     alert("Product successfully added to desain and cart.");
//   //     setFile(null);
//   //   } catch (error) {
//   //     console.error("Error adding product to desain collection: ", error);
//   //   }
//   // };

//   // const handleAddDesain = async (product, file) => {
//   //   if (!file) {
//   //     alert("Please upload a file first.");
//   //     return;
//   //   }
  
//   //   const productData = {
//   //     ...product,
//   //     image: file.name,
//   //     timestamp: serverTimestamp(),
//   //   };
  
//   //   try {
//   //     // Simpan ke koleksi desain
//   //     await setDoc(doc(db, "desain", product.id), productData);
      
//   //     // Tambahkan ke keranjang
//   //     addToCart(product);
  
//   //     // Simpan ke koleksi cart
//   //     await setDoc(doc(db, "cart", product.id), {
//   //       ...product,
//   //       image: file.name,
//   //       timestamp: serverTimestamp(),
//   //     });
  
//   //     // Simpan ke koleksi transactiondesainacc
//   //     await addDoc(collection(db, "transactiondesainacc"), {
//   //       ...productData,
//   //       cartData: { ...product, image: file.name },
//   //       desainId: product.id,
//   //     });
  
//   //     alert("Product successfully added to desain, cart, and transactiondesainacc.");
//   //     setFile(null);
//   //   } catch (error) {
//   //     console.error("Error adding product to collections: ", error);
//   //   }
//   // };

//   const handleAddDesain = async (product, file) => {
//     if (!file) {
//       alert("Please upload a file first.");
//       return;
//     }
  
//     // Pastikan semua field diisi atau diberi default
//     const productData = {
//       id: product.id || "unknownId",
//       title: product.title || "Unknown Product",
//       category: product.category || "general",
//       price: product.price || 0,
//       description: product.description || "No description",
//       image: file.name,
//       statusProduct: product.statusProduct || "Available",
//       timestamp: serverTimestamp(),
//     };
  
//     try {
//       // Simpan ke koleksi desain
//       await setDoc(doc(db, "desain", product.id), productData);
  
//       // Tambahkan ke keranjang
//       addToCart(product);
  
//       // Data untuk koleksi cart
//       const cartData = {
//         ...productData,
//         userName: userProfile?.name || "Unknown User",
//         userId: user?.uid || "Unknown User",
//         email: user?.email || "Unknown Email",
//       };
  
//       // Simpan ke koleksi cart
//       await setDoc(doc(db, "cart", product.id), cartData);
  
//       // Simpan ke koleksi transactiondesainacc
//       await addDoc(collection(db, "transactiondesainacc"), {
//         ...productData,
//         cartData,
//         desainId: product.id,
//       });
  
//       alert("Product successfully added to desain, cart, and transactiondesainacc.");
//       setFile(null);
//     } catch (error) {
//       console.error("Error adding product to collections: ", error);
//     }
//   };
  
//   return (
//     <div>
//       <Navbar />
//       <div className="p-8 md:p-24 mt-10">
//         <div className="flex justify-between mb-10">
//           <h2 className="text-3xl mb-3">All Products</h2>
//           {AssetNotification && (
//             <div className="notification-3xl mb-3">Happy Hunting</div>
//           )}
//           <input
//             type="text"
//             className="input input-bordered"
//             value={searchInput}
//             onChange={handleSearchInputChange}
//           />
//           <select
//             className="select select-bordered w-full max-w-xs"
//             onChange={(e) => setCategoryFilter(e.target.value.toLowerCase())}
//           >
//             <option value={"all"}>All</option>
//             <option value={"jakarta"}>Jakarta</option>
//             <option value={"yogyakarta"}>Yogyakarta</option>
//             <option value={"lampung"}>Lampung</option>
//             <option value={"solo"}>Solo</option>
//           </select>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
//           {filteredData.map((product) => (
//             <CardItem
//               key={product.id}
//               imageUrl={product.image}
//               fakultas={product.category}
//               judul={product.title}
//               deskripsi={product.description}
//               harga={product.price}
//               hargaJangkauan={product.priceJangkauan}
//               jangkauan={product.jangkauan}
//               statusCustome={product.statusCustome}
//               statusProduct={product.statusProduct}
//               addToCart={() => addToCart(product)}
//               addToCartCustome={() => addToCartCustome(product)}
//               removeFromCart={() => removeFromCart(product)}
//               removeFromCartCustome={() => removeFromCartCustome(product)}
//               isInCart={isInCart(product.id)}
//               isInCartCustome={isInCartCustome(product.id)}
//               addDesain={(file) => handleAddDesain(product, file)}
//             />
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Product;












"use client";
import useAuth from "@/app/hooks/useAuth";
import useProduct from "@/app/hooks/useProduct";
import useProductCustome from "@/app/hooks/useProductCustome";
import CardItem from "@/components/CardItem";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { db } from "@/firebase/firebase";
import { collection, onSnapshot, addDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";

const Product = () => {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [newAssetNotification, setNewAssetNotification] = useState(false);
  const [AssetNotification, setAssetNotification] = useState(false);
  const { isInCart, removeFromCart, addToCart } = useProduct();
  const { isInCartCustome, removeFromCartCustome, addToCartCustome } = useProductCustome();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [file, setFile] = useState(null);
  const [percentage, setPercentage] = useState(null);

  useEffect(() => {
    if (user && userProfile.role === "admin") {
      router.push("/admin");
    }
  }, [user, userProfile, router]);

  useEffect(() => {
    const unsubProduct = onSnapshot(
      collection(db, "products"),
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
  }, [data]);

  const filteredData =
    data && categoryFilter === ""
      ? data
      : data.filter(
          (product) => product.category.toLowerCase() === categoryFilter
        );

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const selectElement = document.querySelector(".select");
    selectElement.childNodes.forEach((option) => {
      if (option.value.toLowerCase().includes(searchInput)) {
        option.selected = true;
      }
    });
    setCategoryFilter(searchInput);
  }, [searchInput]);

  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setNewAssetNotification(false);
    }, 5000);
    return () => clearTimeout(notificationTimeout);
  }, [newAssetNotification]);

  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setAssetNotification(false);
    }, 5000);
    return () => clearTimeout(notificationTimeout);
  }, [AssetNotification]);


  // const handleAddDesain = async (product, file) => {
  //   if (!file) {
  //     alert("Please upload a file first.");
  //     return;
  //   }
  
  //   // Pastikan semua field diisi atau diberi default
  //   const productData = {
  //     id: product.id || "unknownId",
  //     title: product.title || "Unknown Product",
  //     category: product.category || "general",
  //     price: product.price || 0,
  //     description: product.description || "No description",
  //     image: file.name,
  //     statusProduct: product.statusProduct || "Available",
  //     timestamp: serverTimestamp(),
  //   };
  
  //   try {
  //     // Simpan ke koleksi desain
  //     await setDoc(doc(db, "desain", product.id), productData);
  
  //     // Tambahkan ke keranjang
  //     addToCart(product);
  
  //     // Data untuk koleksi cart
  //     const cartData = {
  //       ...productData,
  //       userName: userProfile?.name || "Unknown User",
  //       userId: user?.uid || "Unknown User",
  //       email: user?.email || "Unknown Email",
  //     };
  
  //     // Simpan ke koleksi cart
  //     await setDoc(doc(db, "cart", product.id), cartData);
  
  //     // Simpan ke koleksi transactiondesainacc
  //     await addDoc(collection(db, "transactiondesainacc"), {
  //       ...productData,
  //       cartData,
  //       desainId: product.id,
  //     });
  
  //     alert("Product successfully added to desain, cart, and transactiondesainacc.");
  //     setFile(null);
  //   } catch (error) {
  //     console.error("Error adding product to collections: ", error);
  //   }
  // };


//JANGAN DIHAPUS
  const handleAddDesain = async (product, file) => {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }
  
    try {
      // Simpan file ke Firebase Storage di folder 'desain/'
      const storageRef = ref(storage, `desain/${file.name}`);
      await uploadBytes(storageRef, file);
  
      // Dapatkan URL download gambar yang diupload
      const downloadURL = await getDownloadURL(storageRef);
  
      // Data produk yang akan disimpan di database
      const productData = {
        id: product.id || "unknownId",
        title: product.title || "Unknown Product",
        category: product.category || "general",
        price: product.price || 0,
        description: product.description || "No description",
        image: file.name, // Simpan nama file gambar di database
        imageUrl: downloadURL, // URL lengkap gambar di Firebase Storage
        statusProduct: product.statusProduct || "Available",
        timestamp: serverTimestamp(),
      };
  
      // Simpan ke koleksi desain
      await setDoc(doc(db, "desain", product.id), productData);
  
      // Tambahkan ke keranjang
      addToCart(product);
  
      // Data untuk koleksi cart
      const cartData = {
        ...productData,
        userName: userProfile?.name || "Unknown User",
        userId: user?.uid || "Unknown User",
        email: user?.email || "Unknown Email",
      };
  
      // Simpan ke koleksi cart
      await setDoc(doc(db, "cart", product.id), cartData);
  
      // Simpan ke koleksi transactiondesainacc
      await addDoc(collection(db, "transactiondesainacc"), {
        ...productData,
        cartData,
        desainId: product.id,
      });
  
      alert("Product successfully added to desain, cart, and transactiondesainacc.");
      setFile(null);
    } catch (error) {
      console.error("Error adding product to collections: ", error);
    }
  };


  // const handleAddDesain = async (product, file) => {
  //   if (!file) {
  //     alert("Please upload a file first.");
  //     return;
  //   }
  
  //   try {
  //     // Simpan file ke Firebase Storage
  //     const storageRef = ref(storage, `desain/${file.name}`);
  //     await uploadBytes(storageRef, file);
  
  //     // Dapatkan URL download
  //     const downloadURL = await getDownloadURL(storageRef);
  
  //     // Data produk yang akan disimpan
  //     const productData = {
  //       id: product.id || "unknownId",
  //       title: product.title || "Unknown Product",
  //       category: product.category || "general",
  //       price: product.price || 0,
  //       description: product.description || "No description",
  //       image: file.name,
  //       imageUrl: downloadURL,
  //       statusProduct: product.statusProduct || "Available",
  //       timestamp: serverTimestamp(),
  //       role: "user",
  //       status: "online",
  //       location: formData.location,
  //       rentalDate: formData.rentalDate,
  //       rentalDuration: formData.rentalDuration,
  //       customRentalDuration: formData.customRentalDuration,
  //       package: formData.package,
  //       companyName: formData.companyName,
  //       companyEmail: formData.companyEmail,
  //       companyPhone: formData.companyPhone,
  //       companyAddress: formData.companyAddress,
  //       timeStamp: serverTimestamp(),
  //     };
  
  //     // Simpan data desain ke Firestore
  //     await setDoc(doc(db, "desain", product.id), productData);
  
  //     // Tambahkan produk ke keranjang
  //     addToCart(product);
  
  //     // Data cart
  //     const cartData = {
  //       ...productData,
  //       userName: userProfile?.displayName || "Unknown User",
  //       userId: userProfile?.uid || "Unknown User",
  //       email: userProfile?.email || "Unknown Email",
  //     };
  
  //     // Simpan ke koleksi cart
  //     await setDoc(doc(db, "cart", product.id), cartData);
  
  //     // Simpan transaksi ke koleksi transactiondesainacc
  //     await addDoc(collection(db, "transactiondesainacc"), {
  //       ...productData,
  //       cartData,
  //       desainId: product.id,
  //     });
  
  //     alert("Product successfully added to desain, cart, and transactiondesainacc.");
  //     setFile(null);
  //   } catch (error) {
  //     console.error("Error adding product to collections: ", error);
  //   }
  // };
  
  // Dipanggil setelah handleSubmit berhasil
  const handleSubmitAndAddDesain = async (product, file) => {
    // await handleSubmit();  // Tunggu hingga handleSubmit selesai
    await handleAddDesain(product, file);  // Lanjutkan ke handleAddDesain
  };
  const [selectedProductId, setSelectedProductId] = useState(null);

  const toggleProductDetails = (productId) => {
    setSelectedProductId(selectedProductId === productId ? null : productId);
  };

  const handleImageClick = (product) => {
    setSelectedProduct(selectedProduct?.id === product.id ? null : product);
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 md:p-24 mt-10">
        <div className="flex justify-between mb-10">
          <h2 className="text-3xl mb-3">All Products</h2>
          {AssetNotification && (
            <div className="notification-3xl mb-3">Happy Hunting</div>
          )}
          <input
            type="text"
            className="input input-bordered"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => setCategoryFilter(e.target.value.toLowerCase())}
          >
            <option value={"all"}>All</option>
            <option value={"jakarta"}>Jakarta</option>
            <option value={"yogyakarta"}>Yogyakarta</option>
            <option value={"lampung"}>Lampung</option>
            <option value={"solo"}>Solo</option>
          </select>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6"> */}
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6 text-sm leading-tight">
          {filteredData.map((product) => (
            <CardItem
              key={product.id}
              imageUrl={product.image}
              fakultas={product.category}
              judul={product.title}
              deskripsi={product.description}
              harga={product.price}
              hargaJangkauan={product.priceJangkauan}
              jangkauan={product.jangkauan}
              statusCustome={product.statusCustome}
              statusProduct={product.statusProduct}
              addToCart={() => addToCart(product)}
              addToCartCustome={() => addToCartCustome(product)}
              removeFromCart={() => removeFromCart(product)}
              removeFromCartCustome={() => removeFromCartCustome(product)}
              isInCart={isInCart(product.id)}
              isInCartCustome={isInCartCustome(product.id)}
              addDesain={(file) => handleAddDesain(product, file)}
              // onClickImage={() => handleImageClick(product)}
              // addDesain={(file) => handleSubmitAndAddDesain(product, file)}  // Panggil kombinasi handleSubmit dan handleAddDesain

            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
