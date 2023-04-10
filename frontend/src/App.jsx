import { Box, Paper, Toolbar } from "@mui/material";

import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Navigation from "./components/Navigation";
import SideMenu from "./components/SideMenu"
import TopAppBar from "./components/TopAppBar"

import { useState } from "react";
import Main from "./pages/Main";
import Search from "./pages/Search";
import User from "./pages/User";

function App() {
  const [menu, setMenu] = useState({
    open: false,
  });

  // 关闭侧边菜单
  const closeMenu = () => {
    setMenu({
      open: false,
    })
  }

  // 切换菜单打开与关闭
  const toggleMenu = () => {
    setMenu(menu => ({
      open: !menu.open
    }))
  }

  // 底部菜单栏
  const [selected, setSelected] = useState(0);

  // 页面跳转
  const nav = useNavigate();
  const toPage = (path, index) => {
    nav(path);
    setSelected(index)
  }

  return (
    <Box sx={{ bgcolor: `#ddd` }}>
      <TopAppBar toggleMenu={toggleMenu} />
      <SideMenu open={menu.open} closeMenu={closeMenu} />
      <Toolbar />
      <Paper sx={{
        minHeight: 'calc(100vh - 48px - 56px - 1em)',
        mx: `.5em`, mb: `.5em`, p: `.5em`,
      }}
        elevation={6}>
        <Routes>
          <Route index path='/' element={<Main />} />
          <Route index path='/search' element={<Search />} />
          <Route index path='/user' element={<User />} />
        </Routes>
      </Paper>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}>
        <Navigation selected={selected} toPage={toPage} />
      </Paper>
    </Box>
  )
}

export default App
