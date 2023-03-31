import { BottomNavigation, BottomNavigationAction } from '@mui/material'

import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

function Navigation({ selected, toPage }) {
  const menu = {
    '0': '/',
    '1': '/search',
    '2': '/user'
  }
  return (
    <BottomNavigation showLabels value={selected}
      onChange={(e, v) => toPage(menu[v], v)}>
      <BottomNavigationAction label="View" icon={<ListIcon />} />
      <BottomNavigationAction label="Search" icon={<SearchIcon />} />
      <BottomNavigationAction label="User" icon={<PersonIcon />} />
    </BottomNavigation>
  )
}

export default Navigation