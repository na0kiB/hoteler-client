import applyCaseMiddleware, { ApplyCaseMiddlewareOptions } from 'axios-case-converter'
import axios, { AxiosInstance} from 'axios'

// type Auth = {
//   client: undefined | string | AxiosRequestConfig
// }

const options: ApplyCaseMiddlewareOptions = {
  ignoreHeaders: true,
}

const client: AxiosInstance | any = applyCaseMiddleware(
  axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
  }),
  options
)

export default client