import React from 'react'

const Badge = ({ text, icon, isLive = false, position = 'top-left' }) => {
  const positionStyles = {
    'top-left': { top: '8px', left: '8px' },
    'top-right': { top: '8px', right: '8px' },
    'bottom-left': { bottom: '8px', left: '8px' },
    'bottom-right': { bottom: '8px', right: '8px' }
  }

  return (
    <>
      <style>
        {`
          .badge {
            position: absolute;
            backdrop-filter: blur(6px);
            background-color: rgba(0, 0, 0, 0.5);
            padding: 3px 8px;
            border-radius: 4px;
            font-family: 'Helvetica', sans-serif;
            font-weight: 700;
            font-size: 14px;
            color: #FEFEFE;
            line-height: 1.417;
            z-index: 2;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .badge--live {
            background-color: var(--interjection-critical, #bb1700);
            padding: 3px 8px 3px 6px;
            text-transform: uppercase;
            letter-spacing: 0.25px;
          }

          .badge__icon {
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .badge__icon img {
            width: 100%;
            height: 100%;
            display: block;
            filter: brightness(0) invert(1);
          }
        `}
      </style>
      <div
        className={`badge ${isLive ? 'badge--live' : ''}`}
        style={positionStyles[position]}
      >
        {icon && (
          <div className="badge__icon">
            <img src={icon} alt="" />
          </div>
        )}
        <span>{text}</span>
      </div>
    </>
  )
}

export default Badge
