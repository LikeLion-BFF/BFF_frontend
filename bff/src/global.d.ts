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
