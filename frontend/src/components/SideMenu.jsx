import {
  Divider,
  Drawer,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material'

import FileUploadIcon from '@mui/icons-material/FileUpload';

function SideMenu({ open, closeMenu }) {
  return (
    <Drawer anchor='left' open={open} onClose={closeMenu}>
      <List dense>
        <ListItem disablePadding sx={{ display: `block` }}>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: 0, pr: `1em` }}>
              <FileUploadIcon />
            </ListItemIcon>
            <ListItemText primary="上传文件" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default SideMenu