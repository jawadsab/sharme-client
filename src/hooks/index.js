import { useQuery, useMutation, useQueryClient } from 'react-query';
import { request } from '../api';

const getAuthUser = () => {
  return request({ url: '/api/user' });
};
const getStoredUser = () => {
  const storedUser = localStorage.getItem('auth');
  return storedUser ? JSON.parse(JSON.stringify(storedUser)) : null;
};
export const useAuthUser = () => {
  const queryClient = useQueryClient();
  return useQuery('auth-user', getAuthUser, {
    retry: false,
    refetchOnWindowFocus: false,
    initialData: null,
    onError: (err) => {
      console.log('Error....');
      localStorage.removeItem('auth');
      queryClient.setQueryData('auth-user', null);
    },
  });
};

export const useRegister = () => {
  return useMutation((userData) =>
    request({ url: '/api/auth/register', method: 'POST', data: userData })
  );
};

export const useAuth = () => {
  return useMutation(
    (userData) =>
      request({ url: '/api/auth/login', method: 'POST', data: userData }),
    {
      onSuccess: (data) => {
        const response = data.data;
        const payload = {
          token: response.token,
          _id: response._id,
          isAuthenticated: true,
        };
        localStorage.setItem('auth', JSON.stringify(payload));
      },
    }
  );
};

const fetchUserDetails = (userID) => {
  return request({ url: `/api/user/${userID}`, method: 'GET' });
};

export const useUser = (userID) => {
  return useQuery(['userDetails', userID], () => fetchUserDetails(userID), {
    refetchOnWindowFocus: false,
  });
};

const fetchCreatedPins = (userID) => {
  return request({ url: `/api/user/${userID}/pins`, method: 'GET' });
};

export const useCreatedPins = (userID, isCreated) => {
  return useQuery(['createdPins', userID], () => fetchCreatedPins(userID), {
    refetchOnWindowFocus: false,
    enabled: isCreated === 'Created',
  });
};

const fetchSavedPins = (userID) => {
  return request({ url: `/api/user/${userID}/saved/pins`, method: 'GET' });
};
export const useSavedPins = (userID, isSaved) => {
  return useQuery(['savedPins', userID], () => fetchSavedPins(userID), {
    refetchOnWindowFocus: false,
    enabled: isSaved === 'Saved',
  });
};

const fetchPinDetails = (pinID) => {
  return request({ url: `/api/pins/${pinID}` });
};

export const usePinDetails = (pinID) => {
  return useQuery(['pinDetails', pinID], () => fetchPinDetails(pinID), {
    refetchOnWindowFocus: false,
  });
};

const fetchComments = (pinID) => {
  return request({ url: `/api/pins/${pinID}/comments` });
};

export const useComments = (pinID) => {
  return useQuery(['get-comments', pinID], () => fetchComments(pinID), {
    refetchOnWindowFocus: false,
  });
};

const fetchPinsByCategory = (cat) => {
  return request({ url: `/api/pins/${cat}/all` });
};

export const useCategory = (cat) => {
  return useQuery(
    ['get-pins-by-category', cat],
    () => fetchPinsByCategory(cat),
    {
      refetchOnWindowFocus: false,
      enabled: !!cat,
    }
  );
};

export const useComment = (id) => {
  console.log(id);
  const queryClient = useQueryClient();
  return useMutation(
    (comment) =>
      request({ url: `/api/comments/${id}`, method: 'POST', data: comment }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['get-comments', id]);
      },
    }
  );
};

export const useEditProfile = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (bodyFormData) => {
      console.log("body",bodyFormData);
      return request({
        url: '/api/user/profile-image/upload',
        method: 'PUT',
        data: bodyFormData,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userDetails', id]);
      },
    }
  );
};

export const useCreatePin = (successCallback) => {
  return useMutation(
    (bodyFormData) => {
      return request({
        url: '/api/pins',
        method: 'POST',
        Headers: { 'Content-Type': 'multipart/form-data' },
        data: bodyFormData,
      });
    },
    {
      onSuccess: () => {
        successCallback();
      },
    }
  );
};

export const useDeletePin = (successCallback) => {
  return useMutation(
    (id) => {
      return request({ url: `/api/pins/${id}`, method: 'DELETE' });
    },
    {
      onSuccess: () => {
        successCallback();
      },
    }
  );
};

export const useSavePin = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id) => {
      return request({ url: `/api/pins/${id}`, method: 'PUT' });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("get-all-pins");
      },
    }
  );
};
