import React from 'react'
import Button from '../common/Button'

/**
 * ProfileHeader - Reusable header component for profile pages
 * Can be used for athlete, team, and organization profiles
 *
 * @param {Object} avatar - Avatar component to display
 * @param {string} title - Main title (e.g., athlete name)
 * @param {string} subtitle - Subtitle text (e.g., "Class of 2027")
 * @param {Array} actions - Array of action button objects {label, onClick, type}
 * @param {string} variant - 'athlete', 'team', or 'org'
 */
const ProfileHeader = ({ avatar, title, subtitle, actions = [], variant = 'athlete' }) => {
  return (
    <>
      <style>
        {`
          .profile-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
            padding: 48px 80px 40px;
            background: var(--u-color-background-container, #fefefe);
          }

          .profile-header__avatar-container {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .profile-header__info {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }

          .profile-header__title {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 32px;
            line-height: 1.2;
            color: var(--u-color-base-foreground-contrast, #071c31);
            margin: 0;
            text-align: center;
          }

          .profile-header__subtitle {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-medium, 500);
            font-size: 18px;
            line-height: 1.4;
            color: var(--u-color-base-foreground, #36485c);
            margin: 0;
            text-align: center;
          }

          .profile-header__actions {
            display: flex;
            gap: 12px;
            align-items: center;
            justify-content: center;
          }

          @media (max-width: 767px) {
            .profile-header {
              padding: 32px 16px 24px;
              gap: 16px;
            }

            .profile-header__title {
              font-size: 24px;
            }

            .profile-header__subtitle {
              font-size: 16px;
            }

            .profile-header__actions {
              flex-direction: column;
              width: 100%;
            }

            .profile-header__actions > * {
              width: 100%;
            }
          }
        `}
      </style>
      <div className="profile-header">
        <div className="profile-header__avatar-container">
          {avatar}
        </div>
        <div className="profile-header__info">
          <h1 className="profile-header__title">{title}</h1>
          {subtitle && <p className="profile-header__subtitle">{subtitle}</p>}
        </div>
        {actions.length > 0 && (
          <div className="profile-header__actions">
            {actions.map((action, index) => (
              <Button
                key={index}
                buttonStyle="standard"
                buttonType={action.type || 'secondary'}
                size="medium"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default ProfileHeader
