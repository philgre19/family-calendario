
/**
 * Polyfill simple pour 'next/dynamic' dans un projet Vite/React
 */
import { lazy, Suspense } from 'react';

interface DynamicOptions {
  ssr?: boolean;
  loading?: React.ComponentType;
}

export default function dynamic(
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
  { ssr = true, loading: LoadingComponent }: DynamicOptions = {}
) {
  if (!ssr) {
    const LazyComponent = lazy(importFunc);
    
    return (props: any) => (
      <Suspense fallback={LoadingComponent ? <LoadingComponent /> : <div>Loading...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    );
  }

  // Pour SSR, retourne une fonction qui résout le module
  return async (props: any) => {
    const module = await importFunc();
    const Component = module.default;
    return <Component {...props} />;
  };
}
