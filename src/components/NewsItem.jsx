import React from "react";
import "./css/NewsFeed.css"; // Import CSS file for styling

const NewsItem = ({ title, content, image, author, date }) => {
  return (
    <div className="news-item">
      <img src={image} alt="News" className="news-image" />
      <div className="news-details">
        <h2>{title}</h2>
        <p className="news-content">{content}</p>
        <div className="news-footer">
          <span className="news-author">By {author}</span>
          <span className="news-date">{date}</span>
          <a href="#" className="read-more">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
