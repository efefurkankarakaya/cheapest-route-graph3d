import { GraphServices } from '../services';
import flightsData from '../data/mock/flights.json';

test('Find cheapest path', () => {
  const graph = GraphServices.convertToGraph(flightsData);
  const path = GraphServices.findCheapestPath(graph, 'Amsterdam', 'Bern');
  expect(path).toStrictEqual(['Amsterdam', 'Utrecht', 'Bern']);
});
