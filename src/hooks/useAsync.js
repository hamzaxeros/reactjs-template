/**
 * Use Async Hook
 * @module 🔗:hooks/useAsync
 * 
 * @author Hamza Hussain <hamzahussain@Hamza Hussain.com>
 * @version 0.1.0
 * @description useAsync Modular use for async functionality, that return error, response & loading
 * 
 */

import { useCallback, useEffect, useState } from "react"

/**
 * @callback VoidCallback
 * @return {void}
 */

/**
 * Use for async functionality, that return error, response & loading
 * 
 * @function
 * @param {any} callback 
 * @param {Array<any>} dependencies 
 * @returns {{loading:boolean, error:(any|undefined), value:(any|undefined)}}
 * 
 * @example
 * import useAsync from "./useAsync"
 *
 * export default function AsyncComponent() {
 *   
 *   const { loading, error, value } = useAsync(() => {
 *     return new Promise((resolve, reject) => {
 *       const success = false
 *       setTimeout(() => {
 *         success ? resolve("Hi") : reject("Error")
 *       }, 1000)
 *     })
 *   })
 * 
 *   return (
 *     <div>
 *       <div>Loading: {loading.toString()}</div>
 *       <div>{error}</div>
 *       <div>{value}</div>
 *     </div>
 *   )
 * }
 * 
 */
export default function useAsync(callback, dependencies = []) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [value, setValue] = useState()

  const callbackMemoized = useCallback(() => {
    setLoading(true)
    setError(undefined)
    setValue(undefined)
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false))
  }, dependencies)

  useEffect(() => {
    callbackMemoized()
  }, [callbackMemoized])

  return { loading, error, value }
}
