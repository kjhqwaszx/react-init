import z from 'zod'

// export const tempDto = z
//   .array(
//     z.object({
//       categoryName: z.string().default(""),
//       categoryDetailName: z.string().default(""),
//       age: z.string().default(""),
//       gender: z.string().default(""),
//       questionId: z.string().default(""),
//       questionTitle: z.string().default(""),
//     })
//   )
//   .default([]);

export const mainCntDto = z.number().default(0).default(0)

export type mainCntDtoType = z.infer<typeof mainCntDto>
export const initialMainCntState: mainCntDtoType = mainCntDto.parse(undefined)
