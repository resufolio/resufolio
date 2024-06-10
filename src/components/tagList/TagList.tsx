import Tag from '../tag/Tag'

interface TagListProps {
  tags: string[];
}

/**
 * TagList component renders a list of tags.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string[]} props.tags - The list of tags to be rendered.
 * @returns {JSX.Element} The rendered TagList component.
 */

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap">
      {tags.map((tag, index) => (
        <Tag key={index} label={tag} />
      ))}
    </div>
  )
}

export default TagList