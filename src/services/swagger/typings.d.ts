declare namespace API {
  type BaseResponseInteger = {
    code?: number;
    message?: string;
    description?: string;
    data?: number;
  };

  type BaseResponseString = {
    code?: number;
    message?: string;
    description?: string;
    data: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    message?: string;
    description?: string;
    data?: UserVO;
  };

  type sendCodeParams = {
    email: string;
  };

  type UserLoginRequest = {
    email?: string;
    password?: string;
    loginIdentity?: string;
  };

  type UserRegisterRequest = {
    email?: string;
    password?: string;
    phone_code?: string;
    phone?: string;
    invite_code?: string;
    registerIdentity?: string;
  };

  type UserVO = {
    email?: string;
    name?: string;
    avatar?: string;
    remember_token?: string;
    phone?: string;
    description?: string;
    money?: number;
  };
}
