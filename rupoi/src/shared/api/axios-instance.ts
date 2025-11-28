import { createInstance } from "@common/shared/config";

const isDev = import.meta.env.DEV

const baseInstance = createInstance(isDev ? '/api/staffcontrol' : `${import.meta.env.VITE_BASE_API_URL}/api/staffcontrol`)
const rupoiInstance = createInstance(isDev ? '/api/rupoi' : `${import.meta.env.VITE_RUPOI_API_URL}/api/rupoi`)
const commonInstance = createInstance(isDev ? '/api/common' : `${import.meta.env.VITE_COMMON_API_URL}/api/common`)
const fileStorageInstance = createInstance(`${import.meta.env.VITE_FILE_STORAGE_API_URL}/api/v1`)

export {
  baseInstance,
  rupoiInstance,
  commonInstance,
  fileStorageInstance,
}
