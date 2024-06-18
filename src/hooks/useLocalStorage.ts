import { useState, useEffect } from 'react'

function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  const [state, setState] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const localStorageValue = localStorage.getItem(key)
      if (localStorageValue !== null) {
        return JSON.parse(localStorageValue)
      }
    }
    return initialValue
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStorageValue = localStorage.getItem(key)
      if (localStorageValue !== null) {
        setState(JSON.parse(localStorageValue))
      }
      setIsLoaded(true)
    }
  }, [key])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(state))
    }
  }, [key, state])

  return [state, setState, isLoaded]
}

export default useLocalStorage
