import { ReactElement } from 'react';
import { SkillDataGrid } from './components/SkillDataGrid/SkillDataGrid';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/skills',
    element: <SkillDataGrid />,
  },
  {
    path: '/',
    element: <Navigate to="/skills" />,
  },
]);

/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/calculation" replace /> },
      { path: "calculation", element: <Calculation /> },
      { path: "calendar", element: <Calendar /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);
 */

export const Rise = (): ReactElement => {
  function render(): ReactElement {
    return <RouterProvider router={router} />;
  }

  return render();
};
