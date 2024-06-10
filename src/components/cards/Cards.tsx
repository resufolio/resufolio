import Card, { CardProps } from '@/components/card/Card'
import Columns, { ColumnWidth } from '@/lib/Columns'

interface CardsProps {
  cards: CardProps[]
  columns?: ColumnWidth
}

const Cards: React.FC<CardsProps> = ({ cards, columns }) => {
  const className = columns ? Columns[columns] : Columns['full']
  return (
    <div className='flex flex-wrap'>
      {cards.map((card, index) => (
        <div className={className + ' pb-4 pr-4 md:pb-6 md:pr-6 flex'} key={index}>
          <Card {...card} />
        </div>
      ))}
    </div>
  )
}

export default Cards

