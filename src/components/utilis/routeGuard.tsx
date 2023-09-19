import { getLocalStorage } from "@/api/storage";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
const isBrowser = () => typeof window !== "undefined";

export const RouteGuard = ({ children }: any) => {
	const router = useRouter();
	const pathname = usePathname()
	const isSalonAuthenticated = getLocalStorage('auth-token');
	const userItem = getLocalStorage('user');
	const user = userItem ? JSON.parse(userItem) : null;
	let publicRoutes = ['/', '/signup', '/services', '/salons', '/registration'];
	let professionalRoutes = ['/dashboard'];
	let clientRoutes = ['/client/dashboard'];

	let index = -1;
	if (user && user.role === 'client') {
		index = clientRoutes.indexOf(pathname)
	} else if (user && user.role === 'salon_professional') {
		index = professionalRoutes.indexOf(pathname)
	}

	if(user && !index) {
		router.push('/login');
	}

	let pathIsProtected = publicRoutes.indexOf(pathname) === -1;
	if (isBrowser() && !isSalonAuthenticated && pathIsProtected) {
		router.push('/login');
	}
	return children;

};
