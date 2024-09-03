// Kakao 타입 정의
declare namespace Kakao {
  function init(apiKey: string): void;
  function isInitialized(): boolean;
  namespace Auth {
    function authorize(params: { redirectUri: string }): void;
  }
  namespace API {
    function request(params: { url: string, success: (response: any) => void, fail: (error: any) => void }): void;
  }
}

// Naver 타입 정의
interface Window {
  naver: Naver;
}

interface Naver {
  LoginWithNaverId: new (params: NaverLoginParams) => NaverLoginInstance;
}

interface NaverLoginParams {
  clientId: string;
  callbackUrl: string;
  isPopup?: boolean;
  loginButton?: { color?: string; type?: number; height?: number };
}

interface NaverLoginInstance {
  init(): void;
  getLoginStatus(callback: (status: boolean) => void): void;
  user: {
    getId(): string;
  };
}