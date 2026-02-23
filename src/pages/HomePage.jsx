import React from 'react'
import { useWorkspace } from '../context/WorkspaceContext'
import VideoPlayer from '../components/video/VideoPlayer'
import LivestreamCard from '../components/cards/LivestreamCard'
import HighlightCard from '../components/cards/HighlightCard'
import EventCard from '../components/cards/EventCard'
import Avatar from '../components/common/Avatar'
import { getVideoSource } from '../config/videoConfig'
import {
  getLivestreams,
  getHighlights,
  getEventsByStatus,
  getAthletes,
  enrichLivestreamForDisplay,
  enrichHighlightForDisplay,
  enrichEventForDisplay
} from '../config/data/dataConfig'

// Note: Using pink placeholder for missing icons per icon usage rules
const UpArrowIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
    <path d="M4 0L0 8H8L4 0Z" fill="hotpink" />
  </svg>
)

const DownArrowIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
    <path d="M4 8L8 0H0L4 8Z" fill="hotpink" />
  </svg>
)

const HomePage = () => {
  const { selectedWorkspace } = useWorkspace()
  const isPersonalWorkspace = selectedWorkspace.id === 'personal'

  // Get data from centralized config
  const livestreamEvents = Object.values(getLivestreams()).map(enrichLivestreamForDisplay)
  const highlights = Object.values(getHighlights()).map(enrichHighlightForDisplay)
  const events = getEventsByStatus('upcoming').map(enrichEventForDisplay)
  const recentResults = getEventsByStatus('past').map(enrichEventForDisplay)
  const athletes = Object.values(getAthletes())

  return (
    <>
      <style>
        {`
          .home-page {
            display: flex;
            flex-direction: column;
            gap: 48px;
            width: 100%;
          }

          /* Section Headers */
          .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
          }

          .section-title {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 24px;
            line-height: 1.2;
            color: var(--u-color-base-foreground, #36485c);
            margin: 0;
          }

          .section-link {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 14px;
            color: var(--u-color-emphasis-foreground-active, #0066cc);
            text-decoration: none;
            cursor: pointer;
            background: none;
            border: none;
            padding: 0px 12px;
            border-radius: 4px;
            display: none; /* Temporarily hidden - remove this line to show "See All" buttons */
          }

          .section-link:hover {
            background-color: var(--u-color-emphasis-background-subtle, #e6f2ff);
          }

          /* Hero Carousel Section */
          .hero-carousel {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            overflow-y: hidden;
            padding-bottom: 8px;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .hero-carousel::-webkit-scrollbar {
            display: none;
          }

          /* Highlights Section */
          .highlights-carousel {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            overflow-y: hidden;
            padding-bottom: 8px;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .highlights-carousel::-webkit-scrollbar {
            display: none;
          }

          /* Recent Results Section */
          .recent-results-carousel {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            overflow-y: hidden;
            padding-bottom: 8px;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .recent-results-carousel::-webkit-scrollbar {
            display: none;
          }

          .recent-results-carousel .event-card {
            width: 90%;
            flex-shrink: 0;
          }

          /* Athletes Section */
          .athletes-list {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            overflow-y: hidden;
            padding-bottom: 0px;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .athletes-list::-webkit-scrollbar {
            display: none;
          }

          .athlete-item {
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            gap: 4px;
            align-items: center;
          }


          .athlete-name {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-default, 400);
            font-size: 14px;
            line-height: 1.4;
            color: var(--u-color-base-foreground, #36485c);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 64px;
            text-align: center;
          }

          /* Event Card Styles */
          .event-card {
            display: flex;
            gap: 24px;
            padding: 12px;
            border-bottom: 1px solid var(--u-color-line-subtle, #c4c6c8);
          }

          .event-date {
            flex-shrink: 0;
            width: 64px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 0 8px;
          }

          .event-day {
            font-family: var(--u-font-body);
            font-weight: 500;
            font-size: 20px;
            line-height: 1.2;
            color: var(--u-color-base-foreground, #36485c);
          }

          .event-date-num {
            font-family: var(--u-font-body);
            font-weight: 700;
            font-style: italic;
            font-size: 40px;
            line-height: 1;
            color: var(--u-color-base-foreground-contrast, #071c31);
          }

          .event-month {
            font-family: var(--u-font-body);
            font-weight: 500;
            font-size: 14px;
            line-height: 1.4;
            color: var(--u-color-base-foreground-subtle, #607081);
          }

          .event-details {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .event-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-height: 24px;
          }

          .event-type {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-default, 400);
            font-size: 12px;
            line-height: 1.4;
            color: var(--u-color-base-foreground-subtle, #607081);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex: 1;
          }

          .event-matchup {
            display: flex;
            gap: 8px;
            align-items: center;
          }

          .event-teams {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .event-team {
            display: flex;
            gap: 4px;
            align-items: center;
          }

          .event-team-avatar {
            flex-shrink: 0;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: var(--u-color-emphasis-background-active, #96ccf3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 10px;
            color: var(--u-color-emphasis-foreground-contrast, #0d3673);
          }

          .event-team-name {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 16px;
            line-height: 1.4;
            color: var(--u-color-base-foreground-contrast, #071c31);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex: 1;
          }

          .event-team-name.loser {
            font-weight: 500;
            color: var(--u-color-base-foreground, #36485c);
          }

          .event-score {
            display: flex;
            gap: 8px;
            align-items: center;
          }

          .event-score-value {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 16px;
            line-height: 1.4;
            color: var(--u-color-base-foreground-contrast, #071c31);
            text-align: center;
          }

          .event-score-value.loser {
            font-weight: 500;
            color: var(--u-color-base-foreground, #36485c);
          }

          .event-status {
            min-width: 90px;
            padding: 3px 6px;
            display: flex;
            gap: 4px;
            align-items: center;
            justify-content: center;
          }

          .event-status-text {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 16px;
            line-height: 1.2;
            color: var(--u-color-base-foreground-contrast, #071c31);
            text-transform: uppercase;
            letter-spacing: 0.25px;
            text-align: right;
          }

          .event-location {
            display: flex;
            gap: 4px;
            align-items: center;
            padding: 12px 0;
          }

          .event-location-text {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-default, 400);
            font-size: 14px;
            line-height: 1.4;
            color: var(--u-color-base-foreground, #36485c);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex: 1;
          }

          .upcoming-games-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .upcoming-games-list .event-card:last-child {
            border-bottom: none;
          }

          /* Desktop Styles */
          @media (min-width: 768px) {
            .page-header {
              display: none !important;
            }
          }

          /* Mobile Styles */
          @media (max-width: 767px) {
            .home-page {
              gap: 48px;
              padding-top: 136px;
            }

            .section-title {
              font-size: 24px;
            }

            .hero-carousel,
            .highlights-carousel,
            .recent-results-carousel {
              margin-left: -16px;
              margin-right: -16px;
              padding-left: 16px;
              padding-right: 16px;
            }
          }
        `}
      </style>
      <div className="content-inner">
        <div className="page-header">
          <h1 className="page-header-title">Home</h1>
        </div>
        <div className="page-body">
          <div className="home-page">
            {/* Hero Carousel Section */}
            <section>
              <div className="hero-carousel">
                {livestreamEvents.map((event, index) => (
                  <LivestreamCard key={index} event={event} />
                ))}
              </div>
            </section>

            {/* Highlights Made For You */}
            <section>
              <div className="section-header">
                <h2 className="section-title">Highlights Made For You</h2>
                <button className="section-link">See All</button>
              </div>
              <div className="highlights-carousel">
                {highlights.map((highlight) => (
                  <HighlightCard key={highlight.id} highlight={highlight} />
                ))}
              </div>
            </section>

            {/* Recent Results */}
            <section>
              <div className="section-header">
                <h2 className="section-title">Recent Results</h2>
                <button className="section-link">See All</button>
              </div>
              <div className="recent-results-carousel">
                {recentResults.map((event) => (
                  <EventCard key={event.id} event={event} variant="bordered" />
                ))}
              </div>
            </section>

            {/* Your Athletes */}
            <section>
              <div className="section-header">
                <h2 className="section-title">Your Athletes</h2>
                <button className="section-link">See All</button>
              </div>
              <div className="athletes-list">
                {athletes.map((athlete) => (
                  <div key={athlete.id} className="athlete-item">
                    <Avatar variant="user" size="large" src={athlete.avatar} initials={athlete.initials} />
                    <div className="athlete-name">{athlete.firstName}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Games */}
            <section>
              <div className="section-header">
                <h2 className="section-title">Upcoming Games</h2>
                <button className="section-link">See All</button>
              </div>
              <div className="upcoming-games-list">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
