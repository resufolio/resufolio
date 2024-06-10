import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const getContent = <FrontMatter>(filePath: string) => {
  const cwd = process.cwd()
  const fileContent = fs.readFileSync(path.join(cwd, filePath), 'utf-8')
  const { data, content } = matter(fileContent)
  return {
    frontmatter: data as FrontMatter,
    content
  }
}