import { useContext } from 'react';
import { TransmitContext } from '~/contexts/transmit_context';

const useTransmit = () => useContext(TransmitContext);
export default useTransmit;
