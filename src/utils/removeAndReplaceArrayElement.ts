export default function removeAndReplaceArrayElement(array: string[], replacedEle: string, substitute?: string) {
    const index = array.indexOf(replacedEle)
    if (index === -1) return
    if (substitute) {
      array.splice(index, 1, substitute)
    } else {
      array.splice(index, 1) 
    }
  }