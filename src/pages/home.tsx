import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemeStore } from "../utils/store";
import { FiChevronRight } from "react-icons/fi";
import Exports from "../utils/export";
import { Meme , memeImages } from "../utils/brainrotList";


interface PlusOneAnimation {
  id: number;
  x: number;
  rotate: number;
  color: string;
}

const Home: React.FC = () => {
  const { memes, fetchMemes, likeMeme } = useMemeStore();
  const [sortedMemes, setSortedMemes] = useState<Meme[]>([]);
  const [plusOnes, setPlusOnes] = useState<Record<number, PlusOneAnimation[]>>({});
  const [tempLikes, setTempLikes] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const lastInteraction = useRef<number>(Date.now());
  const hasSortedInitially = useRef(false);

  const sortAndSetMemes = (memesToSort: Meme[]) => {
    const sorted = [...memesToSort].sort((a, b) => b.likes - a.likes);
    setSortedMemes(sorted);
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await fetchMemes();
      setIsLoading(false);
    };
    init();

    const idleChecker = setInterval(() => {
      if (Date.now() - lastInteraction.current > 5000) {
        setTempLikes({}); // reset temporary likes on idle
        sortAndSetMemes(useMemeStore.getState().memes); // re-sync and re-sort
      }
    }, 2500);

    return () => clearInterval(idleChecker);
  }, []);

  useEffect(() => {
    if (memes.length > 0 && !hasSortedInitially.current) {
      sortAndSetMemes(memes);
      hasSortedInitially.current = true;
    }
  }, [memes]);


  const handleVote = async (index: number) => {
    console.log(sortedMemes)
    const meme = sortedMemes[index];
    if (!meme) return;

    lastInteraction.current = Date.now();

    const newPlus: PlusOneAnimation = {
      id: Date.now(),
      x: Math.random() * 40 - 20,
      rotate: Math.random() * 30 - 15,
      color: ["#f87171", "#60a5fa", "#facc15"][Math.floor(Math.random() * 3)],
    };

    setPlusOnes((prev) => ({
      ...prev,
      [index]: [...(prev[index] || []), newPlus],
    }));

    setTimeout(() => {
      setPlusOnes((prev) => {
        const updated = (prev[index] || []).filter((p) => p.id !== newPlus.id);
        return { ...prev, [index]: updated };
      });
    }, 700);

    // Optimistically update vote count
    setTempLikes((prev) => ({
      ...prev,
      [meme.id]: (prev[meme.id] || 0) + 1,
    }));

    // Update backend
    await likeMeme(meme.id);
  };

  return (
    <>
    <Exports.components.navbar />
    <main className="max-w-[850px] mx-auto pt-10 px-4 text-white text-sm">
      {/* Date Navigation */}
      <div className="flex items-center text-base max-sm:text-sm">
        Today's date
        <FiChevronRight className="mx-2" />
        <span>{new Date().toLocaleDateString()}</span>
      </div>
  
      {/* Title Section */}
      <h1 className="mt-2 text-3xl font-bold max-sm:text-2xl">Vote Now</h1>
      <p className="text-neutral-400 max-sm:text-xs">~ Click your favorite brainrot</p>
  
      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[300px]">
          <motion.div
            className="w-8 h-8 rounded-full bg-white"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </div>
      ) : (
        <motion.div
          layout
          className="flex flex-wrap justify-center gap-8 max-md:gap-2.5 mt-10"
        >
          {sortedMemes.map((meme, i) => (
            <motion.div
              layout
              key={meme.id}
              onClick={() => handleVote(i)}
              whileTap={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                layout: { delay: 0.2, duration: 0.4 }
              }}
              className="relative w-[250px] h-[250px] max-lg:w-[220px] max-lg:h-[220px] max-md:w-[200px] max-md:h-[200px] max-sm:w-[150px] max-sm:h-[150px] bg-black border-4 border-neutral-700 rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={memeImages[meme.id as keyof typeof memeImages]}
                alt={`Meme ${meme.id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent p-2 flex flex-col items-center justify-end">
                <p className="text-xs text-white max-sm:text-[10px]">Click! Click!</p>
                <p className="font-bold text-white text-lg max-sm:text-base">
                  Votes: {meme.likes + (tempLikes[meme.id] || 0)}
                </p>
              </div>
  
              <AnimatePresence>
                {(plusOnes[i] || []).map((plus) => (
                  <motion.div
                    key={plus.id}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -60, x: plus.x, rotate: plus.rotate }}
                    exit={{ opacity: 0, y: -80 }}
                    transition={{ duration: 0.6 }}
                    className="absolute text-xl font-bold pointer-events-none max-sm:text-base"
                    style={{
                      color: plus.color,
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    +1
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  </>
  
  );
};

export default Home;
