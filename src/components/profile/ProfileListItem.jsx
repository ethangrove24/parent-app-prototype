import React from 'react'
import ChevronIcon from '../../assets/ui-icons/UI Navigation Forward.svg'

/**
 * ProfileListItem - Reusable list item for profile pages
 * Used for teams, events, and other list items in profiles
 *
 * @param {ReactNode} avatar - Avatar component
 * @param {string} title - Item title
 * @param {string} subtitle - Item subtitle
 * @param {Function} onClick - Click handler
 * @param {boolean} showChevron - Whether to show chevron (default: true)
 * @param {boolean} isLast - Whether this is the last item in the list
 */
const ProfileListItem = ({
  avatar,
  title,
  subtitle,
  onClick,
  showChevron = true,
  isLast = false
}) => {
  return (
    <>
      <style>
        {`
          .profile-list-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            background: transparent;
            border: none;
            border-bottom: 1px solid var(--u-color-line-subtle, #c4c6c8);
            cursor: pointer;
            transition: background-color 0.2s;
            width: 100%;
            text-align: left;
          }

          .profile-list-item--last {
            border-bottom: none;
          }

          .profile-list-item:hover {
            background-color: var(--u-color-base-background-subtle, #f5f5f5);
          }

          .profile-list-item:focus-visible {
            outline: 2px solid var(--u-color-emphasis-foreground-active, #0066cc);
            outline-offset: 2px;
          }

          .profile-list-item__info {
            display: flex;
            flex-direction: column;
            gap: 2px;
            flex: 1;
            min-width: 0;
          }

          .profile-list-item__title {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-medium, 500);
            font-size: 16px;
            line-height: 1.4;
            color: var(--u-color-base-foreground-contrast, #071c31);
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .profile-list-item__subtitle {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-regular, 400);
            font-size: 14px;
            line-height: 1.4;
            color: var(--u-color-base-foreground-subtle, #607081);
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .profile-list-item__chevron {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
            opacity: 0.6;
          }
        `}
      </style>
      <button
        className={`profile-list-item ${isLast ? 'profile-list-item--last' : ''}`}
        onClick={onClick}
        type="button"
      >
        {avatar}
        <div className="profile-list-item__info">
          <p className="profile-list-item__title">{title}</p>
          {subtitle && <p className="profile-list-item__subtitle">{subtitle}</p>}
        </div>
        {showChevron && (
          <img src={ChevronIcon} alt="" className="profile-list-item__chevron" />
        )}
      </button>
    </>
  )
}

export default ProfileListItem
