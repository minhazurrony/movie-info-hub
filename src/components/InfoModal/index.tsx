import { Button } from 'antd';
import Modal from 'antd/lib/modal';
import dayjs from 'dayjs';
import React from 'react';
import './infoModal.css';

interface InfoModalProps {
  isVisible: boolean;
  handleOk: (e: any) => void;
  handleClose: (e: any) => void;
  detailsInfo: any;
  isFromMovie: boolean;
}

export const InfoModal = ({
  isVisible,
  handleOk,
  handleClose,
  detailsInfo,
  isFromMovie,
}: InfoModalProps) => {
  return (
    <Modal
      visible={isVisible}
      onOk={handleOk}
      closable={false}
      footer={
        <Button type="primary" onClick={handleOk}>
          Ok
        </Button>
      }
      centered={true}
      onCancel={handleClose}
    >
      <div className="modal-details-container">
        <img
          src={`https://image.tmdb.org/t/p/w500/${detailsInfo.poster_path}`}
          height={250}
          alt={isFromMovie ? detailsInfo.title : detailsInfo.name}
        />
        <h2>{isFromMovie ? detailsInfo.title : detailsInfo.name}</h2>
        <p>
          <b>Release Year:</b> {dayjs(detailsInfo.release_date).format('YYYY')}
        </p>
        <p>
          <b>Type:</b>{' '}
          {detailsInfo.media_type === 'movie' ? 'Movie' : 'TV Series'}
        </p>
        <p>
          <b>Rating:</b> {detailsInfo.vote_average}
        </p>
        <p>
          <b>Vote Count:</b> {detailsInfo.vote_count}
        </p>
        <p>
          <b>Plot:</b> {detailsInfo.overview}
        </p>
      </div>
    </Modal>
  );
};
