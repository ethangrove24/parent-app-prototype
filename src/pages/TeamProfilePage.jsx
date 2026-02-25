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
  getTeamById,
  mapTeamToProfileSections
} from '../config/data/dataConfig'

const TeamProfilePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Fetch team data
  const team = useMemo(() => getTeamById(id), [id])

  // Define handlers
  const handlers = useMemo(() => ({
    actions: [
      {
        label: "View Schedule",
        onClick: () => {
          // Navigate to first event or schedule section
          const events = team ? mapTeamToProfileSections(team).events.upcomingEvents : []
          if (events.length > 0) {
            navigate(`/event/${events[0].id}`)
          }
        },
        type: "primary"
      }
    ],
    onEventClick: (eventId) => navigate(`/event/${eventId}`),
    onHighlightClick: (highlightId) => navigate(`/highlight/${highlightId}`),
    onAthleteClick: (athleteId) => navigate(`/athlete/${athleteId}`),
    onOrgClick: (orgId) => navigate(`/org/${orgId}`)
  }), [navigate, team])

  // Map team to section props
  const sectionProps = useMemo(
    () => team ? mapTeamToProfileSections(team, handlers) : null,
    [team, handlers]
  )

  // Error state
  if (!team) {
    return (
      <>
        <style>
          {`
            .team-profile__error {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 400px;
              padding: 48px 16px;
              text-align: center;
            }

            .team-profile__error-title {
              font-family: var(--u-font-body);
              font-weight: var(--u-font-weight-bold, 700);
              font-size: 24px;
              color: var(--u-color-base-foreground, #36485c);
              margin: 0 0 12px 0;
            }

            .team-profile__error-message {
              font-family: var(--u-font-body);
              font-weight: var(--u-font-weight-regular, 400);
              font-size: 16px;
              color: var(--u-color-base-foreground-subtle, #607081);
              margin: 0;
            }
          `}
        </style>
        <div className="team-profile__error">
          <h1 className="team-profile__error-title">Team Not Found</h1>
          <p className="team-profile__error-message">
            The team you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <style>
        {`
          .team-profile__container {
            width: 100%;
            min-height: 100vh;
            background-color: var(--u-color-background-container, #fefefe);
            overflow: hidden;
            position: relative;
            display: flex;
            flex-direction: column;
          }

          .team-profile__content {
            display: flex;
            flex-direction: column;
            gap: 48px;
            padding: 0 80px 80px;
            max-width: 1280px;
            width: 100%;
            margin: 0 auto;
          }

          .team-profile__highlights-carousel {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            overflow-y: hidden;
            padding-bottom: 8px;
            scrollbar-width: thin;
            -ms-overflow-style: auto;
          }

          .team-profile__highlights-carousel::-webkit-scrollbar {
            height: 8px;
          }

          .team-profile__highlights-carousel::-webkit-scrollbar-track {
            background: var(--u-color-base-background-subtle, #f5f5f5);
            border-radius: 4px;
          }

          .team-profile__highlights-carousel::-webkit-scrollbar-thumb {
            background: var(--u-color-base-foreground-subtle, #607081);
            border-radius: 4px;
          }

          .team-profile__stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
          }

          .team-profile__stat-card {
            background: var(--u-color-base-background-subtle, #f5f5f5);
            border-radius: 8px;
            padding: 16px;
          }

          .team-profile__stat-label {
            font-family: var(--u-font-body);
            font-size: 12px;
            font-weight: var(--u-font-weight-regular, 400);
            color: var(--u-color-base-foreground-subtle, #607081);
            margin: 0 0 4px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .team-profile__stat-value {
            font-family: var(--u-font-body);
            font-size: 24px;
            font-weight: var(--u-font-weight-bold, 700);
            color: var(--u-color-base-foreground, #36485c);
            margin: 0;
          }

          .team-profile__achievements-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .team-profile__achievement {
            font-family: var(--u-font-body);
            font-size: 14px;
            font-weight: var(--u-font-weight-regular, 400);
            color: var(--u-color-base-foreground, #36485c);
            padding: 12px 16px;
            background: var(--u-color-base-background-subtle, #f5f5f5);
            border-radius: 6px;
          }

          @media (max-width: 767px) {
            .team-profile__container {
              padding-top: 136px;
            }

            .team-profile__content {
              padding: 0 16px 48px;
              gap: 32px;
            }

            .team-profile__stats-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        `}
      </style>
      <div className="team-profile__container">
        {/* Header Section */}
        <ProfileHeader
          avatar={
            <Avatar
              variant="team"
              size="xlarge"
              src={sectionProps.header.avatar}
              initials={sectionProps.header.initials}
              icon={getSportIcon(team.sport.icon)}
            />
          }
          title={sectionProps.header.name}
          subtitle={sectionProps.header.subtitle}
          actions={sectionProps.header.actions}
          variant="team"
        />

        <div className="team-profile__content">
          {/* Organization Section */}
          {sectionProps.organization.organization && (
            <ProfileSection title="Organization">
              <ProfileListItem
                avatar={
                  <Avatar
                    variant="org"
                    size="small"
                    src={sectionProps.organization.organization.avatar}
                    initials={sectionProps.organization.organization.initials}
                  />
                }
                title={sectionProps.organization.organization.name}
                subtitle={`${sectionProps.organization.organization.location.city}, ${sectionProps.organization.organization.location.state}`}
                onClick={() => handlers.onOrgClick(sectionProps.organization.organization.id)}
                isLast={true}
              />
            </ProfileSection>
          )}

          {/* Season Stats Section */}
          {sectionProps.stats.hasData && sectionProps.stats.seasonStats && (
            <ProfileSection title="Season Stats">
              <div className="team-profile__stats-grid">
                <div className="team-profile__stat-card">
                  <p className="team-profile__stat-label">Record</p>
                  <p className="team-profile__stat-value">{team.record}</p>
                </div>
                <div className="team-profile__stat-card">
                  <p className="team-profile__stat-label">Win %</p>
                  <p className="team-profile__stat-value">
                    {(sectionProps.stats.seasonStats.winPercentage * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="team-profile__stat-card">
                  <p className="team-profile__stat-label">Streak</p>
                  <p className="team-profile__stat-value">{sectionProps.stats.seasonStats.streak}</p>
                </div>
                <div className="team-profile__stat-card">
                  <p className="team-profile__stat-label">Conference</p>
                  <p className="team-profile__stat-value">{sectionProps.stats.seasonStats.conferenceRecord}</p>
                </div>
              </div>
            </ProfileSection>
          )}

          {/* Achievements Section */}
          {sectionProps.stats.achievements && sectionProps.stats.achievements.length > 0 && (
            <ProfileSection title="Achievements">
              <div className="team-profile__achievements-list">
                {sectionProps.stats.achievements.map((achievement, index) => (
                  <div key={index} className="team-profile__achievement">
                    {achievement}
                  </div>
                ))}
              </div>
            </ProfileSection>
          )}

          {/* Roster Section */}
          {sectionProps.roster.athletes.length > 0 && (
            <ProfileSection title="Roster">
              {sectionProps.roster.athletes.map((athlete, index) => (
                <ProfileListItem
                  key={athlete.id}
                  avatar={
                    <Avatar
                      variant="user"
                      size="small"
                      src={athlete.avatar}
                      initials={athlete.initials}
                    />
                  }
                  title={athlete.fullName}
                  subtitle={athlete.graduationYear ? `Class of ${athlete.graduationYear}` : null}
                  onClick={() => handlers.onAthleteClick(athlete.id)}
                  isLast={index === sectionProps.roster.athletes.length - 1}
                />
              ))}
            </ProfileSection>
          )}

          {/* Coaching Staff Section */}
          {sectionProps.roster.coaches.length > 0 && (
            <ProfileSection title="Coaching Staff">
              {sectionProps.roster.coaches.map((coach, index) => (
                <ProfileListItem
                  key={coach.id}
                  avatar={
                    <Avatar
                      variant="user"
                      size="small"
                      src={coach.avatar}
                      initials={coach.initials}
                    />
                  }
                  title={`${coach.firstName} ${coach.lastName}`}
                  subtitle={coach.role}
                  isLast={index === sectionProps.roster.coaches.length - 1}
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
              <div className="team-profile__highlights-carousel">
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
        </div>
      </div>
    </>
  )
}

export default TeamProfilePage
