// import React, { useState, useEffect } from "react";
// import { FaFolder, FaFolderOpen, FaFile } from "react-icons/fa";
// import { useSpring, animated } from '@react-spring/web';

// interface FolderCollapsibleProps {
//   collapseAll: boolean;
// }

// export const FolderCollapsible = ({ collapseAll }: FolderCollapsibleProps) => {
//   const [openFolders, setOpenFolders] = useState<{ [key: string]: boolean }>({
//     src: true,
//     lib: true,
//     app: true,
//     components: true,
//     ui: true,
//   });

//   useEffect(() => {
//     // Collapse or expand all folders based on the "Collapse All" button
//     const updatedOpenFolders = Object.keys(openFolders).reduce((acc, folder) => {
//       acc[folder] = !collapseAll;
//       return acc;
//     }, {} as { [key: string]: boolean });
//     setOpenFolders(updatedOpenFolders);
//   }, [collapseAll]);

//   const toggleFolder = (folder: string) => {
//     setOpenFolders((prevState) => ({
//       ...prevState,
//       [folder]: !prevState[folder],
//     }));
//   };

//   return (
//     <div>
//       <Folder
//         name="src"
//         isOpen={openFolders.src}
//         toggle={() => toggleFolder("src")}
//       >
//         {/* Subfolder lib */}
//         <Folder
//           name="lib"
//           isOpen={openFolders.lib}
//           toggle={() => toggleFolder("lib")}
//         >
//           <File name="utils.ts" />
//         </Folder>

//         {/* Subfolder app */}
//         <Folder
//           name="app"
//           isOpen={openFolders.app}
//           toggle={() => toggleFolder("app")}
//         >
//           <File name="page.tsx" />
//           <Folder
//             name="data-table-components"
//             isOpen={openFolders["data-table-components"]}
//             toggle={() => toggleFolder("data-table-components")}
//           >
//             <File name="data.json" />
//             <File name="columns.tsx" />
//             <File name="data-table-column-header.tsx" />
//             <File name="data-table-faceted-filter.tsx" />
//             <File name="data-table-pagination.tsx" />
//             <File name="data-table-row-actions.tsx" />
//             <File name="data-table-toolbar.tsx" />
//             <File name="data-table-view-options.tsx" />
//             <File name="schema.ts" />
//           </Folder>
//         </Folder>

//         {/* Subfolder components */}
//         <Folder
//           name="components"
//           isOpen={openFolders.components}
//           toggle={() => toggleFolder("components")}
//         >
//           <File name="calendar-date-picker.tsx" />
//         </Folder>

//         {/* Subfolder ui */}
//         <Folder
//           name="ui"
//           isOpen={openFolders.ui}
//           toggle={() => toggleFolder("ui")}
//         >
//           <File name="calendar.tsx" />
//         </Folder>
//       </Folder>
//     </div>
//   );
// };

// // Folder Component with react-spring for smooth transitions
// const Folder = ({
//   name,
//   isOpen,
//   toggle,
//   children,
// }: {
//   name: string;
//   isOpen: boolean;
//   toggle: () => void;
//   children: React.ReactNode;
// }) => {
//   const animationProps = useSpring({
//     from: { maxHeight: 0, opacity: 0 },
//     to: { maxHeight: isOpen ? 500 : 0, opacity: isOpen ? 1 : 0 },
//     config: { duration: 300 },
//   });

//   return (
//     <div className="mb-4">
//       <div
//         onClick={toggle}
//         className="cursor-pointer flex items-center gap-2"
//       >
//         {isOpen ? <FaFolderOpen /> : <FaFolder />}
//         {name}
//       </div>
//       <animated.div
//         style={animationProps}
//         className="pl-6 mt-2 overflow-hidden relative"
//       >
//         {/* Vertical line */}
//         <div className="absolute left-0 top-0 h-full border-l border-gray-400"></div>
//         {children}
//       </animated.div>
//     </div>
//   );
// };

// // File Component
// const File = ({ name }: { name: string }) => {
//   return (
//     <div className="flex items-center gap-2">
//       <FaFile />
//       {name}
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import { animated } from "@react-spring/web";
import { FaFolder, FaFolderOpen, FaFile } from "react-icons/fa";

export interface FolderNode {
  name: string;
  toggled?: boolean; // optional for leaf nodes
  children?: FolderNode[]; // optional for leaf nodes
}

const initialData: FolderNode = {
  name: "src",
  toggled: true,
  children: [
    { name: "AdminLayout.tsx" },
    { name: "App.tsx" },
    { name: "DrawerLayout.tsx" },
    { name: "KycLayout.tsx" },
    { name: "Layout.tsx" },
    { name: "main.tsx" },
    { name: ".env" },
    {
      name: "pages",
      toggled: true,
      children: [
        {
          name: "adminSide",
          children: [{ name: "Dashboard.tsx" }],
        },
        {
          name: "folderStructure",
          children: [
            { name: "FolderCollapsible.tsx" },
            { name: "FolderStructure.tsx" },
          ],
        },
        {
          name: "userSide",
          toggled: true,
          children: [
            {
              name: "About",
              children: [{ name: "About.tsx" }],
            },
            {
              name: "Auth_Page",
              children: [
                {
                  name: "UserLoginPage",
                  children: [
                    { name: "LoginOtpVerifyUser.tsx" },
                    { name: "UserLogin.tsx" },
                  ],
                },
              ],
            },
            { name: "OtpVerificationPage.tsx" },
            { name: "Register.tsx" },
            { name: "UserDetails.tsx" },
            {
              name: "Home",
              children: [{ name: "Home.tsx" }, { name: "MainHome.tsx" }],
            },
            {
              name: "Prod_Pages",
              children: [
                {
                  name: "Category_Wise",
                  children: [{ name: "CategoryProductPage.tsx" }],
                },
                {
                  name: "Color_Wise",
                  children: [{ name: "ColorProduct.tsx" }],
                },
                {
                  name: "ProductDetails",
                  children: [{ name: "ProductDetail.tsx" }],
                },
              ],
            },
            {
              name: "my-account",
              children: [
                {
                  name: "chat",
                  children: [
                    { name: "Chat-Page.tsx" },
                    { name: "ChatBot.tsx" },
                  ],
                },
                {
                  name: "my-orders",
                  children: [
                    {
                      name: "single-order",
                      children: [
                        { name: "Single-Order-Page.tsx" },
                        { name: "OrderStatus.tsx" },
                       
                      ],
                    },
                    { name: "My-Orders-Page.tsx" },
                    { name: "OrderTab.tsx" },
                    { name: "ReplaceTab.tsx" },
                  ],
                },
                {
                  name: "wishlist",
                  children:[
                    { name: "wishlist-page.tsx" },
                    { name: "WishlistTab.tsx" },
                  ]
                },
                {
                  name: "layout.tsx",
                },
                {
                  name: "my-profile-page.tsx",
                },
                {
                  name: "Profile-form.tsx",
                },
                {
                  name: "Profile-Kyc-Details",
                },
              ],
            },
            {
              name: "UserKycPage",
              children: [
                {
                  name: "KycDetails",
                  children: [
                    { name: "KycBanner.tsx" },
                    { name: "KycDetails.tsx" },
                    { name: "KycProofs.tsx" },
                    { name: "KycUpload.tsx" },
                    { name: "PdfFile.tsx" },
                  ],
                },
                {
                  name: "KycHomeChild",
                  children: [{ name: "KycHome_c1.tsx" }],
                },
                { name: "KycHome.tsx" },
              ],
            },
            { name: "ErrorPage.tsx" },
          ],
        },
      ],
    },
    {
      name: "providers",
      children: [
        {
          name: "context",
          children: [{ name: "ScrollContext.tsx" }],
        },
        { name: "AuthContext.tsx" },
      ],
    },
    {
      name: "redux",
      children: [
        {
          name: "adminSide",
          children: [],
        },
        {
          name: "userSide",
          children: [{ name: "KycSlice.ts" }, { name: "UserAuthSlice.ts" }],
        },
        { name: "hook.ts" },
        { name: "store.ts" },
      ],
    },
    {
      name: "routers",
      children: [{ name: "RootRouter.tsx" }],
    },
    {
      name: "types",
      children: [
        { name: "navTypes.ts" },
        { name: "userTypes.ts" },
        { name: "productTypes.ts" },
        { name: "orderTypes.ts" },
      ],
    },
    {
      name: "utils",
      children: [
        {
          name: "validator",
          children: [{ name: "product-validator.ts" }],
        },
        { name: "cardDetails.ts" },
        { name: "QueryParams.ts" },
        { name: "toaster.ts" },
        { name: "urlPath.ts" },
      ],
    },
  ],
};

interface FolderTreeProps {
  collapseAll: boolean;
}

const FolderTree: React.FC<FolderTreeProps> = ({ collapseAll }) => {
  const [treeData, setTreeData] = useState<FolderNode>(initialData); // State for folder structure

  const onToggle = (node: FolderNode): void => {
    const newTreeData = { ...treeData }; // Create a new tree data to avoid mutation
    const toggleNode = (currentNode: FolderNode) => {
      if (currentNode.name === node.name) {
        currentNode.toggled = !currentNode.toggled; // Toggle the node
      }
      if (currentNode.children) {
        currentNode.children.forEach(toggleNode); // Recursively toggle children
      }
    };
    toggleNode(newTreeData);
    setTreeData(newTreeData); // Update state with the new tree data
  };

  const renderNode = (node: FolderNode): JSX.Element => {
    return (
      <div key={node.name} className="ml-4">
        <div
          className="cursor-pointer flex items-center"
          onClick={() => onToggle(node)}
        >
          {node.children ? (
            node.toggled ? (
              <FaFolderOpen className="mr-2 text-yellow-600" color="" />
            ) : (
              <FaFolder className="mr-2 text-orange-600" />
            )
          ) : (
            <FaFile className="mr-2 text-blue-600" />
          )}
          {node.name}
        </div>
        {node.children && (
          <animated.div
            style={{
              opacity: node.toggled ? 1 : 0,
              maxHeight: node.toggled ? "1000000000000px" : "0px", // For smooth collapsing effect
              overflow: "hidden",
            }}
          >
            {node.children.map(renderNode)}
          </animated.div>
        )}
      </div>
    );
  };

  // Collapse or expand all nodes based on the collapseAll prop
  useEffect(() => {
    const toggleAll = (node: FolderNode): void => {
      node.toggled = !collapseAll; // Toggle the node based on collapseAll
      if (node.children) {
        node.children.forEach(toggleAll); // Recursively toggle children
      }
    };

    const newTreeData = { ...treeData }; // Create a new tree data to avoid mutation
    toggleAll(newTreeData);
    setTreeData(newTreeData); // Update state with the new tree data
  }, [collapseAll]);

  return <div>{renderNode(treeData)}</div>;
};

export default FolderTree;
