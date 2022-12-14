import Graph from 'graphology';
import { dijkstra } from 'graphology-shortest-path';

function convertToGraph(flightsData) {
  const graph = new Graph();

  flightsData.nodes.forEach((node) => {
    console.log(node);
    if (!graph.hasNode(node.id)) {
      graph.addNode(node.id);
    }
  });

  flightsData.links.forEach((link) => {
    const key = `${link.source}->${link.target}`;
    if (!graph.hasEdge(key)) {
      graph.addEdgeWithKey(`${link.source}->${link.target}`, link.source, link.target, { weight: link.value });
    }
  });
  console.log(graph);
  return graph;
}

function findCheapestPath(graph, start, end) {
  return dijkstra.bidirectional(graph, start, end);
}

export { convertToGraph, findCheapestPath };
