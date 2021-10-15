export interface HttpRequestConfigRequest {
    httpMethod: string,
    url: string,
    httpHeaders: Record<string, string>,
    httpBody: Record<string, string>,
}