import { createStoreWithSettersAndInit } from '@/shared/stroes/createUseStore.ts'
import { initialMainCntState } from '@/entites/main/model/main.ts'

export const useMainContentsStore =
  createStoreWithSettersAndInit(initialMainCntState)
