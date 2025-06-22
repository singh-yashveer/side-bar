import React from "react";
import { Sidebar } from "../features/sidebar";
import { MenuItem, Menu } from "../features/menu";
import styled from "styled-components";

// Icons for demo - using simple Unicode characters
const HomeIcon = () => <span style={{ fontSize: "16px" }}>🏠</span>;
const SettingsIcon = () => <span style={{ fontSize: "16px" }}>⚙️</span>;
const UsersIcon = () => <span style={{ fontSize: "16px" }}>👥</span>;
const ProjectsIcon = () => <span style={{ fontSize: "16px" }}>📁</span>;
const AnalyticsIcon = () => <span style={{ fontSize: "16px" }}>📊</span>;

// Main container to hold the sidebar and content
const Container = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
`;

// Content section
const Content = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f9fafb;
  color: black;
`;

// Control panel for demo
const ControlPanel = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
  }

  button {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 8px 16px;
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0052a3;
    }
  }
`;

// Menu wrapper for proper styling
const StyledMenuWrapper = styled.div`
  margin: 1rem 0;
`;

// Header for the sidebar
const SidebarHeader = styled.div`
  padding: 1.5rem 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  border-bottom: 1px solid #efefef;
`;

export const SidebarDemo: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);

  const handleBackdropClick = () => {
    setToggled(false);
  };

  const handleBreakpoint = (broken: boolean) => {
    console.log("Breakpoint triggered:", broken);
  };

  return (
    <Container>
      <Sidebar
        width="250px"
        collapsedWidth="48px"
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onBackdropClick={handleBackdropClick}
        onBreakPoint={handleBreakpoint}
        backgroundColor="#fff"
      >
        <SidebarHeader>{collapsed ? "SB" : "Sidebar Demo"}</SidebarHeader>

        <StyledMenuWrapper>
          <Menu>
            <MenuItem icon={<HomeIcon />} active={true}>
              Dashboard
            </MenuItem>
            <MenuItem icon={<ProjectsIcon />}>Projects</MenuItem>
            <MenuItem icon={<UsersIcon />}>Team Members</MenuItem>
            <MenuItem icon={<AnalyticsIcon />}>Analytics</MenuItem>
            <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
          </Menu>
        </StyledMenuWrapper>
      </Sidebar>

      <Content>
        <h1 style={{ color: "black" }}>Sidebar Component Demo</h1>
        <p>This is a demonstration of the improved sidebar component with proper TypeScript typing.</p>

        <ControlPanel>
          <h3>Controls:</h3>
          <button onClick={() => setCollapsed(!collapsed)}>{collapsed ? "Expand Sidebar" : "Collapse Sidebar"}</button>
          <button onClick={() => setToggled(!toggled)}>Toggle Mobile Menu</button>
        </ControlPanel>

        <div style={{ marginTop: "2rem" }}>
          <h3>Features:</h3>
          <ul>
            <li>Responsive design with breakpoints</li>
            <li>Collapsible sidebar</li>
            <li>Mobile-friendly with toggle</li>
            <li>TypeScript type safety</li>
            <li>Feature-styled architecture</li>
            <li>Custom styling options</li>
          </ul>
        </div>
      </Content>
    </Container>
  );
};
