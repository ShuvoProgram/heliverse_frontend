
export type IMeta = {
    limit: number;
    page: number;
    total: number;
  }
  
//   export type ResponseSuccessType = {
//     data: any;
//     meta?: IMeta;
//   };

export type IUser = {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    avatar: string;
    domain: string;
    available: boolean;
}

export type ITeam = {
  teamName: string;
  teamMember: string;
};

export interface IDebounced {
  searchQuery: string;
  delay: number;
}