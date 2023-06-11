export interface IUser {
  uid: string;
  email: string | null;
  name: string | null,
  provider: string,
  photoUrl: string | null
  username?: string | null
};

export interface ILushSite {
  name: string;
  bio: string;
  username: string;
  lush_links: {
    id: string;
    title: string;
    url: string;
  }[];
  social_links: {
    site: string;
    username: string;
  }[];
  profile_picture_url: string;
  userId: string;
}

export interface IAnalyticsData {
  pageviewCount: number;
  clickCounts: {
    url: string;
    count: number;
  }[];
}
