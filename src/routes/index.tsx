import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@hooks/auth';
import { UserStackRoutes } from './user.stack.routes';
import { SignIn } from '@screens/SignIn';

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <UserStackRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
