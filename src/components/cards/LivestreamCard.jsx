import React from 'react'
import { useNavigate } from 'react-router-dom'
import VideoPlayer from '../video/VideoPlayer'
import Badge from '../common/Badge'
import Tag from '../common/Tag'
import { getVideoSource } from '../../config/videoConfig'
import { getEventWithTeamDetails } from '../../config/data/dataConfig'
import RecordIcon from '../../assets/ui-icons/Record.svg'

const LivestreamCard = ({ event, onClick }) => {
  const navigate = useNavigate()

  // Get full event details to access featured athletes
  const fullEvent = getEventWithTeamDetails(event.eventId)

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(`/event/${event.eventId}`)
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
          .livestream-card {
            flex-shrink: 0;
            width: 90%;
            display: flex;
            flex-direction: column;
            gap: 8px;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .livestream-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }

          .livestream-card:active {
            transform: translateY(0);
          }

          .livestream-card:focus-visible {
            outline: 2px solid var(--u-color-emphasis-foreground-active, #0066cc);
            outline-offset: 2px;
            border-radius: 8px;
          }

          .livestream-card__video {
            position: relative;
            width: 100%;
            aspect-ratio: 325 / 182;
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            border-radius: 8px;
            overflow: hidden;
          }

          .livestream-card__content {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 0 8px 8px;
          }

          .livestream-card__title {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 16px;
            line-height: 1.4;
            color: var(--u-color-base-foreground, #36485c);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .livestream-card__sport {
            display: flex;
            gap: 4px;
            align-items: center;
          }

        `}
      </style>
      <div
        className="livestream-card"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View ${event.title}`}
      >
        <div className="livestream-card__video">
          <VideoPlayer
            {...getVideoSource(event.videoKey)}
            autoplay={true}
            muted={true}
            loop={true}
            preload="auto"
            athletes={fullEvent?.featuredAthletes}
          />

          {/* LIVE Badge */}
          {event.status.isLive && (
            <Badge
              text="LIVE"
              icon={RecordIcon}
              isLive={true}
              position="top-left"
            />
          )}

          {/* Paid Access Badge */}
          {event.isPaidAccess && (
            <Badge
              text="Paid Access"
              icon={event.icons.ticket}
              position="bottom-right"
            />
          )}
        </div>

        <div className="livestream-card__content">
          <div className="livestream-card__title">{event.title}</div>
          <div className="livestream-card__sport">
            <Tag icon={event.sport.icon} name={event.sport.name} />
          </div>
        </div>
      </div>
    </>
  )
}

export default LivestreamCard
