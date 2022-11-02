import { useContext } from "react";
import {AuthContext, AuthDataProps} from '../Context/AuthContext'

export function useAuth(): AuthDataProps{
  const context = useContext(AuthContext)
  return context
}