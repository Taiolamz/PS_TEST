import { Button } from "@/components/ui/button";

interface ShowLineManagerProp {
  btnText?: string;
  title?: string;
  clickAction: any;
}

const ShowLineManager = ({
  btnText,
  title,
  clickAction,
}: ShowLineManagerProp) => {
  return (
    <div className="flex gap-x-3 mb-8">
      <div className="border border-grayDivider bg-[#F6F8F9] rounded-sm px-4 py-2">
        <p className="font-medium text-sm text-[var(--primary-color)]">
          {title}
        </p>
      </div>
      <Button
        className="h-full px-6 py-[0.45rem] text-sm bg-transparent border border-primary text-[var(--primary-color)] shadow-none rounded-sm hover:bg-[var(--primary-accent-color)]"
        onClick={clickAction}
      >
        {btnText}
      </Button>
    </div>
  );
};

export default ShowLineManager;
