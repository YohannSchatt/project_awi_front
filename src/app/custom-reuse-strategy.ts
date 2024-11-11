import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {
  private handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // Determine if this route should be detached (stored)
    return route.routeConfig !== null;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // Store the detached route
    const path = route.routeConfig && route.routeConfig.path;
    if (path) {
      this.handlers[path] = handle;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // Determine if this route should be reattached
    const path = route.routeConfig && route.routeConfig.path;
    return !!path && !!this.handlers[path];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // Retrieve the stored route
    const path = route.routeConfig && route.routeConfig.path;
    if (path) {
      return this.handlers[path];
    }
    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // Determine if the route should be reused
    return future.routeConfig === curr.routeConfig;
  }
}
