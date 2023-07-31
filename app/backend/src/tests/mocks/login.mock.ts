const userMock = {
    id: 1,
    username: 'User',
    role: 'user',
    email: 'valid@user.com',
    password: '$2a$12$x1R9nPMbzV8CV1/f1tHhWOGkfTDMLnibFuI4rVN3fNEIu4Y3TNRQO'  
  }

const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6InZhbGlkQHVzZXIuY29tIiwicm9sZSI6InVzZXIifQ.bkouKURuV8JAlbItyOP-gHpe-9l-C43BROLwvRW8-nk';

const validLogin = {
    email: 'vald@user.com',
    password: '123456',
  }

  export {
    userMock,
    validToken,
    validLogin,
  }