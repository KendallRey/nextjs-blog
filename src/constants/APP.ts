const ID = ":id:";

const WORK = {
  NAME: "Works",
  LINK: "/admin/works",
  WORK_ID: `/admin/works?id=${ID}`,
} as const;

const ABOUT = {
  NAME: "About",
  LINK: "/admin/about",
  ABOUT_ID: `/admin/about?id=${ID}`,
} as const;

const PROJECTS = {
  NAME: "Projects",
  LINK: "/admin/projects",
  TRANSACTION_ID: `/admin/projects?id=${ID}`,
} as const;

export const APP = {
  ID: ID,
  ROUTES: {
    ADMIN: {
      WORK,
      ABOUT,
      PROJECTS,
    },
  },
} as const;
