// Import sport icons from assets
import SoccerIcon from '../../assets/ui-icons/Soccer.png'
import BasketballIcon from '../../assets/ui-icons/Basketball.png'
import FootballIcon from '../../assets/ui-icons/Football.svg'
import VolleyballIcon from '../../assets/ui-icons/Volleyball.svg'
import BaseballIcon from '../../assets/ui-icons/Baseball.svg'
import SoftballIcon from '../../assets/ui-icons/Softball.svg'
import TennisIcon from '../../assets/ui-icons/Tennis.svg'
import LacrosseIcon from '../../assets/ui-icons/Lacrosse.svg'
import HockeyIcon from '../../assets/ui-icons/Hockey.svg'
import IceHockeyIcon from '../../assets/ui-icons/Ice Hockey.svg'
import FieldHockeyIcon from '../../assets/ui-icons/Field Hockey.svg'
import GolfIcon from '../../assets/ui-icons/Golf.svg'
import WrestlingIcon from '../../assets/ui-icons/Wrestling.svg'
import SwimmingIcon from '../../assets/ui-icons/Swimming.svg'
import GymnasticsIcon from '../../assets/ui-icons/Gymnastics.svg'
import CricketIcon from '../../assets/ui-icons/Cricket.svg'
import RugbyIcon from '../../assets/ui-icons/Rugby.svg'
import NetballIcon from '../../assets/ui-icons/Netball.svg'
import DanceIcon from '../../assets/ui-icons/Dance.svg'
import CheerIcon from '../../assets/ui-icons/Cheer.svg'
import AustralianFootballIcon from '../../assets/ui-icons/Australian Football.svg'

export const SPORT_ICONS = {
  Soccer: SoccerIcon,
  Basketball: BasketballIcon,
  Football: FootballIcon,
  Volleyball: VolleyballIcon,
  Baseball: BaseballIcon,
  Softball: SoftballIcon,
  Tennis: TennisIcon,
  Lacrosse: LacrosseIcon,
  Hockey: HockeyIcon,
  'Ice Hockey': IceHockeyIcon,
  'Field Hockey': FieldHockeyIcon,
  Golf: GolfIcon,
  Wrestling: WrestlingIcon,
  Swimming: SwimmingIcon,
  Gymnastics: GymnasticsIcon,
  Cricket: CricketIcon,
  Rugby: RugbyIcon,
  Netball: NetballIcon,
  Dance: DanceIcon,
  Cheer: CheerIcon,
  'Australian Football': AustralianFootballIcon
}

export const getSportIcon = (sportType) => SPORT_ICONS[sportType] || null
