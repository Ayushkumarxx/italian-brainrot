import { useEffect, useState } from "react";
import { useUserStore } from "../utils/store";

const UsernamePrompt: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const { username, setUsername, loadUsername } = useUserStore();
  const [isLoading, setIsLoading] = useState(true); // <- loading flag

  useEffect(() => {
    const fetchUsername = async () => {
      await loadUsername();
      setIsLoading(false);
    };
    fetchUsername();
  }, [loadUsername]);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setUsername(inputValue.trim());
    }
  };

  // ⛔ Don't show anything while loading
  if (isLoading || username) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
      <div className="bg-[#0a0a0a] p-6 rounded-2xl shadow-2xl w-[90%] md:w-full max-w-sm animate-fadeIn border-4 border-neutral-700">
        <h2 className="text-2xl font-semibold text-center text-white mb-2">Hey there!</h2>
        <p className="text-sm text-gray-400 text-center mb-6">What should we call you?</p>

        <input
          type="text"
          className="w-full px-4 py-2 bg-[#1a1a1a] text-white border border-gray-600 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Enter your name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button
          className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all shadow-md hover:scale-105"
          onClick={handleSubmit}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default UsernamePrompt;
