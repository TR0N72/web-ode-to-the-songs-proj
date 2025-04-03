
import { useState } from "react";
import { Info } from "lucide-react";
import SearchBox from "@/components/SearchBox";
import MessageCard from "@/components/MessageCard";

// Sample messages - in a real app, these would come from an API
const allMessages = [
  {
    id: "1",
    recipient: "Ani",
    message: "Always.",
    song: {
      title: "Always",
      artist: "Bon Jovi",
      albumCover: "https://i.scdn.co/image/ab67616d0000b273b7c05417113f613a3c76c226"
    }
  },
  {
    id: "2",
    recipient: "Ani",
    message: "Always.",
    song: {
      title: "Always With Me",
      artist: "Joe Hisaishi",
      albumCover: "https://i.scdn.co/image/ab67616d0000b2731f8f9c2a5a8e1e9adc6dc8c9"
    }
  },
  {
    id: "3",
    recipient: "Ani",
    message: "Always.",
    song: {
      title: "Always Forever",
      artist: "Cults",
      albumCover: "https://i.scdn.co/image/ab67616d0000b2736c2cb0d7cc4644ff7b19e8c1"
    }
  },
  {
    id: "4",
    recipient: "Ani",
    message: "Always.",
    song: {
      title: "Always Be My Baby",
      artist: "Mariah Carey",
      albumCover: "https://i.scdn.co/image/ab67616d0000b273ef0d4234e1a645740f77d59c"
    }
  },
  {
    id: "5",
    recipient: "Ani",
    message: "Always.",
    song: {
      title: "Always",
      artist: "Bon Jovi",
      albumCover: "https://i.scdn.co/image/ab67616d0000b273b7c05417113f613a3c76c226"
    }
  },
  {
    id: "6",
    recipient: "Ani",
    message: "Always.",
    song: {
      title: "Always With Me",
      artist: "Joe Hisaishi",
      albumCover: "https://i.scdn.co/image/ab67616d0000b2731f8f9c2a5a8e1e9adc6dc8c9"
    }
  },
];

const BrowsePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState(allMessages);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const filtered = allMessages.filter(
        message => message.recipient.toLowerCase().includes(query.toLowerCase())
      );
      setMessages(filtered);
      setIsSearching(false);
    }, 500);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 md:px-0">
        {/* Search Section */}
        <div className="bg-blue-600 text-white p-6 rounded-lg mb-8">
          <h1 className="text-2xl font-semibold mb-2">Find Message</h1>
          <p className="mb-4 text-blue-100">
            Scroll the latest messages or start typing recipient name to find your messages
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <SearchBox 
                onSearch={handleSearch} 
                placeholder="Enter recipient's name"
              />
            </div>
            <button
              className="btn-primary bg-gray-800 hover:bg-gray-900"
              onClick={() => handleSearch(searchQuery)}
            >
              Search
            </button>
          </div>
        </div>

        {/* Results */}
        {isSearching ? (
          <div className="text-center py-12">
            <p>Searching...</p>
          </div>
        ) : messages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {messages.map(message => (
              <MessageCard
                key={message.id}
                id={message.id}
                recipient={message.recipient}
                message={message.message}
                song={message.song}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No messages found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
