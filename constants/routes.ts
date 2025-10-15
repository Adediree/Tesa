export const ROUTES = {
  HOME: "/",

  AUTH: {
    LOGIN: "/auth/register/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
  },

  MARKETING: {
    ABOUT: "/about",
    CONTACT: "/contact",
    PRICING: "/pricing",
  },

  CATALOG: {
    SPECIALIZATIONS: "/specializations",
    SPECIALIZATION_DETAIL: (id: string) => `/specializations/${id}`,
    COURSES: "/courses",
    COURSE_DETAIL: (id: string) => `/courses/${id}`,
  },

  DASHBOARD: {
    HOME: "/dashboard",
    MY_COURSES: "/dashboard/courses",
    COURSE_CONTENT: (courseId: string) => `/dashboard/courses/${courseId}`,
    MODULE: (courseId: string, moduleId: string) =>
      `/dashboard/courses/${courseId}/modules/${moduleId}`,
    QUIZ: (courseId: string, moduleId: string) =>
      `/dashboard/courses/${courseId}/modules/${moduleId}/quiz`,
    LIVE_CLASSES: "/dashboard/live-classes",
    PROGRESS: "/dashboard/progress",
    CERTIFICATES: "/dashboard/certificates",
    BOOKMARKS: "/dashboard/bookmarks",
    SETTINGS: "/dashboard/settings",
    PROFILE: "/dashboard/profile",
  },

  DASHBOARDHOME: { HOME: (id: string) => `/dashboard-home?courseId=${id}` },

  ADMIN: {
    HOME: "/admin",
    COURSES: "/admin/courses",
    USERS: "/admin/users",
    LIVE_CLASSES: "/admin/live-classes",
    ANALYTICS: "/admin/analytics",
  },
} as const;

export type RouteKey = keyof typeof ROUTES;
