export interface ComponentInterface {
    id: string;
    type: string;
    props: Record<string, any>;
}

export interface Column {
    id: string;
    components: ComponentInterface[];
    width: number;
}

export interface Row {
    id: string;
    columns: Column[];
}

export interface Grid {
    columns: number[];
}

export interface RowSectionProps extends Row {
    index: number;
    handleDeleteRow: (id: string) => void;
    handleDeleteComponent: (id: string) => void;
}

export interface DnDId <T extends string> {
    type: 'droppable' | 'draggable';
    name: T;
    index?: number;
    rowId?: string;
    columnId?: string;
    componentId?: number;
    componentType?: string;
}

export type DnDIdType = 'container' | 'sidebar-grids' | 'sidebar-components' | 'row' | 'column' | 'component'

export const dndId = {
    parse: (id: string) => JSON.parse(id) as DnDId<DnDIdType>,
    stringify: (id: DnDId<DnDIdType>) => JSON.stringify(id),
}

export const widthClassMap: Record<number, string> = {
    1: 'w-full md:w-1/12',
    2: 'w-full md:w-2/12',
    3: 'w-full md:w-3/12',
    4: 'w-full md:w-4/12',
    5: 'w-full md:w-5/12',
    6: 'w-full md:w-6/12',
    7: 'w-full md:w-7/12',
    8: 'w-full md:w-8/12',
    9: 'w-full md:w-9/12',
    10: 'w-full md:w-10/12',
    11: 'w-full md:w-11/12',
    12: 'w-full',
}

export interface RowSectionContentProps extends Row {
    handleDeleteComponent: (id: string) => void;
}

export type SidebarTabs = 'elements' | 'metadata'

export const gridToRow = (grid: Grid, index: number): Row => {
    return {
        id: `${index}`,
        columns: grid.columns.map((width, innerIndex) => ({
            id: `${innerIndex}`,
            components: [],
            width,
        }))
    }
}
