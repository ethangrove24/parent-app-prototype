import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import VideoPlayer from '../components/video/VideoPlayer'
import { getVideoSource } from '../config/videoConfig'
import { getHighlightById } from '../config/data/dataConfig'
import ShareIcon from '../assets/ui-icons/Share.svg'

const HighlightPlayerPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Get highlight data from config by ID
  const highlight = getHighlightById(id) || getHighlightById('highlight-1')

  return (
    <>
      <style>
        {`
          .highlight-player {
            width: 100%;
            height: 100%;
            color: #fefefe;
            display: flex;
            flex-direction: column;
            padding-top: 76px;
          }

          .highlight-player__nav {
            display: none;
          }

          .highlight-player__video {
            width: 100%;
            max-width: 100%;
            margin: 0 auto;
            border-radius: 4px;
            overflow: hidden;
            background: #000;
          }

          .highlight-player__info {
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .highlight-player__title {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 20px;
            line-height: 1.2;
            color: var(--u-color-base-foreground-contrast, #071c31);
            margin: 0;
          }

          .highlight-player__date {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-default, 400);
            font-size: 16px;
            line-height: 1.4;
            color: var(--u-color-base-foreground, #36485c);
            margin: 0;
          }

          .highlight-player__views {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-default, 400);
            font-size: 14px;
            line-height: 1.4;
            color: var(--u-color-base-foreground-subtle, #607081);
            margin: 0;
          }

          .highlight-player__share-button {
            margin-top: 8px;
            width: 100%;
            height: 40px;
            padding: 0 16px;
            background-color: var(--u-color-base-background, #e0e1e1);
            border: 1px solid var(--u-color-line-subtle, #c4c6c8);
            border-radius: 4px;
            color: var(--u-color-base-foreground, #36485c);
            font-family: var(--u-font-body);
            font-size: 14px;
            font-weight: var(--u-font-weight-medium, 500);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
          }

          .highlight-player__share-button:hover {
            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04);
          }

          .highlight-player__share-icon {
            width: 20px;
            height: 20px;
          }

          @media (max-width: 767px) {
            .highlight-player__video {
              border-radius: 0;
            }
          }
        `}
      </style>
      <div className="highlight-player">
        <div className="highlight-player__video">
          <VideoPlayer
            {...getVideoSource(highlight.videoKey)}
            autoplay={false}
            controls={true}
            preload="auto"
          />
        </div>

        <div className="highlight-player__info">
          <h1 className="highlight-player__title">{highlight.title}</h1>
          <p className="highlight-player__date">{highlight.date}</p>
          <p className="highlight-player__views">{highlight.views} Views</p>
          <button className="highlight-player__share-button">
            <img src={ShareIcon} alt="" className="highlight-player__share-icon" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default HighlightPlayerPage
