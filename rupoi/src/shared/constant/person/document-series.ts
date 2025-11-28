export enum DocumentSeries {
  ID = "ID",        // ID
  AC = "AC",        // AC
  AN = "AN",        // AN
  KGZ01 = "KGZ01",  // KGZ01
  KR_X = "KR_X"     // KR-X
}

export const documentSeries = Object.values(DocumentSeries)

export const documentSeriesOptions = [
  { label: 'ID', value: DocumentSeries.ID },
  { label: 'AC', value: DocumentSeries.AC },
  { label: 'AN', value: DocumentSeries.AN },
  { label: 'KGZ01', value: DocumentSeries.KGZ01 },
  { label: 'KR-X', value: DocumentSeries.KR_X },
]
