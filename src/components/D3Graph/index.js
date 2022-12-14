import { useEffect, useMemo, useRef } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import SpriteText from 'three-spritetext';

import { GraphServices } from '../../services';

function D3Graph({ flightsData }) {
  const graph = useMemo(() => GraphServices.convertToGraph(flightsData), [flightsData]);
  const path = useMemo(() => GraphServices.findCheapestPath(graph, 'Tallinn', 'Reykjavik'), [graph]);

  const extraRenderers = [new CSS2DRenderer()];
  const focusedGraph = useRef();

  useEffect(() => {
    activateBloomEffect();
  });

  useEffect(() => {
    console.log(path);
  }, [path]);

  const activateBloomEffect = () => {
    const bloomPass = new UnrealBloomPass();
    bloomPass.strength = 3;
    bloomPass.radius = 1;
    bloomPass.threshold = 0.1;
    focusedGraph.current.postProcessingComposer().addPass(bloomPass);
  };

  const updateLinkPosition = (sprite, coordinates) => {
    const { start, end } = coordinates;
    const middlePos = Object.assign(
      ...['x', 'y', 'z'].map((c) => ({
        [c]: start[c] + (end[c] - start[c]) / 3,
      }))
    );

    Object.assign(sprite.position, middlePos);
  };

  const updateLinkD3Object = (link) => {
    const sprite = new SpriteText(`${link.value} EUR`);
    sprite.color = 'lightgrey';
    sprite.textHeight = 3;
    // nodeEl.style.fontSize = '2em';
    return sprite;
  };

  const updateNodeD3Object = (node) => {
    const nodeEl = document.createElement('span');
    nodeEl.textContent = node.id;
    nodeEl.style.color = node.color;
    nodeEl.style.marginTop = '-2em';
    nodeEl.className = 'node-label';
    return new CSS2DObject(nodeEl);
  };

  return (
    <div>
      <ForceGraph3D
        linkDirectionalArrowLength={3.5}
        ref={focusedGraph}
        extraRenderers={extraRenderers}
        width={window.innerWidth}
        height={window.innerHeight}
        graphData={flightsData}
        nodeLabel="id"
        nodeAutoColorBy="group"
        linkThreeObjectExtend={true}
        linkThreeObject={updateLinkD3Object}
        linkPositionUpdate={updateLinkPosition}
        nodeThreeObject={updateNodeD3Object}
        nodeThreeObjectExtend={true}
      />
    </div>
  );
}

export default D3Graph;
