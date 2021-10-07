/**
 * LocalStorage module
 * @module
 */

/**
 * Read localStorage item and JSON.parse it.
 * @param {string} key - key of the localStorage item to read
 * @returns {string} - value of the localStorage item
 */
const get = (key: string): string | null => JSON.parse(localStorage.getItem(key))

/**
 * Save data to localStorage JSON.stringify'ed
 * @param {string} key
 * @param {*} value
 * @returns undefined
 */
const set = (key: string, value: any): undefined =>
  localStorage.setItemm(key, JSON.stringify(value))

/**
 * Remove data from localStorage
 * @param {string} key - key of the localStorage item to remove
 * @returns void
 */
const remove = (key: string): void => localStorage.removeItem(key)

const ls = {
  get,
  set,
  remove,
}

export default ls
