import { getLocalStorage } from "@/api/storage";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
const isBrowser = () => typeof window !== "undefined";

export const RouteGuard = ({ children }:any) => {
    const router = useRouter();
    const pathname = usePathname()
    const isAuthenticated = getLocalStorage('AuthToken');
    let unprotectedRoutes = ['/','/signup' ,'/services', '/salons'];

    let pathIsProtected = unprotectedRoutes.indexOf(pathname) === -1;
  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push('/login');
  }
    return children;
  };
