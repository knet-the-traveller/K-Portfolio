'use client';
import './index.css';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer, Decal } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
  



extend({ MeshLineGeometry, MeshLineMaterial });


const GLTF_PATH = '/assets/kartu.glb';
const TEXTURE_PATH = '/assets/bandd.png';
const PHOTO_PATH = '/assets/profile-card-photo.jpg';

useGLTF.preload(GLTF_PATH);
useTexture.preload(TEXTURE_PATH);
useTexture.preload(PHOTO_PATH);

export default function App() {
  return (
    <div className="responsive-wrapper">
      <Canvas 
        camera={{ position: [0, 0, 13], fov: 30 }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            console.warn('WebGL Context Lost - Attempting recovery...');
          });
          gl.domElement.addEventListener('webglcontextrestored', () => {
            console.log('WebGL Context Restored!');
          });
        }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}
function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef(); // prettier-ignore
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3(); // prettier-ignore
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(GLTF_PATH); 
  const texture = useTexture(TEXTURE_PATH); 
  const photoTexture = useTexture(PHOTO_PATH);
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const j1Lerped = useRef(new THREE.Vector3());
  const j2Lerped = useRef(new THREE.Vector3());
  const j1Init = useRef(false);
  const j2Init = useRef(false);

  // Apply object-fit: cover cropping logic to the texture
  useEffect(() => {
    if (photoTexture && photoTexture.image) {
      const imgAspect = photoTexture.image.width / photoTexture.image.height;
      const cardAspect = 0.72 / 1.02; // Aspect ratio of the decal bounding box
      if (imgAspect > cardAspect) {
        const scale = cardAspect / imgAspect;
        photoTexture.repeat.set(scale, 1);
        photoTexture.offset.set((1 - scale) / 2, 0);
      } else {
        const scale = imgAspect / cardAspect;
        photoTexture.repeat.set(1, scale);
        photoTexture.offset.set(0, (1 - scale) / 2);
      }
      photoTexture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [photoTexture]);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]); // prettier-ignore
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]); // prettier-ignore
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]); // prettier-ignore
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]); // prettier-ignore

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current && fixed.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      
      const tx = vec.x - dragged.x;
      const ty = vec.y - dragged.y;
      const tz = vec.z - dragged.z;
      // Infinite horizontal clamp to let it follow the mouse to the absolute edge of the screen
      card.current?.setNextKinematicTranslation({ 
        x: Math.max(-12, Math.min(12, tx)), 
        y: Math.max(-3, Math.min(3, ty)), 
        z: Math.max(-1, Math.min(1, tz)) 
      });
    }
    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      const refs = [j1, j2];
      const lerpeds = [j1Lerped, j2Lerped];
      const inits = [j1Init, j2Init];
      
      refs.forEach((ref, index) => {
        const lerpedRef = lerpeds[index];
        const initRef = inits[index];
        
        if (!initRef.current) {
           lerpedRef.current.copy(ref.current.translation());
           initRef.current = true;
        }
        
        const clampedDistance = Math.max(0.1, Math.min(1, lerpedRef.current.distanceTo(ref.current.translation())));
        lerpedRef.current.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2Lerped.current);
      curve.points[2].copy(j1Lerped.current);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
       <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial map={materials.base.map} map-anisotropy={16} clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.5} />
              {/* Project the photo perfectly centered on the front face (mesh origin is at the bottom edge, so we shift Y up by 0.533) */}
              <Decal position={[0, 0.533, 0.015]} rotation={[0, 0, 0]} scale={[0.73, 1.05, 1]}>
                <meshPhysicalMaterial 
                  map={photoTexture} 
                  polygonOffset polygonOffsetFactor={-1} 
                  roughness={0.3} metalness={0.5} 
                  clearcoat={1} clearcoatRoughness={0.15}
                />
              </Decal>
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" depthTest={false} resolution={[width, height]} useMap map={texture} repeat={[-4, 1]} lineWidth={1} />
      </mesh>
      
    </>
  );
}