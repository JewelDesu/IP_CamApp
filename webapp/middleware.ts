import {
        convexAuthNextjsMiddleware,
        createRouteMatcher,
        nextjsMiddlewareRedirect,
        //isAuthenticatedNextjs,
       } from "@convex-dev/auth/nextjs/server";
 
const isPublicPage = createRouteMatcher(["/vid"]);


export default convexAuthNextjsMiddleware((request, {convexAuth} ) => {
  if (!isPublicPage(request) && !convexAuth.isAuthenticated()) {
      return nextjsMiddlewareRedirect(request, "/vid");
    }
  
  // if (isPublicPage(request) && convexAuth.isAuthenticated()) {
  //     return nextjsMiddlewareRedirect(request, "/")
  //   }
});
 
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};