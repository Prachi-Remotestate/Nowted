// import React from "react";
// import SideBar from "./SideBar";

// const Main = () => {
//   return (
//     <div className="flex flex-row h-screen">
//       <div className="w-20/100 h-full bg-BackgroundPrimary">
//         <SideBar />
//       </div>
//       <div className=" w-25/100 h-full bg-BackgroundSecondary text-textColor">
//         check
//       </div>
//       <div className=" w-55/100 h-full bg-BackgroundPrimary text-textColor">
//         Whyy
//       </div>
//     </div>
//   );
// };

// export default Main;

import SideBar from "./SideBar";

const Main: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="basis-1/5 bg-BackgroundPrimary min-h-0">
        <SideBar />
      </div>

      {/* Middle panel */}
      <div className="basis-1/4 bg-BackgroundSecondary text-textColor min-h-0">
        check
      </div>

      {/* Editor panel */}
      <div className="flex-1 bg-BackgroundPrimary text-textColor min-h-0">
        Whyy
      </div>
    </div>
  );
};

export default Main;
