import React, { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileSection from '../components/profile/ProfileSection'
import ProfileListItem from '../components/profile/ProfileListItem'
import EventCard from '../components/cards/EventCard'
import Avatar from '../components/common/Avatar'
import { getSportIcon } from '../config/helpers/sportIcons'
import {
  getOrganizationById,
  mapOrganizationToProfileSections
} from '../config/data/dataConfig'

const OrgProfilePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Fetch org data
  const org = useMemo(() => getOrganizationById(id), [id])

  // Define handlers
  const handlers = useMemo(() => ({
    actions: [],
    onEventClick: (eventId) => navigate(`/event/${eventId}`),
    onTeamClick: (teamId) => navigate(`/team/${teamId}`),
    onAthleteClick: (athleteId) => navigate(`/athlete/${athleteId}`)
  }), [navigate])

  // Map org to section props
  const sectionProps = useMemo(
    () => org ? mapOrganizationToProfileSections(org, handlers) : null,
    [org, handlers]
  )

  // Error state
  if (!org) {
    return (
      <>
        <style>
          {`
            .org-profile__error {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 400px;
              padding: 48px 16px;
              text-align: center;
            }

            .org-profile__error-title {
              font-family: var(--u-font-body);
              font-weight: var(--u-font-weight-bold, 700);
              font-size: 24px;
              color: var(--u-color-base-foreground, #36485c);
              margin: 0 0 12px 0;
            }

            .org-profile__error-message {
              font-family: var(--u-font-body);
              font-weight: var(--u-font-weight-regular, 400);
              font-size: 16px;
              color: var(--u-color-base-foreground-subtle, #607081);
              margin: 0;
            }
          `}
        </style>
        <div className="org-profile__error">
          <h1 className="org-profile__error-title">Organization Not Found</h1>
          <p className="org-profile__error-message">
            The organization you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <style>
        {`
          .org-profile__container {
            width: 100%;
            min-height: 100vh;
            background-color: var(--u-color-background-container, #fefefe);
            overflow: hidden;
            position: relative;
            display: flex;
            flex-direction: column;
          }

          .org-profile__content {
            display: flex;
            flex-direction: column;
            gap: 48px;
            padding: 0 80px 80px;
            max-width: 1280px;
            width: 100%;
            margin: 0 auto;
          }

          .org-profile__details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px;
          }

          .org-profile__detail-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .org-profile__detail-label {
            font-family: var(--u-font-body);
            font-size: 12px;
            font-weight: var(--u-font-weight-medium, 500);
            color: var(--u-color-base-foreground-subtle, #607081);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .org-profile__detail-value {
            font-family: var(--u-font-body);
            font-size: 16px;
            font-weight: var(--u-font-weight-regular, 400);
            color: var(--u-color-base-foreground, #36485c);
          }

          .org-profile__detail-link {
            font-family: var(--u-font-body);
            font-size: 16px;
            font-weight: var(--u-font-weight-regular, 400);
            color: var(--u-color-brand-primary, #007bff);
            text-decoration: none;
          }

          .org-profile__detail-link:hover {
            text-decoration: underline;
          }

          .org-profile__stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 16px;
          }

          .org-profile__stat-card {
            background: var(--u-color-base-background-subtle, #f5f5f5);
            border-radius: 8px;
            padding: 16px;
            text-align: center;
          }

          .org-profile__stat-value {
            font-family: var(--u-font-body);
            font-size: 32px;
            font-weight: var(--u-font-weight-bold, 700);
            color: var(--u-color-base-foreground, #36485c);
            margin: 0 0 4px 0;
          }

          .org-profile__stat-label {
            font-family: var(--u-font-body);
            font-size: 12px;
            font-weight: var(--u-font-weight-regular, 400);
            color: var(--u-color-base-foreground-subtle, #607081);
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          @media (max-width: 767px) {
            .org-profile__container {
              padding-top: 136px;
            }

            .org-profile__content {
              padding: 0 16px 48px;
              gap: 32px;
            }

            .org-profile__details-grid {
              grid-template-columns: 1fr;
            }

            .org-profile__stats-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        `}
      </style>
      <div className="org-profile__container">
        {/* Header Section */}
        <ProfileHeader
          avatar={
            <Avatar
              variant="org"
              size="xlarge"
              src={sectionProps.header.avatar}
              initials={sectionProps.header.initials}
            />
          }
          title={sectionProps.header.name}
          subtitle={sectionProps.header.subtitle}
          actions={sectionProps.header.actions}
          variant="org"
        />

        <div className="org-profile__content">
          {/* About Section */}
          <ProfileSection title="About">
            <div className="org-profile__details-grid">
              <div className="org-profile__detail-group">
                <p className="org-profile__detail-label">Type</p>
                <p className="org-profile__detail-value">{org.type}</p>
              </div>
              <div className="org-profile__detail-group">
                <p className="org-profile__detail-label">Location</p>
                <p className="org-profile__detail-value">
                  {org.location.city}, {org.location.state}
                </p>
              </div>
              {org.details.established && (
                <div className="org-profile__detail-group">
                  <p className="org-profile__detail-label">Established</p>
                  <p className="org-profile__detail-value">{org.details.established}</p>
                </div>
              )}
              {org.details.mascot && (
                <div className="org-profile__detail-group">
                  <p className="org-profile__detail-label">Mascot</p>
                  <p className="org-profile__detail-value">{org.details.mascot}</p>
                </div>
              )}
              {org.metadata.enrollment && (
                <div className="org-profile__detail-group">
                  <p className="org-profile__detail-label">Enrollment</p>
                  <p className="org-profile__detail-value">{org.metadata.enrollment}</p>
                </div>
              )}
              {org.metadata.classification && (
                <div className="org-profile__detail-group">
                  <p className="org-profile__detail-label">Classification</p>
                  <p className="org-profile__detail-value">{org.metadata.classification}</p>
                </div>
              )}
            </div>
          </ProfileSection>

          {/* Contact Info Section */}
          {(org.details.phone || org.details.website || org.location.address) && (
            <ProfileSection title="Contact Information">
              <div className="org-profile__details-grid">
                {org.location.address && (
                  <div className="org-profile__detail-group">
                    <p className="org-profile__detail-label">Address</p>
                    <p className="org-profile__detail-value">
                      {org.location.address}
                      <br />
                      {org.location.city}, {org.location.state} {org.location.zipCode}
                    </p>
                  </div>
                )}
                {org.details.phone && (
                  <div className="org-profile__detail-group">
                    <p className="org-profile__detail-label">Phone</p>
                    <p className="org-profile__detail-value">{org.details.phone}</p>
                  </div>
                )}
                {org.details.website && (
                  <div className="org-profile__detail-group">
                    <p className="org-profile__detail-label">Website</p>
                    <a
                      href={org.details.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="org-profile__detail-link"
                    >
                      {org.details.website.replace('https://', '')}
                    </a>
                  </div>
                )}
              </div>
            </ProfileSection>
          )}

          {/* Stats Overview Section */}
          {sectionProps.stats.hasData && (
            <ProfileSection title="Overview">
              <div className="org-profile__stats-grid">
                <div className="org-profile__stat-card">
                  <p className="org-profile__stat-value">{org.stats.totalTeams}</p>
                  <p className="org-profile__stat-label">Teams</p>
                </div>
                <div className="org-profile__stat-card">
                  <p className="org-profile__stat-value">{org.stats.totalAthletes}</p>
                  <p className="org-profile__stat-label">Athletes</p>
                </div>
                <div className="org-profile__stat-card">
                  <p className="org-profile__stat-value">{org.stats.activeSports.length}</p>
                  <p className="org-profile__stat-label">Sports</p>
                </div>
              </div>
            </ProfileSection>
          )}

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
                      icon={getSportIcon(team.sport.icon)}
                    />
                  }
                  title={team.sport.name}
                  subtitle={`${team.record}`}
                  onClick={() => handlers.onTeamClick(team.id)}
                  isLast={index === sectionProps.teams.teams.length - 1}
                />
              ))}
            </ProfileSection>
          )}

          {/* Athletes Section */}
          {sectionProps.athletes.athletes.length > 0 && (
            <ProfileSection title="Athletes">
              {sectionProps.athletes.athletes.map((athlete, index) => (
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
                  isLast={index === sectionProps.athletes.athletes.length - 1}
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

          {/* Leadership Section */}
          {(org.details.athleticDirector || org.details.principal) && (
            <ProfileSection title="Leadership">
              <div className="org-profile__details-grid">
                {org.details.principal && (
                  <div className="org-profile__detail-group">
                    <p className="org-profile__detail-label">Principal</p>
                    <p className="org-profile__detail-value">{org.details.principal}</p>
                  </div>
                )}
                {org.details.athleticDirector && (
                  <div className="org-profile__detail-group">
                    <p className="org-profile__detail-label">Athletic Director</p>
                    <p className="org-profile__detail-value">{org.details.athleticDirector}</p>
                  </div>
                )}
              </div>
            </ProfileSection>
          )}
        </div>
      </div>
    </>
  )
}

export default OrgProfilePage
