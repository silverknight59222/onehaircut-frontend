import { getLocalStorage } from "@/api/storage";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'

const isBrowser = () => typeof window !== "undefined";

export const RouteGuard = ({ children }: any) => {
	const router = useRouter();
	const pathname = usePathname()
	const isSalonAuthenticated = getLocalStorage('auth-token');
	const userItem = getLocalStorage('user');
	const user = (userItem && userItem !== 'undefined') ? JSON.parse(userItem) : null;
	let publicRoutes = ['/', '/login', '/signup', '/forgot-password', '/[id]', '/services', '/salons', '/registration', '/book-salon', '/salon', '/payment', '/confirm-payment', '/confidentiality', '/terms', '/legalNotices', '/email-verify', '/verification'];
	let professionalRoutes = ['/dashboard', '/dashboard/client-activity', '/dashboard/visites', '/dashboard/revenue', '/dashboard/messages', '/dashboard/settings', '/dashboard/subscription', '/dashboard/bot', '/dashboard/contactUs', '/verification'];
	let freeSubscriptionRoutes = ['/dashboard', '/dashboard/client-activity', '/dashboard/revenue', '/dashboard/messages', '/dashboard/settings', '/dashboard/subscription', '/dashboard/bot', '/dashboard/contactUs', '/verification'];
	let clientRoutes = ['/client/dashboard', '/client/favorites', '/client/filters', '/client/history', '/client/messages', '/client/portrait', '/client/currentreservation', '/client/help', '/client/processed', '/client/contactUs'];

	const salonRoles = ['salon_professional', 'admin', 'staff'];

	let index = -1;
	if (publicRoutes.includes(`/${pathname.split('/')[1]}`)) {
		index = publicRoutes.indexOf(`/${pathname.split('/')[1]}`)
	} else if (user && user.role === 'client') {
		index = clientRoutes.indexOf(pathname)
	} else if (user && user.role === 'salon_professional' && user.subscription) {
		index = professionalRoutes.indexOf(pathname)
	} else if (user && salonRoles.indexOf(user.role)) {
		index = professionalRoutes.indexOf(pathname)
	} else if (user && user.role === 'salon_professional' && !user.subscription) {
		index = freeSubscriptionRoutes.indexOf(pathname)
	}
	
	if (user && index === -1) {
		router.push('/login');
	}

	// let pathIsProtected = publicRoutes.indexOf(`/${pathname.split('/')[1]}/${pathname.split('/')[1]}`) === -1;
	// if (isBrowser() && !isSalonAuthenticated && pathIsProtected) {
	// 	router.push('/login');
	// }
	return children;

};
