import React from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from '../common/Badge'
import Avatar from '../common/Avatar'
import LocationIcon from '../../assets/ui-icons/Location.svg'
import ClockIcon from '../../assets/ui-icons/clock.svg'
import TicketIcon from '../../assets/ui-icons/Ticket.svg'
import RecordIcon from '../../assets/ui-icons/Record.svg'
import RecordOffIcon from '../../assets/ui-icons/Record Off.svg'

const EventCard = ({ event, onClick, variant = 'default' }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(`/event/${event.id}`)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const isPast = event.status === 'past'
  const isLive = event.status === 'live'
  const isUpcoming = event.status === 'upcoming'
  const isCompact = variant === 'bordered' // past games carousel uses 'bordered'

  // Winner arrow — small left-pointing triangle
  const WinnerArrow = () => (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <path d="M4 0L0 8H8L4 0Z" fill="#071c31" />
    </svg>
  )

  return (
    <>
      <style>
        {`
          /* ── Base card ── */
          .event-card {
            padding: 12px;
            padding-bottom: 24px;
            cursor: pointer;
            transition: background-color 0.2s ease;
            width: 100%;
          }

          .event-card--default {
            border-bottom: 1px dashed var(--u-color-line-subtle, #c4c6c8);
          }

          /* Past games carousel card */
          .event-card--bordered {
            background: var(--u-color-background-callout, #f8f8f9);
            border-radius: 4px;
            padding: 12px 12px 16px;
          }

          .event-card:hover {
            background-color: var(--u-color-background-subtle, #f5f5f5);
          }

          .event-card--bordered:hover {
            background-color: #efefef;
          }

          .event-card:focus-visible {
            outline: 2px solid var(--u-color-emphasis-foreground-active, #0066cc);
            outline-offset: 2px;
            border-radius: 4px;
          }

          /* ── Layout ── */
          .event-card__container {
            display: flex;
            gap: 16px;
            align-items: center;
            width: 100%;
          }

          .event-card__container--top {
            align-items: flex-start;
          }

          /* ── Date column ── */
          .event-card__date {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 64px;
            min-width: 64px;
            flex-shrink: 0;
            text-align: center;
          }

          .event-card--bordered .event-card__date {
            padding: 0 8px;
            text-align: right;
            align-items: flex-end;
            justify-content: flex-start;
          }

          .event-card__date-weekday {
            font-family: var(--u-font-body);
            font-weight: 500;
            font-size: 20px;
            line-height: 1.2;
            color: var(--u-color-base-foreground, #36485c);
          }

          .event-card__date-day {
            font-family: var(--u-font-body);
            font-weight: 700;
            font-style: italic;
            font-size: 40px;
            line-height: 1;
            color: var(--u-color-base-foreground-contrast, #071c31);
          }

          .event-card__date-month {
            font-family: var(--u-font-body);
            font-weight: 500;
            font-size: 14px;
            line-height: 1.4;
            color: var(--u-color-base-foreground-subtle, #607081);
          }

          /* ── Content column ── */
          .event-card__content {
            display: flex;
            flex-direction: column;
            flex: 1;
            min-width: 0;
            gap: 8px;
          }

          /* ── Header row ── */
          .event-card__header {
            display: flex;
            gap: 4px;
            align-items: center;
            justify-content: space-between;
            padding-left: 2px;
          }

          .event-card__sport-label {
            display: flex;
            gap: 4px;
            align-items: center;
            flex: 1;
            min-width: 0;
          }

          .event-card__sport-icon {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
          }

          .event-card__type {
            font-family: var(--u-font-body);
            font-weight: 500;
            font-size: 12px;
            line-height: 1.4;
            color: var(--u-color-base-foreground, #36485c);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .event-card__athletes {
            display: flex;
            align-items: center;
            flex-shrink: 0;
          }

          .event-card__athlete-avatar {
            margin-left: -6px;
          }

          .event-card__athlete-avatar:first-child {
            margin-left: 0;
          }

          /* ── Teams / matchup ── */
          .event-card__teams {
            display: flex;
            flex-direction: column;
            gap: 8px;
            width: 100%;
          }

          .event-card__team {
            display: flex;
            gap: 4px;
            align-items: center;
          }

          .event-card__team-name {
            flex: 1;
            font-family: var(--u-font-body);
            font-size: 16px;
            line-height: 1.4;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .event-card__team-name--winner {
            font-weight: 700;
            color: var(--u-color-base-foreground-contrast, #071c31);
          }

          .event-card__team-name--loser {
            font-weight: 500;
            color: var(--u-color-base-foreground, #36485c);
          }

          .event-card__team-name--default {
            font-weight: 700;
            color: var(--u-color-base-foreground-contrast, #071c31);
          }

          /* Score + arrow */
          .event-card__score {
            display: flex;
            gap: 8px;
            align-items: center;
            flex-shrink: 0;
          }

          .event-card__score-value {
            font-family: var(--u-font-body);
            font-size: 16px;
            line-height: 1.4;
            text-align: center;
          }

          .event-card__score-value--winner {
            font-weight: 700;
            color: var(--u-color-base-foreground-contrast, #071c31);
          }

          .event-card__score-value--loser {
            font-weight: 500;
            color: var(--u-color-base-foreground, #36485c);
          }

          .event-card__arrow-placeholder {
            width: 8px;
            height: 8px;
            flex-shrink: 0;
            visibility: hidden;
          }

          /* ── Default variant: status badge + footer ── */
          .event-card__matchup {
            display: flex;
            gap: 8px;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }

          .event-card__status {
            display: flex;
            gap: 4px;
            align-items: center;
            justify-content: flex-end;
            padding: 3px 6px;
            flex-shrink: 0;
            min-width: 76px;
            margin-left: auto;
          }

          .event-card__status-icon img {
            width: 16px;
            height: 16px;
            display: block;
          }

          .event-card__status-icon-img {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
          }

          .event-card__status-text {
            font-family: var(--u-font-body);
            font-weight: 700;
            font-size: 16px;
            line-height: 1.2;
            text-transform: uppercase;
            letter-spacing: 0.25px;
            white-space: nowrap;
            color: var(--u-color-base-foreground-contrast, #071c31);
          }

          .event-card__footer {
            display: flex;
            gap: 12px;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }

          .event-card__location {
            display: flex;
            flex: 1;
            gap: 4px;
            align-items: center;
            padding: 12px 0;
            min-width: 0;
          }

          .event-card__location-icon img {
            width: 16px;
            height: 16px;
            display: block;
            flex-shrink: 0;
          }

          .event-card__location-text {
            flex: 1;
            font-family: var(--u-font-body);
            font-weight: 400;
            font-size: 14px;
            line-height: 1.4;
            color: var(--u-color-base-foreground, #36485c);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .event-card__ticket img {
            width: 16px;
            height: 16px;
            display: block;
          }

          @media (max-width: 767px) {
            .event-card__date-weekday { font-size: 20px; }
            .event-card__date-day    { font-size: 40px; }
            .event-card__date-month  { font-size: 14px; }
            .event-card__type        { font-size: 12px; }
            .event-card__team-name   { font-size: 14px; }
            .event-card__status-text { font-size: 14px; }
          }
        `}
      </style>
      <div
        className={`event-card event-card--${variant}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View ${event.type} event`}
      >
        <div className={`event-card__container ${isCompact ? 'event-card__container--top' : ''}`}>

          {/* Date column */}
          <div className="event-card__date">
            <div className="event-card__date-weekday">{event.date.weekday}</div>
            <div className="event-card__date-day">{event.date.day}</div>
            <div className="event-card__date-month">{event.date.month}</div>
          </div>

          {/* Content */}
          <div className="event-card__content">

            {/* Header: sport icon + type label + athlete avatars */}
            <div className="event-card__header">
              <div className="event-card__sport-label">
                {event.sportIcon && (
                  <img src={event.sportIcon} alt="" className="event-card__sport-icon" />
                )}
                <span className="event-card__type">{event.type}</span>
              </div>
              {event.athletes && event.athletes.length > 0 && (
                <div className="event-card__athletes">
                  {event.athletes.map((athlete, index) => (
                    <Avatar
                      key={index}
                      variant="user"
                      size="xsmall"
                      src={athlete.avatar}
                      initials={athlete.initials}
                      className="event-card__athlete-avatar"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ── Compact (past games carousel) ── */}
            {isCompact ? (
              <div className="event-card__teams">
                {/* Away team */}
                <div className="event-card__team">
                  <Avatar
                    variant="team"
                    size="xsmall"
                    src={event.awayTeam.avatar}
                    initials={event.awayTeam.initials}
                    icon={event.sportIcon}
                  />
                  <span className={`event-card__team-name ${event.awayTeam.isWinner ? 'event-card__team-name--winner' : 'event-card__team-name--loser'}`}>
                    {event.awayTeam.name}
                  </span>
                  <div className="event-card__score">
                    <span className={`event-card__score-value ${event.awayTeam.isWinner ? 'event-card__score-value--winner' : 'event-card__score-value--loser'}`}>
                      {event.awayTeam.score}
                    </span>
                    {event.awayTeam.isWinner
                      ? <WinnerArrow />
                      : <div className="event-card__arrow-placeholder" />
                    }
                  </div>
                </div>

                {/* Home team */}
                <div className="event-card__team">
                  <Avatar
                    variant="team"
                    size="xsmall"
                    src={event.homeTeam.avatar}
                    initials={event.homeTeam.initials}
                    icon={event.sportIcon}
                  />
                  <span className={`event-card__team-name ${event.homeTeam.isWinner ? 'event-card__team-name--winner' : 'event-card__team-name--loser'}`}>
                    {event.homeTeam.name}
                  </span>
                  <div className="event-card__score">
                    <span className={`event-card__score-value ${event.homeTeam.isWinner ? 'event-card__score-value--winner' : 'event-card__score-value--loser'}`}>
                      {event.homeTeam.score}
                    </span>
                    {event.homeTeam.isWinner
                      ? <WinnerArrow />
                      : <div className="event-card__arrow-placeholder" />
                    }
                  </div>
                </div>
              </div>

            ) : (
              /* ── Default (upcoming / list view) ── */
              <>
                <div className="event-card__matchup">
                  <div className="event-card__teams">
                    {/* Away team */}
                    <div className="event-card__team">
                      <Avatar variant="team" size="xsmall" src={event.awayTeam.avatar} initials={event.awayTeam.initials} icon={event.sportIcon} />
                      <span className={`event-card__team-name ${isPast ? (event.awayTeam.isWinner ? 'event-card__team-name--winner' : 'event-card__team-name--loser') : 'event-card__team-name--default'}`}>
                        {event.awayTeam.name}
                      </span>
                      {isPast && (
                        <div className="event-card__score">
                          <span className={`event-card__score-value ${event.awayTeam.isWinner ? 'event-card__score-value--winner' : 'event-card__score-value--loser'}`}>
                            {event.awayTeam.score}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Home team */}
                    <div className="event-card__team">
                      <Avatar variant="team" size="xsmall" src={event.homeTeam.avatar} initials={event.homeTeam.initials} icon={event.sportIcon} />
                      <span className={`event-card__team-name ${isPast ? (event.homeTeam.isWinner ? 'event-card__team-name--winner' : 'event-card__team-name--loser') : 'event-card__team-name--default'}`}>
                        {event.homeTeam.name}
                      </span>
                      {isPast && (
                        <div className="event-card__score">
                          <span className={`event-card__score-value ${event.homeTeam.isWinner ? 'event-card__score-value--winner' : 'event-card__score-value--loser'}`}>
                            {event.homeTeam.score}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status badge */}
                  {isLive ? (
                    <div style={{ position: 'relative', minWidth: '76px', height: '24px' }}>
                      <Badge isLive={true} icon={RecordIcon} text="Live" position="top-left" />
                    </div>
                  ) : (
                    <div className="event-card__status">
                      {isUpcoming && (
                        <img
                          src={event.videos?.livestream ? RecordIcon : RecordOffIcon}
                          alt=""
                          className="event-card__status-icon-img"
                        />
                      )}
                      <div className="event-card__status-text">
                        {isPast && 'Final'}
                        {isUpcoming && event.time}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="event-card__footer">
                  <div className="event-card__location">
                    <div className="event-card__location-icon">
                      <img src={LocationIcon} alt="" />
                    </div>
                    <div className="event-card__location-text">{event.location}</div>
                  </div>
                  {event.hasTickets && (
                    <div className="event-card__ticket">
                      <img src={TicketIcon} alt="Tickets available" />
                    </div>
                  )}
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default EventCard
