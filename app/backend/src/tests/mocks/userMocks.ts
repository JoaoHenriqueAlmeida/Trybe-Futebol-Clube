export const foundUserMock = {
  id: 1,
  username: "Admin",
  role: "admin",
  password: "admin_password",
  email: "admin@admin.com",
}

export const loginResponseMock = {
  user: {
    id: foundUserMock.id,
    username: foundUserMock.username,
    role: foundUserMock.role,
    email: foundUserMock.email,
  },
  token: 'eyJhb',
}

export const accurateRequestInfo = {
  email: "admin@admin.com",
  password: "admin_password",
}
