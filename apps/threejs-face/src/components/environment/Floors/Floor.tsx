import { PropsWithChildren } from 'react';
import { ThreeElements } from '@react-three/fiber';

interface IFloorProps {
  /** 메시 컴포넌트 속성 */
  rootMeshProps: ThreeElements['mesh'];
  /** 평면 기하 속성 */
  planeGeometryProps: ThreeElements['planeGeometry'];
}
type TFloorProps = PropsWithChildren<IFloorProps>;

const Floor = ({
  rootMeshProps,
  planeGeometryProps,
  children,
}: TFloorProps) => {
  return (
    <mesh
      ref={(floor_ref) => {
        if (
          floor_ref &&
          rootMeshProps.ref &&
          Array.isArray(rootMeshProps.ref)
        ) {
          rootMeshProps.ref.push(floor_ref);
        }
      }}
      {...rootMeshProps}
    >
      <planeGeometry {...planeGeometryProps} />
      {children}
    </mesh>
  );
};

export default Floor;
