export interface Restaurant {
  id: number;
  geo_point_lat: string;
  geo_point_lon: string;
  name?: string;
  cuisine?: null;
  opening_hours?: string;
  phone?: string;
  type?: string;
  created_at: string;
  updated_at: string;
}

export interface Vote {
  restaurant_id: number;
  survey_id: number;
  id: number;
  user_id: number;
  restaurant: Restaurant;
  users: User[];
  meeting_time: string;
  creator?: User;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  email_verified_at: string;
}

export interface Survey {
  id: number;
  is_open: boolean;
  created_at: string;
  updated_at: string;
  votes: any[];
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  surveys: Survey[];
};

export type VotePageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  restaurants: Restaurant[];
  survey: Survey[];
};
