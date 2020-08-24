import { Card } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import './movieCard.css';

const { Meta } = Card;

interface MovieCardProps {
  imageSource: string;
  imageAlerText: string;
  movieTitle: string;
  releaseYear: string;
  averageRating: string;
  handleCardClick: () => void;
}

export const MovieCard = ({
  imageSource,
  imageAlerText,
  movieTitle,
  releaseYear,
  averageRating,
  handleCardClick,
}: MovieCardProps) => {
  return (
    <>
      <Card
        hoverable
        cover={
          <img
            src={imageSource}
            alt={imageAlerText}
            style={{ minHeight: 315 }}
          />
        }
        onClick={handleCardClick}
      >
        <Meta
          title={movieTitle}
          style={{ textAlign: 'center' }}
          description={dayjs(releaseYear).format('YYYY')}
        />
      </Card>
      <div className="rating-container">
        <h3>{averageRating}</h3>
      </div>
    </>
  );
};
