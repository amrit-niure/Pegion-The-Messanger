
import {clsx } from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs){
  return twMerge(clsx(inputs))
}
export function chatHerfConstructor (id1, id2){
  const sortedIds = [id1,id2].sort()
  return `${sortedIds[0]}--${sortedIds[1]}`
}
