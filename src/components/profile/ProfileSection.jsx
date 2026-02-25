import React from 'react'

/**
 * ProfileSection - Reusable section wrapper for profile pages
 *
 * @param {string} title - Section title
 * @param {string} seeAllLink - Optional "See All" link URL
 * @param {Function} onSeeAll - Optional click handler for "See All"
 * @param {Object} emptyState - Optional empty state {message, icon}
 * @param {ReactNode} children - Section content
 */
const ProfileSection = ({ title, seeAllLink, onSeeAll, emptyState, children }) => {
  const childrenArray = React.Children.toArray(children)
  const hasContent = childrenArray.length > 0

  return (
    <>
      <style>
        {`
          .profile-section {
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 100%;
          }

          .profile-section__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .profile-section__title {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 24px;
            line-height: 1.2;
            color: var(--u-color-base-foreground, #36485c);
            margin: 0;
          }

          .profile-section__see-all {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 14px;
            color: var(--u-color-emphasis-foreground-active, #0066cc);
            text-decoration: none;
            cursor: pointer;
            background: none;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
          }

          .profile-section__see-all:hover {
            background-color: var(--u-color-emphasis-background-subtle, #e6f2ff);
          }

          .profile-section__content {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .profile-section__empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 48px 16px;
            text-align: center;
            color: var(--u-color-base-foreground-subtle, #607081);
          }

          .profile-section__empty-icon {
            width: 48px;
            height: 48px;
            opacity: 0.5;
          }

          .profile-section__empty-message {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-medium, 500);
            font-size: 16px;
            line-height: 1.4;
            color: var(--u-color-base-foreground-subtle, #607081);
            margin: 0;
          }

          @media (max-width: 767px) {
            .profile-section__title {
              font-size: 20px;
            }
          }
        `}
      </style>
      <section className="profile-section">
        <div className="profile-section__header">
          <h2 className="profile-section__title">{title}</h2>
          {(seeAllLink || onSeeAll) && hasContent && (
            <button
              className="profile-section__see-all"
              onClick={onSeeAll}
            >
              See All
            </button>
          )}
        </div>
        {hasContent ? (
          <div className="profile-section__content">
            {children}
          </div>
        ) : emptyState ? (
          <div className="profile-section__empty">
            {emptyState.icon && (
              <img src={emptyState.icon} alt="" className="profile-section__empty-icon" />
            )}
            <p className="profile-section__empty-message">{emptyState.message}</p>
          </div>
        ) : null}
      </section>
    </>
  )
}

export default ProfileSection
