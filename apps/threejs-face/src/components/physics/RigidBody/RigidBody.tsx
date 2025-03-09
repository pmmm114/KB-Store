import { PropsWithChildren } from 'react';
import {
  RigidBody as RapierRigidBody,
  RigidBodyProps as RapierRigidBodyProps,
} from '@react-three/rapier';

type TRigidBodyProps = RapierRigidBodyProps;

const RigidBody = ({
  children,
  ...rest
}: PropsWithChildren<TRigidBodyProps>) => (
  <RapierRigidBody {...rest}>{children}</RapierRigidBody>
);

export default RigidBody;
