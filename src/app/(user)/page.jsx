// "use client";
// import CardItem from "@/components/CardItem";
// import DivisionItem from "@/components/DivisionItem";
// import Navbar from "@/components/Navbar";
// import Image from "next/image";
// import Footer from "@/components/Footer";
// import useAuth from "../hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();
//   const [userName, setUserName] = useState(""); // Inisialisasi state userName dengan nilai awal kosong
//   useEffect(() => {
//     if (user && userProfile.role === "admin") {
//       router.push("/admin");
//     }else if (user && userProfile.role === "user") {
//       // Jika user adalah admin, kita dapat menampilkan alert selamat datang
//       // dan menampilkan nama admin dari userProfile
//       alert("Selamat datang, " + userProfile.name);
//       setUserName(userProfile.name);
//     }
//   }, [user, userProfile, router]);
//   return (
//     <div>
//       <Navbar />
//       <div className="relative">
//         <Image
//           src={"/assets/BG1.jpg"}
//           width={3000 / 3}
//           height={2000 / 3}
//           className="relative w-full h-screen object-cover"
//           alt="Home Page"
//           priority
//         />
//         <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center flex flex-col gap-3 w-3/4 md:w-fit">
//           <h1 className="text-5xl font-extrabold text-orange-950">
//             UEU ASSETS
//           </h1>
//           <p className="text-xl">Choose Your Favorite ASSET</p>
//           <button className="bg-white p-4 rounded-lg font-bold text-xl">
//             RIZKI PRODUCTION
//           </button>
//         </div>
//       </div>
//       <div className="p-5 md:p-24">
//         <DivisionItem
//           title={"PRESIDENT DIRECTOR"}
//           description={
//             "bertanggung jawab secara penuh diamnco, membangun visi, misi, tujuan, serta program kerja diamnco, bertanggung jawab untuk memberikan arah perkembangan tujuan jangka pendek dan panjang, kebijakan, anggaran dan rencana operasional perusahaan dan mengawasi interpretasi yang konsisten dan penerapannya, serta rencana pencapaiannya, membangun tim sesuai rencana dan arah agency."
//           }
//           image1={"/assets/IconPD.jpeg"}
//           image2={"/assets/gilang.jpeg"}
//         />
//         <DivisionItem
//           title={"VICE PRESIDENT"}
//           description={
//             "membantu dalam pengambilan keputusan diamnco, membantu dan mengembangkan tim sesuai visi, misi, tujuan, serta arah agency yang telah di setujuin president director, bertanggung jawab atas operasional tim dan produksi terutama dibidang media entertainment, meningkatkan efisiensi dan produktivitas tim, menganalisa arah media entertainment agency."
//           }
//           image1={"/assets/IconVD.jpeg"}
//           image2={"/assets/bahtiar.jpeg"}
//           align="left"
//         />
//         <DivisionItem
//           title={"INFOMATION TECHNOLOGY"}
//           description={
//             "membangun sistem IT diamnco, mengerjakan setiap project IT, membangun portofolio IT, membangun branding diamnco."
//           }
//           image1={"/assets/IconIT.PNG"}
//           image2={"/assets/iki.jpg"}
//         />
//         <DivisionItem
//           title={"CONTENT CREATOR"}
//           description={
//             "memproduksi konten yang akan dipasarkan, menganalisa target pasar, membangun branding, menyusun strategi konten diamnco dan konsumen."
//           }
//           image1={"/assets/IconCC.PNG"}
//           image2={"/assets/henry.PNG"}
//           align="left"
//         />
//         <DivisionItem
//           title={"CREATIVE"}
//           description={
//             "menganalisa produk dan jasa apa yang perlu dihasilkan oleh diamnco, menentukan konsep produk dan jasa yang dihasilkan, menentukan script acara, mengerjakan project design graphic,"
//           }
//           image1={"/assets/IconDC.PNG"}
//           image2={"/assets/sila.PNG"}
//         />
//         <DivisionItem
//           title={"DIGITAL MARKETING"}
//           description={
//             "membangun kemitraan dengan pihak luar, menjaring konsumen potensial, membangun branding diamnco, meriset pasar sesuai target diamnco."
//           }
//           image1={"/assets/IconDM.PNG"}
//           image2={"/assets/najwa.PNG"}
//           align="left"
//         />
//         <div className="text-center my-10 ">
//           <h2 className="text-3xl mb-3">Our Products</h2>
//           <p>Product Offer from DIAM Production</p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//           <CardItem
//             judul={"DKV"}
//             deskripsi={"Desain Komunikasi Visual"}
//             imageUrl={"/assets/IconDM.PNG"}
//           />
//           <CardItem
//             judul={"FIKOM"}
//             deskripsi={"Fakultas Ilmu Komunikasi"}
//             imageUrl={"/assets/IconDM.PNG"}
//           />
//           <CardItem
//             judul={"FASILKOM"}
//             deskripsi={"Fakultas Ilmu Komputer"}
//             imageUrl={"/assets/IconDM.PNG"}
//           />
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }


// "use client";
// import CardItem from "@/components/CardItem";
// import Navbar from "@/components/Navbar";
// import Image from "next/image";
// import Footer from "@/components/Footer";
// import useAuth from "../hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import ProductInti from "./productinti/page";
// import { db } from "@/firebase/firebase";
// // Import Firebase Authentication
// import { getAuth } from "firebase/auth";

// import { collection, onSnapshot,    doc,
//   getDoc,
//   serverTimestamp,
//   setDoc,
//   updateDoc,} from "firebase/firestore";
// import useProduct from "@/app/hooks/useProduct";
// import CardItemTampilan from "@/components/CardItemTampilan";
// import useNavigation from "../hooks/useNavigation";

// export default function Home() {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [searchInput, setSearchInput] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [data, setData] = useState([]);
//   const [orderLocations, setOrderLocations] = useState([]);
//   const [newAssetNotification, setNewAssetNotification] = useState(false);
//   const [assetNotification, setAssetNotification] = useState(false);
//   const { isInCart, removeFromCart, addToCart } = useProduct();
//   const [userName, setUserName] = useState(""); // Inisialisasi state userName dengan nilai awal kosong
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showInput, setShowInput] = useState(true); // Initialize with true or false based on your need

// // Initialize Firebase Authentication
// const auth = getAuth();  // This gets the Firebase Auth instance

//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const { isLoading, setIsLoading } = useNavigation();
//   const [toastMessage, setToastMessage] = useState(null);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     // New order form fields
//     location: "",
//     rentalDate: "",
//     rentalDuration: "",
//     customRentalDuration: "",
//     package: "Full Package",
//     companyName: "",
//     companyEmail: "",
//     companyPhone: "",
//     companyAddress: "",
//     bankAccount: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevents the page from reloading

//     try {
//       // Mendapatkan data pengguna yang sedang login
//       const userProfile = auth.currentUser; // auth adalah instance dari Firebase Authentication
//       if (!userProfile) {
//         throw new Error("Pengguna belum login.");
//       }
  
//       console.log("User Profile:", userProfile); // Debugging: Check user profile data
  
//       const namaPembeli = userProfile.email || "Nama Tidak Diketahui"; // Menggunakan email atau displayName, atau default jika tidak tersedia
  
//       // Ambil data dari form (formData)
//       const userData = {
//         role: "user",
//         status: "online",
//         location: formData.location,
//         rentalDate: formData.rentalDate,
//         rentalDuration: formData.rentalDuration,
//         customRentalDuration: formData.customRentalDuration,
//         package: formData.package,
//         companyName: formData.companyName,
//         companyEmail: formData.companyEmail,
//         companyPhone: formData.companyPhone,
//         companyAddress: formData.companyAddress,
//         timeStamp: serverTimestamp(),
//       };
  
//       console.log("User Data:", userData); // Debugging: Check user data to be saved
  
//       // Menyimpan data pengguna ke Firestore collection 'users'
//       const userDocRef = doc(db, "users", userProfile.uid); // Menggunakan UID dari Firebase Auth untuk ID pengguna
//       await setDoc(userDocRef, userData);
  
//       console.log("Data pengguna berhasil disimpan:", userData);
  
//       // Optionally, update user status to 'online' if needed
//       await updateDoc(userDocRef, {
//         status: "online",
//       });
  
//       // If successful, redirect or show feedback
//       router.push("/product");
//       localStorage.setItem("userProfile", JSON.stringify(userData));
//     } catch (error) {
//       e.preventDefault(); // Prevents the page from reloading

//       console.error("Gagal menyimpan data pengguna:", error);
//       setToastMessage("Gagal menyimpan data pengguna: " + error.message); // If needed feedback error
//     }
//     setShowInput(false); // Sembunyikan input setelah menyimpan
//   };
  
  
  
//   const handleImageClick = (product) => {
//     setSelectedProduct(product);
//   };

//   useEffect(() => {
//     if (user && userProfile.role === "admin") {
//       router.push("/admin");
//     }else if (user && userProfile.role === "user") {
//       // Jika user adalah admin, kita dapat menampilkan alert selamat datang
//       // dan menampilkan nama admin dari userProfile
//       alert("Selamat datang, " + userProfile.name);
//       setUserName(userProfile.name);
//     }
//   }, [user, userProfile, router]);

//     // Fetch products from Firestore
//     // useEffect(() => {
//     //   const unsubProduct = onSnapshot(
//     //     collection(db, "products"),
//     //     (snapshot) => {
//     //       let productList = [];
//     //       snapshot.docs.forEach((doc) => {
//     //         productList.push({ id: doc.id, ...doc.data() });
//     //       });
//     //       setData(productList);
//     //     },
//     //     (error) => console.log(error)
//     //   );
//     //   return () => unsubProduct();
//     // }, []);

//      // Memuat data dari Firebase saat halaman dimuat
//   useEffect(() => {
//     const unsubProduct = onSnapshot(
//       collection(db, "products"),
//       (snapshot) => {
//         const productList = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setData(productList);
//         setFilteredData(productList); // Pastikan data awal ditampilkan
//       },
//       (error) => console.error("Error fetching products:", error)
//     );
//     return () => unsubProduct();
//   }, []);

//   // Filter data berdasarkan input pencarian
//   useEffect(() => {
//     const filtered = data.filter((product) =>
//       product.category.toLowerCase().includes(searchInput)
//     );
//     setFilteredData(filtered);
//     setCategoryFilter(searchInput);
//   }, [searchInput, data]);
  
//     // Fetch order locations from Firestore
//     useEffect(() => {
//       const unsubOrders = onSnapshot(
//         collection(db, "users"),
//         (snapshot) => {
//           let locations = [];
//           snapshot.docs.forEach((doc) => {
//             const location = doc.data().companyAddress;
//             if (location) locations.push(location);
//           });
//           setOrderLocations(locations);
//         },
//         (error) => console.log(error)
//       );
//       return () => unsubOrders();
//     }, []);
  
//     // Filter products based on category and order locations
//     // const filteredData = data.filter((product) => {
//     //   const productCategory = product.category.toLowerCase().trim();
//     //   const locationMatch = orderLocations.some(
//     //     (location) => location.toLowerCase().trim() === productCategory
//     //   );
  
//     //   if (categoryFilter === "all") {
//     //     return locationMatch; // Show products that match any order location
//     //   }
      
//     //   return productCategory === categoryFilter;
//     // });
  
//     // Debug filtered results
//     console.log("Filtered Products:", filteredData);
  
//     const handleSearchInputChange = (e) => {
//       setSearchInput(e.target.value.toLowerCase());
//     };
  
//     useEffect(() => {
//       const selectElement = document.querySelector(".select");
//       selectElement.childNodes.forEach((option) => {
//         if (option.value.toLowerCase().includes(searchInput)) {
//           option.selected = true;
//         }
//       });
//       setCategoryFilter(searchInput);
//     }, [searchInput]);
  
//     useEffect(() => {
//       const notificationTimeout = setTimeout(() => {
//         setNewAssetNotification(false);
//       }, 5000);
//       return () => clearTimeout(notificationTimeout);
//     }, [newAssetNotification]);
  
//     useEffect(() => {
//       const notificationTimeout = setTimeout(() => {
//         setAssetNotification(false);
//       }, 5000);
//       return () => clearTimeout(notificationTimeout);
//     }, [assetNotification]);
//   // return (
//   //   <div>
//   //     <Navbar />
//   //     <div className="relative">
//   //       <Image
//   //         src={"/assets/BG1.jpg"}
//   //         width={3000 / 3}
//   //         height={2000 / 3}
//   //         className="relative w-full h-screen object-cover"
//   //         alt="Home Page"
//   //         priority
//   //       />
//   //       <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center flex flex-col gap-3 w-3/4 md:w-fit">
//   //         <h1 className="text-5xl font-extrabold text-orange-950">
//   //           BALEHO
//   //         </h1>
//   //         <p className="text-xl">Choose the product according to your wishes</p>
//   //         <button className="bg-white p-4 rounded-lg font-bold text-xl">
//   //           R +
//   //         </button>
//   //       </div>
//   //     </div>
//   //     <div className="p-5 md:p-24">
//   //       <div className="text-center my-10 ">
//   //         <h2 className="text-3xl mb-3">Our Products</h2>
//   //         <p>Product Offer from DIAM Production</p>
//   //       </div>
//   //       {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//   //         <CardItem
//   //           judul={"DKV"}
//   //           deskripsi={"Desain Komunikasi Visual"}
//   //           imageUrl={"/assets/IconDM.PNG"}
//   //         />
//   //         <CardItem
//   //           judul={"FIKOM"}
//   //           deskripsi={"Fakultas Ilmu Komunikasi"}
//   //           imageUrl={"/assets/IconDM.PNG"}
//   //         />
//   //         <CardItem
//   //           judul={"FASILKOM"}
//   //           deskripsi={"Fakultas Ilmu Komputer"}
//   //           imageUrl={"/assets/IconDM.PNG"}
//   //         />
//   //       </div> */}
//   //               <div className="flex justify-between mb-10">
//   //         <h2 className="text-3xl mb-3">All Products</h2>
//   //         {assetNotification && (
//   //           <div className="notification-3xl mb-3">
//   //             Happy Hunting
//   //           </div>
//   //         )}
//   //         <input
//   //           type="text"
//   //           className="input input-bordered"
//   //           value={searchInput}
//   //           onChange={handleSearchInputChange}
//   //         />
//   //         <select
//   //           className="select select-bordered w-full max-w-xs"
//   //           onChange={(e) => setCategoryFilter(e.target.value.toLowerCase())}
//   //         >
//   //           <option value={"all"}>All</option>
//   //           <option value={"fikom"}>Fikom</option>
//   //           <option value={"dkv"}>DKV</option>
//   //           <option value={"fasilkom"}>Fasilkom</option>
//   //           <option value={"baleho 1"}>Baleho</option>
//   //           <option value={"baleho 2"}>Baleho</option>
//   //           <option value={"baleho 3"}>Baleho</option>
//   //           <option value={"baleho 4"}>Baleho</option>
//   //           <option value={"baleho 5"}>Baleho</option>
//   //           <option value={"baleho 6"}>Baleho</option>
//   //           <option value={"baleho 7"}>Baleho</option>
//   //           <option value={"baleho 8"}>Baleho</option>
//   //           <option value={"baleho 9"}>Baleho</option>
//   //           <option value={"baleho 10"}>Baleho</option>
//   //         </select>
//   //       </div>
//   //       <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
//   //         {filteredData.map((product) => (
//   //           <CardItem
//   //             key={product.id}
//   //             imageUrl={product.image}
//   //             fakultas={product.category}
//   //             judul={product.title}
//   //             deskripsi={product.description}
//   //             harga={product.price}
//   //             addToCart={() => addToCart(product)}
//   //             addToMutasi={() => addToMutasi(product)}
//   //             removeFromCart={() => removeFromCart(product)}
//   //             isInCart={isInCart(product.id)}
//   //           />
//   //         ))}
//   //       </div>        
//   //     </div>
//   //     <Footer />
//   //   </div>
//   // );

//   return (
//     <>
//     <Navbar/>
//     <div>
//       {/* <Navbar /> */}
//       {/* <div className="relative  mt-[300px]">
//         <Image
//           src={"/assets/BG1.jpg"}
//           width={3000 / 3}
//           height={2000 / 3}
//           className="relative w-full h-screen object-cover"
//           alt="Home Page"
//           priority
//         />
//         <div className="absolute  left-1/2 -translate-x-1/2 text-center flex flex-col gap-3 w-3/4 md:w-fit">
//           <h1 className="text-5xl font-extrabold text-orange-950">
//             BALEHO
//           </h1>
//           <p className="text-xl">Choose the product according to your wishes</p>
//           <button className="bg-white p-4 rounded-lg font-bold text-xl">
//             R +
//           </button>
//         </div>
//       </div> */}
//       <div className="p-5 md:p-24">
//         <div className="absolute mt-[50px] mb-[10px] left-1/2 -translate-x-1/2 text-center flex flex-col gap-3 w-3/4 md:w-fit">
//           <h1 className="text-5xl font-extrabold text-orange-950">
//             BALEHO
//           </h1>
//           <p className="text-xl">Choose the product according to your wishes</p>
//           <button className="bg-white p-4 rounded-lg font-bold text-xl">
//             R +
//           </button>
//         </div>
//         <div className="text-center  mt-[240px] mb-[10px]">
//           <h2 className="text-3xl mb-3">Our Products</h2>
//           <p>Product Offer from PT TECMA Production</p>
//         </div>
        
//         <div className="flex justify-between mb-10">
//           <h2 className="text-3xl mb-3">Product</h2>
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
//             {/* Tambahkan opsi lain sesuai kebutuhan */}
//           </select>
//         </div>
        
//         {/* Loader sederhana untuk menunggu data */}
//         {/* {data.length === 0 ? (
//           <p>Loading products...</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
//             {filteredData.map((product) => (
//               <CardItemTampilan
//                 key={product.id}
//                 imageUrl={product.image}
//                 fakultas={product.category}
//                 judul={product.title}
//                 deskripsi={product.description}
//                 harga={product.price}
//                 // addToCart={() => addToCart(product)}
//                 // addToMutasi={() => addToMutasi(product)}
//                 // removeFromCart={() => removeFromCart(product)}
//                 // isInCart={isInCart(product.id)}
//               />
//             ))}
//           </div>
//         )} */}

// {data.length === 0 ? (
//         <p>Loading products...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
//           {filteredData.map((product) => (
//             <div key={product.id}>
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="cursor-pointer"
//                 onClick={() => handleImageClick(product)}
//               />
//               {/* Hanya tampilkan detail jika produk ini yang diklik */}
//               {selectedProduct && selectedProduct.id === product.id && (
//                 <div className="p-4 border rounded-lg shadow-md mt-4">
//                   <h2 className="text-xl font-bold">{product.title}</h2>
//                   <p className="text-gray-700">Category: {product.category}</p>
//                   <p className="text-gray-600">{product.description}</p>
//                   <p className="text-orange-500 font-bold">
//                     Price: Rp{product.price}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}


// <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
// <h3 className="text-xl font-semibold mb-4 max-w-lg mx-auto">Order Form</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Location</label>
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
//             placeholder="Enter location"
//           />
//         </div>

//         {/* <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Rental Date</label>
//           <input
//             type="date"
//             name="rentalDate"
//             value={formData.rentalDate}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Rental Duration</label>
//           <select
//             name="rentalDuration"
//             value={formData.rentalDuration}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
//           >
//             <option value="">Select duration</option>
//             <option value="3 bulan">3 Month</option>
//             <option value="6 bulan">6 Month</option>
//             <option value="12 bulan">12 Month</option>
//             <option value="Custom">Custom</option>
//           </select>
//         </div> */}

//         {formData.rentalDuration === 'Custom' && (
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Custom Rental Duration</label>
//             <input
//               type="text"
//               name="customRentalDuration"
//               value={formData.customRentalDuration}
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
//               placeholder="Enter custom duration"
//             />
//           </div>
//         )}

//         {/* <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Package</label>
//           <select
//             name="package"
//             value={formData.package}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
//           >
//             <option value="Full Package">Full Package</option>
//             <option value="Standard Package">Standard Package</option>
//           </select>
//         </div> */}

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Company Name</label>
//           <input
//             type="text"
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
//             placeholder="Enter company name"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Company Email</label>
//           <input
//             type="email"
//             name="companyEmail"
//             value={formData.companyEmail}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
//             placeholder="Enter company email"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Company Phone</label>
//           <input
//             type="text"
//             name="companyPhone"
//             value={formData.companyPhone}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
//             placeholder="Enter company phone number"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Company Address</label>
//           <input
//             type="text"
//             name="companyAddress"
//             value={formData.companyAddress}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
//             placeholder="Enter company address"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`w-full bg-blue-600 text-white p-2 rounded-md ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//         >
//           {isLoading ? "Loading..." : "Submit"}
//         </button>
//       </form>
//     </div>
//       </div>
//       <Footer />
//     </div>
//     </>
//   );
  
// }






"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { getAuth } from "firebase/auth";

import { collection, onSnapshot, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import useProduct from "@/app/hooks/useProduct";
import useNavigation from "../hooks/useNavigation";

export default function Home() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [orderLocations, setOrderLocations] = useState([]);
  const [newAssetNotification, setNewAssetNotification] = useState(false);
  const [assetNotification, setAssetNotification] = useState(false);
  const { isInCart, removeFromCart, addToCart } = useProduct();
  const [userName, setUserName] = useState(""); // Inisialisasi state userName dengan nilai awal kosong
  const [showInput, setShowInput] = useState(true); // Initialize with true or false based on your need

  // Initialize Firebase Authentication
  const auth = getAuth();  // This gets the Firebase Auth instance

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, setIsLoading } = useNavigation();
  const [toastMessage, setToastMessage] = useState(null);
  const [formData, setFormData] = useState({
    // fullName: "",
    // email: "",
    // password: "",
    // confirmPassword: "",
    // New order form fields
    location: "",
    rentalDate: "",
    rentalDuration: "",
    customRentalDuration: "",
    package: "Full Package",
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyAddress: "",
    bankAccount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
//JANGAN DIHAPUS
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading

    try {
      // Mendapatkan data pengguna yang sedang login
      const userProfile = auth.currentUser; // auth adalah instance dari Firebase Authentication
      if (!userProfile) {
        throw new Error("Pengguna belum login.");
      }
  
      console.log("User Profile:", userProfile); // Debugging: Check user profile data
  
      const namaPembeli = userProfile.email || "Nama Tidak Diketahui"; // Menggunakan email atau displayName, atau default jika tidak tersedia
//JANGAN DIHAPUS  
      // // Ambil data dari form (formData)
      // const userData = {
      //   role: "user",
      //   status: "online",
      //   location: formData.location,
      //   rentalDate: formData.rentalDate,
      //   rentalDuration: formData.rentalDuration,
      //   customRentalDuration: formData.customRentalDuration,
      //   package: formData.package,
      //   companyName: formData.companyName,
      //   companyEmail: formData.companyEmail,
      //   companyPhone: formData.companyPhone,
      //   companyAddress: formData.companyAddress,
      //   timeStamp: serverTimestamp(),
      // };

const userName = userProfile?.displayName || userProfile?.email; 

const userData = {
  role: "user",
  status: "online",
  userName, // Biarkan undefined jika belum tersedia
  location: formData.location,
  rentalDate: formData.rentalDate,
  rentalDuration: formData.rentalDuration,
  customRentalDuration: formData.customRentalDuration,
  package: formData.package,
  companyName: formData.companyName,
  companyEmail: formData.companyEmail,
  companyPhone: formData.companyPhone,
  companyAddress: formData.companyAddress,
  timeStamp: serverTimestamp(),
};




  
      console.log("User Data:", userData); // Debugging: Check user data to be saved
  
      // Menyimpan data pengguna ke Firestore collection 'users'
      const userDocRef = doc(db, "users", userProfile.uid); // Menggunakan UID dari Firebase Auth untuk ID pengguna
      await setDoc(userDocRef, userData, { merge: true }); // << Tambahkan merge: true     
      // await setDoc(userDocRef, userData);
  
      console.log("Data pengguna berhasil disimpan:", userData);
  
      // Optionally, update user status to 'online' if needed
      await updateDoc(userDocRef, {
        status: "online",
      });
  
      // // If successful, redirect or show feedback
      // router.push("/product");
      alert("SUCCES FORM")
      localStorage.setItem("userProfile", JSON.stringify(userData));
    } catch (error) {
      e.preventDefault(); // Prevents the page from reloading

      console.error("Gagal menyimpan data pengguna:", error);
      setToastMessage("Gagal menyimpan data pengguna: " + error.message); // If needed feedback error
    }
    setShowInput(false); // Sembunyikan input setelah menyimpan
  };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // Mencegah reload halaman
  
  //   try {
  //     // Mendapatkan data pengguna yang login
  //     const userProfile = auth.currentUser;
  //     if (!userProfile) {
  //       throw new Error("Pengguna belum login.");
  //     }
  
  //     const namaPembeli = userProfile.email || "Nama Tidak Diketahui";
  
  //     // Ambil data dari form (formData)
  //     const userData = {
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
  
  //     // Menyimpan data pengguna ke Firestore
  //     const userDocRef = doc(db, "users", userProfile.uid);
  //     await setDoc(userDocRef, userData);
  
  //     // Set user online
  //     await updateDoc(userDocRef, { status: "online" });
  
  //     // Simpan data di localStorage
  //     localStorage.setItem("userProfile", JSON.stringify(userData));
  
  //     alert("SUCCES FORM");
  //   } catch (error) {
  //     console.error("Gagal menyimpan data pengguna:", error);
  //     setToastMessage("Gagal menyimpan data pengguna: " + error.message);
  //   }
    
  //   // Sembunyikan input setelah submit
  //   setShowInput(false);
  // };


  useEffect(() => {
    if (user && userProfile?.role === "admin") {
      router.push("/admin");
    } else if (user && userProfile?.role === "user") {
      const displayName = userProfile?.name || userProfile?.email || "Pelanggan";
      alert(`Selamat datang, ${displayName}`);
      setUserName(displayName);
    }
  }, [user, userProfile, router]);

  // Memuat data dari Firebase saat halaman dimuat
  useEffect(() => {
    const unsubProduct = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(productList);
        setFilteredData(productList); // Pastikan data awal ditampilkan
      },
      (error) => console.error("Error fetching products:", error)
    );
    return () => unsubProduct();
  }, []);

  // Filter data berdasarkan input pencarian
  useEffect(() => {
    const filtered = data.filter((product) =>
      (product.category || "").toLowerCase().includes(searchInput)
    );
    setFilteredData(filtered);
    setCategoryFilter(searchInput);
  }, [searchInput, data]);

  // Fetch order locations from Firestore
  useEffect(() => {
    const unsubOrders = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        let locations = [];
        snapshot.docs.forEach((doc) => {
          const location = doc.data().companyAddress;
          if (location) locations.push(location);
        });
        setOrderLocations(locations);
      },
      (error) => console.log(error)
    );
    return () => unsubOrders();
  }, []);
  
  // Debug filtered results
  console.log("Filtered Products:", filteredData);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const selectElement = document.querySelector(".select");
    if (selectElement) {
      selectElement.childNodes.forEach((option) => {
        if (option.value.toLowerCase().includes(searchInput)) {
          option.selected = true;
        }
      });
    }
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
  }, [assetNotification]);

  return (
    <>
      <Navbar />
      <div>
        <div className="p-5 md:p-24">
          <div className="absolute mt-[50px] mb-[10px] left-1/2 -translate-x-1/2 text-center flex flex-col gap-3 w-3/4 md:w-fit">
            <h1 className="text-5xl font-extrabold text-orange-950">
              BALEHO
            </h1>
            <p className="text-xl">Choose the product according to your wishes</p>
            <button className="bg-white p-4 rounded-lg font-bold text-xl">
              R +
            </button>
          </div>
          <div className="text-center  mt-[240px] mb-[10px]">
            <h2 className="text-3xl mb-3">Our Products</h2>
            <p>Product Offer from PT TECMA Production</p>
          </div>
          
          <div className="flex justify-between mb-10">
            <h2 className="text-3xl mb-3">Product</h2>
            {assetNotification && (
              <div className="notification-3xl mb-3">
                Happy Hunting
              </div>
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
              {/* Tambahkan opsi lain sesuai kebutuhan */}
            </select>
          </div>

          {data.length === 0 ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
              {filteredData.map((product, index) => (
                <div key={`product-${product.id || index}-${index}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full object-cover"
                  />
                  <div className="p-4 border rounded-lg shadow-md mt-4 bg-white">
                    <h2 className="text-xl font-bold">{product.title}</h2>
                    <p className="text-gray-700">Category: {product.category}</p>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-orange-500 font-bold">
                      Price: Rp{product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tampilkan Form Pemesanan jika user sudah login */}
          {user ? (
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 max-w-lg mx-auto">Order Form</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter location"
                  />
                </div>

                {formData.rentalDuration === 'Custom' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Custom Rental Duration</label>
                    <input
                      type="text"
                      name="customRentalDuration"
                      value={formData.customRentalDuration}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                      placeholder="Enter custom duration"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter company name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Company Email</label>
                  <input
                    type="email"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter company email"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Company Phone</label>
                  <input
                    type="text"
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter company phone number"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Company Address</label>
                  <input
                    type="text"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter company address"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-blue-600 text-white p-2 rounded-md ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </form>
            </div>
          ) : (
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
              <p>Please log in to place an order.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    
  </>
  );
}
