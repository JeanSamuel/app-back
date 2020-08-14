export interface Request {
    body: object,
    params: object,
    user: object
}
export interface Response {
    json: (params: object) => {},
    status: (code: number) => Response
}