import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type MENU_ITEM_TYPE = {
    id: number,
    title: string
    path: string,
    accessor: string
}

interface PageSidebarProps {
    title: string,
    menu_items: MENU_ITEM_TYPE[],
    handleClick?: () => any,
    slug: string
}

const PageSidebar = ({title, menu_items, slug = 'ui', handleClick}: PageSidebarProps) => {
    const location = usePathname();
    const router = useRouter()
    const queryParams = useSearchParams()

    const ui = queryParams.get(slug) 

    return (
        <aside className="h-screen bg-white border-r w-[201px] overflow-hidden">
            <h3 className="text-[#6E7C87] p-4">{title}</h3>
            {
                menu_items?.map(({ id, title, path, accessor }) => (
                    <span key={id} className={cn(
                        "block p-2 text-xs px-4 text-gray-400 cursor-pointer mb-1",
                        ui === accessor && "text-primary bg-[#07A28714]"
                    )}
                        onClick={() => {
                            handleClick ? handleClick() : router.push(`${location}?${slug}=${accessor}`)
                        } }
                    >{title}</span>
                ))
            }
        </aside>
    );
}

export default PageSidebar;
