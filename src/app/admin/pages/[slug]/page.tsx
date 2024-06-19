import PagesEditor from '@/components/admin/PagePagesEditor'

const Page = ({ params }: { params: { slug: string } }) => {
    return <PagesEditor slug={params.slug} />
}

export async function generateStaticParams() {
    const slugs = ['slug']
    return slugs.map(slug => ({
        slug
    }))
}

export default Page
