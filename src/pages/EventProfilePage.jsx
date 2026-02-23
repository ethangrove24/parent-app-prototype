import React from 'react'
import { useParams } from 'react-router-dom'
import Avatar from '../components/common/Avatar'
import Button from '../components/common/Button'
import VideoPlayer from '../components/video/VideoPlayer'
import { getEventWithTeamDetails } from '../config/data/dataConfig'
import { getVideoSource } from '../config/videoConfig'
import { getSportIcon } from '../config/helpers/sportIcons'
import RecordIcon from '../assets/ui-icons/Record.svg'
import TicketIcon from '../assets/ui-icons/Ticket.svg'
import ChevronIcon from '../assets/ui-icons/UI Navigation Forward.svg'

// Note: Using inline SVG for triangle indicator as no suitable icon exists in the icon library.
const TriangleIndicator = () => (
  <svg className="event-profile__status-icon" viewBox="0 0 8 8" fill="none">
    <path d="M4 1L7 7H1L4 1Z" fill="currentColor" />
  </svg>
)

const EventProfilePage = () => {
  const { id } = useParams()

  // Get event data from config by ID
  const eventData = getEventWithTeamDetails(id) || getEventWithTeamDetails('event-profile-3')

  // Get sport icon for avatars
  const sportIcon = getSportIcon(eventData.sport)

  // Map config data to component format
  const event = {
    ...eventData,
    state: eventData.status === 'live' ? 'live' : eventData.status === 'upcoming' ? 'upcoming' : 'past',
    status: eventData.status === 'live' ? 'LIVE' : eventData.status === 'upcoming' ? 'UPCOMING' : 'FINAL',
    date: eventData.status === 'upcoming'
      ? `${eventData.date.weekday}, ${eventData.date.month} ${eventData.date.day}`
      : `${eventData.date.month} ${eventData.date.day}, ${eventData.date.year}`,
    time: eventData.time
  }

  return (
    <>
      <style>
        {`
          .event-profile__container {
            width: 100%;
            height: 100%;
            background-color: var(--u-color-background-container, #fefefe);
            overflow: hidden;
            position: relative;
            display: flex;
            flex-direction: column;
          }

          .event-profile__header {
            position: relative;
            background: var(--u-color-background-container, #fefefe);
            padding-top: 48px;
            padding-bottom: 40px;
          }

          .event-profile__score-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 80px;
          }

          .event-profile__team {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .event-profile__team--home {
            justify-content: flex-end;
          }


          .event-profile__team-info {
            display: flex;
            flex-direction: column;
          }

          .event-profile__team-info--home {
            text-align: right;
          }

          .event-profile__team-name {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 18px;
            color: var(--u-color-base-foreground-contrast, #071c31);
            margin: 0;
            line-height: 1.4;
          }

          .event-profile__team-details {
            display: flex;
            gap: 4px;
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-default, 400);
            font-size: 16px;
            color: var(--u-color-base-foreground, #36485c);
            margin: 0;
          }

          .event-profile__team-details--home {
            justify-content: flex-end;
          }

          .event-profile__score {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-style: italic;
            font-size: 60px;
            color: var(--u-color-base-foreground-contrast, #071c31);
            margin: 0;
            line-height: 1;
          }

          .event-profile__score--home {
            color: var(--u-color-base-foreground, #36485c);
          }


          .event-profile__status-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 16px;
            min-width: 160px;
          }

          .event-profile__status-badge {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 0 4px;
            border-radius: 4px;
          }

          .event-profile__status-badge--live {
            background-color: transparent;
            padding: 0px 4px;
          }

          .event-profile__status-icon {
            width: 8px;
            height: 8px;
            transform: rotate(-90deg);
            color: var(--u-color-base-foreground-contrast, #071c31);
          }

          .event-profile__status-text {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 16px;
            text-transform: uppercase;
            color: var(--u-color-base-foreground-contrast, #071c31);
            letter-spacing: 0.25px;
            margin: 0;
            line-height: 1.2;
          }

          .event-profile__status-text--live {
            color: var(--u-color-base-foreground-contrast, #071c31);
          }

          .event-profile__status-icon--live {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #e81c00;
            transform: none;
          }

          .event-profile__time-remaining {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 16px;
            color: var(--u-color-base-foreground, #36485c);
            margin: 0;
          }

          .event-profile__date {
            padding: 3px 6px;
            border-radius: 4px;
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-default, 700);
            font-size: 20px;
            color: var(--u-color-base-foreground-contrast, #071c31);
            margin: 0;
            line-height: 1.4;
            text-align: center;
          }

          .event-profile__time-badge {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            padding: 3px 6px;
            border-radius: 4px;
            background: transparent;
          }

          .event-profile__time-icon {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
          }

          .event-profile__time-badge .event-profile__status-text {
            font-size: 16px;
            font-weight: var(--u-font-weight-medium, 500);
            color: var(--u-color-base-foreground, #36485c);
          }

          .event-profile__video-section {
            width: 100%;
            background: #000;
            overflow: hidden;
          }

          .event-profile__video-section .video-player {
            width: 100%;
            aspect-ratio: 16 / 9;
          }

          .event-profile__actions {
            display: flex;
            gap: 12px;
            padding: 0 16px;
            width: 100%;
          }

          .event-profile__actions .u-button {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }

          .event-profile__button-icon {
            width: 20px;
            height: 20px;
            filter: brightness(0) invert(1);
          }

          .event-profile__actions .u-button--type-secondary .event-profile__button-icon {
            filter: none;
          }

          .event-profile__actions--single .u-button {
            flex: none;
            width: 100%;
          }

          .event-profile__content {
            padding: 24px 20px;
            flex: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .event-profile__title-section {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .event-profile__season-label {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-default, 400);
            font-size: 14px;
            line-height: 1.4;
            color: var(--u-color-base-foreground, #36485c);
            margin: 0;
          }

          .event-profile__event-title {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 20px;
            line-height: 1.2;
            color: var(--u-color-base-foreground-contrast, #071c31);
            margin: 0;
          }

          .event-profile__list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .event-profile__list-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 4px 24px;
            border-bottom: 1px dashed var(--u-color-line-subtle, #c4c6c8);
          }

          .event-profile__list-item--last {
            border-bottom: none;
          }

          .event-profile__list-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            line-height: 1.4;
          }

          .event-profile__list-title {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 16px;
            color: var(--u-color-base-foreground-contrast, #071c31);
            margin: 0;
          }

          .event-profile__list-subtitle {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-default, 400);
            font-size: 14px;
            color: var(--u-color-base-foreground, #36485c);
            margin: 0;
          }

          .event-profile__list-chevron {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
          }

          .event-profile__location-section {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .event-profile__location-label {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-default, 400);
            font-size: 14px;
            line-height: 1.4;
            color: var(--u-color-base-foreground, #36485c);
            margin: 0;
          }

          .event-profile__location-value {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 20px;
            line-height: 1.2;
            color: var(--u-color-base-foreground-contrast, #071c31);
            margin: 0;
          }

          .event-profile__location-address {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-default, 400);
            font-size: 14px;
            line-height: 1.4;
            color: var(--u-color-base-foreground-subtle, #607081);
            margin: 0;
          }

          /* Mobile Styles */
          @media (max-width: 767px) {
            .event-profile__container {
              border-radius: 0;
            }

            .event-profile__header {
              padding-top: 76px;
              padding-bottom: 0;
              background: var(--u-color-background-container, #fefefe);
            }

            /* Mobile with video player (past and live events) - show scores */
            .event-profile__video-section ~ .event-profile__content .event-profile__score-container,
            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__score-container,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__score-container {
              padding: 0 16px 24px;
              flex-wrap: nowrap;
              gap: 12px;
              justify-content: center;
              align-items: center;
            }

            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__team,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__team {
              flex-direction: row;
              flex: 0 0 auto;
              gap: 0;
              min-width: auto;
              justify-content: center;
            }

            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__score-container .avatar,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__score-container .avatar {
              width: 32px !important;
              height: 32px !important;
              min-width: 32px;
              min-height: 32px;
            }

            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__score-container .avatar__image,
            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__score-container .avatar__initials,
            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__score-container .avatar__icon,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__score-container .avatar__image,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__score-container .avatar__initials,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__score-container .avatar__icon {
              width: 32px !important;
              height: 32px !important;
            }

            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__score-container .avatar svg,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__score-container .avatar svg {
              width: 16px !important;
              height: 16px !important;
            }

            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__team-info,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__team-info {
              display: none;
            }

            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__team--away,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__team--away {
              order: 1;
            }

            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__team--home,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__team--home {
              order: 5;
            }

            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__score,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__score {
              display: block;
              font-size: 32px;
            }

            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__score:first-of-type,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__score:first-of-type {
              order: 2;
            }

            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__score--home,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__score--home {
              order: 4;
            }

            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__status-container,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__status-container {
              order: 3;
              min-width: 96px;
              width: auto;
              padding: 0 16px;
              flex: 0 0 auto;
            }

            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__status-badge,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__status-badge {
              border: 0;
              padding: 0px 4px;
              gap: 8px;
              border-radius: 4px;
              justify-content: center;
            }

            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__status-icon {
              display: block;
              width: 8px;
              height: 8px;
              transform: rotate(-90deg);
              color: var(--u-color-base-foreground-contrast, #071c31);
            }

            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__status-icon {
              display: block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: #e81c00;
              transform: none;
            }

            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__status-text,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__status-text {
              font-size: 16px;
              font-weight: var(--u-font-weight-bold, 700);
              color: var(--u-color-base-foreground-contrast, #071c31);
              line-height: 1.2;
              letter-spacing: 0.25px;
              text-transform: uppercase;
            }

            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__date {
              font-size: 14px;
              font-weight: var(--u-font-weight-default, 400);
              padding: 3px 6px;
              margin-bottom: 0;
              border-radius: 4px;
            }

            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__date {
              display: none;
            }

            .event-profile__container[data-event-state="past"]:has(.event-profile__video-section) .event-profile__time-badge,
            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__time-badge {
              display: none;
            }

            .event-profile__container[data-event-state="live"]:has(.event-profile__video-section) .event-profile__time-remaining {
              display: none;
            }

            /* Mobile without video player (live/upcoming events) */
            .event-profile__score-container {
              padding: 0 16px 24px;
              flex-wrap: nowrap;
              gap: 12px;
              justify-content: center;
            }

            .event-profile__team {
              flex-direction: column;
              text-align: center;
              min-width: auto;
              gap: 8px;
              flex: 0 0 auto;
            }

            .event-profile__team--away {
              order: 1;
            }

            .event-profile__team--home {
              order: 3;
              justify-content: flex-start;
            }

            .event-profile__team-info {
              align-items: center;
              gap: 4px;
              text-align: center;
            }

            .event-profile__team-details {
              justify-content: center;
              font-size: 14px;
              gap: 0;
            }

            .event-profile__team-details span:not(:last-child) {
              display: none;
            }

            .event-profile__team-details span:last-child {
              display: block;
            }

            .event-profile__team-name {
              font-size: 0;
              max-width: 136px;
            }

            .event-profile__team-name::before {
              content: attr(data-mobile-text);
              font-size: 16px;
              display: block;
            }

            .event-profile__status-container {
              order: 2;
              width: 160px;
              padding: 0 16px;
              flex: 0 0 auto;
            }

            .event-profile__status-badge {
              padding: 0px 4px;
              border: 0;
              border-radius: 4px;
              gap: 4px;
            }

            .event-profile__status-text {
              font-size: 16px;
              font-weight: var(--u-font-weight-bold, 700);
              color: var(--u-color-base-foreground-contrast, #071c31);
            }

            .event-profile__status-icon {
              display: block;
              width: 8px;
              height: 8px;
              transform: rotate(-90deg);
              color: var(--u-color-base-foreground-contrast, #071c31);
            }

            .event-profile__date {
              font-size: 20px;
              font-weight: var(--u-font-weight-bold, 700);
              color: var(--u-color-base-foreground-contrast, #071c31);
              padding: 3px 6px;
              margin-bottom: 0px;
            }

            .event-profile__time-remaining {
              display: none;
            }

            .event-profile__score {
              display: none;
            }


            .event-profile__actions {
              padding: 24px 16px 0px;
            }

            .event-profile__content {
              padding: 24px 20px;
            }
          }
        `}
      </style>
      <div className="event-profile__container" data-event-state={event.state}>
          <div className="event-profile__header">
            <div className="event-profile__score-container">
              {/* Away Team */}
              <div className="event-profile__team event-profile__team--away">
                <Avatar variant="team" size="large" src={event.awayTeam.avatar} initials={event.awayTeam.initials} icon={sportIcon} />
                <div className="event-profile__team-info">
                  <p className="event-profile__team-name" data-mobile-text={event.awayTeam.initials}>{event.awayTeam.name}</p>
                  <div className="event-profile__team-details">
                    <span>{event.awayTeam.location}</span>
                    <span>·</span>
                    <span>{event.awayTeam.record}</span>
                  </div>
                </div>
              </div>

              {/* Away Score */}
              {event.awayTeam.score !== null && (
                <p className="event-profile__score">
                  {event.awayTeam.score}
                </p>
              )}

              {/* Status and Date/Time */}
              <div className="event-profile__status-container">
                {event.state !== 'upcoming' && (
                  <div className={`event-profile__status-badge ${event.state === 'live' ? 'event-profile__status-badge--live' : ''}`}>
                    {event.state === 'live' ? (
                      <div className="event-profile__status-icon event-profile__status-icon--live" />
                    ) : (
                      <TriangleIndicator />
                    )}
                    <p className={`event-profile__status-text ${event.state === 'live' ? 'event-profile__status-text--live' : ''}`}>
                      {event.status}
                    </p>
                  </div>
                )}
                {event.state === 'live' && (
                  <p className="event-profile__time-remaining">{event.quarter} {event.timeRemaining}</p>
                )}
                <p className="event-profile__date">
                  {event.date}
                </p>
                {event.time && (
                  <div className="event-profile__time-badge">
                    <img src={RecordIcon} alt="" className="event-profile__time-icon" />
                    <p className="event-profile__status-text">{event.time}</p>
                  </div>
                )}
              </div>

              {/* Home Score */}
              {event.homeTeam.score !== null && (
                <p className="event-profile__score event-profile__score--home">
                  {event.homeTeam.score}
                </p>
              )}

              {/* Home Team */}
              <div className="event-profile__team event-profile__team--home">
                <Avatar variant="team" size="large" src={event.homeTeam.avatar} initials={event.homeTeam.initials} icon={sportIcon} />
                <div className="event-profile__team-info event-profile__team-info--home">
                  <p className="event-profile__team-name" data-mobile-text={event.homeTeam.initials}>{event.homeTeam.name}</p>
                  <div className="event-profile__team-details event-profile__team-details--home">
                    <span>{event.homeTeam.location}</span>
                    <span>·</span>
                    <span>{event.homeTeam.record}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Player for Past and Live Events */}
          {((event.state === 'past' && event.videos?.fullGame) || (event.state === 'live' && event.videos?.livestream)) && (
            <div className="event-profile__video-section">
              <VideoPlayer
                {...getVideoSource(event.state === 'past' ? event.videos.fullGame : event.videos.livestream)}
                autoplay={event.state === 'live'}
                controls={true}
                preload="metadata"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className={`event-profile__actions ${event.state === 'past' ? 'event-profile__actions--single' : ''}`}>
            <Button
              buttonStyle="standard"
              buttonType="primary"
              size="medium"
            >
              <img src={RecordIcon} alt="" className="event-profile__button-icon" />
              Buy Stream
            </Button>
            {event.state !== 'past' && (
              <Button
                buttonStyle="standard"
                buttonType="secondary"
                size="medium"
              >
                <img src={TicketIcon} alt="" className="event-profile__button-icon" />
                Get Tickets
              </Button>
            )}
          </div>

          {/* Content Section */}
          <div className="event-profile__content">
            {/* Event Title */}
            <div className="event-profile__title-section">
              <p className="event-profile__season-label">Regular Season</p>
              <h2 className="event-profile__event-title">{event.type}</h2>
            </div>

            {/* List Items */}
            <div className="event-profile__list">
              {/* Featured Athletes */}
              {event.featuredAthletes && event.featuredAthletes.map((athlete) => (
                <div key={athlete.id} className="event-profile__list-item">
                  <Avatar
                    variant="user"
                    size="small"
                    src={athlete.avatar}
                    initials={athlete.initials}
                  />
                  <div className="event-profile__list-info">
                    <p className="event-profile__list-title">{athlete.name}</p>
                    <p className="event-profile__list-subtitle">
                      #{athlete.number} · {athlete.position}
                    </p>
                  </div>
                  <img src={ChevronIcon} alt="" className="event-profile__list-chevron" />
                </div>
              ))}

              {/* Away Team */}
              <div className="event-profile__list-item">
                <Avatar
                  variant="team"
                  size="small"
                  src={event.awayTeam.avatar}
                  initials={event.awayTeam.initials}
                  icon={sportIcon}
                />
                <div className="event-profile__list-info">
                  <p className="event-profile__list-title">{event.awayTeam.name}</p>
                  <p className="event-profile__list-subtitle">{event.awayTeam.location}</p>
                </div>
                <img src={ChevronIcon} alt="" className="event-profile__list-chevron" />
              </div>

              {/* Home Team */}
              <div className="event-profile__list-item event-profile__list-item--last">
                <Avatar
                  variant="team"
                  size="small"
                  src={event.homeTeam.avatar}
                  initials={event.homeTeam.initials}
                  icon={sportIcon}
                />
                <div className="event-profile__list-info">
                  <p className="event-profile__list-title">{event.homeTeam.name}</p>
                  <p className="event-profile__list-subtitle">{event.homeTeam.location}</p>
                </div>
                <img src={ChevronIcon} alt="" className="event-profile__list-chevron" />
              </div>
            </div>

            {/* Location Info */}
            <div className="event-profile__location-section">
              <p className="event-profile__location-label">Location</p>
              <h3 className="event-profile__location-value">{event.location}</h3>
              {event.homeTeam.location && (
                <p className="event-profile__location-address">{event.homeTeam.location}</p>
              )}
            </div>
          </div>
        </div>
    </>
  )
}

export default EventProfilePage
