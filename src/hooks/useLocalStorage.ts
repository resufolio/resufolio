import { useState, useEffect } from 'react'

function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      try {
        const localStorageValue = localStorage.getItem(key)
        if (localStorageValue !== null) {
          return JSON.parse(localStorageValue)
        } else {
          return initialValue
        }
      } catch {
        return initialValue
      }
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(state))
    }
  }, [key, state])

  return [state, setState]
}

export default useLocalStorage