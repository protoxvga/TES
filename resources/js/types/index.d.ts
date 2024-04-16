import { Restaurant, Survey, User } from "./models";

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
};
