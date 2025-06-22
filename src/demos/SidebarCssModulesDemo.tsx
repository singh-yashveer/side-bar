import React from "react";
import { SidebarCssModules } from "../features/sidebar/components/SidebarCssModules";
import { MenuCssModules } from "../features/menu/components/MenuCssModules";
import { MenuItemCssModules } from "../features/menu/components/MenuItemCssModules";
import styles from "./SidebarCssModulesDemo.module.css";

// Icons for demo - using simple Unicode characters
const HomeIcon = () => <span style={{ fontSize: "16px" }}>🏠</span>;
const SettingsIcon = () => <span style={{ fontSize: "16px" }}>⚙️</span>;
const UsersIcon = () => <span style={{ fontSize: "16px" }}>👥</span>;
const ProjectsIcon = () => <span style={{ fontSize: "16px" }}>📁</span>;
const AnalyticsIcon = () => <span style={{ fontSize: "16px" }}>📊</span>;

export const SidebarCssModulesDemo: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);

  const handleBackdropClick = () => {
    setToggled(false);
  };

  const handleBreakpoint = (broken: boolean) => {
    console.log("Breakpoint triggered:", broken);
  };

  return (
    <div className={styles.container}>
      <SidebarCssModules
        width="250px"
        collapsedWidth="48px"
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onBackdropClick={handleBackdropClick}
        onBreakPoint={handleBreakpoint}
        backgroundColor="#fff"
      >
        <div className={styles.sidebarHeader}>{collapsed ? "SB" : "CSS Modules Sidebar"}</div>

        <div className={styles.menuWrapper}>
          <MenuCssModules>
            <MenuItemCssModules icon={<HomeIcon />} active={true}>
              Dashboard
            </MenuItemCssModules>
            <MenuItemCssModules icon={<ProjectsIcon />}>Projects</MenuItemCssModules>
            <MenuItemCssModules icon={<UsersIcon />}>Team Members</MenuItemCssModules>
            <MenuItemCssModules icon={<AnalyticsIcon />}>Analytics</MenuItemCssModules>
            <MenuItemCssModules icon={<SettingsIcon />}>Settings</MenuItemCssModules>
          </MenuCssModules>
        </div>
      </SidebarCssModules>

      <main style={{ color: "black" }} className={styles.content}>
        <h1>CSS Modules Sidebar Demo</h1>
        <p>This is a demonstration of the improved sidebar component using CSS Modules instead of styled-components.</p>

        <div className={styles.controlPanel}>
          <h3>Controls:</h3>
          <button className={styles.button} onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          </button>
          <button className={styles.button} onClick={() => setToggled(!toggled)}>
            Toggle Mobile Menu
          </button>
        </div>

        <div className={styles.featureList}>
          <h3>Features of CSS Modules Approach:</h3>
          <ul>
            <li>Better performance than styled-components</li>
            <li>More familiar CSS syntax</li>
            <li>No CSS-in-JS runtime overhead</li>
            <li>Full TypeScript support</li>
            <li>Styles are scoped to components</li>
            <li>Works with existing CSS tooling</li>
            <li>Easier for CSS developers to work with</li>
          </ul>
        </div>
      </main>
    </div>
  );
};
