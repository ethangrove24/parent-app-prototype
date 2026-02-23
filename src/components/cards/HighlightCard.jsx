import React from 'react'
import { useNavigate } from 'react-router-dom'
import VideoPlayer from '../video/VideoPlayer'
import Badge from '../common/Badge'
import Tag from '../common/Tag'
import Avatar from '../common/Avatar'
import { getVideoSource } from '../../config/videoConfig'

const HighlightCard = ({ highlight, onClick }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(`/highlight/${highlight.id}`)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <>
      <style>
        {`
          .highlight-card {
            flex-shrink: 0;
            width: 260px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .highlight-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }

          .highlight-card:active {
            transform: translateY(0);
          }

          .highlight-card:focus-visible {
            outline: 2px solid var(--u-color-emphasis-foreground-active, #0066cc);
            outline-offset: 2px;
            border-radius: 8px;
          }

          .highlight-card__thumbnail {
            width: 100%;
            height: 146px;
            background: linear-gradient(135deg, #059669 0%, #10b981 100%);
            border-radius: 4px;
            position: relative;
            overflow: hidden;
          }

          .highlight-card__athlete-overlay {
            position: absolute;
            top: 8px;
            right: 8px;
            z-index: 10;
            pointer-events: none;
          }

          .highlight-card__content {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .highlight-card__title {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 16px;
            line-height: 1.4;
            color: var(--u-color-base-foreground, #36485c);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }

          .highlight-card__tags {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }

          .highlight-card__views {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-default, 400);
            font-size: 14px;
            line-height: 1.4;
            color: var(--u-color-base-foreground, #36485c);
          }
        `}
      </style>
      <div
        className="highlight-card"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View ${highlight.title}`}
      >
        <div className="highlight-card__thumbnail">
          <VideoPlayer
            {...getVideoSource(highlight.videoKey)}
            autoplay={false}
            muted={true}
            loop={false}
            preload="metadata"
          />

          {/* Date Badge */}
          {highlight.date && (
            <Badge
              text={highlight.date}
              position="top-left"
            />
          )}

          {/* Time Badge */}
          {highlight.time && (
            <Badge
              text={highlight.time}
              position="bottom-right"
            />
          )}

          {/* Athlete Avatar Overlay */}
          {highlight.athlete && (
            <div className="highlight-card__athlete-overlay">
              <Avatar
                variant="user"
                size="xsmall"
                src={highlight.athlete.avatar}
                initials={highlight.athlete.initials}
              />
            </div>
          )}
        </div>

        <div className="highlight-card__content">
          <div className="highlight-card__title">{highlight.title}</div>

          <div className="highlight-card__tags">
            {highlight.tags.map((tag, index) => (
              <Tag key={index} icon={tag.icon} name={tag.name} />
            ))}
          </div>

          <div className="highlight-card__views">{highlight.views} Views</div>
        </div>
      </div>
    </>
  )
}

export default HighlightCard
