import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { changeAuth, login } from '../store/authSlice';
import { useAppDispatch } from '../store/store';
export function useCheckAuth(): void {
	const dispatch = useAppDispatch();
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			dispatch(
				login({
					email: user.email,
					login: user.displayName,
					token: user.displayName,
					id: user.uid
				})
			);
		} else {
			dispatch(changeAuth(false));
		}
	});
}
