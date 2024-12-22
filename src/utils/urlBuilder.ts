interface UrlBuilderArgs {
    baseURL: string
    endpoint: string
    params?: Record<string, string>
    queries?: Record<string, string>
}

const urlBuilder = ({ baseURL, endpoint, params, queries }: UrlBuilderArgs): string => {
    const fullURL = `${baseURL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`

    const url = new URL(fullURL)

    if (params && typeof params === 'object') {
        Object.keys(params).forEach((key) => {
            url.pathname = url.pathname.replace(`:${key}`, params[key])
        })
    }

    if (queries && typeof queries === 'object') {
        Object.keys(queries).forEach((key) => {
            url.searchParams.append(key, queries[key])
        })
    }

    return url.toString()
}

export default urlBuilder
