import React from 'react'

// Helper function to determine text color based on background
const getContentColor = (bgColor) => {
  // For the design system, we default to white for dark backgrounds
  return '#FFFFFF'
}

const Avatar = ({
  variant = 'user', // 'user', 'org', 'team'
  size = 'medium', // 'xsmall', 'small', 'medium', 'large', 'xlarge', 'profile'
  isEmpty = false,
  src = null, // Image source
  initials = '', // For text display (e.g., "ME", "JD", "HUDL")
  icon = null, // For team variant - sport icon
  alt = '',
  interactive = false,
  onClick,
  className = '',
}) => {
  const sizeMap = {
    xsmall: 24,
    small: 32,
    medium: 48,
    large: 64,
    xlarge: 128,
    profile: 192,
  }

  const fontSizeMap = {
    xsmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 40,
    profile: 60,
  }

  // Background colors for each variant
  const variantColors = {
    user: isEmpty ? 'var(--u-color-base-foreground-subtle, #607081)' : 'var(--u-color-base-foreground, #36485c)',
    org: isEmpty ? 'var(--u-color-base-foreground-subtle, #607081)' : 'var(--u-color-base-foreground, #36485c)',
    team: isEmpty ? 'var(--u-color-base-foreground-subtle, #607081)' : 'var(--u-color-base-foreground, #36485c)',
  }

  // Border radius for each variant
  const borderRadiusMap = {
    user: '50%',
    org: '50%',
    team: 'var(--u-border-radius-xlarge, 9999px)',
  }

  const dimension = sizeMap[size]
  const fontSize = fontSizeMap[size]
  const borderRadius = borderRadiusMap[variant]
  const backgroundColor = variantColors[variant]
  const textColor = getContentColor(backgroundColor)

  // Determine aria-label based on variant
  const getAriaLabel = () => {
    if (alt) return alt

    const variantLabel = variant === 'user' ? 'user' : variant

    if (src) return `${variantLabel} avatar with image`
    if (initials) return `${variantLabel} avatar with initials ${initials}`
    if (icon) return `${variantLabel} avatar with icon`
    return `${variantLabel} avatar`
  }

  const ariaLabel = getAriaLabel()

  // Empty state icons for each variant
  const EmptyStateIcon = () => {
    if (variant === 'user') {
      return (
        <svg
          width="60%"
          height="60%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4ZM12 14C8.67 14 2 15.67 2 19V20C2 20.55 2.45 21 3 21H21C21.55 21 22 20.55 22 20V19C22 15.67 15.33 14 12 14Z"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      )
    }

    if (variant === 'org') {
      return (
        <svg
          width="60%"
          height="60%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      )
    }

    if (variant === 'team') {
      return (
        <svg
          width="60%"
          height="60%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 5V19L19 12L8 5Z"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      )
    }

    return null
  }

  return (
    <>
      <style>
        {`
          .avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            overflow: hidden;
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            position: relative;
            transition: all 0.2s ease;
          }

          .avatar--interactive {
            cursor: pointer;
          }

          .avatar--interactive:hover::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: currentColor;
            opacity: 0.2;
            pointer-events: none;
            border-radius: inherit;
          }

          .avatar--interactive:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px var(--u-color-background-container, #fefefe),
                        0 0 0 4px var(--u-color-emphasis-foreground-active, #0066cc);
          }

          .avatar--interactive:active::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--u-color-base-foreground-contrast, #071c31);
            opacity: 0.2;
            pointer-events: none;
            border-radius: inherit;
          }

          .avatar__image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .avatar__text {
            user-select: none;
            line-height: 1;
          }

          .avatar__icon {
            width: 70%;
            height: 70%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .avatar__icon img,
          .avatar__icon svg {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: brightness(0) invert(1);
          }

          .avatar--has-image {
            border: 2px solid rgba(255, 255, 255, 0.2);
          }

          .avatar--user.avatar--empty {
            background-color: var(--u-color-base-foreground-subtle, #607081);
          }

          .avatar--org.avatar--empty {
            background-color: var(--u-color-base-foreground-subtle, #607081);
          }

          .avatar--team.avatar--empty {
            background-color: var(--u-color-base-foreground-subtle, #607081);
          }
        `}
      </style>
      <div
        className={`avatar avatar--${variant} ${interactive ? 'avatar--interactive' : ''} ${isEmpty ? 'avatar--empty' : ''} ${src ? 'avatar--has-image' : ''} ${className}`}
        style={{
          width: `${dimension}px`,
          height: `${dimension}px`,
          borderRadius,
          backgroundColor: src ? 'transparent' : backgroundColor,
          color: textColor,
          fontSize: `${fontSize}px`,
        }}
        onClick={interactive ? onClick : undefined}
        tabIndex={interactive ? 0 : undefined}
        role={interactive ? 'button' : undefined}
        aria-label={ariaLabel}
      >
        {src ? (
          <img src={src} alt={alt} className="avatar__image" />
        ) : isEmpty ? (
          <EmptyStateIcon />
        ) : icon ? (
          <div className="avatar__icon">
            {typeof icon === 'string' ? <img src={icon} alt="" /> : icon}
          </div>
        ) : initials ? (
          <span className="avatar__text">{initials}</span>
        ) : (
          <EmptyStateIcon />
        )}
      </div>
    </>
  )
}

export default Avatar
