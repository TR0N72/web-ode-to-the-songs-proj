
import { Link } from "react-router-dom";
import { Music, Search, History } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import MessageCard from "@/components/MessageCard";
import { useEffect, useState } from "react";

// Sample messages for demonstration
const sampleMessages = [
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
    recipient: "Lily",
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
    recipient: "Padme",
    message: "Always.",
    song: {
      title: "Always Be My Baby",
      artist: "Mariah Carey",
      albumCover: "https://i.scdn.co/image/ab67616d0000b273ef0d4234e1a645740f77d59c"
    }
  },
  {
    id: "5",
    recipient: "Padme",
    message: "Always.",
    song: {
      title: "Always",
      artist: "Bon Jovi",
      albumCover: "https://i.scdn.co/image/ab67616d0000b273b7c05417113f613a3c76c226"
    }
  },
  {
    id: "6",
    recipient: "Padme",
    message: "Always.",
    song: {
      title: "Always With Me",
      artist: "Joe Hisaishi",
      albumCover: "https://i.scdn.co/image/ab67616d0000b2731f8f9c2a5a8e1e9adc6dc8c9"
    }
  }
];

const HomePage = () => {
  const [messages, setMessages] = useState<typeof sampleMessages>([]);

  useEffect(() => {
    // In a real implementation, this would fetch from an API
    setMessages(sampleMessages);
  }, []);

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 md:px-0">
          <h1 className="cursive-heading text-4xl md:text-6xl mb-2">
            Feelings left unspoken,
          </h1>
          <h2 className="cursive-heading text-4xl md:text-6xl mb-6">
            sung through the tune.
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Send your unspoken thoughts through the music.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link to="/submit" className="btn-primary">
              Ready to write
            </Link>
            <Link to="/browse" className="btn-secondary">
              Browse stories
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Share your messages"
              description="Choose a song and write a heartfelt message to someone special or save it as a little gift for yourself"
              icon={<Music size={24} />}
            />
            <FeatureCard
              title="Browse Messages"
              description="Find messages that were written for you. Search your name and uncover heartfelt messages written just for you."
              icon={<Search size={24} />}
            />
            <FeatureCard
              title="Listen Messages"
              description="Tap on any message card to discover the full story behind it and listen to the song that captures the emotion of the moment!"
              icon={<History size={24} />}
            />
          </div>
        </div>
      </section>

      {/* Recent Messages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-0">
          <h2 className="text-2xl font-semibold text-center mb-12">Recent Messages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {messages.map((message) => (
              <MessageCard
                key={message.id}
                id={message.id}
                recipient={message.recipient}
                message={message.message}
                song={message.song}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
