import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { AuthComponent } from '@/app/auth/auth.component'

export const metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE
}

export default function AuthPage() {
	return <AuthComponent />
}
