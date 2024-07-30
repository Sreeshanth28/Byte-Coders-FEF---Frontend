import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const UserDetailPage = lazy(() => import('src/pages/user-detail')); // Import the new User Detail page


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: '/dashboard/user', element: <UserPage /> },
        { path: 'user/:name', element: <UserDetailPage /> }, // Add route for User Detail page
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> }
        
      ],
    },
    {
      path: '/',
      element: <LoginPage />,
    },
    // {
    //   path: '404',
    //   element: <Page404 />,
    // },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
