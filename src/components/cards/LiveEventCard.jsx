import React from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../common/Avatar'
import { getEventWithTeamDetails } from '../../config/data/dataConfig'
import { getVideoSource } from '../../config/videoConfig'
import { getSportIcon } from '../../config/data/helpers/sportIcons'
import LocationIcon from '../../assets/ui-icons/Location.svg'
import TicketIcon from '../../assets/ui-icons/Ticket.svg'
import RecordIcon from '../../assets/ui-icons/Record.svg'
import RecordOffIcon from '../../assets/ui-icons/Record Off.svg'
import PlayIcon from '../../assets/ui-icons/Play.svg'

const LiveEventCard = ({ event, onClick, fullWidth = false }) => {
  const navigate = useNavigate()

  const fullEvent = getEventWithTeamDetails(event.id)
  if (!fullEvent) return null

  const hasVideo = !!fullEvent.videos?.livestream
  const videoSource = hasVideo ? getVideoSource(fullEvent.videos.livestream) : null
  const thumbnailPoster = videoSource?.poster || null
  const athletes = fullEvent.featuredAthletes || []
  const sportIcon = getSportIcon(fullEvent.sport)

  const handleClick = () => {
    if (onClick) onClick()
    else navigate(`/event/${fullEvent.id}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const dateLabel = fullEvent.date
    ? `${fullEvent.date.weekday}, ${fullEvent.date.month} ${fullEvent.date.day}`
    : ''

  // Avatar sizes scale up in full-width mode
  const mainAvatarSize = fullWidth ? 'large' : (hasVideo ? 'medium' : 'large')
  const stackAvatarSize = fullWidth ? 'large' : (hasVideo ? 'small' : 'medium')

  // HOME SIDE: shows verified athlete connections
  // - 0 athletes: just team avatar
  // - 1 athlete: team avatar (main) + athlete xsmall corner badge
  // - 2 athletes: 2 stacked athlete avatars
  // - 3+ athletes: 2 stacked + xsmall 3rd athlete in corner
  const renderHomeSide = () => {
    if (athletes.length === 0) {
      return (
        <div className="lec__team-col">
          <Avatar
            variant="team"
            size={mainAvatarSize}
            src={fullEvent.homeTeam.avatar}
            initials={fullEvent.homeTeam.initials}
          />
          <span className="lec__team-abbr">{fullEvent.homeTeam.initials}</span>
        </div>
      )
    }

    if (athletes.length === 1) {
      return (
        <div className="lec__team-col">
          <div className="lec__badge-wrapper">
            <Avatar
              variant="user"
              size={mainAvatarSize}
              src={athletes[0].avatar}
              initials={athletes[0].initials}
            />
            <div className="lec__corner-badge">
              <Avatar
                variant="team"
                size="small"
                src={fullEvent.homeTeam.avatar}
                initials={fullEvent.homeTeam.initials}
              />
            </div>
          </div>
          <span className="lec__team-abbr">{fullEvent.homeTeam.initials}</span>
        </div>
      )
    }

    // 2+ athletes: stacked
    return (
      <div className="lec__team-col">
        <div className="lec__athlete-stack">
          {athletes.slice(0, 2).map((athlete, i) => (
            <Avatar
              key={athlete.id}
              variant="user"
              size={stackAvatarSize}
              src={athlete.avatar}
              initials={athlete.initials}
              className={i > 0 ? 'lec__stack-overlap' : ''}
            />
          ))}
          {athletes.length >= 3 && (
            <Avatar
              variant="user"
              size="xsmall"
              src={athletes[2].avatar}
              initials={athletes[2].initials}
              className="lec__stack-corner"
            />
          )}
        </div>
        <span className="lec__team-abbr">{fullEvent.homeTeam.initials}</span>
      </div>
    )
  }

  // AWAY SIDE: always just the team avatar
  const renderAwaySide = () => (
    <div className="lec__team-col">
      <Avatar
        variant="team"
        size={mainAvatarSize}
        src={fullEvent.awayTeam.avatar}
        initials={fullEvent.awayTeam.initials}
      />
      <span className="lec__team-abbr">{fullEvent.awayTeam.initials}</span>
    </div>
  )

  // CENTER: video thumbnail w/ LIVE badge, or date + time
  const renderCenter = () => {
    if (hasVideo) {
      return (
        <div
          className={`lec__video-thumb${fullWidth ? ' lec__video-thumb--full' : ''}`}
          style={thumbnailPoster ? {
            backgroundImage: `url(${thumbnailPoster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } : undefined}
        >
          <div className="lec__live-badge">
            <img src={RecordIcon} alt="" className="lec__live-badge-icon" />
            <span className="lec__live-badge-text">LIVE</span>
          </div>
          <img src={PlayIcon} alt="Play" className="lec__play-icon" />
        </div>
      )
    }

    return (
      <div className={`lec__no-video-center${fullWidth ? ' lec__no-video-center--full' : ''}`}>
        <span className="lec__date-label">{dateLabel}</span>
        <div className="lec__time-row">
          <img src={RecordOffIcon} alt="" className="lec__clock-icon" />
          <span className="lec__time-label">{fullEvent.time}</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>
        {`
          .lec {
            flex-shrink: 0;
            width: 300px;
            background: var(--u-color-background-callout, #f8f8f9);
            border-radius: 8px;
            overflow: visible;
            display: flex;
            flex-direction: column;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            padding-top: 12px;
          }

          .lec.lec--full-width {
            width: 100%;
          }

          .lec--full-width .lec__matchup {
            gap: 32px;
            padding-bottom: 32px;
          }

          .lec--full-width .lec__team-abbr {
            font-size: 18px;
          }


          .lec--full-width .lec__live-badge {
            padding: 4px 10px;
            gap: 6px;
          }

          .lec--full-width .lec__live-badge-icon {
            width: 18px;
            height: 18px;
          }

          .lec--full-width .lec__live-badge-text {
            font-size: 14px;
          }

          .lec:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          }

          .lec:active {
            transform: translateY(0);
          }

          .lec:focus-visible {
            outline: 2px solid var(--u-color-emphasis-foreground-active, #0066cc);
            outline-offset: 2px;
            border-radius: 8px;
          }

          /* ── Sport header row ── */
          .lec__sport-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            padding: 0 16px 20px;
          }

          .lec__sport-icon {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
          }

          .lec__sport-name {
            font-family: var(--u-font-body);
            font-weight: 500;
            font-size: 14px;
            line-height: 1.4;
            color: var(--u-color-base-foreground, #36485c);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          /* ── Matchup row ── */
          .lec__matchup {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            padding: 0 16px 16px;
          }

          /* ── Team column ── */
          .lec__team-col {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            flex-shrink: 0;
          }

          .lec__team-abbr {
            font-family: var(--u-font-body);
            font-weight: 500;
            font-size: 14px;
            line-height: 1.4;
            color: var(--u-color-base-foreground, #36485c);
            text-align: center;
            min-width: 32px;
          }

          /* ── Single connection: team avatar + athlete corner badge ── */
          .lec__badge-wrapper {
            position: relative;
            display: inline-flex;
          }

          .lec__corner-badge {
            position: absolute;
            bottom: -3px;
            right: -12px;
            border-radius: 50%;
            border: 1px solid var(--u-color-background-callout, #f8f8f9);
            background: var(--u-color-background-callout, #f8f8f9);
            line-height: 0;
          }

          /* ── Multiple connections: stacked athlete avatars ── */
          .lec__athlete-stack {
            display: flex;
            align-items: flex-end;
            flex-direction: row;
          }

          .lec__athlete-stack > * {
            position: relative;
          }

          .lec__athlete-stack > *:first-child {
            z-index: 2;
          }

          .lec__stack-overlap {
            margin-left: -10px;
            z-index: 1;
          }

          .lec__stack-corner {
            margin-left: -8px;
            z-index: 3;
          }

          /* ── Video thumbnail (live w/ video) ── */
          .lec__video-thumb {
            position: relative;
            width: 128px;
            height: 72px;
            background: #0b0b1a;
            border: 2px solid #bb1700;
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .lec__video-thumb--full {
            flex: 1;
            width: auto;
            height: auto;
            aspect-ratio: 16 / 9;
            max-width: 200px;
          }

          .lec__live-badge {
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            background: #bb1700;
            border-radius: 2px;
            padding: 2px 6px;
            display: flex;
            align-items: center;
            gap: 4px;
            white-space: nowrap;
          }

          .lec__live-badge-icon {
            width: 14px;
            height: 14px;
            filter: brightness(0) invert(1);
          }

          .lec__live-badge-text {
            font-family: var(--u-font-body);
            font-weight: 700;
            font-size: 11px;
            line-height: 1.2;
            color: #fefefe;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .lec__play-icon {
            width: 28px;
            height: 28px;
            filter: brightness(0) invert(1);
            opacity: 0.85;
          }

          /* ── No-video center (scheduled time) ── */
          .lec__no-video-center {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            min-width: 80px;
          }

          .lec__no-video-center--full .lec__date-label {
            font-size: 24px;
          }

          .lec__no-video-center--full .lec__time-label {
            font-size: 20px;
          }

          .lec__no-video-center--full .lec__clock-icon {
            width: 24px;
            height: 24px;
          }

          .lec__date-label {
            font-family: var(--u-font-body);
            font-weight: 700;
            font-size: 16px;
            line-height: 1.2;
            color: var(--u-color-base-foreground-contrast, #071c31);
            white-space: nowrap;
            text-align: center;
          }

          .lec__time-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
          }

          .lec__clock-icon {
            width: 16px;
            height: 16px;
            color: var(--u-color-base-foreground, #36485c);
            flex-shrink: 0;
          }

          .lec__time-label {
            font-family: var(--u-font-body);
            font-weight: 500;
            font-size: 14px;
            line-height: 1.4;
            color: var(--u-color-base-foreground, #36485c);
            white-space: nowrap;
          }

          /* ── Footer: location + ticket ── */
          .lec__footer {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 0 16px;
            border-top: 1px dashed var(--u-color-line-subtle, #c4c6c8);
            min-height: 44px;
          }

          .lec__location {
            display: flex;
            align-items: center;
            gap: 4px;
            flex: 1;
            min-width: 0;
          }

          .lec__location-icon {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
            opacity: 0.6;
          }

          .lec__location-text {
            font-family: var(--u-font-body);
            font-weight: 500;
            font-size: 14px;
            line-height: 1.4;
            color: var(--u-color-base-foreground, #36485c);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .lec__ticket-icon {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
            opacity: 0.6;
          }
        `}
      </style>
      <div
        className={`lec${fullWidth ? ' lec--full-width' : ''}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Live: ${fullEvent.type} – ${fullEvent.homeTeam.initials} vs ${fullEvent.awayTeam.initials}`}
      >
        {/* Sport header */}
        <div className="lec__sport-row">
          {sportIcon && <img src={sportIcon} alt="" className="lec__sport-icon" />}
          <span className="lec__sport-name">{fullEvent.type}</span>
        </div>

        {/* Matchup */}
        <div className="lec__matchup">
          {renderHomeSide()}
          {renderCenter()}
          {renderAwaySide()}
        </div>

        {/* Footer */}
        <div className="lec__footer">
          <div className="lec__location">
            <img src={LocationIcon} alt="" className="lec__location-icon" />
            <span className="lec__location-text">{fullEvent.location}</span>
          </div>
          {fullEvent.hasTickets && (
            <img src={TicketIcon} alt="" className="lec__ticket-icon" />
          )}
        </div>
      </div>
    </>
  )
}

export default LiveEventCard
