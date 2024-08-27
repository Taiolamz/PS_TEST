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
      <div className="border border-grayDivider bg-[#F6F8F9] rounded-sm px-4 py-3">
        <p className="font-medium text-base text-[var(--primary-color)]">
          {title}
        </p>
      </div>
      <Button className="h-max px-4 py-4" onClick={clickAction}>
        {btnText}
      </Button>
    </div>
  );
};

export default ShowLineManager;
