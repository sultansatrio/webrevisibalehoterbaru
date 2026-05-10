"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        let profile = null;
        try {
          const storedProfile = localStorage.getItem("userProfile");
          profile = storedProfile ? JSON.parse(storedProfile) : null;
        } catch (error) {
          profile = null;
        }

        if (!profile) {
          try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            profile = userDoc.exists()
              ? { uid: currentUser.uid, ...userDoc.data() }
              : {
                  uid: currentUser.uid,
                  email: currentUser.email,
                  name: currentUser.displayName || currentUser.email,
                };
          } catch (error) {
            profile = {
              uid: currentUser.uid,
              email: currentUser.email,
              name: currentUser.displayName || currentUser.email,
            };
          }
        }

        setUserProfile(profile);
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        setUser(null);
        setUserProfile({});
        localStorage.removeItem("userProfile");
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (!user?.uid) {
      await signOut(auth);
      router.push("/sign-in");
      return;
    }

    const docRef = doc(db, "users", user.uid);
    try {
      await updateDoc(docRef, {
        status: "offline",
      });
    } catch (error) {
      console.log(error);
    }

    signOut(auth)
      .then(() => {
        router.push("/sign-in");
        localStorage.removeItem("user");
        localStorage.removeItem("userProfile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { user, userProfile, handleLogout };
};

export default useAuth;
