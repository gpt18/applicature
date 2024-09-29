import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  navigateTo: string;
  condition: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  navigateTo,
  condition,
}) => {
  const isAuthenticated = condition;

  return isAuthenticated ? children : <Navigate to={navigateTo} />;
};

export default PrivateRoute;
