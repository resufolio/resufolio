import React from 'react'
import { ComponentInterface } from '@/lib/admin/utils'

const ComponentsMap: Record<string, React.FC<any>> = {
    Article: ({ title, content }: { title: string, content: string }) => (
        <div>
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-lg text-slate-800">{content}</p>
        </div>
    ),
    Card: ({ title, content }: { title: string, content: string }) => (
        <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-slate-800">{content}</p>
        </div>
    )
}

const ComponentRenderer: React.FC<{ component: ComponentInterface }> = ({ component }) => {
    const Component = ComponentsMap[component.type]
    return Component ? (
        <Component {...component.props} />
    ) : null
}

export default ComponentRenderer
