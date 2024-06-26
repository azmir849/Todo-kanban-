import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';


export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />, // This makes DashboardLayout the default layout
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> }, // Redirects / to /dashboard/app
        { path: 'dashboard/app', element: <DashboardAppPage /> },
        { path: '*', element: <Page404 /> }, // Handles unknown routes under /dashboard
      ],
    },
  ]);

  return routes;
}
