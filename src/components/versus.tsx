import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { memeImages } from "../utils/brainrotList";
import { useVersusStore } from "../utils/store";

interface MemeData {
  id: number;
  likes: number;
}

const Versus: React.FC = () => {
  const { versus, fetchVersus, voteMeme } = useVersusStore();
  const [memes, setMemes] = useState<MemeData[]>([]);
  const [tempLikes, setTempLikes] = useState<Record<number, number>>({});
  const [plusOnes, setPlusOnes] = useState<Record<number, any[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true); // Set loading to true while fetching data
      await fetchVersus();
      // Set loading to false once the data is fetched
    };
    init();
  }, [fetchVersus]);

  useEffect(() => {
    if (versus) {
      setMemes([
        { id: versus.id1, likes: versus.like1 },
        { id: versus.id2, likes: versus.like2 },
      ]);
    if (isLoading){
      setIsLoading(false); 
       }
    }
  }, [versus]);

  const handleVote = (index: number) => {
    const meme = memes[index];
    if (!meme) return;

    const newPlus = {
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
      setPlusOnes((prev) => ({
        ...prev,
        [index]: (prev[index] || []).filter((p) => p.id !== newPlus.id),
      }));
    }, 700);

    setTempLikes((prev) => ({
      ...prev,
      [meme.id]: (prev[meme.id] || 0) + 1,
    }));

    voteMeme(index === 0 ? 1 : 2);
  };

  const meme1 = memes[0];
  const meme2 = memes[1];
  const meme1Votes = meme1 ? meme1.likes + (tempLikes[meme1.id] || 0) : 0;
  const meme2Votes = meme2 ? meme2.likes + (tempLikes[meme2.id] || 0) : 0;
  const totalVotes = meme1Votes + meme2Votes || 1;
  const isTie = meme1Votes === meme2Votes;

  return (
    <div className="w-full md:w-[80%] gap-4 mx-auto flex justify-between items-center  py-10 mb-10">
      {/* Show loading spinner if data is being fetched */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[300px]">
          <motion.div
            className="w-8 h-8 rounded-full bg-white"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </div>
      ) : (
        <>
      {meme1 && (
        <motion.div
          layout
          onClick={() => handleVote(0)}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className={`relative w-[145px] sm:w-[250px] h-[155px] sm:h-[250px] rounded-xl overflow-hidden cursor-pointer border-4 ${
            !isTie && meme1Votes > meme2Votes
              ? "border-green-400"
              : "border-neutral-700"
          } shadow-md`}
        >
          <img
            src={memeImages[meme1.id as keyof typeof memeImages]}
            alt={`Meme ${meme1.id}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent p-2 flex flex-col items-center justify-end">
            <p className="font-bold text-white text-lg max-sm:text-base">
              {((meme1Votes / totalVotes) * 100).toFixed(1)}% Votes
            </p>
          </div>

          {/* +1 animation */}
          <AnimatePresence>
            {(plusOnes[0] || []).map((plus) => (
              <motion.div
                key={plus.id}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -60, x: plus.x, rotate: plus.rotate }}
                exit={{ opacity: 0, y: -80 }}
                transition={{ duration: 0.6 }}
                className="absolute text-xl font-bold pointer-events-none"
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

          {/* Leading badge */}
          <AnimatePresence>
            {!isTie && meme1Votes > meme2Votes && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-2 right-2 bg-green-500 text-black px-2 py-1 text-xs rounded-full shadow"
              >
                Leading
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* VS Text */}
      <div className="text-3xl max-md:text-2xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 px-4 max-md:px-2 py-1 rounded-full shadow-lg shadow-cyan-500/30">
        VS
     </div>

      {/* Meme 2 */}
      {meme2 && (
        <motion.div
          layout
          onClick={() => handleVote(1)}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className={`relative w-[145px] sm:w-[250px] h-[155px] sm:h-[250px] rounded-xl overflow-hidden cursor-pointer border-4 ${
            !isTie && meme2Votes > meme1Votes
              ? "border-green-400"
              : "border-neutral-700"
          } shadow-md`}
        >
          <img
            src={memeImages[meme2.id as keyof typeof memeImages]}
            alt={`Meme ${meme2.id}`}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent p-2 flex flex-col items-center justify-end">
            <p className="font-bold text-white text-lg max-sm:text-base">
              {((meme2Votes / totalVotes) * 100).toFixed(1)}% Votes
            </p>
          </div>

          {/* +1 animation */}
          <AnimatePresence>
            {(plusOnes[1] || []).map((plus) => (
              <motion.div
                key={plus.id}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -60, x: plus.x, rotate: plus.rotate }}
                exit={{ opacity: 0, y: -80 }}
                transition={{ duration: 0.6 }}
                className="absolute text-xl font-bold pointer-events-none"
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

          {/* Leading badge */}
          <AnimatePresence>
            {!isTie && meme2Votes > meme1Votes && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-2 right-2 bg-green-500 text-black px-2 py-1 text-xs rounded-full shadow"
              >
                Leading
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      
      )}  
      </>
    )}

    </div>
  );
};

export default Versus;
