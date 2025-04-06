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
  increment,
  getDoc,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import BrainrotList, { Meme } from "../utils/brainrotList";


// Utility: generate manual unique userId
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

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
export interface UserData {
  id: string;
  username: string;
  totalLikes: number;
  memesLiked: Record<string, number>;
}
interface LeaderboardState {
  topUsers: UserData[];
  currentUser: UserData | null;
  fetchLeaderboard: () => Promise<void>;
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
    // Track per-user stats
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await updateDoc(userRef, {
        totalLikes: increment(1),
        [`memesLiked.${id}`]: increment(1), // Works even if it's missing
      });
    }
  },
}));

export const useUserStore = create<UserState>((set) => ({
  username: null,

  setUsername: async (name: string) => {
    let uid = localStorage.getItem("userId");

    if (!uid) {
      uid = generateId();
      localStorage.setItem("userId", uid);
    }

    localStorage.setItem("username", name);
    set({ username: name });

    const userRef = doc(db, "users", uid);
    await setDoc(
      userRef,
      {
        id: uid,
        username: name,
        totalLikes: 0,
        memesLiked: {},
      },
      { merge: true }
    );

  },

  loadUsername: () => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      set({ username: storedName });
    }
  },
}));

export const useLeaderboardStore = create<LeaderboardState>((set) => ({
  topUsers: [],
  currentUser: null,

  fetchLeaderboard: async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("totalLikes", "desc"), limit(10));
    const snapshot = await getDocs(q);

    const topUsers: UserData[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        username: data.username || "Anonymous",
        totalLikes: data.totalLikes || 0,
        memesLiked: data.memesLiked || {},
      };
    });

    const uid = localStorage.getItem("userId");
    let currentUser: UserData | null = null;

    if (uid) {
      const userSnap = await getDoc(doc(db, "users", uid));
      if (userSnap.exists()) {
        const data = userSnap.data();
        currentUser = {
          id: uid,
          username: data.username || "Anonymous",
          totalLikes: data.totalLikes || 0,
          memesLiked: data.memesLiked || {},
        };
      }
    }

    set({ topUsers, currentUser });
  },
}));