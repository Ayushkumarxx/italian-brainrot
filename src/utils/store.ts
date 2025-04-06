// stores/memeStore.ts
import { create } from "zustand";
import { db } from "../utils/firebase";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  onSnapshot,
  setDoc,
  increment
} from "firebase/firestore";
import BrainrotList, { Meme } from "../utils/brainrotList";

interface MemeStore {
  memes: Meme[];
  fetchMemes: () => void;
  likeMeme: (id: number) => void;
}
interface UserState {
  username: string | null;
  setUsername: (name: string) => void;
  loadUsername: () => void;
}
export const useMemeStore = create<MemeStore>((set, get) => ({
  memes: [],

  fetchMemes: async () => {
    const memesRef = collection(db, "memes");
    const snapshot = await getDocs(memesRef);

    // If Firestore is empty, seed the initial list
    if (snapshot.empty) {
      await Promise.all(
        BrainrotList.map((meme) =>
          setDoc(doc(db, "memes", meme.id.toString()), meme)
        )
      );
    }

    // Re-fetch after seeding
    const updatedSnapshot = await getDocs(memesRef);
    const fetchedMemes: Meme[] = updatedSnapshot.docs.map((doc) => ({
      ...(doc.data() as Meme),
      id: Number(doc.id),
    }));

    set({ memes: fetchedMemes });

    // Real-time updates
    updatedSnapshot.docs.forEach((docSnap) => {
      const docRef = doc(db, "memes", docSnap.id);
      onSnapshot(docRef, (snapshot) => {
        const updated = snapshot.data() as Meme;
        const updatedId = Number(snapshot.id);

        set((state) => ({
          memes: state.memes.map((m) =>
            m.id === updatedId ? { ...m, likes: updated.likes } : m
          ),
        }));
      });
    });
  },

  likeMeme: async (id: number) => {
    const memeRef = doc(db, "memes", id.toString());
    const current = get().memes.find((m) => m.id === id);
    if (!current) return;

    await updateDoc(memeRef, {
       likes: increment(1),
    });
  },
}));


export const useUserStore = create<UserState>((set) => ({
  username: null,

  setUsername: (name: string) => {
    localStorage.setItem("username", name);
    set({ username: name });
  },

  loadUsername: () => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      set({ username: storedName });
    }
  },
}));