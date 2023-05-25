import { setupServer } from 'msw/node';
import jsonPlaceholderHandlers from './handlers/jsonPlaceholder';
import swapiHandlers from './handlers/swapi';

const mockServer = setupServer(...jsonPlaceholderHandlers, ...swapiHandlers);

export default mockServer;
