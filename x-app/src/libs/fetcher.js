const api = "http://localhost:8888";

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

  return res.ok;
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
  const res = await fetch(`${api}/users/${handle}`);
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
