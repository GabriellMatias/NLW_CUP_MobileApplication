import { createContext, ReactNode, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

/* armazena conteudo do nosso contexto*/
export const AuthContext = createContext({} as AuthDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [userData, setUserData] = useState<UserProps>({} as UserProps)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "686097553981-jkp6gj1njogkm7qgldu52ok22th2du3m.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync();

    } catch (error) {
      console.log(error);
      throw error;

    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token:string){
    console.log(access_token)

  }

  useEffect(()=>{
    if(response?.type === 'success' && response.authentication?.accessToken){
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user : userData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
