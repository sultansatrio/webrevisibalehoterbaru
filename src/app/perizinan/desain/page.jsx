"use client";
import useAuth from "@/app/hooks/useAuth";
import useProduct from "@/app/hooks/useProduct";
import CardItem from "@/components/CardItem";
import CardItem2 from "@/components/CardItem2";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NavbarAdmin from "@/components/NavbarAdmin";
import { db } from "@/firebase/firebase";
// import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// const Product = () => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();

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

//   const { isInCart, removeFromCart, addToCart, data, setData } = useProduct();
//   return (
//     <div>
//       <Navbar />
//       <div className="p-8 md:p-24 mt-10">
//         <div className="flex justify-between mb-10">
//           <h2 className="text-3xl mb-3">All Products</h2>
//           <input type="text" className="input input-bordered" />
//           <select className="select select-bordered w-full max-w-xs">
//             <option value={"all"}>All</option>
//             <option value={"fikom"}>Fikom</option>
//             <option value={"dkv"}>DKV</option>
//             <option value={"Fasilkom"}>Fasilkom</option>
//           </select>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
//           {data.map((product) => (
//             <CardItem
//               key={product.id}
//               imageUrl={product.image}
//               fakultas={product.category}
//               judul={product.title}
//               deskripsi={product.description}
//               harga={product.price}
//               addToCart={() => addToCart(product)}
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

//PEMBARUAN DENGAN MENAMBAHKAN FUNGSI SELECT OPTION
// const Product = () => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();
//   const [categoryFilter, setCategoryFilter] = useState("all"); // State untuk menyimpan kategori filter
//   const { isInCart, removeFromCart, addToCart, data, setData } = useProduct();

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
//         setData(list);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//     return () => {
//       unsubProduct();
//     };
//   }, [setData]);

//   // Menyaring produk berdasarkan kategori yang dipilih
//   const filteredData =
//     data && categoryFilter === "all"
//       ? data
//       : data.filter(
//           (product) => product.category.toLowerCase() === categoryFilter
//         );

//   return (
//     <div>
//       <Navbar />
//       <div className="p-8 md:p-24 mt-10">
//         <div className="flex justify-between mb-10">
//           <h2 className="text-3xl mb-3">All Products</h2>
//           {/* <input type="text" className="input input-bordered" /> */}
//           <input
//             type="text"
//             className="input input-bordered"
//             onChange={(e) => {
//               const inputValue = e.target.value.toLowerCase();
//               const selectElement = document.querySelector(".select");

//               // Melakukan perulangan pada setiap opsi dropdown
//               selectElement.childNodes.forEach((option) => {
//                 if (option.value.toLowerCase().includes(inputValue)) {
//                   // Jika nilai opsi cocok dengan input pengguna, opsi tersebut akan dipilih
//                   option.selected = true;
//                 }
//               });

//               // Memperbarui state kategori filter sesuai dengan input pengguna
//               setCategoryFilter(inputValue);
//             }}
//           />

//           <select
//             className="select select-bordered w-full max-w-xs"
//             onChange={(e) => setCategoryFilter(e.target.value.toLowerCase())} // Mengubah state kategori filter berdasarkan pilihan
//           >
//             <option value={"all"}>All</option>
//             <option value={"fikom"}>Fikom</option>
//             <option value={"dkv"}>DKV</option>
//             <option value={"fasilkom"}>Fasilkom</option>
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

//MENAMBAHKAN CODE UNTUK INPUT SETSEACRH SESUAI DENGAN OPTION APABILA USER MENGETIK
// const Product = () => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();
//   const [categoryFilter, setCategoryFilter] = useState("all"); // State untuk menyimpan kategori filter
//   const [searchInput, setSearchInput] = useState(""); // State untuk menyimpan input pencarian
//   const { isInCart, removeFromCart, addToCart, data, setData } = useProduct();

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
//         setData(list);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//     return () => {
//       unsubProduct();
//     };
//   }, [setData]);

//   // Menyaring produk berdasarkan kategori yang dipilih
//   const filteredData =
//     data && categoryFilter === "all"
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
//     const selectElement = document.querySelector('.select');

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

//   return (
//     <div>
//       <Navbar />
//       <div className="p-8 md:p-24 mt-10">
//         <div className="flex justify-between mb-10">
//           <h2 className="text-3xl mb-3">All Products</h2>
//           <input
//             type="text"
//             className="input input-bordered"
//             value={searchInput}
//             onChange={handleSearchInputChange}
//           />
//           <select
//             className="select select-bordered w-full max-w-xs"
//             onChange={(e) =>
//               setCategoryFilter(e.target.value.toLowerCase())
//             } // Mengubah state kategori filter berdasarkan pilihan
//           >
//             <option value={"all"}>All</option>
//             <option value={"fikom"}>Fikom</option>
//             <option value={"dkv"}>DKV</option>
//             <option value={"fasilkom"}>Fasilkom</option>
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

// import { useRouter } from "next/router";
// import { db } from "@/firebase/firebase";

//update tgl 1 januari 2025
// const Desain = () => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [searchInput, setSearchInput] = useState("");
//   const [data, setData] = useState([]);
//   const [newAssetNotification, setNewAssetNotification] = useState(false);
//   const [AssetNotification, setAssetNotification] = useState(false);
//   const { isInCart, removeFromCart, addToCart } = useProduct();

//   useEffect(() => {
//     if (user && userProfile.role === "user") {
//       router.push("/");
//     }
//   }, [user, userProfile, router]);

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
//       collection(db, "desain"),
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
//       <NavbarAdmin />
//       <div className="p-8 md:p-24 mt-10">
//         <div className="flex justify-between mb-10">
//           <h2 className="text-3xl mb-3">All Desain</h2>
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
//             <option value={"solo"}>Solo</option>
//             <option value={"yogyakarta"}>Yogyakarta</option>
//             <option value={"klaten"}>Klaten</option>
//             <option value={"lampung"}>Lampung</option>
//           </select>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
//           {filteredData.map((product) => (
//             // <CardItem
//             //   key={product.id}
//             //   imageUrl={product.image}
//             //   fakultas={product.category}
//             //   judul={product.title}
//             //   deskripsi={product.description}
//             //   harga={product.price}
//             // //   addToCart={() => addToCart(product)}
//             //   removeFromCart={() => removeFromCart(product)}
//             //   isInCart={isInCart(product.id)}
//             // />
//             <CardItem2
//                 key={product.id}
//                imageUrl={product.image}
//                fakultas={product.category}
//                judul={product.title}
//                deskripsi={product.description}
//                harga={product.price}
//             />
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Desain;




import { doc, updateDoc, collection, onSnapshot } from "firebase/firestore";
import NavbarPerizinan from "@/components/NavbarPerizinan";
// import Footer from "@/components/Footer";
// import { useState, useEffect } from "react";
// import { db } from "@/firebase/firebase";
// import { useRouter } from "next/navigation";
// import useAuth from "@/hooks/useAuth";
// import useProduct from "@/hooks/useProduct";
// import CardItem2 from "@/components/CardItem2";

const Desain = () => {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [cartData, setCartData] = useState([]); // State untuk data dari cartMutasiCustome2
  const [newAssetNotification, setNewAssetNotification] = useState(false);
  const [AssetNotification, setAssetNotification] = useState(false);
  const { isInCart, removeFromCart, addToCart } = useProduct();

  useEffect(() => {
    if (user && userProfile.role === "user") {
      router.push("/");
    }
  }, [user, userProfile, router]);

  // Mengambil data dari koleksi desain
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

  // Mengambil data dari koleksi cartMutasiCustome2
  useEffect(() => {
    const unsubCart = onSnapshot(
      collection(db, "cartMutasiCustome2"),
      (snapshot) => {
        let cartList = [];
        snapshot.docs.forEach((doc) => {
          cartList.push({ id: doc.id, ...doc.data() });
        });
        setCartData(cartList);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsubCart();
    };
  }, []);

  const handleAccDesign = async (id) => {
    try {
      const desainDoc = doc(db, "desain", id);
      await updateDoc(desainDoc, {
        statusDesain: "Desain Telah Disetujui Admin",
      });
      alert("Desain Telah Disetujui Admin!");
    } catch (error) {
      console.error("Gagal menyetujui desain:", error);
    }
  };

  const handleAccDesignCustomeCart = async (id) => {
    try {
      const desainDoc = doc(db, "cartMutasiCustome2", id);
      await updateDoc(desainDoc, {
        statusDesain: "Di Acc Admin Silahkan Memasukkan ke Keranjang",
      });
      alert("Desain Telah Disetujui Perizinan!");
    } catch (error) {
      console.error("Gagal menyetujui desain:", error);
    }
  };

  

  const handleDeclineDesign = async (id) => {
    try {
      const desainDoc = doc(db, "desain", id);
      await updateDoc(desainDoc, {
        statusDesain: "Desain Tidak Disetujui Admin",
      });
      alert("Desain Tidak Disetujui Admin!");
    } catch (error) {
      console.error("Gagal menolak desain:", error);
    }
  };

  const handleDeclineDesignCustomeCart = async (id) => {
    try {
      const desainDoc = doc(db, "cartMutasiCustome2", id);
      await updateDoc(desainDoc, {
        statusDesain: "Di Acc Admin Silahkan Memasukkan ke Keranjang",
      });
      alert("Desain Tidak Disetujui Perizinan!");
    } catch (error) {
      console.error("Gagal menolak desain:", error);
    }
  };

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

  return (
    <div>
      <NavbarPerizinan />
      <div className="p-8 md:p-24 mt-10">
        <div className="flex justify-between mb-10">
          <h2 className="text-3xl mb-3">All Desain</h2>
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
            <option value={"solo"}>Solo</option>
            <option value={"yogyakarta"}>Yogyakarta</option>
            <option value={"klaten"}>Klaten</option>
            <option value={"lampung"}>Lampung</option>
          </select>
        </div>

        {/* Menampilkan Data Desain */}
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
          {filteredData.map((product) => (
            <div key={product.id} className="card">
              <CardItem2
                userName={product.userName}
                imageUrl={product.imageUrl}
                statusDesain={product.statusDesain}
                fakultas={product.category}
                judul={product.title}
                deskripsi={product.description}
                harga={product.price}
              />
              <div className="flex gap-4 mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => handleAccDesign(product.id)}
                >
                  Acc Design
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => handleDeclineDesign(product.id)}
                >
                  Decline Design
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Menampilkan Data CartMutasiCustome2 */}
        <h1 className="text-3xl font-semibold mt-16">Desain Custome Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6 mt-6">
          {cartData.map((cartItem) => (
            <div key={cartItem.id} className="card">
              <CardItem2
                userName={cartItem.namaPembeli}
                imageUrl={cartItem.imageUrl}
                statusDesain={cartItem.statusCustome}
                fakultas={cartItem.fakultas}
                judul={cartItem.judul}
                deskripsi={cartItem.deskripsi}
                harga={cartItem.harga}
              />
              <div className="flex gap-4 mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => handleAccDesignCustomeCart(cartItem.id)}
                >
                  Acc Design
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => handleDeclineDesignCustomeCart(cartItem.id)}
                >
                  Decline Design
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Desain;
