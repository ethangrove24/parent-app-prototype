import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useWorkspace } from '../../context/WorkspaceContext'
import Button from '../common/Button'
import SubnavItem from './SubnavItem'
import Avatar from '../common/Avatar'
import { getParent } from '../../config/data/dataConfig'

// Import SVG icons
import HomeIcon from '../../assets/ui-icons/home.svg'
import ProgramsIcon from '../../assets/ui-icons/programs.svg'
import TicketsIcon from '../../assets/ui-icons/Tickets.svg'
import FinancesIcon from '../../assets/ui-icons/finances.svg'
import TeamsIcon from '../../assets/ui-icons/teams.svg'
import MembersIcon from '../../assets/ui-icons/members.svg'
import SettingsIcon from '../../assets/ui-icons/settings.svg'
import CalendarIcon from '../../assets/ui-icons/calendar.svg'
import MessagesIcon from '../../assets/ui-icons/messages.svg'
import NotificationsIcon from '../../assets/ui-icons/notifications.svg'
import ExpandCollapseIcon from '../../assets/ui-icons/expand-collapse.svg'
import ExpandDownIcon from '../../assets/ui-icons/expand-down.svg'
import HudlLogoIcon from '../../assets/ui-icons/hudl-logo.svg'
import HudlHighSchoolLogo from '../../assets/ui-icons/hudl-high-school-logo.png'
import HudlPersonalIcon from '../../assets/ui-icons/hudl-personal-icon.png'
import PlaceholderIcon from '../../assets/ui-icons/placeholder.svg'
import SearchIcon from '../../assets/ui-icons/search.svg'
import FavoritesIcon from '../../assets/ui-icons/Star.svg'
import WiFiIcon from '../../assets/ui-icons/WiFi.svg'
import BatteryIcon from '../../assets/ui-icons/Battery.svg'
import CellularConnectionIcon from '../../assets/ui-icons/Cellular Connection.svg'
import UINavigationBackArrowIcon from '../../assets/ui-icons/UI Navigation Back Arrow.svg'

const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { selectedWorkspace, setSelectedWorkspace, activeNavItem, setActiveNavItem } = useWorkspace()
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isOrgPopoverOpen, setIsOrgPopoverOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [openGroups, setOpenGroups] = useState([])
  const [isScrolled, setIsScrolled] = useState(false)

  // Get parent data for avatar
  const parent = getParent()

  // Check if current route is a main page (in bottom nav) or a detail page
  // Main pages: / (Home), /search, /favorites, /tickets, /notifications
  // Detail pages: /event/:id, /highlight/:id, or any other sub-level routes
  const mainPages = ['/', '/search', '/favorites', '/tickets', '/notifications']
  const isMainPage = mainPages.includes(location.pathname)
  const shouldShowMobileTopNav = isMainPage
  const shouldShowMobileBottomNav = isMainPage

  // Get page title for secondary nav based on current route
  const getSecondaryNavTitle = () => {
    if (location.pathname.startsWith('/event/')) {
      return 'Event Details'
    } else if (location.pathname.startsWith('/highlight/')) {
      return 'Highlight'
    } else if (location.pathname.startsWith('/athlete/')) {
      return 'Athlete Profile'
    } else if (location.pathname.startsWith('/team/')) {
      return 'Team Profile'
    } else if (location.pathname.startsWith('/org/')) {
      return 'Organization'
    }
    return 'Back'
  }

  // Check if we should hide the secondary nav title on mobile
  const shouldHideSecondaryNavTitle = location.pathname.startsWith('/event/') || location.pathname.startsWith('/highlight/') || location.pathname.startsWith('/athlete/')

  // Detect scroll for mobile shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Update active nav item based on current route
  useEffect(() => {
    const pathToNavItem = {
      '/': 'Home',
      '/search': 'Search',
      '/favorites': 'Favorites',
      '/tickets': 'Tickets',
      '/notifications': 'Notifications'
    }

    const navItem = pathToNavItem[location.pathname]
    if (navItem) {
      setActiveNavItem(navItem)
    }
  }, [location.pathname, setActiveNavItem])

  const directorNavItems = [
    { id: 'Home', icon: HomeIcon, label: 'Home' },
    { id: 'Registrations', icon: ProgramsIcon, label: 'Registrations' },
    { id: 'Tickets', icon: TicketsIcon, label: 'Tickets' },
    { id: 'Finances', icon: FinancesIcon, label: 'Finances' },
    { id: 'Teams', icon: TeamsIcon, label: 'Teams' },
    { id: 'Members', icon: MembersIcon, label: 'Members' },
    {
      id: 'Settings',
      icon: SettingsIcon,
      label: 'Settings',
      children: [
        { id: 'Ticketing', label: 'Ticketing', hasPill: false, pillText: '' },
        { id: 'Payments', label: 'Payments', hasPill: false, pillText: '' },
        { id: 'Users', label: 'Users', hasPill: false, pillText: '' },
        { id: 'Permissions', label: 'Permissions', hasPill: false, pillText: '' },
      ],
    },
  ]

  const teamNavItems = [
    { id: 'Library', icon: PlaceholderIcon, label: 'Library', hasPill: false, pillText: '' },
    { id: 'Reports', icon: PlaceholderIcon, label: 'Reports', hasPill: false, pillText: '' },
    { id: 'Exchanges', icon: PlaceholderIcon, label: 'Exchanges', hasPill: false, pillText: '' },
    {
      id: 'Team',
      icon: PlaceholderIcon,
      label: 'Team',
      children: [
        { id: 'Team Profile', label: 'Team Profile', hasPill: false, pillText: '' },
        { id: 'Manage Team', label: 'Manage Team', hasPill: false, pillText: '' },
        { id: 'Schedule', label: 'Schedule', hasPill: false, pillText: '' },
        { id: 'Team Settings', label: 'Team Settings', hasPill: false, pillText: '' },
      ],
    },
    {
      id: 'Highlights',
      icon: PlaceholderIcon,
      label: 'Highlights',
      children: [
        { id: 'Team Highlights', label: 'Team Highlights', hasPill: false, pillText: '' },
        { id: 'Your Highlights', label: 'Your Highlights', hasPill: false, pillText: '' },
      ],
    },
    {
      id: 'Recruiting',
      icon: PlaceholderIcon,
      label: 'Recruiting',
      children: [
        { id: 'Sharing', label: 'Sharing', hasPill: false, pillText: '' },
        { id: 'College Search', label: 'College Search', hasPill: false, pillText: '' },
        { id: 'Verify Athletes', label: 'Verify Athletes', hasPill: false, pillText: '' },
        { id: 'Recruiting Settings', label: 'Recruiting Settings', hasPill: false, pillText: '' },
      ],
    },
  ]

  const personalWorkspaceNavItems = [
    { id: 'Home', icon: HomeIcon, label: 'Home' },
    { id: 'Search', icon: SearchIcon, label: 'Search' },
    { id: 'Favorites', icon: FavoritesIcon, label: 'Favorites' },
    { id: 'Tickets', icon: TicketsIcon, label: 'Tickets' },
  ]

  const bottomNavItems = [
    { id: 'Calendar', icon: CalendarIcon, label: 'Calendar' },
    { id: 'Messages', icon: MessagesIcon, label: 'Messages' },
    { id: 'Notifications', icon: NotificationsIcon, label: 'Notifications' },
  ]

  const parentOrg = { name: 'Hudl High School' }

  const orgWorkspace = {
    id: 'org',
    name: 'Hudl High School',
    role: 'Director',
    type: 'organization',
    avatar: 'HH'
  }

  const teamWorkspaces = [
    // Football teams
    { id: 'team1', name: 'Varsity Football', role: 'Team Admin', type: 'team', avatar: 'VF', position: 'Middle' },
    { id: 'team2', name: 'Junior Varsity Football', role: 'Team Admin', type: 'team', avatar: 'JVF', position: 'Middle' },
    { id: 'team3', name: 'Freshman Football', role: 'Team Admin', type: 'team', avatar: 'FF', position: 'Middle' },
    // Basketball teams
    { id: 'team4', name: 'Varsity Basketball', role: 'Team Admin', type: 'team', avatar: 'VB', position: 'Middle' },
    { id: 'team5', name: 'Junior Varsity Basketball', role: 'Team Admin', type: 'team', avatar: 'JVB', position: 'Middle' },
    { id: 'team6', name: 'Freshman Basketball', role: 'Team Admin', type: 'team', avatar: 'FB', position: 'Middle' },
    // Volleyball teams
    { id: 'team7', name: 'Varsity Volleyball', role: 'Team Admin', type: 'team', avatar: 'VV', position: 'Middle' },
    { id: 'team8', name: 'Junior Varsity Volleyball', role: 'Team Admin', type: 'team', avatar: 'JVV', position: 'Middle' },
    { id: 'team9', name: 'Freshman Volleyball', role: 'Team Admin', type: 'team', avatar: 'FV', position: 'Bottom' },
  ]

  const personalWorkspace = {
    id: 'personal',
    name: 'Your Hudl',
    subscriptionType: 'Personal',
    avatar: 'U'
  }

  const isTeamWorkspaceSelected = teamWorkspaces.some(
    (workspace) => workspace.id === selectedWorkspace.id
  )
  const isDirectorWorkspaceSelected = selectedWorkspace.id === orgWorkspace.id
  const currentWorkspaceType = isTeamWorkspaceSelected
    ? 'team'
    : isDirectorWorkspaceSelected
      ? 'director'
      : 'personal'

  const currentNavItems =
    currentWorkspaceType === 'team'
      ? teamNavItems
      : currentWorkspaceType === 'personal'
        ? personalWorkspaceNavItems
        : directorNavItems

  const findParentGroupIdForItem = (itemId) => {
    for (const item of currentNavItems) {
      if (Array.isArray(item.children) && item.children.length > 0) {
        if (item.id === itemId) {
          return item.id
        }
        if (item.children.some((child) => child.id === itemId)) {
          return item.id
        }
      }
    }
    return null
  }

  const userMenuItems = [
    { id: 'account-settings', label: 'Account Settings' },
    { id: 'livestream-purchases', label: 'Livestream Purchases' },
    { id: 'tickets-passes', label: 'Tickets & Passes' },
    { id: 'registrations-payments', label: 'Registrations & Payments' },
    { id: 'billing-orders', label: 'Billing & Orders' },
    { id: 'add-team', label: 'Add Another Team' },
    { type: 'separator' },
    { id: 'get-help', label: 'Get Help' },
    { id: 'logout', label: 'Log Out' }
  ]

  return (
    <>
      <style>
        {`
          .navigation-container {
            display: flex;
            height: 100vh;
            background-color: var(--u-color-background-canvas, #eff0f0);
            font-family: var(--u-font-body);
          }

          .nav-sidebar {
            background-color: var(--u-color-background-canvas, #eff0f0);
            display: flex;
            flex-direction: column;
            gap: var(--u-space-half, 8px);
            padding: var(--u-space-half, 8px);
            position: relative;
            transition: width 0.3s ease;
            width: ${isExpanded ? '216px' : '72px'};
            z-index: 2;
            height: 100vh;
            overflow: visible;
          }

          .nav-logo {
            display: flex;
            gap: ${isExpanded ? 'var(--u-space-three-quarter, 12px)' : '0'};
            align-items: center;
            height: 56px;
            padding: 8px;
            border-radius: var(--u-border-radius-large, 4px);
            cursor: pointer;
          }

          .nav-logo-icon {
            width: 40px;
            height: 40px;
            background-color: #ff6300;
            border-radius: var(--u-border-radius-medium, 4px);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            padding: 7px;
          }

          .nav-logo-icon img {
            width: 100%;
            height: 100%;
            display: block;
          }

          .nav-logo-text {
            font-family: var(--u-font-body);
            font-size: var(--u-font-size-450, 24px);
            font-weight: var(--u-font-weight-bold, 700);
            color: var(--u-color-base-foreground-contrast, #071c31);
            white-space: nowrap;
            overflow: hidden;
            opacity: ${isExpanded ? '1' : '0'};
            transition: opacity 0.3s ease;
          }

          .workspace-switcher {
            background-color: var(--u-color-base-background, #e0e1e1);
            display: flex;
            gap: ${isExpanded ? 'var(--u-space-half, 8px)' : '0'};
            align-items: center;
            justify-content: ${isExpanded ? 'flex-start' : 'center'};
            height: 56px;
            padding: var(--u-space-half, 8px);
            padding-right: ${isExpanded ? 'var(--u-space-three-quarter, 12px)' : 'var(--u-space-half, 8px)'};
            border-radius: var(--u-border-radius-large, 4px);
            cursor: pointer;
            transition: background-color 0.2s linear;
            position: relative;
          }

          .workspace-switcher:hover {
            background-color: #C4C6C8;
          }

          .workspace-avatar {
            width: 32px;
            height: 32px;
            border-radius: var(--u-border-radius-medium, 4px);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            overflow: hidden;
            background-color: #ff6300;
          }

          .workspace-avatar.org {
            background-color: var(--identity-navy, #0c3970);
            border-radius: 50%;
          }

          .workspace-avatar img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
            padding: 7px;
          }

          .workspace-avatar.org img {
            padding: 0;
            object-fit: cover;
          }

          .workspace-info {
            display: flex;
            flex-direction: column;
            gap: 0;
            flex: 1;
            min-width: 0;
            opacity: ${isExpanded ? '1' : '0'};
            transition: opacity 0.3s ease;
            overflow: hidden;
          }

          .workspace-label {
            font-size: var(--u-font-size-150, 12px);
            color: var(--u-color-base-foreground-subtle, #607081);
            font-weight: var(--u-font-weight-medium, 500);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .workspace-name {
            font-size: var(--u-font-size-200, 14px);
            color: var(--u-color-base-foreground, #36485c);
            font-weight: var(--u-font-weight-medium, 500);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .workspace-arrow {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
            opacity: ${isExpanded ? '1' : '0'};
            transition: opacity 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .workspace-arrow img {
            width: 16px;
            height: 16px;
            display: block;
            transition: transform 0.2s ease;
          }

          .nav-items-container {
            display: flex;
            flex-direction: column;
            gap: var(--u-space-zero, 0px);
            flex: 1;
            min-height: 0;
            overflow-y: ${isExpanded ? 'auto' : 'visible'};
            overflow-x: visible;
            position: relative;
          }

          .nav-group-open {
            background-color: #F8F8F9;
            border-radius: var(--u-border-radius-large, 4px);
          }

          .nav-item-children {
            display: flex;
            flex-direction: column;
            gap: var(--u-space-zero, 0px);
            padding: 0px 8px 8px 44px
          }

          .nav-item-chevron {
            margin-left: auto;
            width: 24px;
            height: 24px;
            border: none;
            background-color: var(--u-color-base-background, #e0e1e1);
            border-radius: var(--u-border-radius-medium, 4px);
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .nav-item-chevron:hover {
            background-color: #C4C6C8;
          }

          .nav-item-chevron img {
            width: 16px;
            height: 16px;
            display: block;
            transition: transform 0.2s ease;
          }

          .mobile-menu-children {
            display: flex;
            flex-direction: column;
            gap: var(--u-space-eighth, 2px);
            padding: var(--u-space-eighth, 2px) 0;
            background-color: #F8F8F9;
            border-radius: var(--u-border-radius-large, 8px);
          }

          .mobile-menu-item-child {
            padding-left: var(--u-space-two, 32px);
          }

          .mobile-menu-item-child .subnav-item {
            width: 100%;
          }

          .nav-item {
            display: flex;
            gap: ${isExpanded ? 'var(--u-space-one, 16px)' : '0'};
            align-items: center;
            justify-content: ${isExpanded ? 'flex-start' : 'center'};
            height: 40px;
            padding: ${isExpanded ? '0 var(--u-space-half, 8px) 0 var(--u-space-one, 16px)' : '0'};
            border-radius: var(--u-border-radius-large, 4px);
            cursor: pointer;
            transition: all 0.2s ease;
            background-color: transparent;
            color: var(--u-color-base-foreground, #36485c);
            width: 100%;
            position: relative;
          }

          .nav-item:hover {
            background-color: #e0e1e1;
          }

          .nav-item.active {
            background-color: var(--u-color-emphasis-background-active, #96ccf3);
            color: var(--u-color-emphasis-foreground-contrast, #0d3673);
          }

          .nav-item.nav-item--child-active {
            background-color: #e0e1e1;
          }


          .nav-item-icon {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .nav-item-icon img {
            width: 24px;
            height: 24px;
            display: block;
          }

          .nav-item-label {
            font-size: var(--u-font-size-200, 14px);
            font-weight: var(--u-font-weight-medium, 500);
            white-space: nowrap;
            opacity: ${isExpanded ? '1' : '0'};
            transition: opacity 0.3s ease;
            overflow: hidden;
            text-overflow: ellipsis;
            display: ${isExpanded ? 'block' : 'none'};
            line-height: 1.2;
          }

          .nav-item-tooltip {
            position: absolute;
            left: calc(100% + var(--u-space-half, 8px));
            top: 50%;
            transform: translateY(-50%);
            background-color: #191F24;
            color: var(--u-color-background-container, #fefefe);
            padding: var(--u-space-half, 8px) var(--u-space-three-quarter, 12px);
            border-radius: var(--u-border-radius-medium, 4px);
            font-size: var(--u-font-size-200, 14px);
            font-weight: var(--u-font-weight-medium, 500);
            white-space: nowrap;
            pointer-events: none;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.2s ease, visibility 0.2s ease;
            z-index: 1000;
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15), 0px 0px 4px rgba(0, 0, 0, 0.1);
          }

          .nav-item-tooltip::before {
            content: '';
            position: absolute;
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            border: 4px solid transparent;
            border-right-color: #191F24;
          }

          ${!isExpanded ? `
            .nav-item:hover .nav-item-tooltip {
              opacity: 1;
              visibility: visible;
            }
          ` : ''}

          .nav-bottom-items {
            display: flex;
            flex-direction: column;
            gap: var(--u-space-zero, 0px);
            margin-top: auto;
          }

          .user-settings {
            background-color: var(--u-color-base-background, #e0e1e1);
            display: flex;
            gap: ${isExpanded ? 'var(--u-space-half, 8px)' : '0'};
            align-items: center;
            justify-content: ${isExpanded ? 'flex-start' : 'center'};
            height: 56px;
            padding: var(--u-space-half, 8px);
            padding-right: ${isExpanded ? 'var(--u-space-three-quarter, 12px)' : 'var(--u-space-half, 8px)'};
            border-radius: var(--u-border-radius-large, 4px);
            cursor: pointer;
            position: relative;
            transition: background-color 0.2s ease;
          }

          .user-settings:hover {
            background-color: #C4C6C8;
          }


          .user-info {
            display: flex;
            flex-direction: column;
            flex: 1;
            min-width: 0;
            opacity: ${isExpanded ? '1' : '0'};
            transition: opacity 0.3s ease;
            overflow: hidden;
          }

          .user-name {
            font-size: var(--u-font-size-200, 14px);
            color: var(--u-color-base-foreground-contrast, #071c31);
            font-weight: var(--u-font-weight-medium, 500);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .user-arrow {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
            opacity: ${isExpanded ? '1' : '0'};
            transition: opacity 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .user-arrow img {
            width: 16px;
            height: 16px;
            display: block;
            transition: transform 0.2s ease;
          }

          .org-popover {
            position: absolute;
            top: 0;
            left: calc(100% + var(--u-space-half, 8px));
            background-color: var(--u-color-background-popover, #fefefe);
            border-radius: var(--u-border-radius-large, 4px);
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15), 0px 0px 4px rgba(0, 0, 0, 0.1);
            min-width: 200px;
            z-index: 9999;
            padding: var(--u-space-three-quarter, 12px);
            display: ${isOrgPopoverOpen ? 'flex' : 'none'};
            flex-direction: column;
            gap: 12px;
          }

          .org-popover-header {
            font-family: var(--u-font-body);
            font-size: var(--u-font-size-250, 16px);
            font-weight: var(--u-font-weight-bold, 700);
            line-height: 1.2;
            color: #000000;
            margin: 0;
            padding: 0;
          }

          .org-popover-teams {
            display: flex;
            flex-direction: column;
            gap: var(--u-space-zero, 0px);
          }

          .org-popover-item {
            display: flex;
            gap: var(--u-space-half, 8px);
            align-items: center;
            height: 56px;
            padding: 0 var(--u-space-one, 16px) 0 var(--u-space-half, 8px);
            border-radius: var(--u-border-radius-large, 4px);
            cursor: pointer;
            transition: background-color 0.2s ease;
            position: relative;
          }

          .org-popover-item:hover {
            background-color: var(--u-color-background-subtle, #f5f5f5);
          }

          .org-popover-item.active {
            background-color: var(--u-color-emphasis-background-active, #96ccf3);
          }

          .org-popover-item.active .org-popover-name,
          .org-popover-item.active .org-popover-role {
            color: var(--u-color-emphasis-foreground-contrast, #0d3673);
          }

          .org-popover-separator {
            height: 1px;
            background-color: var(--u-color-line-subtle, #c4c6c8);
            margin: 0;
            border: none;
          }

          .org-popover-item-wrapper {
            display: flex;
            flex-direction: column;
            gap: var(--u-space-zero, 0px);
            align-items: center;
            justify-content: center;
            height: 100%;
          }

          .org-popover-item-wrapper.position-top {
            padding-top: var(--u-space-half, 8px);
            padding-bottom: 0;
          }

          .org-popover-item-wrapper.position-middle {
            padding-top: 0;
            padding-bottom: 0;
          }

          .org-popover-item-wrapper.position-bottom {
            padding-top: 0;
            padding-bottom: var(--u-space-half, 8px);
          }

          .org-popover-line {
            width: 1px;
            background-color: var(--u-color-line-subtle, #c4c6c8);
            flex-shrink: 0;
          }

          .org-popover-line-above {
            height: 12px;
            margin-bottom: 4px;
          }

          .org-popover-line-below {
            height: 12px;
            margin-top: 4px;
          }

          .org-popover-line-top {
            height: 16px;
          }

          .org-popover-line-bottom {
            height: 16px;
          }

          .org-popover-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            overflow: hidden;
            background-color: var(--identity-navy, #0c3970);
          }

          .org-popover-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .org-popover-avatar.personal {
            width: 40px;
            height: 40px;
            background-color: #ff6300;
            border: none;
            border-radius: var(--u-border-radius-medium, 4px);
          }

          .org-popover-avatar.personal img {
            object-fit: contain;
            padding: 7px;
          }

          .org-popover-info {
            display: flex;
            flex-direction: column;
            gap: var(--u-space-zero, 0px);
            flex: 1;
            min-width: 0;
          }

          .org-popover-name {
            font-size: var(--u-font-size-200, 14px);
            color: var(--u-color-base-foreground, #36485c);
            font-weight: var(--u-font-weight-medium, 500);
            line-height: 1.4;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .org-popover-role {
            font-size: var(--u-font-size-150, 12px);
            color: var(--u-color-base-foreground-subtle, #607081);
            font-weight: var(--u-font-weight-medium, 500);
            line-height: 1.4;
          }

          .org-popover-separator-line {
            height: 0;
            width: 100%;
            margin: 0;
            border: none;
            border-top: 1px dashed var(--u-color-line-subtle, #c4c6c8);
          }

          .user-menu-popover {
            position: absolute;
            bottom: 0;
            left: calc(100% + var(--u-space-half, 8px));
            background-color: var(--u-color-background-popover, #fefefe);
            border-radius: var(--u-border-radius-large, 4px);
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15), 0px 0px 4px rgba(0, 0, 0, 0.1);
            min-width: 200px;
            z-index: 9999;
            padding: var(--u-space-three-quarter, 12px);
            display: ${isUserMenuOpen ? 'flex' : 'none'};
            flex-direction: column;
            gap: var(--u-space-zero, 0px);
          }

          .user-menu-item {
            display: flex;
            align-items: center;
            height: 40px;
            padding: 0 var(--u-space-one, 16px);
            border-radius: var(--u-border-radius-large, 4px);
            cursor: pointer;
            transition: background-color 0.2s ease;
            color: var(--u-color-base-foreground, #36485c);
            font-size: var(--u-font-size-200, 14px);
            font-weight: var(--u-font-weight-medium, 500);
            line-height: 1.4;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .user-menu-item:hover {
            background-color: var(--u-color-background-subtle, #f5f5f5);
          }

          .user-menu-separator {
            height: 0;
            width: 100%;
            margin: var(--u-space-half, 8px) 0;
            border: none;
            border-top: 1px dashed var(--u-color-line-subtle, #c4c6c8);
          }

          .expand-collapse-button {
            position: absolute;
            background-color: var(--u-color-background-popover, #fefefe);
            border: none;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.25), 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
            left: 100%;
            top: calc(50% + 18px);
            transform: translateX(-50%) translateY(-50%);
            z-index: 1001;
            transition: left 0.3s ease, background-color 0.2s ease;
          }

          .expand-collapse-button:hover {
            background-color: #e0e1e1;
          }

          .expand-collapse-icon {
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .expand-collapse-icon img {
            width: 16px;
            height: 16px;
            display: block;
            transition: transform 0.3s ease;
          }

          .main-content {
            flex: 1;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding: 0;
            z-index: 1;
          }

          .content-inner {
            background-color: var(--u-color-background-container, #fefefe);
            border-radius: var(--u-space-small, 8px);
            padding: 32px var(--u-space-two, 32px);
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: var(--u-space-two, 32px);
            align-items: center;
            justify-content: flex-start;
          }

          .page-header {
            display: flex;
            flex-direction: column;
            gap: var(--u-space-one, 16px);
            align-items: flex-start;
            justify-content: center;
            width: 100%;
            margin-bottom: var(--u-space-one, 16px);
          }

          .page-header-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--u-space-half, 8px);
            width: 100%;
          }

          .page-header-title {
            font-family: var(--u-font-body);
            font-size: var(--u-font-size-xx-large, 24px);
            font-weight: var(--u-font-weight-bold, 700);
            line-height: 1.2;
            color: var(--u-color-base-foreground-contrast, #071c31);
            white-space: nowrap;
          }

          .page-header-actions {
            display: flex;
            align-items: center;
            gap: var(--u-space-small, 8px);
          }

          .page-body {
            max-width: 1280px;
            width: 100%;
          }

          .mobile-status-bar {
            display: none;
          }

          .mobile-top-nav {
            display: none;
          }

          .mobile-bottom-nav {
            display: none;
          }

          .mobile-secondary-nav {
            display: none;
          }

          .mobile-workspace-sheet {
            display: none;
          }

          .mobile-workspace-sheet-overlay {
            display: none;
          }

          @media (max-width: 767px) {
            :root {
              --mobile-header-total-height: 76px;
              --mobile-bottom-nav-height: 88px;
              --mobile-page-horizontal-padding: 16px;
            }

            .navigation-container {
              flex-direction: column;
              height: 100vh;
            }

            .nav-sidebar {
              display: none;
            }

            .mobile-status-bar {
              display: flex;
              align-items: flex-end;
              justify-content: center;
              padding: 21px 32px 21px;
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              z-index: 101;
              background-color: var(--u-color-background-container, #fefefe);
            }

            .mobile-status-bar-inner {
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
              max-width: 100%;
              gap: 16px;
            }

            .mobile-status-time {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif;
              font-size: 15px;
              font-weight: 600;
              line-height: 20px;
              color: #000000;
              letter-spacing: -0.24px;
            }

            .mobile-status-indicators {
              flex: 0 0 auto;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              gap: 5px;
            }

            .mobile-status-cellular,
            .mobile-status-wifi,
            .mobile-status-battery {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              height: 12px !important;
            }

            .mobile-status-cellular {
              width: auto;
            }

            .mobile-status-wifi {
              width: auto;
            }

            .mobile-status-battery {
              width: auto;
            }

            .mobile-top-nav {
              display: flex;
              flex-direction: column;
              gap: 8px;
              background-color: transparent;
              padding: 16px 16px 0px;
              position: fixed;
              left: 0;
              right: 0;
              z-index: 100;
              border-top: 1px solid transparent;
              transition: background-color 0.2s ease, box-shadow 0.2s ease;
            }

            .mobile-top-nav.scrolled {
              background-color: var(--u-color-background-container, #fefefe);
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            .mobile-secondary-nav {
              display: flex;
              align-items: flex-start;
              background-color: transparent;
              position: fixed;
              left: 0;
              right: 0;
              padding: 16px 16px 16px;
              z-index: 100;
              gap: var(--u-space-zero, 0px);
              transition: background-color 0.2s ease, box-shadow 0.2s ease;
            }

            .mobile-secondary-nav.scrolled {
              background-color: var(--u-color-background-container, #fefefe);
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            .mobile-secondary-nav-back {
              width: 44px;
              height: 44px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: transparent;
              border: none;
              cursor: pointer;
              padding: 0;
              flex-shrink: 0;
            }

            .mobile-secondary-nav-back {
              color: var(--u-color-base-foreground-contrast, #071c31);
            }

            .mobile-secondary-nav-back svg,
            .mobile-secondary-nav-back img {
              width: 24px;
              height: 24px;
              filter: brightness(0) saturate(100%) invert(8%) sepia(14%) saturate(2932%) hue-rotate(178deg) brightness(96%) contrast(98%);
            }

            .mobile-secondary-nav-title-container {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              height: 44px;
              min-width: 0;
              line-height: 0;
            }

            .mobile-secondary-nav-title {
              font-family: var(--u-font-body);
              font-size: var(--u-font-size-400, 24px);
              font-weight: var(--u-font-weight-bold, 700);
              color: var(--u-color-foreground-default);
              line-height: 1.2;
              letter-spacing: var(--letter-spacing-default, 0px);
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .mobile-secondary-nav-title.hidden {
              display: none;
            }

            .mobile-secondary-nav-close {
              width: 44px;
              height: 44px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: transparent;
              border: none;
              cursor: pointer;
              padding: 0;
              flex-shrink: 0;
              opacity: 0;
              pointer-events: none;
              color: var(--u-color-base-foreground-contrast, #071c31);
            }

            .mobile-top-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
              min-height: 44px;
              padding: 0px 0 4px 0;
            }

            .mobile-workspace-button {
              width: 44px;
              height: 44px;
              border-radius: var(--u-border-radius-medium, 4px);
              overflow: hidden;
              flex-shrink: 0;
              background-color: #ff6300;
              border: none;
              padding: 0;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .mobile-workspace-button.org {
              background-color: var(--identity-navy, #0c3970);
              border-radius: 12px;
            }

            .mobile-workspace-button img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              padding: 7px;
            }

            .mobile-workspace-button.org img {
              padding: 0;
              object-fit: cover;
              border-radius: 12px;
            }

            .mobile-top-right {
              display: flex;
              align-items: center;
              gap: 8px;
              flex-shrink: 0;
            }

            .mobile-icon-button {
              width: 44px;
              height: 44px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: transparent;
              border: none;
              cursor: pointer;
              padding: 0;
              flex-shrink: 0;
            }

            .mobile-icon-button img {
              width: 24px;
              height: 24px;
            }

            .mobile-user-button {
              width: 44px;
              height: 44px;
              border-radius: 28px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: var(--u-color-background-container, #fefefe);
              overflow: hidden;
              border: none;
              cursor: pointer;
              flex-shrink: 0;
              padding: 0;
            }


            .mobile-page-title-row {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              width: 100%;
              min-height: 38px;
              padding-bottom: 12px;
            }

            .mobile-page-title {
              font-family: var(--u-font-body);
              font-size: 34px;
              font-weight: var(--u-font-weight-bold, 700);
              color: var(--u-color-base-foreground, #36485c);
              line-height: 1.176;
              letter-spacing: 0.37px;
              margin: 0;
            }

            .mobile-bottom-nav {
              position: fixed;
              bottom: var(--u-space-one, 16px);
              left: 50%;
              transform: translateX(-50%);
              background-color: var(--u-color-background-popover, #fefefe);
              display: ${shouldShowMobileBottomNav ? 'flex' : 'none'};
              align-items: center;
              justify-content: center;
              padding: var(--u-space-quarter, 4px);
              z-index: 100;
              border-radius: 16px;
              box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.2), 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
              max-width: 600px;
              min-width: 280px;
              width: calc(100% - 32px);
            }

            .mobile-tab-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 1px;
              flex: 1;
              padding: 6px 8px 7px;
              background: transparent;
              border: none;
              cursor: pointer;
              text-decoration: none;
              color: var(--u-color-base-foreground-subtle, #607081);
              min-width: 0;
              position: relative;
              transition: all 0.2s ease;
              border-radius: 12px;
            }

            .mobile-tab-item.active {
              background-color: var(--content-emphasis-background-default, #e7f3fd);
              color: var(--content-emphasis-foreground-contrast, #0d3673);
            }

            .mobile-tab-icon {
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }

            .mobile-tab-icon img {
              width: 24px;
              height: 24px;
              display: block;
            }

            .mobile-tab-label {
              font-family: var(--u-font-body);
              font-size: 10px;
              font-weight: var(--u-font-weight-bold, 700);
              line-height: 1.2;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 100%;
              text-align: center;
            }

            .mobile-workspace-sheet-overlay {
              display: block;
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.5);
              z-index: 300;
              transition: opacity 0.3s ease;
            }

            .mobile-workspace-sheet {
              display: block;
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              background-color: var(--u-color-background-container, #fefefe);
              border-top-left-radius: var(--u-space-one, 16px);
              border-top-right-radius: var(--u-space-one, 16px);
              box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.1);
              z-index: 301;
              max-height: 50vh;
              overflow-y: auto;
              padding: var(--u-space-one, 16px);
              padding-bottom: calc(var(--u-space-one, 16px) + env(safe-area-inset-bottom, 0px));
              transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .mobile-sheet-handle {
              width: 36px;
              height: 5px;
              background-color: var(--u-color-line-subtle, #c4c6c8);
              border-radius: 3px;
              margin: var(--u-space-half, 8px) auto var(--u-space-one, 16px);
            }

            .mobile-sheet-title {
              font-family: var(--u-font-body);
              font-size: var(--u-font-size-250, 16px);
              font-weight: var(--u-font-weight-bold, 700);
              color: var(--u-color-base-foreground-contrast, #071c31);
              margin-bottom: var(--u-space-three-quarter, 12px);
              line-height: 1.5;
            }

            .mobile-sheet-items {
              display: flex;
              flex-direction: column;
              gap: var(--u-space-zero, 0px);
            }

            .mobile-sheet-item {
              display: flex;
              align-items: center;
              gap: var(--u-space-three-quarter, 12px);
              padding: var(--u-space-three-quarter, 12px);
              border-radius: var(--u-border-radius-large, 4px);
              cursor: pointer;
              background: transparent;
              border: none;
              width: 100%;
              text-align: left;
            }

            .mobile-sheet-item:hover {
              background-color: var(--u-color-background-subtle, #f5f5f5);
            }

            .mobile-sheet-item.active {
              background-color: var(--u-color-emphasis-background-active, #96ccf3);
              position: relative;
            }

            .mobile-sheet-item.active::after {
              content: '✓';
              position: absolute;
              right: var(--u-space-three-quarter, 12px);
              color: var(--u-color-emphasis-foreground-contrast, #0d3673);
              font-size: var(--u-font-size-250, 16px);
              font-weight: var(--u-font-weight-bold, 700);
            }

            .mobile-sheet-avatar {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              overflow: hidden;
              flex-shrink: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: var(--identity-navy, #0c3970);
            }

            .mobile-sheet-avatar.personal {
              background-color: #ff6300;
              border-radius: var(--u-border-radius-medium, 4px);
            }

            .mobile-sheet-avatar img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            .mobile-sheet-avatar.personal img {
              object-fit: contain;
              padding: 7px;
            }

            .mobile-sheet-info {
              display: flex;
              flex-direction: column;
              gap: var(--u-space-eighth, 2px);
              flex: 1;
              min-width: 0;
            }

            .mobile-sheet-name {
              font-size: var(--u-font-size-200, 14px);
              font-weight: var(--u-font-weight-medium, 500);
              color: var(--u-color-base-foreground, #36485c);
              line-height: 1.4;
            }

            .mobile-sheet-item.active .mobile-sheet-name {
              color: var(--u-color-emphasis-foreground-contrast, #0d3673);
            }

            .mobile-sheet-role {
              font-size: var(--u-font-size-150, 12px);
              font-weight: var(--u-font-weight-medium, 500);
              color: var(--u-color-base-foreground-subtle, #607081);
              line-height: 1.4;
            }

            .mobile-sheet-item.active .mobile-sheet-role {
              color: var(--u-color-emphasis-foreground-contrast, #0d3673);
            }

            .mobile-sheet-separator {
              height: 1px;
              background-color: var(--u-color-line-subtle, #c4c6c8);
              margin: var(--u-space-half, 8px) 0;
            }

            .main-content {
              padding: 0;
              width: 100%;
              overflow-y: auto;
            }
          }
        `}
      </style>
      <div
        className="navigation-container"
        onClick={(e) => {
          // Close popovers when clicking outside
          if (isOrgPopoverOpen && !e.target.closest('.workspace-switcher') && !e.target.closest('.org-popover') && !e.target.closest('.mobile-workspace-button') && !e.target.closest('.mobile-workspace-sheet')) {
            setIsOrgPopoverOpen(false)
          }
          if (isUserMenuOpen && !e.target.closest('.user-settings') && !e.target.closest('.user-menu-popover')) {
            setIsUserMenuOpen(false)
          }
        }}
      >
          {/* Mobile Top Bar - Main Pages */}
          {shouldShowMobileTopNav && (
            <div className={`mobile-top-nav ${isScrolled ? 'scrolled' : ''}`}>
              <div className="mobile-top-row">
                <button
                  className={`mobile-workspace-button ${selectedWorkspace.id === personalWorkspace.id ? '' : 'org'}`}
                  onClick={() => setIsOrgPopoverOpen(!isOrgPopoverOpen)}
                  aria-label="Switch workspace"
                >
                  <img
                    src={selectedWorkspace.id === personalWorkspace.id ? HudlLogoIcon : HudlHighSchoolLogo}
                    alt={selectedWorkspace.name}
                  />
                </button>
                <div className="mobile-top-right">
                  <button
                    className="mobile-icon-button"
                    onClick={() => {
                      setActiveNavItem('Notifications')
                      navigate('/notifications')
                    }}
                    aria-label="Notifications"
                  >
                    <img src={NotificationsIcon} alt="Notifications" />
                  </button>
                  <button
                    className="mobile-user-button"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    aria-label="User menu"
                  >
                    <Avatar variant="user" size="medium" src={parent?.avatar} initials={parent?.initials || 'PS'} />
                  </button>
                </div>
              </div>
              <div className="mobile-page-title-row">
                <h1 className="mobile-page-title">{activeNavItem}</h1>
              </div>
            </div>
          )}

          {/* Mobile Secondary Nav - Detail Pages */}
          {!shouldShowMobileTopNav && (
            <div className={`mobile-secondary-nav ${isScrolled ? 'scrolled' : ''}`}>
              <button
                className="mobile-secondary-nav-back"
                onClick={() => window.history.back()}
                aria-label="Go back"
              >
                <img src={UINavigationBackArrowIcon} alt="" />
              </button>
              <div className="mobile-secondary-nav-title-container">
                <h1 className={`mobile-secondary-nav-title ${shouldHideSecondaryNavTitle ? 'hidden' : ''}`}>{getSecondaryNavTitle()}</h1>
              </div>
              <div className="mobile-secondary-nav-close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          )}

        {/* Mobile Workspace Switcher Sheet */}
        {isOrgPopoverOpen && (
          <>
            <div
              className="mobile-workspace-sheet-overlay"
              onClick={() => setIsOrgPopoverOpen(false)}
            />
            <div
              className="mobile-workspace-sheet"
              style={{
                transform: isOrgPopoverOpen ? 'translateY(0)' : 'translateY(100%)'
              }}
            >
              <div className="mobile-sheet-handle" />
              <div className="mobile-sheet-title">{parentOrg.name}</div>
              <div className="mobile-sheet-items">
                {/* Organization option */}
                <button
                  className={`mobile-sheet-item ${selectedWorkspace.id === orgWorkspace.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedWorkspace(orgWorkspace)
                    setActiveNavItem('Home')
                    setOpenGroups([])
                    setIsOrgPopoverOpen(false)
                  }}
                >
                  <div className="mobile-sheet-avatar">
                    <img src={HudlHighSchoolLogo} alt={orgWorkspace.name} />
                  </div>
                  <div className="mobile-sheet-info">
                    <div className="mobile-sheet-name">{orgWorkspace.name}</div>
                    <div className="mobile-sheet-role">{orgWorkspace.role}</div>
                  </div>
                </button>
                {/* Team options */}
                {teamWorkspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    className={`mobile-sheet-item ${selectedWorkspace.id === workspace.id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedWorkspace(workspace)
                      setActiveNavItem('Library')
                      setOpenGroups([])
                      setIsOrgPopoverOpen(false)
                    }}
                  >
                    <div className="mobile-sheet-avatar">
                      <img src={HudlHighSchoolLogo} alt={workspace.name} />
                    </div>
                    <div className="mobile-sheet-info">
                      <div className="mobile-sheet-name">{workspace.name}</div>
                      <div className="mobile-sheet-role">{workspace.role}</div>
                    </div>
                  </button>
                ))}
                <div className="mobile-sheet-separator" />
                {/* Personal workspace */}
                <button
                  className={`mobile-sheet-item ${selectedWorkspace.id === personalWorkspace.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedWorkspace(personalWorkspace)
                    setActiveNavItem('Home')
                    setOpenGroups([])
                    setIsOrgPopoverOpen(false)
                  }}
                >
                  <div className="mobile-sheet-avatar personal">
                    <img src={HudlLogoIcon} alt={personalWorkspace.name} />
                  </div>
                  <div className="mobile-sheet-info">
                    <div className="mobile-sheet-name">{personalWorkspace.name}</div>
                    <div className="mobile-sheet-role">{personalWorkspace.subscriptionType}</div>
                  </div>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Mobile Bottom Navigation */}
        <div className="mobile-bottom-nav">
          {currentNavItems.slice(0, 5).map((item, index) => {
            const isLastItem = index === 4 && currentNavItems.length > 5
            const isItemActive = activeNavItem === item.id

            const handleNavClick = () => {
              setActiveNavItem(item.id)
              setOpenGroups([])

              // Navigate to the appropriate route
              const routeMap = {
                'Home': '/',
                'Search': '/search',
                'Favorites': '/favorites',
                'Tickets': '/tickets',
                'Notifications': '/notifications'
              }

              if (routeMap[item.id]) {
                navigate(routeMap[item.id])
              }
            }

            return (
              <button
                key={item.id}
                className={`mobile-tab-item ${isItemActive ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                <div className="mobile-tab-icon">
                  <img src={item.icon} alt="" />
                </div>
                <div className="mobile-tab-label">
                  {isLastItem ? 'More' : item.label}
                </div>
              </button>
            )
          })}
        </div>

        {/* Desktop Sidebar */}
        <div className="nav-sidebar">
          <div
            className="nav-logo"
            onClick={() => {
              const defaultItem = currentWorkspaceType === 'team' ? 'Library' : 'Home'
              setActiveNavItem(defaultItem)
              setOpenGroups([])
            }}
          >
            <div className="nav-logo-icon">
              <img src={HudlLogoIcon} alt="Hudl" />
            </div>
            <div className="nav-logo-text">Hudl</div>
          </div>

          <div
            className="workspace-switcher"
            onClick={() => setIsOrgPopoverOpen(!isOrgPopoverOpen)}
          >
            <div className={`workspace-avatar ${selectedWorkspace.id === personalWorkspace.id ? '' : 'org'}`}>
              <img src={selectedWorkspace.id === personalWorkspace.id ? HudlLogoIcon : HudlHighSchoolLogo} alt={selectedWorkspace.name} />
            </div>
            {isExpanded && (
              <div className="workspace-info">
                <div className="workspace-name">{selectedWorkspace.name}</div>
                <div className="workspace-label">
                  {selectedWorkspace.id === personalWorkspace.id ? 'Personal' : parentOrg.name}
                </div>
              </div>
            )}
            {isExpanded && (
              <div className="workspace-arrow">
                <img
                  src={ExpandDownIcon}
                  alt=""
                  width="16"
                  height="16"
                  style={{
                    transform: isOrgPopoverOpen ? 'rotate(90deg)' : 'rotate(-90deg)',
                  }}
                />
              </div>
            )}
            {isOrgPopoverOpen && (
              <div className="org-popover">
                <p className="org-popover-header">{parentOrg.name}</p>
                <div className="org-popover-teams">
                  {/* Organization option */}
                  <div
                    className={`org-popover-item ${selectedWorkspace.id === orgWorkspace.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedWorkspace(orgWorkspace)
                      setActiveNavItem('Home')
                      setOpenGroups([])
                      setIsOrgPopoverOpen(false)
                    }}
                  >
                    <div className="org-popover-item-wrapper position-top">
                      <div className="org-popover-avatar">
                        <img src={HudlHighSchoolLogo} alt={orgWorkspace.name} />
                      </div>
                      <div className="org-popover-line org-popover-line-below org-popover-line-top" />
                    </div>
                    <div className="org-popover-info">
                      <div className="org-popover-name">{orgWorkspace.name}</div>
                      <div className="org-popover-role">{orgWorkspace.role}</div>
                    </div>
                  </div>
                  {/* Team options */}
                  {teamWorkspaces.map((workspace) => (
                    <React.Fragment key={workspace.id}>
                      <div
                        className={`org-popover-item ${selectedWorkspace.id === workspace.id ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedWorkspace(workspace)
                          setActiveNavItem('Library')
                          setOpenGroups([])
                          setIsOrgPopoverOpen(false)
                        }}
                      >
                        <div className={`org-popover-item-wrapper position-${workspace.position.toLowerCase()}`}>
                          {workspace.position === 'Middle' && (
                            <>
                              <div className="org-popover-line org-popover-line-above" />
                              <div className="org-popover-avatar">
                                <img src={HudlHighSchoolLogo} alt={workspace.name} />
                              </div>
                              <div className="org-popover-line org-popover-line-below" />
                            </>
                          )}
                          {workspace.position === 'Top' && (
                            <>
                              <div className="org-popover-avatar">
                                <img src={HudlHighSchoolLogo} alt={workspace.name} />
                              </div>
                              <div className="org-popover-line org-popover-line-below org-popover-line-top" />
                            </>
                          )}
                          {workspace.position === 'Bottom' && (
                            <>
                              <div className="org-popover-line org-popover-line-above org-popover-line-bottom" />
                              <div className="org-popover-avatar">
                                <img src={HudlHighSchoolLogo} alt={workspace.name} />
                              </div>
                            </>
                          )}
                        </div>
                        <div className="org-popover-info">
                          <div className="org-popover-name">{workspace.name}</div>
                          <div className="org-popover-role">{workspace.role}</div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <div className="org-popover-separator-line" />
                <div
                  className={`org-popover-item ${selectedWorkspace.id === personalWorkspace.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                      setSelectedWorkspace(personalWorkspace)
                      setActiveNavItem('Home')
                      setOpenGroups([])
                      setIsOrgPopoverOpen(false)
                  }}
                >
                  <div className="org-popover-item-wrapper">
                    <div className="org-popover-avatar personal">
                      <img src={HudlLogoIcon} alt={personalWorkspace.name} />
                    </div>
                  </div>
                  <div className="org-popover-info">
                    <div className="org-popover-name">{personalWorkspace.name}</div>
                    <div className="org-popover-role">{personalWorkspace.subscriptionType}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="nav-items-container">
            {currentNavItems.map((item) => {
              const hasChildren = Array.isArray(item.children) && item.children.length > 0
              const isGroupOpen = openGroups.includes(item.id)
              const isItemActive = activeNavItem === item.id
              const hasActiveChild =
                hasChildren &&
                Array.isArray(item.children) &&
                item.children.some((child) => child.id === activeNavItem)
              const groupWrapperClass =
                hasChildren && isGroupOpen && isExpanded ? 'nav-group-open' : ''

              return (
                <div key={item.id} className={groupWrapperClass}>
                  <div
                    className={`nav-item ${isItemActive ? 'active' : ''} ${
                      hasChildren && isGroupOpen ? 'nav-item--open' : ''
                    } ${
                      hasChildren && !isGroupOpen && hasActiveChild ? 'nav-item--child-active' : ''
                    }`}
                    onClick={() => {
                      setActiveNavItem(item.id)
                      const parentGroupId = findParentGroupIdForItem(item.id)
                      setOpenGroups((prev) => {
                        if (!parentGroupId) {
                          return []
                        }
                        return prev.includes(parentGroupId) ? [parentGroupId] : []
                      })
                    }}
                  >
                    <div className="nav-item-icon">
                      <img src={item.icon} alt="" width="24" height="24" />
                    </div>
                    {isExpanded && (
                      <>
                        <div className="nav-item-label">{item.label}</div>
                        {hasChildren && (
                          <button
                            type="button"
                            className="nav-item-chevron"
                            onClick={(e) => {
                              e.stopPropagation()
                              setOpenGroups((prev) => {
                                if (prev.includes(item.id)) {
                                  return []
                                }
                                return [item.id]
                              })
                            }}
                          >
                            <img
                              src={ExpandDownIcon}
                              alt=""
                              width="16"
                              height="16"
                              style={{
                                transform: isGroupOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              }}
                            />
                          </button>
                        )}
                      </>
                    )}
                    {!isExpanded && (
                      <div className="nav-item-tooltip">{item.label}</div>
                    )}
                  </div>
                  {hasChildren && isGroupOpen && isExpanded && (
                    <div className="nav-item-children">
                      {item.children.map((child) => (
                        <div key={child.id} className="nav-item-child">
                          <SubnavItem
                            label={child.label}
                            active={activeNavItem === child.id}
                            hasPill={!!child.hasPill}
                            pillText={child.pillText}
                            onClick={() => {
                              setActiveNavItem(child.id)
                              const parentGroupId = findParentGroupIdForItem(child.id)
                              setOpenGroups((prev) => {
                                if (!parentGroupId) {
                                  return []
                                }
                                return prev.includes(parentGroupId) ? [parentGroupId] : []
                              })
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="nav-bottom-items">
            {bottomNavItems.map((item) => (
              <div
                key={item.id}
                className={`nav-item ${activeNavItem === item.id ? 'active' : ''}`}
                onClick={() => setActiveNavItem(item.id)}
              >
                <div className="nav-item-icon">
                  <img src={item.icon} alt="" width="24" height="24" />
                </div>
                {isExpanded && <div className="nav-item-label">{item.label}</div>}
                {!isExpanded && (
                  <div className="nav-item-tooltip">{item.label}</div>
                )}
              </div>
            ))}
          </div>

          <div
            className="user-settings"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <Avatar
              variant="user"
              size={isExpanded ? 'small' : 'medium'}
              src={parent?.avatar}
              initials={parent?.initials || 'PS'}
            />
            {isExpanded && (
              <>
                <div className="user-info">
                  <div className="user-name">John Smith</div>
                </div>
                <div className="user-arrow">
                  <img
                    src={ExpandDownIcon}
                    alt=""
                    width="16"
                    height="16"
                    style={{
                      transform: isUserMenuOpen ? 'rotate(90deg)' : 'rotate(-90deg)',
                    }}
                  />
                </div>
              </>
            )}
            {isUserMenuOpen && (
              <div className="user-menu-popover">
                {userMenuItems.map((item, index) => (
                  item.type === 'separator' ? (
                    <div key={`separator-${index}`} className="user-menu-separator" />
                  ) : (
                    <div
                      key={item.id}
                      className="user-menu-item"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsUserMenuOpen(false)
                      }}
                    >
                      {item.label}
                    </div>
                  )
                ))}
              </div>
            )}
          </div>

          <button
            className="expand-collapse-button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse navigation' : 'Expand navigation'}
          >
            <div className="expand-collapse-icon">
              <img 
                src={ExpandCollapseIcon} 
                alt="" 
                width="16" 
                height="16" 
                style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)' }} 
              />
            </div>
          </button>
        </div>

      </div>
    </>
  )
}

export default Navigation