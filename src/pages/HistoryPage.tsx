
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MessageCard from "@/components/MessageCard";

interface Message {
  id: string;
  recipient: string;
  message: string;
  song: {
    title: string;
    artist: string;
    albumCover?: string;
  };
  date: string;
}

const HistoryPage = () => {
  const [history, setHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be fetched from an API with authentication
    const storedHistory = JSON.parse(localStorage.getItem("message-history") || "[]");
    setHistory(storedHistory);
    setLoading(false);
  }, []);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 md:px-0">
        <h1 className="text-2xl font-semibold mb-8 text-center">Your Message History</h1>

        {loading ? (
          <div className="text-center py-8">
            <p>Loading your history...</p>
          </div>
        ) : history.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((message) => (
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
          <div className="text-center py-16 bg-gray-100 rounded-lg">
            <p className="text-gray-600 mb-4">Looks like there's no history yet! Start by sending your message</p>
            <Link to="/submit" className="text-ode-burgundy hover:underline">
              here
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
