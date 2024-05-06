import React from "react";

function DashboardCard({ iconColor, Icon }) {
  const IconComponent = Icon; // Assuming icon is a React component

  return (
    <IconComponent className={`colored-icon-large my-3 py-3 ${iconColor}`} />
  );
}

export default DashboardCard;
