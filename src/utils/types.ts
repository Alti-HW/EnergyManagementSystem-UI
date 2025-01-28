export interface Headers {
    [key: string]: string
}
export interface Options {
    method?: 'GET' | 'POST',
    headers?: Headers
    data?: string
}
export interface Request {
    url: string
    options: Options
}

export interface Response{
    loading: boolean,
    data :any,
    error: string | null
}