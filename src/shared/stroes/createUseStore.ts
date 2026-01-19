import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

/**
 * 초기 상태와 함께 설정자(setter) 및 초기화 함수를 사용하여 스토어를 생성합니다.
 *
 * @template StateType - 상태 객체의 타입
 * @param initialState - 초기 상태 객체
 * @returns 생성된 스토어 객체
 */

export const createStoreWithSettersAndInit = <
  StateType extends Record<string, any>,
>(
  initialState: StateType,
) => {
  const store = create<any>(
    immer((set) => ({
      ...initialState,
      ...Object.keys(initialState).reduce((acc, key) => {
        return {
          ...acc,
          /**
           * 상태 객체의 특정 속성에 값을 설정하는 설정자(setter) 함수입니다.
           *
           * @param value - 설정할 값
           */
          [`set${key.charAt(0).toUpperCase() + key.slice(1)}`]: (
            value: StateType[typeof key],
          ) =>
            set((state: StateType[typeof key]) => {
              if (Array.isArray(value)) {
                state[key] = [...value]
              } else if (typeof value === 'object' && value !== null) {
                state[key] = { ...state[key], ...value }
              } else {
                state[key] = value
              }
            }),
          /**
           * 상태 객체의 특정 속성을 초기 값으로 초기화하는 함수입니다.
           */
          [`init${key.charAt(0).toUpperCase() + key.slice(1)}`]: () =>
            set((state: StateType[typeof key]) => {
              state[key] = initialState[key]
            }),
        }
      }, {}),
      /**
       * 스토어를 초기 상태로 재설정하는 함수입니다.
       */
      resetStore: () => set(() => ({ ...initialState })),
    })),
  )

  return store
}
