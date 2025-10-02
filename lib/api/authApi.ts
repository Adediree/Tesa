import { api, simulateNetworkDelay } from './baseApi';
import { User } from '@/types';
import { createMockUser } from '../mock-data/generators';
import { generateId } from '../utils';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

const mockUsers: Map<string, { user: User; password: string }> = new Map();

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      queryFn: async (credentials) => {
        await simulateNetworkDelay();

        const userEntry = mockUsers.get(credentials.email);

        if (!userEntry || userEntry.password !== credentials.password) {
          return {
            error: {
              status: 401,
              data: { message: 'Invalid email or password' },
            },
          };
        }

        return {
          data: {
            user: userEntry.user,
            token: `mock-token-${generateId()}`,
          },
        };
      },
      invalidatesTags: ['User'],
    }),

    register: builder.mutation<AuthResponse, RegisterRequest>({
      queryFn: async (userData) => {
        await simulateNetworkDelay();

        if (mockUsers.has(userData.email)) {
          return {
            error: {
              status: 409,
              data: { message: 'Email already exists' },
            },
          };
        }

        const newUser = createMockUser({
          email: userData.email,
          name: userData.name,
          role: 'free',
        });

        mockUsers.set(userData.email, {
          user: newUser,
          password: userData.password,
        });

        return {
          data: {
            user: newUser,
            token: `mock-token-${generateId()}`,
          },
        };
      },
      invalidatesTags: ['User'],
    }),

    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      queryFn: async ({ email }) => {
        await simulateNetworkDelay();

        if (!mockUsers.has(email)) {
          return {
            error: {
              status: 404,
              data: { message: 'Email not found' },
            },
          };
        }

        return {
          data: { message: 'Password reset link sent to your email' },
        };
      },
    }),

    resetPassword: builder.mutation<{ message: string }, { token: string; password: string }>({
      queryFn: async () => {
        await simulateNetworkDelay();
        return {
          data: { message: 'Password reset successfully' },
        };
      },
    }),

    updateProfile: builder.mutation<User, Partial<User> & { id: string }>({
      queryFn: async (updates) => {
        await simulateNetworkDelay();

        const userEmail = Array.from(mockUsers.entries()).find(
          ([, entry]) => entry.user.id === updates.id
        )?.[0];

        if (!userEmail) {
          return {
            error: {
              status: 404,
              data: { message: 'User not found' },
            },
          };
        }

        const userEntry = mockUsers.get(userEmail)!;
        const updatedUser = { ...userEntry.user, ...updates };
        mockUsers.set(userEmail, { ...userEntry, user: updatedUser });

        return { data: updatedUser };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
} = authApi;
