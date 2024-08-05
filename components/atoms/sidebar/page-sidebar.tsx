import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type MENU_ITEM_TYPE = {
  id: number;
  title: string;
  path: string;
  accessor: string;
};

interface PageSidebarProps {
  title: string;
  menu_items: MENU_ITEM_TYPE[];
  handleClick?: () => any;
  slug: string;
}

const PageSidebar = ({
  title,
  menu_items,
  slug = "ui",
  handleClick,
}: PageSidebarProps) => {
  const location = usePathname();
  const router = useRouter();
  const queryParams = useSearchParams();

  const ui = queryParams.get(slug);

  return (
    <aside className="h-full bg-white border-r min-w-[201px] overflow-hidden global_sticky_class">
      <h3 className="text-[#6E7C87] p-4">{title}</h3>
      {menu_items?.map(({ id, title, path, accessor }) => (
        <span
          key={id}
          className={cn(
            "block p-2 text-xs px-4 text-gray-400 cursor-pointer mb-1",
            ui === accessor &&
              "text-[var(--primary-color)] bg-[var(--primary-accent-color)]"
          )}
          onClick={() => {
            handleClick
              ? handleClick()
              : router.push(`${location}?${slug}=${accessor}`);
          }}
        >
          {title}
        </span>
      ))}
    </aside>
  );
};

export default PageSidebar;
