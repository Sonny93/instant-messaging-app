import { useContext } from 'react';
import { TargetUserContext } from '~/contexts/target_user_context';

const useTargetUser = () => useContext(TargetUserContext);
export default useTargetUser;
