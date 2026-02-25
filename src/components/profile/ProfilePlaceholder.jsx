import React from 'react'

/**
 * ProfilePlaceholder - "Coming soon" placeholder component for profile sections
 * Used when data is not yet available in scenario files
 *
 * @param {string} title - Section title
 * @param {string} description - Description of what's coming
 * @param {string} icon - Optional icon URL
 */
const ProfilePlaceholder = ({ title, description, icon }) => {
  return (
    <>
      <style>
        {`
          .profile-placeholder {
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding: 32px 16px;
            background: var(--u-color-base-background-subtle, #f5f5f5);
            border-radius: 8px;
            text-align: center;
            width: 100%;
          }

          .profile-placeholder__header {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }

          .profile-placeholder__icon {
            width: 48px;
            height: 48px;
            opacity: 0.4;
          }

          .profile-placeholder__title {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 20px;
            line-height: 1.2;
            color: var(--u-color-base-foreground, #36485c);
            margin: 0;
          }

          .profile-placeholder__description {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-regular, 400);
            font-size: 16px;
            line-height: 1.4;
            color: var(--u-color-base-foreground-subtle, #607081);
            margin: 0;
          }

          .profile-placeholder__badge {
            display: inline-block;
            padding: 4px 12px;
            background: var(--u-color-emphasis-background-subtle, #e6f2ff);
            color: var(--u-color-emphasis-foreground-active, #0066cc);
            border-radius: 12px;
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          @media (max-width: 767px) {
            .profile-placeholder {
              padding: 24px 16px;
            }

            .profile-placeholder__title {
              font-size: 18px;
            }

            .profile-placeholder__description {
              font-size: 14px;
            }
          }
        `}
      </style>
      <div className="profile-placeholder">
        <div className="profile-placeholder__header">
          {icon && <img src={icon} alt="" className="profile-placeholder__icon" />}
          <h3 className="profile-placeholder__title">{title}</h3>
        </div>
        <p className="profile-placeholder__description">{description}</p>
        <div>
          <span className="profile-placeholder__badge">Coming Soon</span>
        </div>
      </div>
    </>
  )
}

export default ProfilePlaceholder
