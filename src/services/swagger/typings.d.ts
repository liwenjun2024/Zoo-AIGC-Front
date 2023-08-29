declare namespace API {
  type BaseResponseBoolean = {
    code?: number;
    message?: string;
    description?: string;
    data?: boolean;
  };

  type BaseResponseInteger = {
    code?: number;
    message?: string;
    description?: string;
    data?: number;
  };

  type BaseResponseListMessageVO = {
    code?: number;
    message?: string;
    description?: string;
    data?: MessageVO[];
  };

  type BaseResponseListSessionVO = {
    code?: number;
    message?: string;
    description?: string;
    data?: SessionVO[];
  };

  type BaseResponseString = {
    code?: number;
    message?: string;
    description?: string;
    data?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    message?: string;
    description?: string;
    data?: UserVO;
  };

  type chatParams = {
    msg: string;
  };

  type ChatRequest = {
    message?: string;
    sid?: string;
    question?: string;
    mid?: number;
  };

  type MessageVO = {
    id?: number;
    question?: string;
    message?: string;
    type?: string;
    icon?: string;
  };

  type selectMessageParams = {
    sid: string;
  };

  type selectSessionParams = {
    uid?: number;
  };

  type sendCodeParams = {
    email: string;
  };

  type SessionRequest = {
    user_id?: number;
    id?: string;
    title?: string;
  };

  type SessionVO = {
    user_id?: number;
    id?: string;
    title?: string;
  };

  type SseEmitter = {
    timeout?: number;
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
    id?: number;
    email?: string;
    name?: string;
    avatar?: string;
    remember_token?: string;
    phone?: string;
    description?: string;
    money?: number;
  };
}
