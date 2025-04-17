// CustomDashboardLayout.tsx
import React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import MyLogo from '@/assets/images/logo/flower_ayaboo.png'; // Import your logo
import { AppBar, Toolbar, Typography } from '@mui/material';

type IProps = {
  children: React.ReactNode;
}

const CustomDashboardLayout = ({ children }: IProps) => {
  return (
    <DashboardLayout>
      <AppBar position="static">
        <Toolbar>
          <img src={MyLogo} alt="My Logo" style={{ height: '40px', marginRight: '10px' }} />
          <Typography variant="h6">My Application</Typography>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </DashboardLayout>
  );
};

export default CustomDashboardLayout;
