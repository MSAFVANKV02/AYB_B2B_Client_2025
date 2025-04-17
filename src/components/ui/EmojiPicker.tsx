import { useState } from "react";

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

// Emoji data with categories
const emojiData = [
  { category: "Smileys", emojis: ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊"] },
  { category: "Animals", emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🦁", "🐯", "🐨"] },
  { category: "Food", emojis: ["🍎", "🍌", "🍒", "🍓", "🍔", "🍕", "🍩", "🍪", "🍿", "🍷"] },
  { category: "Nature", emojis: ["🌳", "🌻", "🌺", "🌼", "🌵", "🍃", "🍂", "🌍", "🌎", "🌏"] },
  // Add more categories and emojis as needed
];
// useEffect(() => {
//     const fetchEmojis = async () => {
//       try {
//         const response = await axios.get(
//           "https://cors-anywhere.herokuapp.com/https://emoji-api.com/emojis?access_key=9f719d41cbe6df343cfcb6b4a804a8e615d0d37d"
//         );
//         setEmojiData(response.data);
//         setFilteredEmojis(response.data); // Initially show all emojis
//       } catch (error) {
//         console.error("Error fetching emojis:", error);
//       }
//     };

//     fetchEmojis();
//   }, []);

export const MyEmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter emojis based on the search term
  const filteredEmojis = emojiData
    .map((category) => ({
      category: category.category,
      emojis: category.emojis.filter((emoji) => emoji.includes(searchTerm)),
    }))
    .filter((category) => category.emojis.length > 0); // Only show categories with matching emojis

  return (
    <div className="relative p-4 bg-white border rounded-lg shadow-lg w-[90%] max-w-xs md:max-w-sm">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search emoji..."
        className="w-full p-2 mb-4 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Emoji Categories and Grid */}
      <div className="space-y-4">
        {filteredEmojis.map((category, index) => (
          <div key={index}>
            <h3 className="font-semibold text-sm mb-2">{category.category}</h3>
            <div className="grid grid-cols-8 gap-2 sm:grid-cols-10 md:grid-cols-12">
              {category.emojis.map((emoji, index) => (
                <button
                  key={index}
                  className="p-2 text-xl hover:bg-gray-200 rounded"
                  onClick={() => onSelect(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
