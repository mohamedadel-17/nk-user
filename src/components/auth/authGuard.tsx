'use client';

import { useEffect, ReactNode, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/api/useAuth';

interface AuthGuardProps {
  children: ReactNode;
  fallbackPath?: string;
  requireAuth?: boolean;
}

export const AuthGuard = ({ 
  children, 
  fallbackPath = '/login',
  requireAuth = true 
}: AuthGuardProps) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const shouldRedirect = useMemo(() => {
    if (isLoading) return { redirect: false, path: null };
    
    if (requireAuth && !isAuthenticated) {
      return { redirect: true, path: fallbackPath };
    }
    
    if (!requireAuth && isAuthenticated) {
      return { redirect: true, path: '/' };
    }
    
    return { redirect: false, path: null };
  }, [isLoading, isAuthenticated, requireAuth, fallbackPath]);

  const handleRedirect = useCallback(() => {
    if (shouldRedirect.redirect && shouldRedirect.path) {
      router.push(shouldRedirect.path);
    }
  }, [shouldRedirect, router]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (shouldRedirect.redirect) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
};

// Higher-order component for protecting routes
export const withAuthGuard = <P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<AuthGuardProps, 'children'> = {}
) => {
  const WrappedComponent = (props: P) => (
    <AuthGuard {...options}>
      <Component {...props} />
    </AuthGuard>
  );

  WrappedComponent.displayName = `withAuthGuard(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

export default AuthGuard;
