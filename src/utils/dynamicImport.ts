
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
    // Client-side rendering with React.lazy
    const LazyComponent = lazy(importFunc);
    
    return function DynamicComponent(props: any) {
      return (
        <Suspense fallback={LoadingComponent ? <LoadingComponent /> : <div>Loading...</div>}>
          <LazyComponent {...props} />
        </Suspense>
      );
    };
  }

  // For SSR, return an async function that resolves the module
  return async function ServerComponent(props: any) {
    const module = await importFunc();
    const Component = module.default;
    return <Component {...props} />;
  };
}
