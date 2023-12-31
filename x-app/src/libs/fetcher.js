const api = import.meta.env.VITE_BACKEND_URL;
// const api = "http://localhost:8888";
console.log(api);
export function getToken() {
  return JSON.parse(localStorage.getItem("token") || null);
}

export async function fetchRegister(name, handle, profile, password) {
  const res = await fetch(`${api}/users`, {
    method: "post",
    body: JSON.stringify({
      name,
      handle,
      profile,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    return res;
  }
  return false;
}

export async function fetchLogin(handle, password) {
  const res = await fetch(`${api}/login`, {
    method: "post",
    body: JSON.stringify({ handle, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) return false;

  const { token, user } = await res.json();
  localStorage.setItem("token", JSON.stringify(token));

  return user;
}

export async function fetchVerify() {
  const token = getToken();
  if (!token) return false;
  const res = await fetch(`${api}/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return false;

  return await res.json();
}

export async function fetchPosts() {
  const token = getToken();

  const res = await fetch(`${api}/posts`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return false;

  return await res.json();
}

export async function fetchComments(id) {
  const res = await fetch(`${api}/posts/${id}`);
  if (!res.ok) return false;

  return await res.json();
}

export async function fetchProfile(handle) {
  const res = await fetch(`${api}/users/${handle}/profile`);
  if (!res.ok) return false;
  return await res.json();
}

export async function fetchLikes(id) {
  const res = await fetch(`${api}/posts/${id}`);
  if (!res.ok) return [];
  const post = await res.json();
  return post.liked_users || [];
}

export async function fetchToggleLike(id) {
  const token = getToken();
  addNewNoti("like", id);
  const res = await fetch(`${api}/posts/${id}/like`, {
    method: "put",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    return;
  }
  return res.ok;
}

export async function fetchAllComments(id) {
  const res = await fetch(`${api}/posts/${id}/comments`, {
    method: "get",
  });
  if (!res.ok) {
    return;
  }
  return res.json();
}

export async function fetchFollowing(handle) {
  const res = await fetch(`${api}/user/${handle}/follower`);
  if (!res.ok) {
    return;
  }
  return res.json();
}

export async function addNewComment(type, content, userId, origin) {
  const token = getToken();
  const res = await fetch(`${api}/new/post`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, type, userId, origin }),
  });
  if (!res) {
    return false;
  }
  const result = await res.json();
  addNewNoti("comment", origin);
  return result;
}

export async function addNewPost(type, content, userId) {
  const token = getToken();
  const res = await fetch(`${api}/new/post`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, type, userId }),
  });
  if (!res) {
    return false;
  }
  return res.json();
}
export async function followToUser({ _id }) {
  const token = getToken();
  const res = await fetch(`${api}/following/follow/${_id}`, {
    method: "put",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (res) {
    return res;
  }
  return false;
}

export async function UnfollowToUser({ _id }) {
  const token = getToken();
  const res = await fetch(`${api}/following/unfollow/${_id}`, {
    method: "put",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (res) {
    return res;
  }
  return false;
}

export const fetchNoti = async () => {
  const token = getToken();
  const res = await fetch(`${api}/notis`, {
    method: "get",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!res) return false;
  return await res.json();
};

export const fetchReadNoti = async (id) => {
  const token = getToken();
  const res = await fetch(`${api}/notis/read/${id}`, {
    method: "put",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const addNewNoti = async (type, target) => {
  const token = getToken();
  const res = await fetch(`${api}/notis/new`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ type, target }),
  });
  if (!res) return false;
  return res;
};
//upload cover photo
export const uploadCover = async (id, formData) => {
  console.log(id, formData);
  const token = getToken();
  const res = await fetch(`${api}/upload/coverImage/${id}`, {
    method: "post",
    body: formData,
  });
  if (!res) return false;
  return res;
};

export const uploadPhoto = async (id, formData) => {
  console.log(id, formData);
  const token = getToken();
  const res = await fetch(`${api}/upload/photo/${id}`, {
    method: "post",
    body: formData,
  });
  if (!res) return false;
  return res;
};
export const searchUser = async (text) => {
  console.log(text);
  const res = await fetch(`${api}/searchUser`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (res.status == 200) {
    return res;
  }
  return false;
};
export const editNameAndHandle = async (name, handle) => {
  const token = getToken();
  const res = await fetch(`${api}/edit/info`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, handle }),
  });
  if (res.status == 200) {
    return res;
  }
  return false;
};
export const deleteSinglePost = async (id) => {
  const token = getToken();
  const res = await fetch(`${api}/delete/post/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (res.status == 200) {
    return res;
  }
  return false;
};
