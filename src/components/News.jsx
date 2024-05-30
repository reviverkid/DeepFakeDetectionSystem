import React from "react";
import NewsItem from "./NewsItem"; // Import the modified NewsItem component
import "./css/NewsFeed.css"; // Import CSS file for styling

const NewsFeed = () => {
  // Dummy news data with more detailed information
  const dummyNewsData = [
    {
      id: 1,
      title: "Deepfake technology: What it is and how it works",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      image: "deepfake1.jpg",
      author: "John Doe",
      date: "June 15, 2024",
    },
    {
      id: 2,
      title: "The impact of deepfake videos on society",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      image: "deepfake2.jpg",
      author: "Jane Smith",
      date: "June 20, 2024",
    },
    {
      id: 3,
      title: "How to detect deepfake videos",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      image: "deepfake3.jpg",
      author: "Alice Johnson",
      date: "June 25, 2024",
    },
  ];

  return (
    <div>
      <h1>Deepfake News Feed</h1>
      {/* Map through the dummy news data and render each news item */}
      {dummyNewsData.map((news) => (
        <NewsItem
          key={news.id}
          title={news.title}
          content={news.content}
          image={news.image}
          author={news.author}
          date={news.date}
        />
      ))}
    </div>
  );
};

export default NewsFeed;
