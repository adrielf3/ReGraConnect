export type SignInStackParamList = {
  SignIn: undefined;
  ForgotUser: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  ProfileMain: undefined;
  Notifications: undefined;
  SalusMain: undefined;
  ProjetosMain: undefined;
  EnqueteMain: undefined;
  News: undefined;
  Score: undefined;
};

export type SalusStackParamList = {
  SalusItens: undefined;
  SalusResume: undefined;
};

export type ProjetosStackParamList = {
  Project: undefined;
  Collaborator: undefined;
};

export type EnqueteStackParamList = {
  CreatePoll: undefined;
  AccessPoll: undefined;
};

export type ProfileStackParamList = {
  ProfileJob: undefined;
  ProfileBehavior: undefined;
  ProfileMeasure: undefined;
  ProfileHealth: undefined;
  ProfilePerformance: undefined;
  ProfileAddress: undefined;
  ProfileAboutMe: undefined;
};

export type PopStackParamList = {
  pop: undefined;
};

export type ScoreStackParamList = {
  Score: undefined;
  ScoreAFazer: undefined
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends
    SignInStackParamList,
    HomeStackParamList,
    SalusStackParamList,
    ProfileStackParamList,
    PopStackParamList,
    ProjetosStackParamList,
    EnqueteStackParamList,
    ScoreStackParamList
    { }
  }
}