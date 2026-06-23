import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

export function useAdmin() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for special password bypass
    let specialAccess = false;
    try {
      specialAccess = localStorage.getItem("special_access") === "true";
    } catch (e) {
      console.warn("localStorage is not available");
    }

    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const adminDoc = await getDoc(doc(db, 'admins', u.uid));
          // For initial setup/dev: If the user email matches the business owner email, we can assume admin
          // especially if the admins collection is empty.
          const isOwnerEmail = u.email === 'digitalpointwb@gmail.com';
          setIsAdmin(adminDoc.exists() || isOwnerEmail || specialAccess);
        } catch (error) {
          console.error("Admin check failed:", error);
          setIsAdmin(specialAccess);
        }
      } else {
        setIsAdmin(specialAccess);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, isAdmin, loading };
}
