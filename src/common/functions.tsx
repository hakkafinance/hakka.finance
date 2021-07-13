// import moment from 'moment'
// import axios from 'axios'
// import { isNull, isUndefined } from 'util'
// import numeral from 'numbro'
// import { chainType } from './constant'

// export const showNotification = (
//   title = 'Success',
//   description = '',
//   type = 'open'
// ) => {
//   notification[type]({
//     message: title,
//     description: description || '',
//     placement: 'bottomRight'
//   })
// }

export const standardNameFileUpload = (name) =>
  name.split(' ').join('').replace('.png', '')


export const lowerCase = value => {
  return value ? value.toLowerCase() : value
}

export const upperCase = value => {
  return value ? value.toUpperCase() : value
}



export const generateId = () => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}


export const formatArrayKey = (array) => {
  const finalArr = array

  for (const index in finalArr) {
    finalArr[index].key = index
  }
  return finalArr
}


export const convertHtmlContent = (html) => {
  const temp = document.createElement('div')
  temp.innerHTML = html
  return temp
}


export const replaceComma = (str) => {
  const newString = typeof str !== 'string' ? str.toString() : str
  return newString.replace(/,/g, '')
}
export const upperCaseFirstLetter = (lower) => {
  if (!lower) return lower
  const upper = lower.replace(/^\w/, (chr) => chr.toUpperCase())
  return upper
}

export const roundingNumber = (number, rounding = 7) => {
  const powNumber = Math.pow(10, parseInt(rounding))
  return Math.floor(number * powNumber) / powNumber
}

export const getLength = (value) => (value ? value.length : 0)

export const setItemStorage = async (key, value) => {
  await localStorage.setItem(key, value)
}

export const getItemStorage = (key) => localStorage.getItem(key)

export const removeItemStorage = (key) => {
  localStorage.removeItem(key)
}

export const genObjectLang = (en, vi, ja, cn) => ({
  en,
  vi,
  ja,
  cn
})



// const blobToBase64 = (blob) => {
//   const reader = new FileReader()
//   reader.readAsDataURL(blob)
//   return new Promise((resolve) => {
//     reader.onloadend = () => {
//       resolve(reader.result)
//     }
//   })
// }

export const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  if (i === 0) return `${bytes} ${sizes[i]}`
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}
export const calculateLevel = (user) => {
  if (!user) return 0
  // Check level upgrade by volume first
  if (getLength(user.refLevel) > 0) {
    // Level 1 1K/MONTH
    // Level 2 2MIL/MONTH
    // Level 3 5MIL/MONTH
    // Level 4 10MIL/MONTH
    // Level 5 15MIL/MONTH
    // Level 6 2 ref trực tiếp level 4
    return Math.max.apply(null, user.refLevel.map(itm => itm.level))
  } else {
    return 0
  }
}
export const formatArratoObjectLV = (array) => {
  const finalObj = {}
  for (let i = 0; i < getLength(array); i++) {
    finalObj[`lv${i + 1}`] = array[i]
  }
  return finalObj
}


