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
}

export const MovieCard = ({
  imageSource,
  imageAlerText,
  movieTitle,
  releaseYear,
  averageRating,
}: MovieCardProps) => {
  return (
    <>
      <Card hoverable cover={<img src={imageSource} alt={imageAlerText} />}>
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