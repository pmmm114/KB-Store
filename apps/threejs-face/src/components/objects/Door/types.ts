import { ComponentProps } from 'react';
import RigidBody from '@/components/physics/RigidBody/RigidBody';

/**
 * @description RigidBody 컴포넌트의 position 타입
 */
export type TRigidBodyComponentPosition = ComponentProps<
  typeof RigidBody
>['position'];

/**
 * @description 객체별 문 회전 축 Position 정보
 */
export type TDoorRotationAxisPosition = Record<
  string,
  () => TRigidBodyComponentPosition
>;
