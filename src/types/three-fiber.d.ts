import * as THREE from "three";
import { ReactThreeFiber } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      group: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>;
      points: ReactThreeFiber.Object3DNode<THREE.Points, typeof THREE.Points>;
      torus: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      torusGeometry: ReactThreeFiber.BufferGeometryNode<THREE.TorusGeometry, typeof THREE.TorusGeometry>;
      sphereGeometry: ReactThreeFiber.BufferGeometryNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>;
      extrudeGeometry: ReactThreeFiber.BufferGeometryNode<THREE.ExtrudeGeometry, typeof THREE.ExtrudeGeometry>;
      bufferGeometry: ReactThreeFiber.BufferGeometryNode<THREE.BufferGeometry, typeof THREE.BufferGeometry>;
      bufferAttribute: ReactThreeFiber.Node<THREE.BufferAttribute, typeof THREE.BufferAttribute>;
      meshPhysicalMaterial: ReactThreeFiber.MaterialNode<THREE.MeshPhysicalMaterial, typeof THREE.MeshPhysicalMaterial>;
      meshBasicMaterial: ReactThreeFiber.MaterialNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>;
      pointsMaterial: ReactThreeFiber.MaterialNode<THREE.PointsMaterial, typeof THREE.PointsMaterial>;
      ambientLight: ReactThreeFiber.LightNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      directionalLight: ReactThreeFiber.LightNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
      pointLight: ReactThreeFiber.LightNode<THREE.PointLight, typeof THREE.PointLight>;
      spotLight: ReactThreeFiber.LightNode<THREE.SpotLight, typeof THREE.SpotLight>;
    }
  }
}
