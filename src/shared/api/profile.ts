import { axiosInstance } from './axios';

export interface CurrentUserProfileDto {
  Id: string;
  Email: string;
  Name: string;
  Role: string;
  Phone: string;
}

export interface UpdateCurrentUserDto {
  Email: string;
  Phone: string;
  FirstName: string;
  LastName: string;
}

export const profileApi = {
  getCurrentUser: () =>
    axiosInstance.get<CurrentUserProfileDto>('/api/Users/current'),

  updateCurrentUser: (userData: UpdateCurrentUserDto) =>
    axiosInstance.put<CurrentUserProfileDto>('/api/Users/current', userData),
};
