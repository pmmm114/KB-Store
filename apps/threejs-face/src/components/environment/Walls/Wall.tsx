import { PropsWithChildren } from 'react';
import { ThreeElements } from '@react-three/fiber';

interface IWallProps {
  /** 메시 컴포넌트 속성 */
  rootMeshProps: ThreeElements['mesh'];
  /** 박스 기하 속성 */
  boxGeometryProps: ThreeElements['boxGeometry'];
}
type TWalletProps = PropsWithChildren<IWallProps>;

const Wall = ({ rootMeshProps, boxGeometryProps, children }: TWalletProps) => {
  return (
    <mesh
      ref={(wall_ref) => {
        if (wall_ref && rootMeshProps.ref && Array.isArray(rootMeshProps.ref)) {
          rootMeshProps.ref.push(wall_ref);
        }
      }}
      {...rootMeshProps}
    >
      <boxGeometry {...boxGeometryProps} />
      {children}
    </mesh>
  );
};

export default Wall;
