import React, { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileSection from '../components/profile/ProfileSection'
import ProfileListItem from '../components/profile/ProfileListItem'
import ProfilePlaceholder from '../components/profile/ProfilePlaceholder'
import EventCard from '../components/cards/EventCard'
import HighlightCard from '../components/cards/HighlightCard'
import Avatar from '../components/common/Avatar'
import { getSportIcon } from '../config/helpers/sportIcons'
import {
  getAthleteById,
  mapAthleteToProfileSections
} from '../config/data/dataConfig'

const AthleteProfilePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Fetch athlete data (similar to useAthleteProfile hook from reference)
  const athlete = useMemo(() => getAthleteById(id), [id])

  // Define handlers (similar to reference architecture)
  const handlers = useMemo(() => ({
    actions: [
      {
        label: "View Highlights",
        onClick: () => {
          // Navigate to first highlight or highlights section
          const highlights = athlete ? mapAthleteToProfileSections(athlete).highlights.highlights : []
          if (highlights.length > 0) {
            navigate(`/highlight/${highlights[0].id}`)
          }
        },
        type: "primary"
      }
    ],
    onEventClick: (eventId) => navigate(`/event/${eventId}`),
    onHighlightClick: (highlightId) => navigate(`/highlight/${highlightId}`),
    onTeamClick: (teamId) => navigate(`/team/${teamId}`)
  }), [navigate, athlete])

  // Map athlete to section props (similar to mapAthleteDetailsDataToProfileSectionProps)
  const sectionProps = useMemo(
    () => athlete ? mapAthleteToProfileSections(athlete, handlers) : null,
    [athlete, handlers]
  )

  // Three-state UI pattern: loading/error/success
  if (!athlete) {
    return (
      <>
        <style>
          {`
            .athlete-profile__error {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 400px;
              padding: 48px 16px;
              text-align: center;
            }

            .athlete-profile__error-title {
              font-family: var(--u-font-body);
              font-weight: var(--u-font-weight-bold, 700);
              font-size: 24px;
              color: var(--u-color-base-foreground, #36485c);
              margin: 0 0 12px 0;
            }

            .athlete-profile__error-message {
              font-family: var(--u-font-body);
              font-weight: var(--u-font-weight-regular, 400);
              font-size: 16px;
              color: var(--u-color-base-foreground-subtle, #607081);
              margin: 0;
            }
          `}
        </style>
        <div className="athlete-profile__error">
          <h1 className="athlete-profile__error-title">Athlete Not Found</h1>
          <p className="athlete-profile__error-message">
            The athlete you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <style>
        {`
          .athlete-profile__container {
            width: 100%;
            min-height: 100vh;
            background-color: var(--u-color-background-container, #fefefe);
            overflow: hidden;
            position: relative;
            display: flex;
            flex-direction: column;
          }

          .athlete-profile__content {
            display: flex;
            flex-direction: column;
            gap: 48px;
            padding: 0 80px 80px;
            max-width: 1280px;
            width: 100%;
            margin: 0 auto;
          }

          .athlete-profile__highlights-carousel {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            overflow-y: hidden;
            padding-bottom: 8px;
            scrollbar-width: thin;
            -ms-overflow-style: auto;
          }

          .athlete-profile__highlights-carousel::-webkit-scrollbar {
            height: 8px;
          }

          .athlete-profile__highlights-carousel::-webkit-scrollbar-track {
            background: var(--u-color-base-background-subtle, #f5f5f5);
            border-radius: 4px;
          }

          .athlete-profile__highlights-carousel::-webkit-scrollbar-thumb {
            background: var(--u-color-base-foreground-subtle, #607081);
            border-radius: 4px;
          }

          .athlete-profile__events-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          @media (max-width: 767px) {
            .athlete-profile__container {
              padding-top: 136px;
            }

            .athlete-profile__content {
              padding: 0 16px 48px;
              gap: 32px;
            }
          }
        `}
      </style>
      <div className="athlete-profile__container">
        {/* Header Section */}
        <ProfileHeader
          avatar={
            <Avatar
              variant="user"
              size="xlarge"
              src={sectionProps.header.avatar}
              initials={sectionProps.header.initials}
            />
          }
          title={sectionProps.header.name}
          subtitle={sectionProps.header.subtitle}
          actions={sectionProps.header.actions}
          variant="athlete"
        />

        <div className="athlete-profile__content">
          {/* About Section - Placeholder */}
          <ProfilePlaceholder
            title="About"
            description="Athlete bio, location, and physical stats will be available here soon"
          />

          {/* Stats Section - Placeholder */}
          <ProfilePlaceholder
            title="Stats & Performance"
            description="Performance metrics and achievements will be displayed here soon"
          />

          {/* Teams Section */}
          {sectionProps.teams.teams.length > 0 && (
            <ProfileSection title="Teams">
              {sectionProps.teams.teams.map((team, index) => (
                <ProfileListItem
                  key={team.id}
                  avatar={
                    <Avatar
                      variant="team"
                      size="small"
                      src={team.avatar}
                      initials={team.initials}
                      icon={getSportIcon(team.sport)}
                    />
                  }
                  title={team.name}
                  subtitle={`${team.sport}${team.record ? ' · ' + team.record : ''}`}
                  onClick={() => handlers.onTeamClick(team.id)}
                  isLast={index === sectionProps.teams.teams.length - 1}
                />
              ))}
            </ProfileSection>
          )}

          {/* Upcoming Events Section */}
          <ProfileSection
            title="Upcoming Events"
            emptyState={{ message: "No upcoming events" }}
          >
            {sectionProps.events.upcomingEvents.slice(0, 5).map(event => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => handlers.onEventClick(event.id)}
              />
            ))}
          </ProfileSection>

          {/* Recent Highlights Section */}
          <ProfileSection
            title="Recent Highlights"
            emptyState={{ message: "No highlights yet" }}
          >
            {sectionProps.highlights.highlights.length > 0 && (
              <div className="athlete-profile__highlights-carousel">
                {sectionProps.highlights.highlights.map(highlight => (
                  <HighlightCard
                    key={highlight.id}
                    highlight={highlight}
                    onClick={() => handlers.onHighlightClick(highlight.id)}
                  />
                ))}
              </div>
            )}
          </ProfileSection>

          {/* Past Events Section */}
          {sectionProps.events.pastEvents.length > 0 && (
            <ProfileSection
              title="Past Events"
              emptyState={{ message: "No past events" }}
            >
              {sectionProps.events.pastEvents.slice(0, 5).map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  variant="bordered"
                  onClick={() => handlers.onEventClick(event.id)}
                />
              ))}
            </ProfileSection>
          )}

          {/* Career History Section - Placeholder */}
          <ProfilePlaceholder
            title="Career History"
            description="Season-by-season career history will be available here soon"
          />
        </div>
      </div>
    </>
  )
}

export default AthleteProfilePage
