import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextMiddleware } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/option(.*)",
  "/sign-in(.*)",
  "/api(.*)",
]);

const clerkMiddlewareInstance = clerkMiddleware(async (auth, request) => {
  if (isPublicRoute(request)) return;
  const { userId } = await auth.protect();
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
});

const middleware: NextMiddleware = async (req, event) => {
  const response = await clerkMiddlewareInstance(req, event);
  if (!response) return response;
  return response;
};

export default middleware;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
