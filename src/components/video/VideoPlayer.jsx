import React, { useRef, useState } from 'react'
import Avatar from '../common/Avatar'

const VideoPlayer = ({
  src,
  poster,
  autoplay = false,
  muted = true,
  loop = true,
  controls = false,
  className = '',
  preload = 'metadata',
  style = {},
  athletes = null // Array of athlete objects with avatar, initials
}) => {
  const videoRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <>
      <style>
        {`
          .video-player-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            background-color: var(--u-color-base-background, #e0e1e1);
            overflow: hidden;
            z-index: 1;
          }

          .video-player {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .video-player-loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-default, 400);
            font-size: 14px;
            color: var(--u-color-base-foreground-subtle, #607081);
          }

          .video-player-error {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-default, 400);
            font-size: 14px;
            color: var(--u-color-base-foreground-subtle, #607081);
            text-align: center;
          }

          .video-player-overlay {
            position: absolute;
            top: 12px;
            right: 12px;
            display: flex;
            gap: 4px;
            align-items: center;
            z-index: 10;
            pointer-events: none;
          }

          .video-player-overlay__athlete {
            margin-left: -8px;
          }

          .video-player-overlay__athlete:first-child {
            margin-left: 0;
          }
        `}
      </style>
      <div className={`video-player-wrapper ${className}`} style={style}>
        {isLoading && !hasError && (
          <div className="video-player-loading">Loading video...</div>
        )}
        {hasError && (
          <div className="video-player-error">Video unavailable</div>
        )}
        <video
          ref={videoRef}
          className="video-player"
          src={src}
          poster={poster}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          controls={controls}
          preload={preload}
          onLoadedData={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Athlete Avatars Overlay */}
        {athletes && athletes.length > 0 && (
          <div className="video-player-overlay">
            {athletes.map((athlete, index) => (
              <Avatar
                key={index}
                variant="user"
                size="xsmall"
                src={athlete.avatar}
                initials={athlete.initials}
                className="video-player-overlay__athlete"
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default VideoPlayer
