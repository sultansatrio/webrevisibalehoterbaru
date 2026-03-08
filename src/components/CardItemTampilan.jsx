import { numberToRupiah } from "@/utils/rupiah";
import React, { useState, useEffect } from "react";
import useAuth from "../app/hooks/useAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore functions

const CardItemTampilan = ({
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
}) => {
  const [showInput, setShowInput] = useState(false); // State untuk mengontrol tampilan input
  const [jangkauanCustome, setJangkauanCustome] = useState(""); // State untuk menyimpan jangkauan sewa
  const [namaPembeli, setNamaPembeli] = useState('');
  const [statusPermintaan, setStatusPermintaan] = useState(statusCustome); // State untuk menyimpan statusCustome yang terupdate
  const [startDate, setStartDate] = useState('');
  const [customTimestamp, setCustomTimestamp] = useState(null); // Ganti nama state menjadi customTimestamp
  const [cartTimestamp, setCartTimestamp] = useState(null); // Ganti nama state menjadi customTimestamp
 
  const auth = getAuth();

  const [endDate, setEndDate] = useState("");

  const db = getFirestore(); // Initialize Firestore


  // useEffect(() => {
  //   const auth = getAuth();
  //   const unsubscribe = onAuthStateChanged(auth, (userName) => {
  //     if (userName) {
  //       // Periksa apakah user memiliki displayName
  //       setNamaPembeli(user.userName || "Pengguna Tanpa Nama");
  //     } else {
  //       setNamaPembeli(""); // Tidak ada user yang login
  //     }
  //   });
  
  //   // Cleanup listener saat komponen di-unmount
  //   return () => unsubscribe();
  // }, []);

  // Fungsi untuk mengambil data dari Firestore
  const fetchData = async () => {
    try {
      const docRef = doc(db, "cartMutasiCustome2", judul); // Gunakan documentID yang dinamis
      const docSnap = await getDoc(docRef);

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

  
  // useEffect(() => {
  //   if (judul && typeof judul === "string" && judul.trim() !== "") {
  //     fetchData();  // Panggil fetchData jika judul valid
  //   } else {
  //     console.log("ID dokumen (judul) tidak valid.");
  //   }
  // }, [judul]);
  

  // useEffect(() => {
  //   fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
  // }, []);

  const handleToggleInput = () => {
    setShowInput(!showInput);
  };

  const handleInputChange = (e) => {
    setJangkauanCustome(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // const handleSaveJangkauan = async () => {
  //   try {
  //     const parsedJangkauan = parseFloat(jangkauanCustome);
  //     const parsedHargaJangkauan = parseFloat(hargaJangkauan);

  //     if (isNaN(parsedJangkauan) || isNaN(parsedHargaJangkauan)) {
  //       throw new Error("jangkauan atau hargaJangkauan bukan angka yang valid.");
  //     }

  //     const harga = parsedJangkauan * parsedHargaJangkauan;

  //     const docRef = doc(db, "jangkauanCustomSewa", judul);
  //     await setDoc(docRef, {
  //       jangkauanCustome: parsedJangkauan,
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
  //   } catch (error) {
  //     console.error("Gagal menyimpan deskripsi jangkauan sewa:", error);
  //   }
  //   setShowInput(false); // Sembunyikan input setelah menyimpan
  // };


//   const handleSaveJangkauan = async () => {
//     try {
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
// };


const handleSaveJangkauan = async () => {
  try {
    // Mendapatkan data pengguna yang sedang login
    const userProfile = auth.currentUser; // auth adalah instance dari Firebase Authentication
    // const { user, userProfile } = useAuth();
    if (!userProfile) {
      throw new Error("Pengguna belum login.");
    }

    const namaPembeli = userProfile.email || "Nama Tidak Diketahui"; // Menggunakan displayName atau email, atau default jika tidak tersedia

    const parsedJangkauan = parseFloat(jangkauanCustome);
    const parsedHargaJangkauan = parseFloat(hargaJangkauan);

    if (isNaN(parsedJangkauan) || isNaN(parsedHargaJangkauan)) {
      throw new Error("jangkauan atau hargaJangkauan bukan angka yang valid.");
    }

    const harga = parsedJangkauan * parsedHargaJangkauan;

    // Save data to jangkauanCustomSewa collection
    const docRef = doc(db, "jangkauanCustomSewa", judul);
    await setDoc(docRef, {
      jangkauanCustome: parsedJangkauan,
      namaPembeli,
      startDate,
      endDate,
      imageUrl,
      judul,
      deskripsi,
      statusCustome,
      harga,
      hargaJangkauan: parsedHargaJangkauan,
      fakultas,
      timestamp: serverTimestamp(), // Menambahkan timestamp
    });
    console.log("Deskripsi Jangkauan Sewa berhasil disimpan:", {
      jangkauanCustome: parsedJangkauan,
      namaPembeli,
      startDate,
      endDate,
      imageUrl,
      judul,
      deskripsi,
      statusCustome,
      harga,
      hargaJangkauan: parsedHargaJangkauan,
      fakultas,
    });

    // Save data to cartMutasiCustome2 collection
    const cartDocRef = doc(db, "cartMutasiCustome2", judul);
    await setDoc(cartDocRef, {
      jangkauanCustome: parsedJangkauan,
      namaPembeli,
      startDate,
      endDate,
      imageUrl,
      judul,
      deskripsi,
      statusCustome,
      harga,
      hargaJangkauan: parsedHargaJangkauan,
      fakultas,
      timestamp: serverTimestamp(), // Menambahkan timestamp
    });
    console.log("Data berhasil disimpan di cartMutasiCustome2");
  } catch (error) {
    console.error("Gagal menyimpan deskripsi jangkauan sewa:", error);
  }
  setShowInput(false); // Sembunyikan input setelah menyimpan
};

  return (
    <div className="w-full rounded overflow-hidden shadow-lg">
      <img className="w-full h-44 object-cover" src={imageUrl} alt={judul} />
      <div className="px-6 py-3">
        {fakultas && (
          <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
            {fakultas}
          </p>
        )}
        <div className=" text-xl mb-2">{judul}</div>
        <p className="text-gray-700 text-base">{deskripsi}</p>
        <br />
        <p>Harga Sebulan</p>
        {hargaJangkauan && (
          <p className="text-red-600 text-base mt-2">{numberToRupiah(hargaJangkauan)}</p>
        )}
        <br />
        <p>Massa Sewa</p>
        {jangkauan && (
          <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
            {jangkauan}
          </p>
        )}
        <br />
        {harga && (
          <p className="text-red-600 text-base mt-2">{numberToRupiah(harga)}</p>
        )}
        <br />
        {/* Tampilkan Status dengan Condisional Class */}
        <p>Status Custome</p>
        {statusPermintaan && (
          <p
            className={`font-semibold text-base mt-2 uppercase ${
              statusPermintaan === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
            }`}
          >
            {statusPermintaan}
          </p>
        )}

        <p>Stock Custome</p>
        {statusCustome && (
          <p
            className={`font-semibold text-base mt-2 uppercase ${
              statusCustome === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
            }`}
          >
            {statusCustome}
          </p>
        )}

        <p>Stock</p>
        {statusProduct && (
          <p
            className={`font-semibold text-base mt-2 uppercase ${
              statusProduct === "Billboard Sedang Disewa" ? "text-red-500 font-bold" : "text-gray-400"
            }`}
          >
            {statusProduct}
          </p>
        )}

        <p>Start Date Custome Pemesanan</p>
        {startDate ? (
          <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
            {new Date(startDate).toLocaleDateString() ?? "Tanggal tidak tersedia"}
          </p>
        ) : (
          <p></p>
        )}
        <br/>
                <p>End Date Custome Pemesanan</p>
        {endDate ? (
          <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
            {new Date(endDate).toLocaleDateString() ?? "Tanggal tidak tersedia"}
          </p>
        ) : (
          <p></p>
        )}
        <br/>
                        <p>Sedang Dalam Proses Pemasangan Custome</p>
        {customTimestamp ? (
          <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
            {new Date(customTimestamp).toLocaleDateString() ?? "Tanggal tidak tersedia"}
          </p>
        ) : (
          <p></p>
        )}
        <br/>
                                <p>Sedang Dalam Proses Pemasangan</p>
        {customTimestamp ? (
          <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
            {new Date(customTimestamp).toLocaleDateString() ?? "Tanggal tidak tersedia"}
          </p>
        ) : (
          <p></p>
        )}
        <br/>
      </div>
      <br />
      {/* <div className="px-6 py-3">
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
            onClick={addToCart}
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
      </div> */}


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

export default CardItemTampilan;