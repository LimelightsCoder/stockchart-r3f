'use client'


import dynamic from 'next/dynamic';

import { Suspense, useState, useEffect } from 'react';
import TreeGraph from '@/components/dom/treeGraph/treeGraph';
import FileUpload from '@/components/dom/fileUpload/fileUpload';
import { REVISION } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as d3 from 'd3';



const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 size-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
});

const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false });

export default function Page() {
  const [treeData, setTreeData] = useState(null);
  const [jsonData, setJsonData] = useState(null); // State to hold JSON data for downloading
  const [errorMessage, setErrorMessage] = useState(null); // State for error messages
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handleFileUpload = async (file) => {
    setTreeData(null);
    setJsonData(null); // Clear previous JSON data
    setErrorMessage(null); // Clear old error messages
    setIsLoading(true); // Start loading

    const fileExtension = file.name.split('.').pop().toLowerCase();
    let parsedData;
  
    try {
      if (fileExtension === 'json') {
        const fileText = await file.text();
        parsedData = JSON.parse(fileText);
      } else if (fileExtension === 'csv') {
        const fileText = await file.text();
        const csvData = d3.csvParse(fileText);
        parsedData = convertCsvToHierarchy(csvData);
      } else if (fileExtension === 'glb' || fileExtension === 'gltf') {
        parsedData = await parseGLTF(file);
      } else {
        throw new Error('Unsupported file format. Please upload a JSON, CSV, GLB, or GLTF file.');
      }
      
      setTreeData(parsedData);
      setJsonData(parsedData); // Save parsed data for download
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const parseGLTF = (file) => {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
  
      // Set the path to your Draco decoder files using the REVISION variable
      const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;
      dracoLoader.setDecoderPath(`${THREE_PATH}/examples/jsm/libs/draco/gltf/`);
      loader.setDRACOLoader(dracoLoader);
  
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        loader.parse(arrayBuffer, '', (gltf) => {
          resolve(gltfToJSON(gltf));
        }, (error) => {
          reject(new Error('Failed to parse GLTF/GLB file: ' + error));
        });
      };
  
      reader.onerror = (error) => reject(new Error('Failed to read file: ' + error));
      reader.readAsArrayBuffer(file);
    });
  };

  const gltfToJSON = (gltf) => {
    return {
      name: gltf.scene.name || 'GLTF Model',
      children: convertGLTFToHierarchy(gltf.scene.children),
      scene: gltf.scene || undefined, // Handle optional property
      cameras: gltf.cameras || [], // Default to an empty array if no cameras
      lights: gltf.lights || [], // Default to an empty array if no lights
    };
  };
  
  const convertGLTFToHierarchy = (children) => {
    return children.map((child) => ({
      name: child.name || 'Unnamed',
      position: child.position ? child.position.toArray() : null, // Handle optional property
      rotation: child.rotation ? child.rotation.toArray() : null, // Handle optional property
      scale: child.scale ? child.scale.toArray() : null, // Handle optional property
      type: child.type || 'Unknown', // Default to 'Unknown' if type is not defined
      geometry: child.geometry ? child.geometry.attributes : undefined, // Handle optional property
      children: convertGLTFToHierarchy(child.children),
    }));
  };

  

  const downloadJSON = (data) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'model.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='relative h-screen w-screen text-center overflow-x-hidden'>
      <div className='flex flex-col h-full w-full mt-24'>
        <h1>Tree Graph Data Visualization</h1>
        <p>supports, json, csv, and glb files. * DRACO compressed glb&apos;s are supported.</p>
        <FileUpload onFileUpload={handleFileUpload} />
        {jsonData && (
          <button 
            onClick={() => downloadJSON(jsonData)} 
            className='mt-4 p-2 bg-blue-500 text-white rounded'
          >
            Download JSON
          </button>
        )}
        {isLoading && <p>Loading...</p>}
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>} {/* Display error messages */}
        {treeData && (
        <div style={{ overflowY: 'auto', minHeight: '50vh' }}> {/* Added a wrapper for scrolling */}
          <TreeGraph data={treeData} />
        </div>
      )}
      <div className='relative w-full h-full'> 
      <p className='font-bold'>Advantages of JSON:</p>
<ul>
    <li>
        <strong>Flexibility:</strong> JSON can capture all properties of Three.js objects, including those that GLTF/GLB may not support. This means you can include additional custom data, metadata, or properties that are important for your application.
    </li>
    <li>
        <strong>Ease of Use:</strong> Working with JSON can be simpler in some contexts, especially when debugging or making modifications to the data, since it&apos;s human-readable.
    </li>
    <li>
        <strong>Faster Serialization/Deserialization:</strong> In some scenarios, converting between Three.js objects and JSON can be quicker than GLTF/GLB, especially for simpler or smaller models.
    </li>
    <li>
        <strong>No Compression Loss:</strong> Since JSON is text-based, there&apos;s no risk of losing data due to compression artifacts, which can be a concern with binary formats if not handled correctly.
    </li>
</ul>
<br></br>
<p className='font-bold'>Advantages of GLB/GLTF:</p>
<ul>
    <li>
        <strong>File Size:</strong> GLB files are generally much smaller because they are binary and can include compressed assets. This is particularly beneficial for web applications where loading time is crucial.
    </li>
    <li>
        <strong>Performance:</strong> GLB files can be loaded more efficiently in WebGL contexts because they are optimized for rendering, with fewer processing steps needed during parsing.
    </li>
    <li>
        <strong>Standardized Format:</strong> GLTF/GLB is an established format that many 3D engines and platforms support, making it easier to share models across different applications.
    </li>
</ul>
      </div>
<br></br>
      </div>
    </div>
  );
}

const convertCsvToHierarchy = (csvData) => {
  const hierarchy = { name: 'Root', children: [] };
  const map = {};

  csvData.forEach((row) => {
    const node = { name: row.name, children: [] };
    map[row.name] = node;
  });

  csvData.forEach((row) => {
    const node = map[row.name];
    if (row.parent) {
      if (map[row.parent]) {
        map[row.parent].children.push(node);
      } else {
        hierarchy.children.push(node);
      }
    } else {
      hierarchy.children.push(node);
    }
  });

  return hierarchy;
};
