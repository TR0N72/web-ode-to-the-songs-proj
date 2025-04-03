
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Music } from "lucide-react";
import NotFound from "./NotFound";

// Sample messages for demonstration - in a real app, these would come from an API
const sampleMessages = [
  {
    id: "1",
    recipient: "Ode Team",
    message: "bismillah UTS 100 amin ya ges :)))",
    song: {
      title: "Always",
      artist: "Bon Jovi",
      albumCover: "https://i.scdn.co/image/ab67616d0000b273b7c05417113f613a3c76c226"
    },
    date: "2025-03-29"
  }
];

const MessagePage = () => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<(typeof sampleMessages)[0] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchMessage = () => {
      setLoading(true);
      setTimeout(() => {
        // Find the message by ID (in a real app, this would be an API call)
        const foundMessage = sampleMessages.find(m => m.id === id);
        setMessage(foundMessage || null);
        setLoading(false);
      }, 500);
    };

    fetchMessage();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p>Loading message...</p>
      </div>
    );
  }

  if (!message) {
    return <NotFound />;
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 md:px-0 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium mb-2">
            Hello, <span className="handwriting text-3xl">{message.recipient}</span>
          </h1>
          <p className="text-gray-600">
            There's someone sending you a song, they want you to hear
            this song that maybe you'll like :)
          </p>
        </div>

        {/* Song Card */}
        <div className="bg-ode-burgundy rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center text-white">
          <div className="w-32 h-32 bg-gray-300 rounded mb-4 md:mb-0">
            {message.song.albumCover && (
              <img
                src={message.song.albumCover}
                alt={`${message.song.title} album cover`}
                className="w-full h-full object-cover rounded"
              />
            )}
          </div>
          <div className="md:ml-6 text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-1">SONG</h2>
            <p className="mb-1">{message.song.title}</p>
            <p className="text-gray-200">{message.song.artist}</p>
            <button className="mt-4 bg-black text-white px-4 py-2 rounded-full flex items-center mx-auto md:mx-0">
              <Music size={16} className="mr-2" />
              Listen on Spotify
            </button>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <p className="text-gray-600 mb-4">Also here's a message from the sender:</p>
          <div className="text-center">
            <p className="text-4xl font-handwriting text-ode-burgundy leading-relaxed mb-6">
              {message.message}
            </p>
            <p className="text-gray-500 text-sm">
              sent on {new Date(message.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center mt-12">
          <Link to="/submit" className="btn-primary inline-block">
            Send your own message
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
