import { getLocalStorage } from "@/api/storage";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
const isBrowser = () => typeof window !== "undefined";

export const RouteGuard = ({ children }:any) => {
    const router = useRouter();
    const pathname = usePathname()
    const isSalonAuthenticated = getLocalStorage('salon-auth-token');
    let unprotectedRoutes = ['/','/signup' ,'/services', '/salons'];

    let pathIsProtected = unprotectedRoutes.indexOf(pathname) === -1;
  if (isBrowser() && !isSalonAuthenticated && pathIsProtected) {
    router.push('/login');
  }
    return children;
  };
