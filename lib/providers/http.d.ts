import { HttpFunction } from '../interface';
/**
 * Handle HTTP requests.
 * @param handler A function that takes a request and response object,
 * same signature as an Express app.
 */
export declare function onRequest(handler: (req: Request, resp: Response) => void | Promise<void>): HttpFunction;
export declare function getPathMatches(pathPattern: string, { path }: {
    path: string;
}): [boolean, null | object];
/** @hidden */
export declare function _onRequestWithOptions(handler: (req: Request, resp: Response) => void | Promise<void>): HttpFunction;
