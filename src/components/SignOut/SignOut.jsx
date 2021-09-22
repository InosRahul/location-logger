import { firebaseService } from 'service';

export const SignOut = () => {
  return (
    <button className="float" onClick={() => firebaseService.auth.signOut()}>
      Sign Out
    </button>
  );
};
