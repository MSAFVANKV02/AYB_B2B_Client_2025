// import React, { useState } from "react";
// import { FolderCollapsible } from "./FolderCollapsible";

// export default function FolderStructure() {
//   const [collapseAll, setCollapseAll] = useState(false);

//   const toggleCollapseAll = () => {
//     setCollapseAll(!collapseAll);
//   };

//   return (
//     <div className="min-h-screen w-screen flex">
//       <div className="w-1/2 p-10 border">
//         <h2 className="text-lg font-semibold mb-4">Static Folder Structure</h2>
//         <pre>
//           {`
// src/
// ├── pages/
// │   └── adminSide/
// │       ├── Dashboard.tsx
// │   └── folderStructure/
// │       ├── FolderCollapsible.tsx
// │       ├── FolderStructure.tsx
// │   └── userSide/
// │   │    └── About
// │   │        ├── About.tsx
// │   │    └── Auth_Page
// │   │        └── UserLoginPage
// │   │            ├── LoginOtpVerifyUser.tsx
// │   │            ├── UserLogin.tsx
// │   │    ├── OtpVerificationPage.tsx
// │   │    ├── Register.tsx
// │   │    ├── UserDetails.tsx
// │   │    │
// │   │    └── Home
// │   │      ├── Home.tsx
// │   │      ├── MainHome.tsx
// │   │    └── Prod_Pages
// │   │       └── Category_Wise
// │   │           ├── CategoryProductPage.tsx
// │   │       └── Color_Wise
// │   │           ├── ColorProduct.tsx
// │   │    └── UserKycPage
// │   │       └── KycDetails
// │   │           ├── KycBanner.tsx
// │   │           ├── KycDetails.tsx
// │   │           ├── KycProofs.tsx
// │   │           ├── KycUpload.tsx
// │   │           ├── PdfFile.tsx
// │   │       └── KycHomeChild
// │   │           ├── KycHome_c1.tsx
// │   │       ├── KycHome.tsx
// │   │    ├── ErrorPage.tsx
// │   │    
// │   └── providers/
// │       └── context
// │           ├── ScrollContext.tsx
// │       ├── AuthContext.tsx
// │   └──  redux/
// │       └── adminSide
// │       └── userSide
// │           ├── KycSlice.ts
// │           ├── UserAuthSlice.ts
// │       ├── hook.ts
// │       ├── store.ts
// │   └── routers/
// │       └── RootRouter.tsx
// │   └──  types/
// │       ├── navTypes.ts
// │       ├── userTypes.ts
// │       ├── productTypes.ts
// │       ├── orderTypes.ts
// │   └──  types/
// │       ├── navTypes.ts
// │       ├── userTypes.ts
// │       ├── productTypes.ts
// │       ├── orderTypes.ts
// │   └──  utils/
// │           └──  validator/
// │               ├── product-validator.ts
// │       ├── cardDetails.ts
// │       ├── QueryParams.ts
// │       ├── toaster.ts
// │       ├── urlPath.ts
// ├── AdminLayout.tsx
// ├── App.tsx
// ├── DrawerLayout.tsx
// ├── KycLayout.tsx
// ├── Layout.tsx
// ├── main.tsx
// ├── .env


//           `}
//         </pre>
//       </div>

//       <div className="w-1/2 p-10 border">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">
//             Collapsible Folder Structure
//           </h2>
//           <button
//             onClick={toggleCollapseAll}
//             className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition"
//           >
//             {collapseAll ? "Expand All" : "Collapse All"}
//           </button>
//         </div>
//         <FolderCollapsible collapseAll={collapseAll} />
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import FolderTree from "./FolderCollapsible";
// import { FolderCollapsible } from "./FolderCollapsible";

export default function FolderStructure() {
  const [collapseAll, setCollapseAll] = useState(true);

  const toggleCollapseAll = () => {
    setCollapseAll(!collapseAll);
  };

  return (
    <div className="min-h-screen w-screen flex">
      <div className="w-1/2 p-10 border">
        <h2 className="text-lg font-semibold mb-4">Static Folder Structure</h2>
        <pre>
          {`
src/
├── AdminLayout.tsx
├── App.tsx
├── DrawerLayout.tsx
├── KycLayout.tsx
├── Layout.tsx
├── main.tsx
├── .env
├── pages/
│   ├── adminSide/
│   │   └── Dashboard.tsx
│   ├── folderStructure/
│   │   ├── FolderCollapsible.tsx
│   │   └── FolderStructure.tsx
│   ├── userSide/
│   │   ├── About/
│   │   │   └── About.tsx
│   │   ├── Auth_Page/
│   │   │   └── UserLoginPage/
│   │   │       ├── LoginOtpVerifyUser.tsx
│   │   │       └── UserLogin.tsx
│   │   ├── OtpVerificationPage.tsx
│   │   ├── Register.tsx
│   │   ├── UserDetails.tsx
│   │   ├── Home/
│   │   │   ├── Home.tsx
│   │   │   └── MainHome.tsx
│   │   ├── Prod_Pages/
│   │   │   ├── Category_Wise/
│   │   │   │   └── CategoryProductPage.tsx
│   │   │   └── Color_Wise/
│   │   │       └── ColorProduct.tsx
│   │   ├── UserKycPage/
│   │   │   ├── KycDetails/
│   │   │   │   ├── KycBanner.tsx
│   │   │   │   ├── KycDetails.tsx
│   │   │   │   ├── KycProofs.tsx
│   │   │   │   ├── KycUpload.tsx
│   │   │   │   └── PdfFile.tsx
│   │   │   └── KycHomeChild/
│   │   │       └── KycHome_c1.tsx
│   │   ├── KycHome.tsx
│   │   └── ErrorPage.tsx
├── providers/
│   ├── context/
│   │   └── ScrollContext.tsx
│   └── AuthContext.tsx
├── redux/
│   ├── adminSide/
│   │   └── [Your admin side redux files here]
│   ├── userSide/
│   │   ├── KycSlice.ts
│   │   └── UserAuthSlice.ts
│   ├── hook.ts
│   └── store.ts
├── routers/
│   └── RootRouter.tsx
├── types/
│   ├── navTypes.ts
│   ├── userTypes.ts
│   ├── productTypes.ts
│   └── orderTypes.ts
└── utils/
    ├── validator/
    │   └── product-validator.ts
    ├── cardDetails.ts
    ├── QueryParams.ts
    ├── toaster.ts
    └── urlPath.ts

          `}
        </pre>
      </div>

      <div className="w-1/2 p-10 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Collapsible Folder Structure
          </h2>
          <button
            onClick={toggleCollapseAll}
            className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition"
          >
            {collapseAll ? "Expand All" : "Collapse All"}
          </button>
        </div>
        {/* <FolderCollapsible collapseAll={collapseAll} /> */}
        <FolderTree collapseAll={collapseAll} />
      </div>
    </div>
  );
}
