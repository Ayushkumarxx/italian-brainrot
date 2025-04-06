import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLeaderboardStore } from "../utils/store";
import { memeImages } from "../utils/brainrotList";

const Leaderboard: React.FC = () => {
  const { topUsers, currentUser, fetchLeaderboard } = useLeaderboardStore();

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 2500);
    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  // Determine current user's rank
  const userIndex = topUsers.findIndex((user) => user.id === currentUser?.id);
  const currentRank = userIndex !== -1 ? userIndex + 1 : "10+";

  return (
    <div className="p-4 mx-auto text-white bg-[#0a0a0a]  max-w-[900px]">
      <h2 className="text-3xl font-bold mb-6 text-white text-center sm:text-2xl">
        🏆 Leaderboard
      </h2>

      <ul className="bg-[#1a1a1a] rounded-xl shadow-md border border-[#2a2a2a] divide-y divide-[#2a2a2a] overflow-hidden">
        {topUsers.map((user, index) => {
          const topMemeIds = Object.entries(user.memesLiked || {})
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([id]) => Number(id));

          return (
            <motion.li
              layout
              key={user.id}
              className={`flex flex-col gap-2 px-5 py-4 transition duration-200 text-sm sm:text-base ${
                currentUser?.id === user.id
                  ? "bg-yellow-600 bg-opacity-20 text-yellow-300 font-semibold"
                  : "hover:bg-[#2a2a2a]"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center">
                <span className="truncate">
                  #{index + 1} <span className="font-medium">{user.username}</span>
                </span>
                <motion.span
                  key={user.totalLikes}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="whitespace-nowrap"
                >
                  {user.totalLikes} ❤️
                </motion.span>
              </div>

              <div className="flex gap-2 mt-1">
                {topMemeIds.map((memeId) => {
                  const imgSrc = memeImages[memeId as keyof typeof memeImages];
                  return (
                    imgSrc && (
                      <img
                        key={memeId}
                        src={imgSrc}
                        alt={`Meme ${memeId}`}
                        className="w-12 h-12 rounded-md object-cover border border-[#333]"
                      />
                    )
                  );
                })}
              </div>
            </motion.li>
          );
        })}
      </ul>

      {/* Current User Card */}
      {currentUser && (
        <div className="mt-8 bg-[#1e1e1e] p-5 rounded-xl border border-[#333] text-white shadow-inner max-sm:p-4">
          <h3 className="font-semibold text-lg mb-2 text-blue-300">You</h3>

          <motion.p
            key={String(currentRank) + "-" + currentUser.totalLikes}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-gray-300"
          >
            #{currentRank} — {currentUser.username} —{" "}
            <span className="text-white font-bold">{currentUser.totalLikes}</span> Likes
          </motion.p>

          {/* Top 3 Memes of Current User */}
          <div className="flex gap-2 mt-3">
            {Object.entries(currentUser.memesLiked || {})
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
              .map(([id]) => {
                const memeId = Number(id);
                const imgSrc = memeImages[memeId as keyof typeof memeImages];
                return (
                  imgSrc && (
                    <motion.img
                      key={memeId}
                      src={imgSrc}
                      alt={`Liked Meme ${memeId}`}
                      className="w-12 h-12 rounded-md object-cover border border-[#333]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                    />
                  )
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
