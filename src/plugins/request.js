import axios  from "axios";

const service=axios.create({
    baseURL:'http://127.0.0.1:8080/',
})

service.interceptors.request.use(
    config => {
        const ServeToken=window.localStorage.getItem('ServeToken')
        const Token=window.localStorage.getItem('Token')
        config.headers['Authorization']=ServeToken;
        config.headers['Authorizations']=Token;
        return config
    },
    error => {
      // Do something with request error
      console.log(error) // for debug
      Promise.reject(error)
    }
  )
service.interceptors.response.use(res=>{
    return res;
},error=>{
    return Promise.reject(error)
})

export default service;