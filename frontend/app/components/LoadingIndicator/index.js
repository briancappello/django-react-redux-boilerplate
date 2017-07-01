import React from 'react';

import './loadingIndicator.scss'

const LoadingIndicator = () => (
  <div className="spinner-loading-indicator">
    <div className="spinner-circle r0" />
    <div className="spinner-circle r30" />
    <div className="spinner-circle r60" />
    <div className="spinner-circle r90" />
    <div className="spinner-circle r120" />
    <div className="spinner-circle r150" />
    <div className="spinner-circle r180" />
    <div className="spinner-circle r210" />
    <div className="spinner-circle r240" />
    <div className="spinner-circle r270" />
    <div className="spinner-circle r300" />
    <div className="spinner-circle r330" />
  </div>
);

export default LoadingIndicator;
