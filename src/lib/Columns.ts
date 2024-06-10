export type ColumnWidth = '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | '1/5' | '2/5' | '3/5' | '4/5' | '1/6' | '5/6' | 'full'

const Columns: Record<ColumnWidth, string> = {
  '1/2': 'w-full md:w-1/2 lg:w-1/2 xl:w-1/2',
  '1/3': 'w-full md:w-1/2 lg:w-1/3 xl:w-1/3',
  '2/3': 'w-full md:w-2/3 lg:w-2/3 xl:w-2/3',
  '1/4': 'w-full md:w-1/4 lg:w-1/4 xl:w-1/4',
  '3/4': 'w-full md:w-3/4 lg:w-3/4 xl:w-3/4',
  '1/5': 'w-full md:w-1/5 lg:w-1/5 xl:w-1/5',
  '2/5': 'w-full md:w-2/5 lg:w-2/5 xl:w-2/5',
  '3/5': 'w-full md:w-3/5 lg:w-3/5 xl:w-3/5',
  '4/5': 'w-full md:w-4/5 lg:w-4/5 xl:w-4/5',
  '1/6': 'w-full md:w-1/6 lg:w-1/6 xl:w-1/6',
  '5/6': 'w-full md:w-5/6 lg:w-5/6 xl:w-5/6',
  'full': 'w-full'
}

export default Columns