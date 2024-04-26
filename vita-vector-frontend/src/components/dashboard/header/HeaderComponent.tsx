import { GlobalLoaderComponent } from './GlobalLoaderComponent'
import { ProfileComponent } from './profile/ProfileComponent'

export function HeaderComponent() {
	return (
		<header>
			<GlobalLoaderComponent />
			<ProfileComponent />
		</header>
	)
}
