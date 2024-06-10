import fs from 'fs'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'src/content/projects')
const filenames = fs.readdirSync(contentDirectory)

const paths = filenames.map(filename => {
  const slug = filename.replace(/\.mdx$/, '')

  return {
    route: 'projects',
    slugs: slug,
    path: `/src/content/projects/${filename}`,
  }
})

export default paths