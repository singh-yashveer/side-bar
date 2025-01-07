// import React from "react";
// import { Menu } from "./components/menu";
// import type { MenuItemStyles } from "./components/menu";
// import { MenuItem } from "./components/menuItem";
// import { Sidebar } from "./components/sidebar";
// import { SubMenu } from "./components/subMenu";
// import { Separator } from "./styles/separator";
// import { menuClasses } from "./utils/utilClasses";
// import { hexToRgba } from "./helpers";

import { Menu } from "./components/menu";
import { MenuItem } from "./components/menuItem";

// const menuItemStyles: MenuItemStyles = {
//   root: {
//     fontSize: 14,
//     fontWeight: 400,
//   },
//   icon: {
//     color: "#0098e5",
//     [`&.${menuClasses.disabled}`]: {
//       color: "#9fb6cf",
//     },
//   },
//   SubMenuExpandIcon: {
//     color: "#b6b7b9",
//   },
//   subMenuContent: ({ level }) => ({
//     backgroundColor: level === 0 ? hexToRgba("#fbfcfd") : "transparent",
//   }),
//   button: {
//     [`&.${menuClasses.disabled}`]: {
//       color: "#9fb6cf",
//     },
//     "&:hover": {
//       backgroundColor: hexToRgba("#c5e4ff"),
//       color: "#44596e",
//     },
//   },
//   label: ({ open }) => ({
//     fontWeight: open ? 600 : 400,
//   }),
// };

// function App() {
//   const [toggled, setToggled] = React.useState(false);
//   const [collapse, setCollapse] = React.useState(false);

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="md" collapsed={collapse}>
//         <Menu menuItemStyles={menuItemStyles}>
//           <SubMenu label="Heading 1">
//             <MenuItem> SubHeading 1 </MenuItem>
//             <MenuItem> SubHeading 2 </MenuItem>
//           </SubMenu>
//           <MenuItem> Heading 2 </MenuItem>
//           <MenuItem> Heading 3</MenuItem>
//         </Menu>
//         <Separator color="black" width="80%" opacity={0.5} />
//         <Menu>
//           <SubMenu label="Heading 1">
//             <SubMenu label="SubHeading 3">
//               <MenuItem> SubHeading 1 </MenuItem>
//               <MenuItem> SubHeading 2 </MenuItem>
//             </SubMenu>
//           </SubMenu>
//           <MenuItem> Heading 2 </MenuItem>
//           <MenuItem> Heading 3</MenuItem>
//         </Menu>
//       </Sidebar>

//       <main>
//         <button onClick={() => setToggled(!toggled)}>Toggler under breakpoint</button>
//         <button onClick={() => setCollapse(!collapse)}>Toggle Collapse</button>
//       </main>
//     </div>
//   );
// }

// export default App;

function App() {
  return (
    <div>
      <Menu>
        <MenuItem>Hello</MenuItem>
      </Menu>
      <h1>App</h1>
    </div>
  );
}

export default App;
