export enum DocumentType {
  PASSPORT = "PASSPORT",                    // Паспорт
  BIRTH_CERTIFICATE = "BIRTH_CERTIFICATE"   // Свидетельство о рождении
}

export const documentTypes = Object.values(DocumentType)

export const documentTypeOptions = [
  { label: 'Паспорт', value: DocumentType.PASSPORT },
  { label: 'Свидетельство о рождении', value: DocumentType.BIRTH_CERTIFICATE },
]
